import { constants } from 'node:fs';
import { lstat, mkdir, open, readdir, rename, rm } from 'node:fs/promises';
import { createHash, randomUUID } from 'node:crypto';
import { join, resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { isDeepStrictEqual } from 'node:util';
import { getPlugin, validateContent } from '../src/modeling-plugins/registry';
import type { PluginDocument } from '../src/modeling-plugins/types';
import { jsonSafetyProblem, MAX_DOCUMENT_BYTES } from '../src/modeling-plugins/document-safety';

export const MAX_BYTES = MAX_DOCUMENT_BYTES;
const identifier = /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,79}$/;

export class StoreError extends Error {
  constructor(public status: number, public code: string, message: string) {
    super(message);
  }
}

function assertId(value: string): void {
  if (!identifier.test(value)) {
    throw new StoreError(400, 'invalid_identifier', '无效的文档标识');
  }
}

export function assertSafeJson(value: unknown): void {
  const problem = jsonSafetyProblem(value);
  if (problem) throw new StoreError(400, problem.code, problem.message);
}

async function assertDirectory(path: string): Promise<void> {
  await mkdir(path, { recursive: true, mode: 0o700 });
  const info = await lstat(path);
  if (!info.isDirectory() || info.isSymbolicLink()) {
    throw new StoreError(400, 'unsafe_directory', '存储目录不能是符号链接');
  }
}

export class PluginStore {
  readonly root: string;

  constructor(root: string) {
    this.root = resolve(root);
  }

  private async directory(pluginId: string): Promise<string> {
    assertId(pluginId);
    try {
      getPlugin(pluginId);
    } catch {
      throw new StoreError(404, 'unknown_plugin', '插件不存在');
    }
    await assertDirectory(this.root);
    const directory = join(this.root, pluginId);
    await assertDirectory(directory);
    return directory;
  }

  async get(pluginId: string, id: string): Promise<PluginDocument> {
    assertId(id);
    const directory = await this.directory(pluginId);
    let file;
    try {
      file = await open(join(directory, `${id}.json`), constants.O_RDONLY | constants.O_NOFOLLOW);
      const info = await file.stat();
      if (!info.isFile() || info.size > MAX_BYTES) {
        throw new StoreError(400, 'invalid_file', '模型文件大小或类型无效');
      }
      const document = JSON.parse(await file.readFile('utf8')) as PluginDocument;
      assertSafeJson(document);
      if (
        document.schemaVersion !== 1 ||
        document.pluginId !== pluginId ||
        document.id !== id ||
        !Number.isSafeInteger(document.revision) ||
        document.revision < 1
      ) {
        throw new StoreError(422, 'invalid_document', '模型文件契约无效');
      }
      return document;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        throw new StoreError(404, 'not_found', '文档不存在');
      }
      if ((error as NodeJS.ErrnoException).code === 'ELOOP') {
        throw new StoreError(400, 'unsafe_file', '模型文件不能是符号链接');
      }
      throw error;
    } finally {
      await file?.close();
    }
  }

  async list(pluginId: string): Promise<PluginDocument[]> {
    const directory = await this.directory(pluginId);
    const names = (await readdir(directory)).filter(name => /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,79}\.json$/.test(name));
    const documents = await Promise.all(names.map(name => this.get(pluginId, name.slice(0, -5))));
    return documents.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  private async locked<T>(directory: string, id: string, action: () => Promise<T>): Promise<T> {
    const lock = join(directory, `${id}.lock`);
    let handle;
    for (let attempt = 0; attempt < 100; attempt += 1) {
      try {
        handle = await open(lock, 'wx', 0o600);
        break;
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
        await delay(20);
      }
    }
    if (!handle) throw new StoreError(423, 'locked', '文档正在写入；遗留锁需人工核对后清理');
    try {
      return await action();
    } finally {
      await handle.close();
      await rm(lock);
    }
  }

  async save(pluginId: string, id: string, input: unknown): Promise<PluginDocument> {
    assertId(id);
    assertSafeJson(input);
    const body = input as Partial<PluginDocument>;
    if (
      !body || body.schemaVersion !== 1 || body.pluginId !== pluginId || body.id !== id ||
      !Number.isSafeInteger(body.revision) || body.revision! < 0 || body.revision! >= Number.MAX_SAFE_INTEGER ||
      typeof body.title !== 'string' || !body.title.trim() || body.title.length > 200
    ) {
      throw new StoreError(400, 'invalid_document', '文档标识、名称或版本无效');
    }
    const directory = await this.directory(pluginId);
    const issues = validateContent(pluginId, body.content);
    if (issues.length) {
      throw new StoreError(422, 'validation_failed', issues.map(issue => `${issue.path}: ${issue.message}`).join('; ').slice(0, 2000));
    }
    if (Buffer.byteLength(JSON.stringify(body)) > MAX_BYTES - 200) {
      throw new StoreError(413, 'too_large', '模型文件超过 2 MiB');
    }
    return this.locked(directory, id, async () => {
      let current: PluginDocument | undefined;
      try {
        current = await this.get(pluginId, id);
      } catch (error) {
        if (!(error instanceof StoreError && error.status === 404)) throw error;
      }
      if ((current?.revision || 0) !== body.revision) {
        // An acknowledged revision can be lost in transit; identical retries are idempotent.
        if (current && current.revision === body.revision! + 1 &&
          current.title === body.title!.trim() && isDeepStrictEqual(current.content, body.content)) {
          return current;
        }
        throw new StoreError(409, 'revision_conflict', '服务器已有新版本，请重新载入后合并；当前修改仍保留');
      }
      const document: PluginDocument = {
        schemaVersion: 1, pluginId, id, title: body.title!.trim(),
        revision: body.revision! + 1, updatedAt: new Date().toISOString(), content: body.content!,
      };
      const serialized = `${JSON.stringify(document, null, 2)}\n`;
      if (Buffer.byteLength(serialized) > MAX_BYTES) {
        throw new StoreError(413, 'too_large', '格式化后的模型文件超过 2 MiB');
      }
      const temporary = join(directory, `.${id}.${randomUUID()}.tmp`);
      const file = await open(temporary, 'wx', 0o600);
      try {
        await file.writeFile(serialized, 'utf8');
        await file.sync();
        await file.close();
        await rename(temporary, join(directory, `${id}.json`));
      } finally {
        await file.close();
        await rm(temporary, { force: true });
      }
      return document;
    });
  }

  async remove(pluginId: string, id: string, revision: number, expectedDigest?: string): Promise<void> {
    assertId(id);
    if (!Number.isSafeInteger(revision) || revision < 1) {
      throw new StoreError(400, 'invalid_revision', '删除需要当前文档版本');
    }
    if (expectedDigest !== undefined && !/^[a-f0-9]{64}$/.test(expectedDigest)) {
      throw new StoreError(400, 'invalid_revision', '删除需要当前文档版本');
    }
    const directory = await this.directory(pluginId);
    await this.locked(directory, id, async () => {
      const current = await this.get(pluginId, id);
      if (current.revision !== revision) {
        throw new StoreError(409, 'revision_conflict', '文档已变更，不能删除旧版本');
      }
      // Numeric revisions can repeat after delete/recreate; compare inside the same lock.
      if (expectedDigest !== undefined &&
        createHash('sha256').update(JSON.stringify(current)).digest('hex') !== expectedDigest) {
        throw new StoreError(409, 'revision_conflict', '文档已变更，不能删除旧版本');
      }
      await rm(join(directory, `${id}.json`));
    });
  }
}
