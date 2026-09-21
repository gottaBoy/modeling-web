#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join, relative, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = resolve(appRoot, '../..');
const require = createRequire(import.meta.url);
const artifactRoot = join(appRoot, 'dist-modeling-plugins');
const catalogPath = join(appRoot, 'src/modeling-plugins/catalog.json');
const nginxPath = join(workspaceRoot, 'modelingweb/nginx-local.conf');
const composePath = join(
  workspaceRoot,
  'plm/deploy/compose/docker-compose-dev.yml',
);
const localComposePath = join(
  workspaceRoot,
  'plm/deploy/compose/docker-compose-modeling-local.yml',
);
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');

export async function artifactFiles(root) {
  const assets = await readdir(join(root, 'assets'), { withFileTypes: true });
  assert.ok(assets.length > 0, 'No client assets; run pnpm build:plugins');
  for (const entry of assets) {
    assert.ok(
      entry.isFile() && /^[a-zA-Z0-9_.-]+$/.test(entry.name),
      `Unsafe asset: ${entry.name}`,
    );
  }
  return [
    'modeling-plugins.html',
    'server.mjs',
    ...assets
      .filter(entry => !entry.name.endsWith('.map'))
      .map(entry => `assets/${entry.name}`),
  ].sort();
}

export async function writePluginManifest(root = artifactRoot) {
  const catalog = JSON.parse(await readFile(catalogPath, 'utf8'));
  assert.equal(catalog.length, 23);
  assert.equal(new Set(catalog.map(item => item.id)).size, 23);
  const files = {};
  for (const name of await artifactFiles(root)) {
    files[name] = sha256(await readFile(join(root, name)));
  }
  const manifest = {
    schemaVersion: 1,
    implementation: 'local-reimplementation',
    plugins: catalog.map(({ id, family }) => ({ id, family })),
    files,
  };
  await writeFile(
    join(root, 'plugin-manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
}

export function locationBlock(source, name) {
  const start = source.indexOf(`    location ${name} {`);
  assert.ok(start >= 0, `Missing Nginx location: ${name}`);
  const end = source.indexOf('\n    }', start);
  assert.ok(end > start, `Unclosed Nginx location: ${name}`);
  return source.slice(start, end);
}

export async function checkConfiguration() {
  // Reuse the YAML parser already installed by this app's ESLint dependency.
  const { load } = createRequire(require.resolve('eslint/package.json'))(
    'js-yaml',
  );
  const compose = load(await readFile(composePath, 'utf8'));
  const localCompose = load(await readFile(localComposePath, 'utf8'));
  const sidecar = compose.services['modeling-plugins'];
  const modelingWeb = compose.services.modelingweb;
  assert.ok(sidecar, 'Missing sidecar service');
  assert.deepEqual(modelingWeb.depends_on['modeling-plugins'], {
    condition: 'service_healthy',
  });
  assert.deepEqual(sidecar.profiles, ['modeling']);
  assert.equal(resolve(dirname(composePath), sidecar.build.context), appRoot);
  assert.equal(sidecar.build.dockerfile, 'Dockerfile.modeling-plugins');
  assert.deepEqual(sidecar.expose, ['4175']);
  assert.ok(
    !sidecar.ports && !sidecar.depends_on,
    'Sidecar must not publish a port or start platform services',
  );
  assert.deepEqual(sidecar.networks, ['agent_network']);
  assert.ok(sidecar.environment.includes('MODELING_PLUGIN_DATA=/data'));
  assert.ok(sidecar.environment.includes('MODELING_PLUGIN_HOST=0.0.0.0'));
  assert.deepEqual(sidecar.volumes, ['modeling_plugins_data:/data']);
  assert.deepEqual(localCompose.services.modelingweb.environment, [
    'LOCAL_DIST_SOURCE=/opt/aibiz/local-dist',
  ]);
  assert.deepEqual(localCompose.services.modelingweb.volumes, [
    '../../../modelingweb/app/dist:/opt/aibiz/local-dist:ro',
  ]);
  assert.ok(compose.volumes.modeling_plugins_data);
  assert.equal(sidecar.read_only, true);
  assert.deepEqual(sidecar.cap_drop, ['ALL']);
  assert.deepEqual(sidecar.healthcheck.test.slice(0, 3), ['CMD', 'node', '-e']);
  assert.equal(typeof sidecar.healthcheck.test[3], 'string');
  assert.ok(sidecar.healthcheck.test[3].includes('/healthz'));
  assert.match(
    sidecar.healthcheck.test[3],
    /^fetch\('http:\/\/127\.0\.0\.1:4175\/healthz'/,
  );

  const nginx = await readFile(nginxPath, 'utf8');
  assert.ok(
    nginx.includes(
      'set $modeling_plugins_upstream http://modeling-plugins:4175;',
    ),
  );
  const staticRoute = locationBlock(nginx, '^~ /modeling-plugins/');
  const apiRoute = locationBlock(nginx, '^~ /api/modeling-plugins/');
  assert.ok(
    staticRoute.includes('rewrite ^/modeling-plugins/(.*)$ /$1 break;'),
  );
  for (const route of [staticRoute, apiRoute]) {
    assert.ok(
      route.includes('proxy_pass $modeling_plugins_upstream;'),
      'Variable proxy_pass must not replace the URI with "/"',
    );
    assert.match(route, /proxy_set_header Host\s+\$http_host;/);
    assert.doesNotMatch(
      route,
      /proxy_set_header\s+(?:Origin|Sec-Fetch-Site)\s/i,
      'Do not bypass origin protection',
    );
    assert.doesNotMatch(
      route,
      /alias\s/,
      'Plugin server must not be exposed by an unrestricted alias',
    );
  }
  assert.doesNotMatch(apiRoute, /\brewrite\b/);
  assert.ok(apiRoute.includes('client_max_body_size 2m;'));
  assert.ok(
    locationBlock(nginx, '= /modeling-plugins/server.mjs').includes(
      'return 404;',
    ),
  );
  assert.ok(
    locationBlock(nginx, '= /modeling-plugins/plugin-manifest.json').includes(
      'return 404;',
    ),
  );
  assert.ok(
    locationBlock(nginx, '= /api/modeling-plugins').includes('return 404;'),
  );
  assert.ok(
    locationBlock(nginx, '= /modeling-plugins').includes('$is_args$args'),
  );
  assert.ok(
    nginx.indexOf('location ^~ /api/modeling-plugins/') <
      nginx.indexOf('location /api/'),
  );

  const dockerfile = await readFile(
    join(appRoot, 'Dockerfile.modeling-plugins'),
    'utf8',
  );
  assert.ok(dockerfile.includes('COPY dist-modeling-plugins /app/dist'));
  assert.ok(dockerfile.includes('USER node'));
  assert.ok(dockerfile.includes('chown -R node:node /data'));
  assert.ok(dockerfile.includes('RUN node /app/dist/server.mjs --check'));
  assert.ok(dockerfile.includes('CMD ["node", "/app/dist/server.mjs"]'));
  assert.doesNotMatch(
    dockerfile,
    /\b(?:pnpm|npm) install\b/,
    'Runtime image must consume the verified artifact without reinstalling dependencies',
  );
  const ignore = await readFile(
    join(appRoot, 'Dockerfile.modeling-plugins.dockerignore'),
    'utf8',
  );
  assert.ok(ignore.startsWith('**\n'));
  assert.ok(ignore.includes('dist-modeling-plugins/assets/*.map'));
  const startScript = await readFile(join(workspaceRoot, 'modelingweb/start.sh'), 'utf8');
  assert.match(startScript, /LOCAL_DIST_SOURCE/);
  assert.match(startScript, /cp -a "\$LOCAL_DIST_SOURCE"\/\. \/dist\//);
  return {
    services: ['modeling-plugins'],
    staticPath: '/modeling-plugins/',
    apiPath: '/api/modeling-plugins/',
  };
}

export async function checkArtifact(root = artifactRoot) {
  const catalog = JSON.parse(await readFile(catalogPath, 'utf8'));
  const manifest = JSON.parse(
    await readFile(join(root, 'plugin-manifest.json'), 'utf8'),
  );
  assert.equal(catalog.length, 23);
  assert.equal(new Set(catalog.map(item => item.id)).size, 23);
  assert.equal(manifest.schemaVersion, 1);
  assert.equal(manifest.implementation, 'local-reimplementation');
  assert.deepEqual(
    manifest.plugins,
    catalog.map(({ id, family }) => ({ id, family })),
  );
  assert.deepEqual(
    Object.keys(manifest.files).sort(),
    await artifactFiles(root),
    'Manifest does not cover the artifact exactly',
  );
  for (const [name, digest] of Object.entries(manifest.files)) {
    assert.equal(
      sha256(await readFile(join(root, name))),
      digest,
      `Checksum mismatch: ${name}`,
    );
  }

  const html = await readFile(join(root, 'modeling-plugins.html'), 'utf8');
  const urls = [];
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/gu))
    urls.push(match[1]);
  const assets = urls.filter(url => !url.startsWith('data:'));
  assert.ok(
    assets.some(url => url.endsWith('.js')),
    'Missing client entry script',
  );
  assert.ok(
    assets.some(url => url.endsWith('.css')),
    'Missing client stylesheet',
  );
  for (const url of assets) {
    assert.match(url, /^\.\/assets\/[a-zA-Z0-9_.-]+$/);
    assert.ok(manifest.files[url.slice(2)], `Missing HTML dependency: ${url}`);
  }
  return manifest;
}

export async function checkStandalone(root = artifactRoot) {
  const data = await mkdtemp(join(tmpdir(), 'modeling-plugins-startup-'));
  try {
    const child = spawnSync(
      process.execPath,
      [join(root, 'server.mjs'), '--check'],
      {
        cwd: root,
        env: {
          ...process.env,
          MODELING_PLUGIN_HOST: '127.0.0.1',
          MODELING_PLUGIN_DATA: data,
        },
        encoding: 'utf8',
        timeout: 30000,
      },
    );
    assert.equal(child.status, 0, child.stderr || child.error?.message);
    assert.match(child.stdout, /ready \(23 plugins\)/);
  } finally {
    await rm(data, { recursive: true, force: true });
  }
}

export async function checkLive(origin, manifest, {
  assetPrefix = '/modeling-plugins/',
  fetchImpl = fetch,
} = {}) {
  const base = new URL(origin);
  assert.ok(
    ['http:', 'https:'].includes(base.protocol) &&
      !base.username &&
      !base.password,
  );
  assert.equal(
    base.pathname,
    '/',
    'MODELING_PLUGINS_URL must be an origin, not a subpath',
  );
  assert.ok(['/', '/modeling-plugins/'].includes(assetPrefix), 'Unexpected asset prefix');
  const fetchPath = path =>
    fetchImpl(new URL(path, base), { signal: AbortSignal.timeout(10000), redirect: 'error' });
  const catalogResponse = await fetchPath('/api/modeling-plugins/catalog');
  assert.equal(catalogResponse.status, 200);
  const catalog = await catalogResponse.json();
  assert.deepEqual(
    catalog.map(({ id, family }) => ({ id, family })),
    manifest.plugins,
  );
  for (const [name, digest] of Object.entries(manifest.files)) {
    if (name === 'server.mjs') continue;
    const response = await fetchPath(`${assetPrefix}${name}`);
    assert.equal(response.status, 200, name);
    assert.equal(
      sha256(Buffer.from(await response.arrayBuffer())),
      digest,
      name,
    );
  }
  assert.equal((await fetchPath(`${assetPrefix}server.mjs`)).status, 404);
  assert.equal(
    (await fetchPath(`${assetPrefix}plugin-manifest.json`)).status,
    404,
  );
  const crossOrigin = await fetchImpl(
    new URL('/api/modeling-plugins/catalog', base),
    {
      headers: { Origin: 'https://untrusted.invalid' },
      signal: AbortSignal.timeout(10000),
      redirect: 'error',
    },
  );
  assert.equal(crossOrigin.status, 403);
}

async function main() {
  await checkConfiguration();
  console.log(
    'PASS Compose/Nginx/Dockerfile plugin configuration (no Docker socket)',
  );
  const manifest = await checkArtifact();
  console.log(
    `PASS 23-plugin catalog, HTML dependencies and ${Object.keys(manifest.files).length} artifact checksums`,
  );
  await checkStandalone();
  console.log(
    'PASS bundled server startup and writable draft directory (no TCP listener)',
  );
  if (process.env.MODELING_PLUGINS_URL) {
    await checkLive(process.env.MODELING_PLUGINS_URL, manifest);
    console.log(
      'PASS live proxy, catalog, asset checksums and origin protection',
    );
  } else {
    console.log('SKIP live proxy: set MODELING_PLUGINS_URL after deployment');
  }
  console.log(`Artifact: ${relative(workspaceRoot, artifactRoot)}`);
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    await main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
