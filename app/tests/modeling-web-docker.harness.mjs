#!/usr/bin/env node
import {
  access,
  chmod,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import { constants } from 'node:fs';
import { execFile as execFileCallback } from 'node:child_process';
import { promisify } from 'node:util';
import { dirname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';

const execFile = promisify(execFileCallback);
const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = resolve(appRoot, '..');
const distRoot = join(appRoot, 'dist');
const dockerfilePath = join(repoRoot, 'Dockerfile.modelingweb');
const dockerignorePath = join(repoRoot, 'Dockerfile.modelingweb.dockerignore');
const nginxPath = join(repoRoot, 'nginx-local.conf');
const startPath = join(repoRoot, 'start.sh');
const environmentPath = join(repoRoot, 'environment.config');
const buildScriptPath = join(repoRoot, 'scripts/build-modeling-web-image.sh');

const checks = [];

function pass(message) {
  checks.push(true);
  console.log(`[modeling-web-docker] OK: ${message}`);
}

function fail(message) {
  checks.push(false);
  console.error(`[modeling-web-docker] FAIL: ${message}`);
}

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function text(path, label) {
  if (!(await exists(path))) {
    fail(`${label} is missing: ${path}`);
    return '';
  }
  return readFile(path, 'utf8');
}

function requireText(source, marker, label) {
  if (source.includes(marker)) {
    pass(`${label} contains ${marker}`);
  } else {
    fail(`${label} is missing ${marker}`);
  }
}

async function run(command, args, { allowFailure = false } = {}) {
  try {
    return await execFile(command, args, {
      cwd: repoRoot,
      maxBuffer: 1024 * 1024,
    });
  } catch (error) {
    if (allowFailure) return { stdout: '', stderr: error.stderr ?? '' };
    const detail = [error.stdout, error.stderr, error.message]
      .filter(Boolean)
      .join('\n')
      .trim();
    throw new Error(`${command} ${args.join(' ')} failed\n${detail}`);
  }
}

function parseArgs(argv) {
  let image = null;
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--image') {
      image = argv[++index];
      if (!image) throw new Error('--image requires an image reference');
    } else if (value === '--help' || value === '-h') {
      console.log(
        'Usage: node app/tests/modeling-web-docker.harness.mjs [--image IMAGE]',
      );
      process.exit(0);
    } else {
      throw new Error(`Unknown option: ${value}`);
    }
  }
  return { image };
}

