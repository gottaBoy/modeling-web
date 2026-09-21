import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mkdtemp, readdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { Readable } from 'node:stream';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { plugins, validateContent } from '../src/modeling-plugins/registry';
import { modelingPluginApi } from '../modeling-server/api';
import { MAX_BYTES, PluginStore } from '../modeling-server/store';
import type { PluginDocument } from '../src/modeling-plugins/types';
import { jsonSafetyProblem } from '../src/modeling-plugins/document-safety';

let directory: string;
let store: PluginStore;

beforeEach(async () => {
  directory = await mkdtemp(join(tmpdir(), 'modeling-plugin-store-'));
  store = new PluginStore(join(directory, 'documents'));
});
afterEach(async () => {
  await rm(directory, { recursive: true, force: true });
});

function draft(id = 'logicdesign', documentId = 'test-document'): PluginDocument {
  const definition = plugins.find(plugin => plugin.id === id)!;
  return {
    schemaVersion: 1, id: documentId, pluginId: id, title: definition.title,
    revision: 0, updatedAt: '', content: definition.create(),
  };
}

function api() {
  const middleware = modelingPluginApi(store);
  const base = 'http://127.0.0.1:4175/api/modeling-plugins';
  // This fixture exercises middleware and file I/O, not TCP or browser transport.
  const send = async (url: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers);
    if (!headers.has('host')) headers.set('host', '127.0.0.1:4175');
    const stream = Readable.from(options.body ? [Buffer.from(String(options.body))] : []);
    const req = Object.assign(stream, {
      method: options.method || 'GET', url: new URL(url).pathname,
      headers: Object.fromEntries(headers.entries()),
    }) as unknown as IncomingMessage;
    let body = '';
    const res = {
      statusCode: 200,
      setHeader() {},
      end(value = '') { body = String(value); },
    } as unknown as ServerResponse;
    await middleware(req, res, () => { res.statusCode = 404; res.end(); });
    return { status: res.statusCode, json: async () => JSON.parse(body) };
  };
  return { base, send };
}

describe('complete local implementation registry', () => {
  it('has exactly 23 unique implementations and validates every default', () => {
    expect(plugins).toHaveLength(23);
    expect(new Set(plugins.map(plugin => plugin.id)).size).toBe(23);
    for (const plugin of plugins) {
      expect(plugin.capabilities.length).toBeGreaterThan(0);
      expect(validateContent(plugin.id, plugin.create()), plugin.id).toEqual([]);
      expect(validateContent(plugin.id, null).length).toBeGreaterThan(0);
    }
  });
});

