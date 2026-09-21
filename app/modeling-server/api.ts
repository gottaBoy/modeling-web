import type { IncomingMessage, ServerResponse } from 'node:http';
import { plugins } from '../src/modeling-plugins/registry';
import { MAX_BYTES, PluginStore, StoreError } from './store';

const prefix = '/api/modeling-plugins';

function respond(res: ServerResponse, status: number, value: unknown): void {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(JSON.stringify(value));
}

function checkOrigin(req: IncomingMessage): void {
  const host = req.headers.host || '';
  if (!/^(127\.0\.0\.1|localhost|\[::1\])(:\d+)?$/.test(host)) {
    throw new StoreError(403, 'loopback_only', '此工作区 API 仅允许本机访问');
  }
  if (
    (req.headers.origin && req.headers.origin !== `http://${host}`) ||
    req.headers['sec-fetch-site'] === 'cross-site'
  ) {
    throw new StoreError(403, 'cross_origin', '不允许跨站访问本地工作区');
  }
}

async function jsonBody(req: IncomingMessage): Promise<unknown> {
  if (req.headers['content-type']?.split(';')[0].trim() !== 'application/json') {
    throw new StoreError(415, 'json_required', '请求必须为 application/json');
  }
  const chunks: Buffer[] = [];
  let length = 0;
  for await (const part of req) {
    const chunk = Buffer.isBuffer(part) ? part : Buffer.from(part);
    length += chunk.length;
    if (length <= MAX_BYTES) chunks.push(chunk);
    else chunks.length = 0;
  }
  if (length > MAX_BYTES) throw new StoreError(413, 'too_large', '模型文件超过 2 MiB');
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new StoreError(400, 'invalid_json', '无效的 JSON 请求');
  }
}

export function modelingPluginApi(store: PluginStore) {
  return async (req: IncomingMessage, res: ServerResponse, next: () => void): Promise<void> => {
    const pathname = (req.url || '').split('?')[0];
    if (pathname !== prefix && !pathname.startsWith(`${prefix}/`)) return next();
    try {
      checkOrigin(req);
      if (pathname === `${prefix}/catalog` && req.method === 'GET') {
        respond(res, 200, plugins.map(({ id, title, family, capabilities }) => ({
          id, title, family, capabilities, implementation: 'local-reimplementation',
          persistence: 'local-workspace-files', upstreamIntegration: 'unverified',
          conditionalDelete: 'revision+sha256',
        })));
        return;
      }
      const match = /^\/api\/modeling-plugins\/([a-z0-9_-]+)\/documents(?:\/([a-zA-Z0-9_-]+))?$/.exec(pathname);
      if (!match) throw new StoreError(404, 'not_found', 'API 不存在');
      const [, pluginId, id] = match;
      if (req.method === 'GET') {
        respond(res, 200, id ? await store.get(pluginId, id) : (await store.list(pluginId)).map(({ content: _content, ...summary }) => summary));
      } else if (req.method === 'PUT' && id) {
        respond(res, 200, await store.save(pluginId, id, await jsonBody(req)));
      } else if (req.method === 'DELETE' && id) {
        const revision = req.headers['if-match'];
        if (typeof revision !== 'string' || !/^"[1-9][0-9]*"$/.test(revision)) {
          throw new StoreError(428, 'revision_required', '删除需要 If-Match 版本');
        }
        const digest = req.headers['x-document-sha256'];
        if (digest !== undefined && (typeof digest !== 'string' || !/^[a-f0-9]{64}$/.test(digest))) {
          throw new StoreError(400, 'invalid_revision', '删除需要当前文档版本');
        }
        await store.remove(pluginId, id, Number(revision.slice(1, -1)), digest);
        respond(res, 200, { deleted: true });
      } else {
        res.setHeader('Allow', id ? 'GET, PUT, DELETE' : 'GET');
        throw new StoreError(405, 'method_not_allowed', '不支持此请求方法');
      }
    } catch (error) {
      if (error instanceof StoreError) {
        respond(res, error.status, { error: error.code, message: error.message });
      } else {
        console.error('[modeling-plugins] Storage operation failed:', error instanceof Error ? error.name : 'Error');
        respond(res, 500, { error: 'storage_error', message: '读取或写入本地模型失败，当前修改未保存' });
      }
    }
  };
}
