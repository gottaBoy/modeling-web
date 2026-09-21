#!/usr/bin/env node
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { readFile, realpath } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  fingerprint,
  treeFingerprint,
} from '../../../scripts/localization-baseline.mjs';
import {
  sourcePackages,
  sourceCompilerOptions,
} from './build-source-runtime.mjs';
import { verifySourceDependencies } from '../../source-build-deps/verify.mjs';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspace = resolve(appRoot, '../..');
const require = createRequire(join(appRoot, 'package.json'));
const ts = require('typescript');

export function inspectSystemBundle(code) {
  const file = ts.createSourceFile(
    'bundle.js',
    code,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS,
  );
  if (file.parseDiagnostics.length)
    throw new Error('Invalid JavaScript bundle');
  const registrations = new Set();
  const imports = new Set();
  const visit = node => {
    if (ts.isCallExpression(node)) {
      const callee = node.expression.getText(file);
      if (
        callee === 'System.register' &&
        ts.isArrayLiteralExpression(node.arguments[0])
      ) {
        for (const dep of node.arguments[0].elements) {
          if (!ts.isStringLiteralLike(dep))
            throw new Error('Nonliteral SystemJS dependency');
          imports.add(dep.text);
        }
      }
      if (
        callee === 'ibiz.engine.register' &&
        ts.isStringLiteralLike(node.arguments[0])
      ) {
        registrations.add(node.arguments[0].text);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return {
    imports: [...imports].sort(),
    registrations: [...registrations].sort(),
  };
}

async function insideReal(root, path) {
  const realRoot = await realpath(root);
  const realFile = await realpath(path);
  if (realFile !== realRoot && !realFile.startsWith(`${realRoot}/`))
    throw new Error(`Path escapes allowed root: ${path}`);
  return realFile;
}

export async function verifySourceRuntime(run, { quiet = false } = {}) {
  run = await insideReal(
    join(workspace, '.artifacts/frontend-source'),
    resolve(run),
  );
  const report = JSON.parse(await readFile(join(run, 'report.json'), 'utf8'));
  const failures = [];
  const packages = [];
  if (
    report.schemaVersion !== 1 ||
    report.lane !== 'source-candidate' ||
    report.deployable !== false ||
    report.productionModified !== false ||
    !Array.isArray(report.packages) ||
    !report.packages.length ||
    !['failed', 'built-not-deployed'].includes(report.status)
  ) {
    throw new Error('Not an isolated source-candidate report');
  }
  if (report.status === 'failed')
    failures.push('Build report contains failures');
  if (
    JSON.stringify(report.compilerOptions) !==
    JSON.stringify(sourceCompilerOptions)
  )
    failures.push('Source compiler settings changed or were not recorded');
  if (
    JSON.stringify(await verifySourceDependencies()) !==
    JSON.stringify(report.sourceDependencies)
  ) {
    failures.push('Locked source dependencies changed or were not recorded');
  }
  const inputs = [
    ['lockfile', join(appRoot, 'pnpm-lock.yaml')],
    ['hubLockfile', join(workspace, 'ibiz-app-hub/pnpm-lock.yaml')],
    ['importMap', join(appRoot, 'public/extras/json/system-import.json')],
    ['builder', join(appRoot, 'scripts/build-source-runtime.mjs')],
  ];
  for (const [field, path] of inputs) {
    if ((await fingerprint(path)).sha256 !== report[field]?.sha256)
      failures.push(`${field}: build input changed`);
  }
  const seen = new Set();
  for (const entry of report.packages) {
    const name = entry.name?.split('/').at(-1);
    if (
      !sourcePackages.includes(name) ||
      entry.name !== `@ibiz-template/${name}` ||
      seen.has(name)
    ) {
      throw new Error('Invalid or duplicate source package');
    }
    seen.add(name);
    if (entry.status !== 'built') {
      failures.push(`${entry.name}: source build failed`);
      continue;
    }
    const packageRoot = await insideReal(
      workspace,
      join(workspace, report.sourceSet, name),
    );
    if (
      (await treeFingerprint(join(packageRoot, 'src'))).sha256 !==
      entry.source.sha256
    ) {
      failures.push(`${entry.name}: source changed after build`);
    }
    if (
      (await fingerprint(join(packageRoot, 'package.json'))).sha256 !==
      entry.sourceManifest.sha256
    ) {
      failures.push(`${entry.name}: source manifest changed after build`);
    }
    if (
      (await treeFingerprint(join(workspace, report.sourceSet, 'theme/style')))
        .sha256 !== entry.theme.sha256
    ) {
      failures.push(`${entry.name}: theme changed after build`);
    }
    const output = await insideReal(run, join(workspace, entry.output.path));
    const currentOutput = await treeFingerprint(output, { exclude: new Set() });
    if (currentOutput.sha256 !== entry.output.sha256)
      failures.push(`${entry.name}: output bytes changed`);
    const imports = new Set();
    const registrations = new Set();
    for (const file of currentOutput.files.filter(file =>
      file.path.endsWith('.js'),
    )) {
      const inspected = inspectSystemBundle(
        await readFile(join(output, file.path), 'utf8'),
      );
      for (const key of inspected.registrations) registrations.add(key);
      for (const dep of inspected.imports) {
        if (dep.startsWith('.'))
          await insideReal(
            output,
            resolve(dirname(join(output, file.path)), dep),
          );
        else imports.add(dep);
      }
    }
    if (name === 'vue3-components') {
      for (const key of ['VIEW_DEREDIRECTVIEW', 'VIEW_DEMOBREDIRECTVIEW']) {
        if (!registrations.has(key))
          failures.push(`${entry.name}: registration not emitted: ${key}`);
      }
    }
    const compiled = entry.chunks.reduce(
      (count, chunk) => count + chunk.sourceModuleCount,
      0,
    );
    if (!compiled) failures.push(`${entry.name}: no source modules compiled`);
    const maps = currentOutput.files.filter(file =>
      file.path.endsWith('.js.map'),
    );
    if (!maps.length) failures.push(`${entry.name}: no source maps`);
    const mappedSourceFiles = new Set();
    const expectedSources = new Map(
      entry.source.files.map(file => [file.path, file.sha256]),
    );
    for (const mapFile of maps) {
      const path = join(output, mapFile.path);
      const map = JSON.parse(await readFile(path, 'utf8'));
      for (let i = 0; i < (map.sources || []).length; i += 1) {
        const sourcePath = relative(
          join(packageRoot, 'src'),
          resolve(dirname(path), map.sources[i]),
        );
        if (!expectedSources.has(sourcePath)) continue;
        const content = map.sourcesContent?.[i];
        if (
          typeof content !== 'string' ||
          createHash('sha256').update(content).digest('hex') !==
            expectedSources.get(sourcePath)
        ) {
          failures.push(
            `${entry.name}: source map content differs: ${sourcePath}`,
          );
        }
        mappedSourceFiles.add(sourcePath);
      }
    }
    if (!mappedSourceFiles.size)
      failures.push(
        `${entry.name}: source maps do not reference the recorded source tree`,
      );
    for (const dependency of entry.dependencies) {
      const path = await insideReal(
        workspace,
        join(workspace, dependency.path),
      );
      if ((await fingerprint(path)).sha256 !== dependency.sha256)
        failures.push(`${entry.name}: dependency changed: ${dependency.path}`);
    }
    for (const asset of entry.runtimeAssets || []) {
      const path = await insideReal(workspace, join(workspace, asset.path));
      if ((await treeFingerprint(path)).sha256 !== asset.sha256)
        failures.push(`${entry.name}: runtime asset source changed`);
    }
    packages.push({
      name: entry.name,
      version: entry.sourceVersion,
      productionVersion: entry.productionVersion,
      compiledSourceModules: compiled,
      outputFiles: currentOutput.files.length,
      imports: [...imports].sort(),
      mappedSourceFiles: mappedSourceFiles.size,
      registrations: [...registrations].filter(key => key.includes('REDIRECT')),
    });
  }
  const result = {
    packages,
    failures,
    sourceArtifactsVerified: failures.length === 0,
    deployable: false,
    typesVerified: false,
    browserVerified: false,
    scope:
      'Build input/output integrity and emitted registrations only; not runtime compatibility or original equivalence.',
  };
  if (!quiet) console.log(JSON.stringify(result, null, 2));
  return result;
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  if (process.argv.length !== 3)
    throw new Error(
      'Usage: node scripts/verify-source-runtime.mjs ARTIFACT_RUN_DIRECTORY',
    );
  const result = await verifySourceRuntime(process.argv[2]);
  if (!result.sourceArtifactsVerified) process.exitCode = 1;
}
