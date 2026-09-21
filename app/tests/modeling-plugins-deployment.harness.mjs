import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { Readable } from 'node:stream';
import {
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  symlink,
  writeFile,
} from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import test from 'node:test';
import vm from 'node:vm';
import {
  artifactFiles,
  checkArtifact,
  checkConfiguration,
  checkStandalone,
  writePluginManifest,
} from '../scripts/modeling-plugins-deployment.mjs';

const require = createRequire(import.meta.url);
const { build } = createRequire(require.resolve('vite/package.json'))(
  'esbuild',
);
const root = new URL('../', import.meta.url);
const { outputFiles } = await build({
  stdin: {
    contents: `
      export { modelingPluginHandler } from './modeling-server/http';
      export { listenOptions, checkDataDirectory, checkPluginArtifact } from './modeling-server/deployment';
      export { PluginStore } from './modeling-server/store';
      export { plugins } from './src/modeling-plugins/registry';
    `,
    resolveDir: root.pathname,
  },
  platform: 'node',
  bundle: true,
  format: 'cjs',
  write: false,
});
const module = { exports: {} };
vm.runInNewContext(outputFiles[0].text, {
  module,
  exports: module.exports,
  require,
  process,
  Buffer,
  console,
  setTimeout,
  clearTimeout,
});
const {
  modelingPluginHandler,
  listenOptions,
  checkDataDirectory,
  checkPluginArtifact,
  PluginStore,
  plugins,
} = module.exports;

async function fixture(t) {
  const directory = await mkdtemp(
    join(tmpdir(), 'modeling-plugins-deployment-'),
  );
  t.after(() => rm(directory, { recursive: true, force: true }));
  const assets = join(directory, 'assets');
  await mkdir(assets);
  await writeFile(
    join(directory, 'modeling-plugins.html'),
    '<script type="module" src="./assets/app-test.js"></script><link rel="stylesheet" href="./assets/app-test.css">',
  );
  await writeFile(join(directory, 'server.mjs'), 'private-server-code');
  await writeFile(join(assets, 'app-test.js'), 'export const ready = true;');
  await writeFile(join(assets, 'app-test.css'), 'body { color: black; }');
  await writeFile(
    join(assets, 'app-test.js.map'),
    '{"sourcesContent":["private source"]}',
  );
  await writeFile(join(assets, 'font-test.eot'), 'font-data');
  await writeFile(join(directory, 'draft.json'), '{"private":true}');
  await writePluginManifest(directory);
  const store = new PluginStore(join(directory, 'data'));
  const handler = modelingPluginHandler(store, directory, () =>
    checkDataDirectory(store.root),
  );
  return { directory, store, handler };
}

// Exercise the real middleware and file I/O without requiring a TCP or Docker socket.
async function send(
  handler,
  path,
  { method = 'GET', headers = {}, body = '' } = {},
) {
  const req = Object.assign(Readable.from(body ? [Buffer.from(body)] : []), {
    method,
    url: path,
    headers: { host: 'localhost:32003', ...headers },
  });
  const responseHeaders = {};
  let responseBody = '';
  const res = {
    statusCode: 200,
    setHeader(name, value) {
      responseHeaders[name.toLowerCase()] = value;
    },
    writeHead(status) {
      this.statusCode = status;
    },
    end(value = '') {
      responseBody = Buffer.isBuffer(value) ? value.toString() : String(value);
    },
  };
  await handler(req, res);
  return {
    status: res.statusCode,
    headers: responseHeaders,
    text: responseBody,
    json: () => JSON.parse(responseBody),
  };
}

test('deployment configuration parses structurally and only adds the plugin sidecar', async () => {
  assert.deepEqual(await checkConfiguration(), {
    services: ['modeling-plugins'],
    staticPath: '/modeling-plugins/',
    apiPath: '/api/modeling-plugins/',
  });
});

