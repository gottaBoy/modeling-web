#!/usr/bin/env node
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, spawnSync } from 'node:child_process';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash, randomUUID } from 'node:crypto';
import { writePluginManifest } from './modeling-plugins-deployment.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(resolve(root, 'package.json'));
const viteRequire = createRequire(require.resolve('vite/package.json'));
const { build } = viteRequire('esbuild');

if (process.argv[2] === 'build-server') {
  await build({
    absWorkingDir: root, entryPoints: ['modeling-server/serve.ts'],
    outfile: resolve(root, 'dist-modeling-plugins/server.mjs'),
    platform: 'node', target: 'node18', bundle: true, format: 'esm',
  });
  await writePluginManifest();
} else if (process.argv[2] === 'verify') {
  const stamp = `${new Date().toISOString().replace(/[:.]/g, '-')}-${randomUUID().slice(0, 8)}`;
  const output = resolve(root, '../../.artifacts/modeling-plugins-source', stamp);
  await mkdir(output, { recursive: true });
  const hash = value => createHash('sha256').update(value).digest('hex');
  async function snapshot(directory, result = {}) {
    for (const entry of await readdir(resolve(root, directory), { withFileTypes: true })) {
      const file = `${directory}/${entry.name}`;
      if (entry.isDirectory()) await snapshot(file, result);
      else if (entry.isFile()) result[file] = hash(await readFile(resolve(root, file)));
    }
    return result;
  }
  async function inputs() {
    const files = {};
    for (const directory of ['src/modeling-plugins', 'modeling-server', 'tests']) {
      await snapshot(directory, files);
    }
    for (const name of ['package.json', 'pnpm-lock.yaml', 'tsconfig.modeling-plugins.json', 'vite.modeling-plugins.config.ts', 'Dockerfile.modeling-plugins', 'Dockerfile.modeling-plugins.dockerignore', 'scripts/modeling-plugins.mjs', 'scripts/modeling-plugins-deployment.mjs']) {
      files[name] = hash(await readFile(resolve(root, name)));
    }
    files['../../scripts/modeling-browser-cases.mjs'] = hash(
      await readFile(resolve(root, '../../scripts/modeling-browser-cases.mjs')),
    );
    return Object.fromEntries(Object.entries(files).sort(([a], [b]) => a.localeCompare(b)));
  }
  const report = {
    schemaVersion: 1, startedAt: new Date().toISOString(),
    scope: '23-independent-local-modeling-extensions',
    browserAcceptance: 'unverified', upstreamIntegration: 'unverified',
    fullyLocalizedOriginalPlatform: false, sourceFiles: await inputs(), steps: [],
  };
  const commands = [
    ['schemas', process.execPath, [resolve(root, '../../scripts/generate-app-jsonschemas.mjs'), '--check']],
    ['types', resolve(root, 'node_modules/.bin/vue-tsc'), ['--noEmit', '-p', 'tsconfig.modeling-plugins.json']],
    ['tests', resolve(root, 'node_modules/.bin/vitest'), ['run', '--config', 'vite.modeling-plugins.config.ts']],
    ['client-build', resolve(root, 'node_modules/.bin/vite'), ['build', '--config', 'vite.modeling-plugins.config.ts']],
    ['server-build', process.execPath, [fileURLToPath(import.meta.url), 'build-server']],
  ];
  for (const [id, command, args] of commands) {
    const started = Date.now();
    const result = spawnSync(command, args, {
      cwd: root, encoding: 'utf8', timeout: 180000, maxBuffer: 20 * 1024 * 1024,
    });
    const log = `${result.stdout || ''}\n${result.stderr || ''}\n${result.error?.message || ''}`;
    await writeFile(resolve(output, `${id}.log`), log);
    report.steps.push({
      id, command: [command, ...args], exitCode: result.status,
      status: result.status === 0 ? 'pass' : 'fail',
      signal: result.signal, durationMs: Date.now() - started,
      log: `${id}.log`, logSha256: hash(log),
    });
    console.log(`${result.status === 0 ? 'PASS' : 'FAIL'} ${id}`);
  }
  report.inputSnapshotStable = JSON.stringify(report.sourceFiles) === JSON.stringify(await inputs());
  if (report.steps.filter(step => step.id.endsWith('build')).every(step => step.status === 'pass')) {
    report.buildFiles = await snapshot('dist-modeling-plugins');
  }
  report.completedAt = new Date().toISOString();
  report.status = report.steps.every(step => step.status === 'pass') && report.inputSnapshotStable ? 'pass' : 'fail';
  await writeFile(resolve(output, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Report: ${resolve(output, 'report.json')}`);
  console.log(`Local source checks: ${report.status}; browser/upstream integration: unverified`);
  process.exitCode = report.status === 'pass' ? 0 : 1;
} else if (process.argv[2] === 'start') {
  const child = spawn(process.execPath, [resolve(root, 'dist-modeling-plugins/server.mjs')], {
    cwd: root, stdio: 'inherit', env: process.env,
  });
  child.on('error', error => { console.error(error.message); process.exitCode = 1; });
  child.on('exit', code => { process.exitCode = code ?? 1; });
  for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => child.kill(signal));
} else {
  console.error('Usage: node scripts/modeling-plugins.mjs build-server|verify|start');
  process.exitCode = 2;
}