describe('file-backed local model store', () => {
  it('round-trips all 23 plugins across new store instances and deletes with revision checks', async () => {
    for (const plugin of plugins) {
      const input = draft(plugin.id);
      const saved = await store.save(plugin.id, input.id, input);
      expect(saved.revision).toBe(1);
      expect(saved.content).toEqual(input.content);
      expect(await new PluginStore(store.root).get(plugin.id, input.id)).toEqual(saved);
      expect(await store.list(plugin.id)).toHaveLength(1);
      const changed = await store.save(plugin.id, input.id, { ...saved, title: '修改后的模型' });
      expect(changed.revision).toBe(2);
      await expect(store.remove(plugin.id, input.id, 1)).rejects.toMatchObject({ status: 409 });
      await store.remove(plugin.id, input.id, 2);
      expect(await store.list(plugin.id)).toEqual([]);
    }
  });

  it('serializes concurrent writers without silently dropping an update', async () => {
    const input = draft();
    const saved = await store.save(input.pluginId, input.id, input);
    const attempts = await Promise.allSettled(Array.from({ length: 6 }, (_, index) =>
      new PluginStore(store.root).save(input.pluginId, input.id, { ...saved, title: `write-${index}` })));
    expect(attempts.filter(result => result.status === 'fulfilled')).toHaveLength(1);
    const failures = attempts.filter(result => result.status === 'rejected') as PromiseRejectedResult[];
    expect(failures).toHaveLength(5);
    expect(failures.every(result => result.reason.status === 409)).toBe(true);
    expect((await store.get(input.pluginId, input.id)).revision).toBe(2);
    expect((await readdir(join(store.root, input.pluginId))).filter(name => name.endsWith('.lock') || name.endsWith('.tmp'))).toEqual([]);
  });

  it('returns the same revision for an identical retry after a lost response', async () => {
    const input = draft();
    const first = await store.save(input.pluginId, input.id, input);
    expect(await store.save(input.pluginId, input.id, input)).toEqual(first);
    const update = { ...first, title: 'Updated' };
    const second = await store.save(input.pluginId, input.id, update);
    expect(await store.save(input.pluginId, input.id, update)).toEqual(second);
    await expect(store.save(input.pluginId, input.id, { ...first, title: 'Another update' })).rejects.toMatchObject({ status: 409 });
  });

  it('digest-checked deletion protects a same-ID document recreated at the same numeric revision', async () => {
    const input = draft();
    const first = await store.save(input.pluginId, input.id, input);
    const digest = createHash('sha256').update(JSON.stringify(first)).digest('hex');
    await store.remove(input.pluginId, input.id, 1);
    const replacement = await store.save(input.pluginId, input.id, { ...input, title: 'User replacement' });
    expect(replacement.revision).toBe(first.revision);
    await expect(store.remove(input.pluginId, input.id, 1, digest)).rejects.toMatchObject({ status: 409 });
    expect(await store.get(input.pluginId, input.id)).toEqual(replacement);
    await expect(store.remove(input.pluginId, input.id, 1, 'invalid')).rejects.toMatchObject({ status: 400 });
    await store.remove(input.pluginId, input.id, 1,
      createHash('sha256').update(JSON.stringify(replacement)).digest('hex'));
    await expect(store.get(input.pluginId, input.id)).rejects.toMatchObject({ status: 404 });
  });

  it('checks the actual serialized file size without replacing the previous readable revision', async () => {
    const input = draft();
    const first = await store.save(input.pluginId, input.id, input);
    const large = { ...first, content: { ...first.content, extra: Array.from({ length: 90000 }, () => ({ a: 1 })) } };
    expect(Buffer.byteLength(JSON.stringify(large))).toBeLessThan(MAX_BYTES);
    expect(Buffer.byteLength(JSON.stringify(large, null, 2))).toBeGreaterThan(MAX_BYTES);
    await expect(store.save(input.pluginId, input.id, large)).rejects.toMatchObject({ status: 413 });
    expect(await store.get(input.pluginId, input.id)).toEqual(first);
    expect(await store.list(input.pluginId)).toHaveLength(1);
  });

  it('shares import and storage safety rules', () => {
    expect(jsonSafetyProblem({ password: 'test-only' })?.code).toBe('secret_field');
    expect(jsonSafetyProblem(JSON.parse('{"nested":{"__proto__":{}}}'))?.code).toBe('unsafe_key');
    expect(jsonSafetyProblem(JSON.parse('{"number":1e400}'))?.code).toBe('invalid_number');
    expect(jsonSafetyProblem(draft())).toBeUndefined();
  });

  it('rejects malformed models, wrong identities, secrets, dangerous keys and oversized input', async () => {
    const input = draft();
    for (const patch of [
      { schemaVersion: 2 }, { pluginId: 'formdesign' }, { revision: -1 }, { title: '' },
      { content: [] }, { content: null }, { content: {} },
    ]) {
      await expect(store.save(input.pluginId, input.id, { ...input, ...patch })).rejects.toBeDefined();
    }
    for (const content of [
      { ...input.content, api_key: 'test-only' },
      JSON.parse('{"__proto__":{"polluted":true}}'),
      { ...input.content, large: 'x'.repeat(MAX_BYTES) },
    ]) {
      await expect(store.save(input.pluginId, input.id, { ...input, content })).rejects.toBeDefined();
    }
    expect(({} as { polluted?: boolean }).polluted).toBeUndefined();
    expect(await store.list(input.pluginId)).toEqual([]);
  });

  it('rejects traversal, unknown plugin IDs and symbolic file escapes', async () => {
    const input = draft();
    await expect(store.get('../logicdesign', 'test')).rejects.toMatchObject({ status: 400 });
    await expect(store.get(input.pluginId, '../../outside')).rejects.toMatchObject({ status: 400 });
    await expect(store.list('unknown')).rejects.toMatchObject({ status: 404 });
    await store.list(input.pluginId);
    const external = join(directory, 'outside.json');
    await writeFile(external, JSON.stringify(input));
    await symlink(external, join(store.root, input.pluginId, `${input.id}.json`));
    await expect(store.get(input.pluginId, input.id)).rejects.toMatchObject({ status: 400 });
    await expect(store.save(input.pluginId, input.id, input)).rejects.toBeDefined();
    expect(JSON.parse(await readFile(external, 'utf8'))).toEqual(input);
  });
});