test('listener defaults to loopback and accepts the explicit container bind only via configuration', () => {
  assert.equal(listenOptions({}).host, '127.0.0.1');
  assert.equal(
    listenOptions({ MODELING_PLUGIN_HOST: '0.0.0.0' }).host,
    '0.0.0.0',
  );
  for (const port of ['0', '-1', '65536', '1.5', 'no-port']) {
    assert.throws(() => listenOptions({ MODELING_PLUGIN_PORT: port }));
  }
  assert.throws(() =>
    listenOptions({ MODELING_PLUGIN_HOST: 'https://example.com' }),
  );
});

test('static routes serve GET/HEAD, JavaScript/CSS/font MIME types and cache headers', async t => {
  const { handler } = await fixture(t);
  for (const path of ['/', '/modeling-plugins.html?lang=en']) {
    const response = await send(handler, path);
    assert.equal(response.status, 200);
    assert.equal(response.headers['content-type'], 'text/html; charset=utf-8');
    assert.equal(response.headers['cache-control'], 'no-cache');
  }
  for (const [path, mime] of [
    ['/assets/app-test.js?v=1', 'text/javascript; charset=utf-8'],
    ['/assets/app-test.css', 'text/css; charset=utf-8'],
    ['/assets/font-test.eot', 'application/vnd.ms-fontobject'],
  ]) {
    const get = await send(handler, path);
    const head = await send(handler, path, { method: 'HEAD' });
    assert.equal(get.status, 200);
    assert.equal(head.status, 200);
    assert.equal(head.text, '');
    assert.equal(get.headers['content-type'], mime);
    assert.equal(get.headers['x-content-type-options'], 'nosniff');
    assert.ok(get.headers['cache-control'].startsWith('public,'));
    assert.equal(head.headers['content-type'], mime);
  }
  const post = await send(handler, '/', { method: 'POST' });
  assert.equal(post.status, 405);
  assert.equal(post.headers.allow, 'GET, HEAD');
});

test('server, manifest, source maps, draft JSON, traversal and malformed encodings are never static assets', async t => {
  const { handler } = await fixture(t);
  for (const path of [
    '/server.mjs',
    '/%73erver.mjs',
    '/plugin-manifest.json',
    '/draft.json',
    '/assets/app-test.js.map',
    '/assets/../server.mjs',
    '/assets/%2e%2e/server.mjs',
    '/assets/%2fetc%2fpasswd',
    '/assets/../../draft.json',
    '/../server.mjs',
    '/assets/app-test.js/anything',
    '/assets/',
    '/unknown',
    '/%ZZ',
    '/%00',
  ]) {
    const response = await send(handler, path);
    assert.equal(response.status, 404, path);
    assert.equal(response.text, '', path);
  }
});

test('symlinks cannot publish the server or files outside the artifact', async t => {
  const { directory, handler } = await fixture(t);
  await symlink(
    join(directory, 'server.mjs'),
    join(directory, 'assets/internal.js'),
  );
  const external = join(directory, 'external.js');
  await writeFile(external, 'private');
  await symlink(external, join(directory, 'assets/external.js'));
  for (const path of ['/assets/internal.js', '/assets/external.js']) {
    assert.equal((await send(handler, path)).status, 404);
  }
});

test('the unchanged API policy keeps loopback Host including the external port and rejects cross-site requests', async t => {
  const { handler } = await fixture(t);
  for (const host of ['localhost:32003', '127.0.0.1:32003', '[::1]:32003']) {
    const response = await send(handler, '/api/modeling-plugins/catalog', {
      headers: { host, origin: `http://${host}` },
    });
    assert.equal(response.status, 200, host);
    assert.equal(response.json().length, 23);
    assert.ok(
      response.json().every(item => item.upstreamIntegration === 'unverified'),
    );
  }
  for (const headers of [
    { host: 'modeling.example.com', origin: 'https://modeling.example.com' },
    { host: '127.0.0.1:32003', origin: 'http://127.0.0.1' },
    { host: 'localhost:32003', origin: 'https://untrusted.invalid' },
    { host: 'localhost:32003', origin: 'null' },
    { host: 'localhost:32003', 'sec-fetch-site': 'cross-site' },
    { host: 'modeling-plugins:4175', 'x-forwarded-host': 'localhost:32003' },
  ]) {
    assert.equal(
      (await send(handler, '/api/modeling-plugins/catalog', { headers }))
        .status,
      403,
    );
  }
  assert.equal(
    (await send(handler, '/api/modeling-plugins-missing/catalog')).status,
    404,
  );
});