async function verifyStaticContract() {
  const dockerfile = await text(dockerfilePath, 'Dockerfile.modelingweb');
  requireText(
    dockerfile,
    'ARG NGINX_IMAGE=nginxinc/nginx-unprivileged:alpine',
    'Dockerfile.modelingweb',
  );
  requireText(
    dockerfile,
    'COPY nginx-local.conf /etc/nginx/conf.d/nginx.conf',
    'Dockerfile.modelingweb',
  );
  requireText(
    dockerfile,
    'COPY --chown=101:101 app/dist/ /dist/',
    'Dockerfile.modelingweb',
  );
  requireText(dockerfile, 'COPY start.sh /start.sh', 'Dockerfile.modelingweb');
  requireText(
    dockerfile,
    'COPY environment.config /environment.config',
    'Dockerfile.modelingweb',
  );
  requireText(dockerfile, 'EXPOSE 8080', 'Dockerfile.modelingweb');
  requireText(
    dockerfile,
    'HEALTHCHECK --interval=10s --timeout=5s --start-period=15s --retries=6',
    'Dockerfile.modelingweb',
  );
  requireText(
    dockerfile,
    'http://127.0.0.1:8080/modeldesign/',
    'Dockerfile.modelingweb',
  );
  requireText(dockerfile, 'USER 101', 'Dockerfile.modelingweb');
  requireText(dockerfile, 'ENTRYPOINT ["/start.sh"]', 'Dockerfile.modelingweb');
  if (/\b(?:runner|modeling-plugins)\b/i.test(dockerfile)) {
    fail('Dockerfile.modelingweb must not package the remote runner or plugin sidecar');
  } else {
    pass('Dockerfile.modelingweb is scoped to the main Web static image');
  }

  const dockerignore = await text(
    dockerignorePath,
    'Dockerfile.modelingweb.dockerignore',
  );
  requireText(
    dockerignore,
    '!app/dist/**',
    'Dockerfile.modelingweb.dockerignore',
  );
  requireText(
    dockerignore,
    '!Dockerfile.modelingweb',
    'Dockerfile.modelingweb.dockerignore',
  );

  for (const relativePath of [
    'index.html',
    'doc/index.html',
    'doc/README.md',
    'doc/script/docsify.js',
    'environments/environment.js',
  ]) {
    if (await exists(join(distRoot, relativePath))) {
      pass(`app/dist/${relativePath} is present`);
    } else {
      fail(`app/dist/${relativePath} is required for the image`);
    }
  }

  const nginx = await text(nginxPath, 'nginx-local.conf');
  requireText(nginx, 'listen       8080;', 'nginx-local.conf');
  requireText(nginx, 'location /modeldesign/ {', 'nginx-local.conf');
  requireText(nginx, 'alias  /dist/;', 'nginx-local.conf');
  requireText(nginx, 'index  index.html index.htm;', 'nginx-local.conf');
  requireText(
    dockerfile,
    'proxy_temp_path /tmp/nginx-proxy-temp 1 2;',
    'Dockerfile.modelingweb',
  );
  requireText(
    dockerfile,
    'chown -R 101:101 /var/cache/nginx /var/log/nginx',
    'Dockerfile.modelingweb',
  );
  requireText(dockerfile, 'chmod -R u+rwX /dist', 'Dockerfile.modelingweb');
  for (const tempDirectory of [
    '/var/cache/nginx/client_temp',
    '/var/cache/nginx/proxy_temp',
    '/var/cache/nginx/fastcgi_temp',
    '/var/cache/nginx/uwsgi_temp',
    '/var/cache/nginx/scgi_temp',
  ]) {
    requireText(dockerfile, tempDirectory, 'Dockerfile.modelingweb');
  }

  const start = await text(startPath, 'start.sh');
  requireText(start, 'LOCAL_DIST_SOURCE', 'start.sh');
  requireText(start, '/dist/environments/environment.js', 'start.sh');
  requireText(start, 'nginx -g "daemon off;"', 'start.sh');

  const environment = await text(environmentPath, 'environment.config');
  requireText(environment, 'appId:BASEURL', 'environment.config');
  requireText(environment, 'mockDcSystemId:MOCKDCSYSTEMID', 'environment.config');

  const buildScript = await text(buildScriptPath, 'build-modeling-web-image.sh');
  const sourceBuildMarker = buildScript.indexOf(
    'if [[ "$MODE" == "source-build" ]]; then',
  );
  const corepackCheck = buildScript.indexOf('command -v corepack');
  if (sourceBuildMarker >= 0 && corepackCheck > sourceBuildMarker) {
    pass('dist-only image builds do not require Corepack');
  } else {
    fail('Corepack must only be required inside the source-build branch');
  }

  if (checks.every(Boolean)) {
    pass('static local Web image contract is complete');
  }
}