describe('in-process API middleware contracts (no HTTP transport)', () => {
  it('advertises and enforces content digest preconditions on DELETE', async () => {
    const { base, send } = api();
    const catalog = await (await send(`${base}/catalog`)).json();
    expect(catalog.every((item: { conditionalDelete: string }) => item.conditionalDelete === 'revision+sha256')).toBe(true);
    const input = draft();
    const saved = await store.save(input.pluginId, input.id, input);
    const url = `${base}/${input.pluginId}/documents/${input.id}`;
    expect((await send(url, { method: 'DELETE', headers: { 'If-Match': '"1"', 'X-Document-SHA256': 'invalid' } })).status).toBe(400);
    expect((await send(url, { method: 'DELETE', headers: { 'If-Match': '"1"', 'X-Document-SHA256': '0'.repeat(64) } })).status).toBe(409);
    expect(await store.get(input.pluginId, input.id)).toEqual(saved);
    const digest = createHash('sha256').update(JSON.stringify(saved)).digest('hex');
    expect((await send(url, { method: 'DELETE', headers: { 'If-Match': '"1"', 'X-Document-SHA256': digest } })).status).toBe(200);
  });

  it('serves the truthful catalog and CRUD lifecycle', async () => {
    const { base, send } = api();
    const catalog = await (await send(`${base}/catalog`)).json();
    expect(catalog).toHaveLength(23);
    expect(catalog.every((item: { upstreamIntegration: string }) => item.upstreamIntegration === 'unverified')).toBe(true);
    const input = draft();
    const url = `${base}/${input.pluginId}/documents/${input.id}`;
    const saved = await send(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) });
    expect(saved.status).toBe(200);
    expect((await (await send(url)).json()).revision).toBe(1);
    expect((await send(url, { method: 'DELETE' })).status).toBe(428);
    expect((await send(url, { method: 'DELETE', headers: { 'If-Match': '"1"' } })).status).toBe(200);
    expect((await send(url)).status).toBe(404);
  });

  it('rejects cross-origin access, foreign hosts, invalid JSON, content types, and large bodies', async () => {
    const { base, send } = api();
    const url = `${base}/logicdesign/documents/test-document`;
    expect((await send(`${base}/catalog`, { headers: { Origin: 'https://untrusted.invalid' } })).status).toBe(403);
    expect((await send(`${base}/catalog`, { headers: { Host: 'untrusted.invalid' } })).status).toBe(403);
    expect((await send(url, { method: 'PUT', body: '{}' })).status).toBe(415);
    expect((await send(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: '{' })).status).toBe(400);
    expect((await send(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: 'x'.repeat(MAX_BYTES) }) })).status).toBe(413);
    expect((await send(url, { method: 'POST' })).status).toBe(405);
  });
});