for (const plugin of plugins) {
  test(`${plugin.id}: deployed handler preserves CRUD, revisions and restart persistence`, async t => {
    const { directory, handler, store } = await fixture(t);
    const path = `/api/modeling-plugins/${plugin.id}/documents/deployment-test`;
    const input = {
      schemaVersion: 1,
      id: 'deployment-test',
      pluginId: plugin.id,
      title: 'Deployment draft',
      revision: 0,
      updatedAt: '',
      content: plugin.create(),
    };
    const headers = {
      origin: 'http://localhost:32003',
      'content-type': 'application/json',
    };
    const saved = await send(handler, path, {
      method: 'PUT',
      headers,
      body: JSON.stringify(input),
    });
    assert.equal(saved.status, 200);
    assert.equal(saved.json().revision, 1);
    const restarted = modelingPluginHandler(
      new PluginStore(store.root),
      directory,
      async () => {},
    );
    assert.deepEqual((await send(restarted, path)).json(), saved.json());
    const updated = await send(restarted, path, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ ...saved.json(), title: 'Changed draft' }),
    });
    assert.equal(updated.status, 200);
    assert.equal(updated.json().revision, 2);
    assert.equal((await send(handler, path, { method: 'DELETE' })).status, 428);
    assert.equal(
      (
        await send(handler, path, {
          method: 'DELETE',
          headers: { 'if-match': '"1"' },
        })
      ).status,
      409,
    );
    assert.equal(
      (
        await send(handler, path, {
          method: 'DELETE',
          headers: { 'if-match': '"2"' },
        })
      ).status,
      200,
    );
    assert.equal((await send(handler, path)).status, 404);
  });
}

test('readiness reflects an unavailable data directory without leaking paths', async t => {
  const { directory, handler, store } = await fixture(t);
  const ready = await send(handler, '/healthz');
  assert.equal(ready.status, 200);
  assert.equal(ready.headers['cache-control'], 'no-store');
  assert.deepEqual(ready.json(), { status: 'ok' });
  assert.equal((await send(handler, '/healthz', { method: 'HEAD' })).text, '');
  assert.equal(
    (await send(handler, '/healthz', { method: 'PUT' })).status,
    405,
  );
  const unavailable = modelingPluginHandler(store, directory, async () => {
    throw new Error(directory);
  });
  const response = await send(unavailable, '/healthz');
  assert.equal(response.status, 503);
  assert.deepEqual(response.json(), { status: 'unavailable' });
  await symlink(directory, join(directory, 'unsafe-data'));
  await assert.rejects(checkDataDirectory(join(directory, 'unsafe-data')));
});

test('artifact checks reject mismatched client/server files and catalog entries', async t => {
  const { directory } = await fixture(t);
  const manifest = await checkArtifact(directory);
  await checkPluginArtifact(directory);
  assert.equal(manifest.plugins.length, 23);
  assert.ok(
    !(await artifactFiles(directory)).some(name => name.endsWith('.map')),
  );
  await writeFile(join(directory, 'assets/app-test.js'), 'changed');
  await assert.rejects(checkArtifact(directory), /Checksum mismatch/);
  await assert.rejects(checkPluginArtifact(directory), /checksum mismatch/);
  await writePluginManifest(directory);
  const path = join(directory, 'plugin-manifest.json');
  const invalid = JSON.parse(await readFile(path, 'utf8'));
  invalid.plugins.pop();
  await writeFile(path, JSON.stringify(invalid));
  await assert.rejects(checkPluginArtifact(directory), /Invalid 23-plugin/);
});

test('actual production artifact includes all 23 plugins and passes socket-free server startup', async () => {
  const manifest = await checkArtifact();
  assert.equal(manifest.plugins.length, 23);
  assert.ok(Object.keys(manifest.files).length > 5);
  await checkStandalone();
});