async function verifyStartupInjection() {
  const start = await readFile(startPath, 'utf8');
  const environment = await readFile(environmentPath, 'utf8');
  const specialValue = [
    `single' double" backslash\\ ampersand& delimiter# dollar$ semicolon;`,
    `'); window.injected = true; //`,
    'line two\r\ttab\bbackspace\fform-feed',
    String.fromCharCode(1, 11, 31),
    'unicode: \u4e2d\u6587\u2028\u2029',
    '',
    '',
  ].join('\n');
  const cases = [
    {
      label: 'quotes, backslashes, ampersands, controls and trailing newlines',
      env: { APPTITLE: specialValue, BASEURL: specialValue },
      expected: { AppTitle: specialValue, appId: specialValue, baseUrl: specialValue },
    },
    {
      label: 'exact booleans remain booleans and other values remain strings',
      env: { DEV: 'true', HUB: 'false', LOGLEVEL: 'false ', APPTITLE: '001' },
      expected: { dev: true, hub: false, logLevel: 'false ', AppTitle: '001' },
    },
    {
      label: 'empty and unset environment values preserve defaults',
      env: { APPTITLE: '' },
      expected: { AppTitle: 'default', dev: false, untouched: 'keep' },
    },
    {
      label: 'single-line environment object',
      source: 'window.Environment = { AppTitle: "default", untouched: "keep" };',
      env: { APPTITLE: specialValue },
      expected: { AppTitle: specialValue, untouched: 'keep' },
    },
    {
      label: 'valid APPCODE substitution',
      env: { APPCODE: 'ibiz-modeling__01' },
      expectedNginx: 'location /ibiz-modeling__01/ { }\n',
    },
    ...['&', '#', "'", '"', '\\', '\n', ';', '$', ' '].map(value => ({
      label: `reject unsafe APPCODE ${JSON.stringify(value)}`,
      env: { APPCODE: `unsafe${value}code` },
      reject: true,
    })),
  ];

  for (const testCase of cases) {
    const fixture = await mkdtemp(join(tmpdir(), 'aibiz-modelingweb-start-'));
    try {
      const dist = join(fixture, 'dist');
      const bin = join(fixture, 'bin');
      const environmentJs = join(dist, 'environments/environment.js');
      const nginxConfig = join(fixture, 'nginx.conf');
      const environmentConfig = join(fixture, 'environment.config');
      const scriptPath = join(fixture, 'start.sh');
      const nginxCalled = join(fixture, 'nginx-called');
      await mkdir(dirname(environmentJs), { recursive: true });
      await mkdir(bin);
      const source = testCase.source ?? [
        'window.Environment = {',
        '  AppTitle: "default",',
        '  dev: false,',
        '  hub: true,',
        '  untouched: "keep",',
        '};',
      ].join('\n');
      const originalNginx = 'location /appcode/ { }\n';
      await writeFile(environmentJs, source);
      await writeFile(nginxConfig, originalNginx);
      await writeFile(environmentConfig, environment);
      await writeFile(
        scriptPath,
        start
          .replaceAll('/etc/nginx/conf.d/nginx.conf', nginxConfig)
          .replaceAll('/environment.config', environmentConfig)
          .replaceAll('/dist', dist),
      );
      await writeFile(
        join(bin, 'nginx'),
        '#!/bin/sh\n: > "$HARNESS_NGINX_CALLED"\n',
        { mode: 0o755 },
      );
      const execute = () => execFile('sh', [scriptPath], {
        env: {
          PATH: `${bin}:${process.env.PATH}`,
          LC_ALL: 'C',
          HARNESS_NGINX_CALLED: nginxCalled,
          ...testCase.env,
        },
        timeout: 10000,
        maxBuffer: 1024 * 1024,
      });
      if (testCase.reject) {
        await assert.rejects(execute, error => {
          assert.match(error.stderr, /APPCODE/);
          return true;
        });
        assert.equal(await readFile(environmentJs, 'utf8'), source);
        assert.equal(await readFile(nginxConfig, 'utf8'), originalNginx);
        assert.equal(await exists(nginxCalled), false);
      } else {
        await execute();
        const generated = await readFile(environmentJs, 'utf8');
        const context = { window: {} };
        runInNewContext(generated, context, { timeout: 1000 });
        assert.equal(context.window.injected, undefined);
        for (const [key, value] of Object.entries(testCase.expected ?? {})) {
          assert.equal(context.window.Environment[key], value, key);
        }
        assert.equal(context.window.Environment.untouched, 'keep');
        assert.equal(
          await readFile(nginxConfig, 'utf8'),
          testCase.expectedNginx ?? 'location // { }\n',
        );
        assert.equal(await exists(nginxCalled), true);
        await execute();
        const restarted = await readFile(environmentJs, 'utf8');
        assert.equal(restarted, generated, 'startup must be idempotent');
      }
      pass(`startup injection: ${testCase.label}`);
    } catch (error) {
      fail(`startup injection: ${testCase.label}: ${error.message}`);
    } finally {
      await rm(fixture, { recursive: true, force: true });
    }
  }
}

function sleep(milliseconds) {
  return new Promise(resolvePromise => {
    setTimeout(resolvePromise, milliseconds);
  });
}

async function requestStatus(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);
  try {
    const response = await fetch(url, { signal: controller.signal });
    return response.status;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function waitForStatus(url, expectedStatus, timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  let lastStatus = null;
  while (Date.now() < deadline) {
    lastStatus = await requestStatus(url);
    if (lastStatus === expectedStatus) return lastStatus;
    await sleep(300);
  }
  return lastStatus;
}

async function waitForContainerHealth(containerName, timeoutMs = 90000) {
  const deadline = Date.now() + timeoutMs;
  let lastStatus = 'unknown';
  while (Date.now() < deadline) {
    const result = await run(
      'docker',
      [
        'inspect',
        '--format',
        '{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}',
        containerName,
      ],
      { allowFailure: true },
    );
    lastStatus = result.stdout.trim() || 'unknown';
    if (lastStatus === 'healthy') return true;
    if (lastStatus === 'unhealthy' || lastStatus === 'none') return false;
    await sleep(500);
  }
  throw new Error(
    `container ${containerName} did not become healthy: ${lastStatus}`,
  );
}

async function createLocalDistFixture() {
  const fixtureRoot = await mkdtemp(join(tmpdir(), 'aibiz-modelingweb-dist-'));
  await chmod(fixtureRoot, 0o755);
  await mkdir(join(fixtureRoot, 'doc'), { recursive: true });
  await mkdir(join(fixtureRoot, 'environments'), { recursive: true });
  await writeFile(
    join(fixtureRoot, 'index.html'),
    '<!doctype html><title>LOCAL_DIST_SOURCE_HARNESS</title>',
  );
  await writeFile(
    join(fixtureRoot, 'doc/index.html'),
    '<!doctype html><title>LOCAL_DIST_SOURCE_HARNESS_DOC</title>',
  );
  await writeFile(
    join(fixtureRoot, 'doc/README.md'),
    '# LOCAL_DIST_SOURCE_HARNESS_README',
  );
  await writeFile(
    join(fixtureRoot, 'environments/environment.js'),
    'window.Environment = {};',
  );
  return fixtureRoot;
}

async function smokeContainer(image, { localDistSource = false } = {}) {
  let containerName = null;
  let localDistFixture = null;
  try {
    await run('docker', ['image', 'inspect', image]);
    containerName = `aibiz-modelingweb-harness-${process.pid}-${Date.now()}`;
    const dockerRunArgs = [
      'run',
      '--detach',
      '--rm',
      '--name',
      containerName,
    ];
    if (localDistSource) {
      localDistFixture = await createLocalDistFixture();
      dockerRunArgs.push(
        '--env',
        'LOCAL_DIST_SOURCE=/local-dist',
        '--env',
        'BASEURL=https://modeling-web-harness.invalid',
        '--volume',
        `${localDistFixture}:/local-dist:ro`,
      );
    }
    dockerRunArgs.push(
      '--publish',
      '127.0.0.1::8080',
      image,
    );
    await run('docker', dockerRunArgs);
    try {
      if (await waitForContainerHealth(containerName)) {
        pass(
          `image${localDistSource ? ' with LOCAL_DIST_SOURCE' : ''} reports healthy`,
        );
      } else {
        fail(
          `image${localDistSource ? ' with LOCAL_DIST_SOURCE' : ''} has no usable healthcheck`,
        );
      }
    } catch (error) {
      fail(
        `image${localDistSource ? ' with LOCAL_DIST_SOURCE' : ''} healthcheck failed: ${error.message}`,
      );
    }
    const portOutput = await run('docker', [
      'inspect',
      '--format',
      '{{(index (index .NetworkSettings.Ports "8080/tcp") 0).HostPort}}',
      containerName,
    ]);
    const port = portOutput.stdout.trim();
    if (!/^\d+$/.test(port)) {
      throw new Error(`could not determine published port: ${port || '<empty>'}`);
    }

    try {
      await run('docker', [
        'exec',
        containerName,
        'sh',
        '-eu',
        '-c',
        `
          [ "$(id -u)" = "101" ]
          for directory in \
            /var/cache/nginx/client_temp \
            /var/cache/nginx/proxy_temp \
            /var/cache/nginx/fastcgi_temp \
            /var/cache/nginx/uwsgi_temp \
            /var/cache/nginx/scgi_temp \
            /var/log/nginx
          do
            [ -d "$directory" ]
            [ -w "$directory" ]
            probe="$directory/.aibiz-harness-write"
            touch "$probe"
            rm -f "$probe"
          done
        `,
      ]);
      pass('image runs as UID 101 with writable Nginx temp/log directories');
    } catch (error) {
      fail(`image runtime permissions are invalid: ${error.message}`);
    }

    for (const path of [
      '/modeldesign/',
      '/modeldesign/doc/',
      '/modeldesign/doc/README.md',
    ]) {
      const url = `http://127.0.0.1:${port}${path}`;
      const status = await waitForStatus(
        url,
        200,
        localDistSource ? 90000 : 30000,
      );
      if (status === 200) {
        pass(
          `image${localDistSource ? ' with LOCAL_DIST_SOURCE' : ''} serves ${path} with HTTP 200`,
        );
      } else {
        fail(
          `image${localDistSource ? ' with LOCAL_DIST_SOURCE' : ''} serves ${path} with HTTP ${status ?? 'no response'}`,
        );
      }
    }

    if (localDistSource) {
      try {
        await run('docker', [
          'exec',
          containerName,
          'sh',
          '-eu',
          '-c',
          `
            [ "$(id -u)" = "101" ]
            [ -w /dist ]
            [ -w /dist/environments ]
            grep -q LOCAL_DIST_SOURCE_HARNESS /dist/index.html
            grep -q modeling-web-harness.invalid /dist/environments/environment.js
          `,
        ]);
        pass('UID 101 can replace /dist and update environment.js');
      } catch (error) {
        fail(`LOCAL_DIST_SOURCE permission contract failed: ${error.message}`);
      }
    }
  } finally {
    if (containerName) {
      const logs = await run('docker', ['logs', containerName], {
        allowFailure: true,
      });
      if (logs.stderr.trim()) {
        const permissionErrors = logs.stderr.match(
          /(?:can't preserve ownership|operation not permitted|permission denied)/gi,
        );
        if (permissionErrors) {
          fail(
            `image startup emitted permission errors: ${permissionErrors.join(', ')}`,
          );
        }
        console.error(`[modeling-web-docker] container stderr:\n${logs.stderr}`);
      }
      await run('docker', ['rm', '--force', containerName], {
        allowFailure: true,
      });
    }
    if (localDistFixture) {
      await rm(localDistFixture, { recursive: true, force: true });
    }
  }
}

async function smokeImage(image) {
  await smokeContainer(image);
  await smokeContainer(image, { localDistSource: true });
}

const { image } = parseArgs(process.argv.slice(2));
await verifyStaticContract();
await verifyStartupInjection();

if (image && checks.every(Boolean)) {
  await smokeImage(image);
} else if (image) {
  console.log(
    '[modeling-web-docker] INFO: image smoke skipped because the static contract failed',
  );
}

if (checks.every(Boolean)) {
  console.log('[modeling-web-docker] harness passed');
} else {
  console.error(
    `[modeling-web-docker] harness failed: ${checks.filter(ok => !ok).length} check(s)`,
  );
  process.exitCode = 1;
}
