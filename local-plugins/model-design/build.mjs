#!/usr/bin/env node

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { basename, dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import {
  directoryPath, fingerprint, optionalStat, PinnedDirectories, readPinnedFile, readTree,
} from '../../../scripts/native-candidate-files.mjs';
import { sourceFiles } from '../../../scripts/harness-native-ai-code-source-deps.mjs';
import {
  inspectModelDesignSource, summarizeModelDesignDiagnostics, verifyNativeModelDesignBuildReport,
} from '../../../scripts/harness-native-model-design-build.mjs';
import { verifyRuntimeModelSourceBuild } from '../../../scripts/harness-runtime-model-source-build.mjs';
import {
  candidateManifest, CANDIDATE_NAME, CANDIDATE_VERSION, patchCandidateSources,
  RUNTIME_NAME, RUNTIME_SOURCES,
} from './patches.mjs';
import {
  planDependencyLock, stageDependencyLock, verifyDependencyLock,
} from './dependency-lock.mjs';
import { compileDeterministicCss } from './deterministic-css.mjs';

export const pluginRoot = dirname(fileURLToPath(import.meta.url));
const workspace = resolve(pluginRoot, '../../..');
const artifactRoot = join(workspace, '.artifacts/native-model-design-local-candidate');
const sourceNames = ['src', 'public', 'package.json', 'tsconfig.json', 'ibiz.config.cjs', 'CHANGELOG.md'];
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const jsonBytes = value => Buffer.from(`${JSON.stringify(value, null, 2)}\n`);
const slash = value => value.split(sep).join('/');
const entriesOnly = files => files.map(({ path, bytes, sha256 }) => ({ path, bytes, sha256 }));
const succeeded = command => command.exitCode === 0 && command.signal === null && command.error === null;

function read(path) {
  const directories = new PinnedDirectories();
  try {
    return readPinnedFile(directories, directories.open(dirname(path)), basename(path)).data;
  } finally { directories.close(); }
}

function localPath(path) {
  assert.ok(typeof path === 'string' && path, 'An explicit workspace evidence path is required');
  const absolute = resolve(workspace, path);
  const child = relative(workspace, absolute);
  assert.ok(child && child !== '..' && !child.startsWith(`..${sep}`),
    'Evidence path must be inside the workspace');
  return absolute;
}

function builderInputs() {
  return ['build.mjs', 'dependency-lock.mjs', 'deterministic-css.mjs', 'package.json', 'patches.mjs'].map(path => {
    const data = read(join(pluginRoot, path));
    return { path, bytes: data.length, sha256: hash(data) };
  });
}

function outputInventory(packageRoot) {
  const entries = ['dist', 'es', 'lib'].flatMap(output =>
    optionalStat(join(packageRoot, output))
      ? readTree(join(packageRoot, output), { jsonOnly: false }).entries
        .map(file => ({ ...file, path: `${output}/${file.path}` }))
      : []);
  entries.sort((a, b) => a.path.localeCompare(b.path));
  return { entries, ...fingerprint(entries) };
}

export function validateRuntimeEvidence(result) {
  const { report } = result;
  const sourceFingerprint = report.inputs?.fingerprint ?? report.inputs?.files?.fingerprint;
  assert.equal(report.contract, 'runtime-model-reconstructed-source-build');
  assert.equal(report.status, 'source-build-complete-not-accepted');
  assert.equal(report.sourceBuildVerified, true, 'Source-built runtime-model is required');
  assert.equal(report.reproducibleBuildVerified, true);
  assert.equal(report.package, RUNTIME_NAME);
  const version = report.candidateVersion;
  assert.ok(Object.hasOwn(RUNTIME_SOURCES, version), 'Unsupported runtime source version');
  assert.equal(report.packageRoot, join(workspace, RUNTIME_SOURCES[version]),
    'Runtime version/source-root mismatch');
  assert.equal(report.originalSourceRecovered, false);
  assert.equal(report.nativeAccepted, false);
  assert.equal(report.acceptedForProduction, false);
  assert.ok(sourceFingerprint, 'Runtime source input fingerprint missing');
  assert.ok(report.outputs?.entries.some(file => file.path === 'loader/index.js'),
    'Built runtime loader missing');
  const manifest = JSON.parse(read(join(report.buildRoot, 'package.json')));
  assert.equal(manifest.name, RUNTIME_NAME);
  assert.equal(manifest.version, version);
  for (const directory of ['dist', 'loader']) readTree(join(report.buildRoot, directory), { jsonOnly: false });
  return {
    name: RUNTIME_NAME, declared: version, version,
    target: report.buildRoot, role: 'verified-reconstructed-local-source-build',
    sourceReport: result.reportPath, sourceReportSha256: result.reportSha256,
    sourceFingerprint,
    outputFingerprint: report.outputs.fingerprint,
    originalSourceRecovered: false, nativeAccepted: false,
  };
}

function candidatePlan(probe, runtime) {
  const files = sourceFiles(probe.report.packageRoot, { names: sourceNames });
  assert.deepEqual(entriesOnly(files), probe.report.inputInventory.entries);
  const { contents, patches, indexDiagnosticsAddressed } = patchCandidateSources(files);
  const runtimeLink = validateRuntimeEvidence(runtime);
  const dependencies = [...probe.report.dependencies.links, runtimeLink];
  assert.deepEqual(probe.report.dependencies.missing.map(item => item.name), [RUNTIME_NAME],
    'Unexpected baseline dependency blocker');
  const manifestFile = contents.find(file => file.path === 'package.json');
  const originalManifest = JSON.parse(manifestFile.data);
  const manifest = candidateManifest(originalManifest, dependencies);
  manifestFile.data = jsonBytes(manifest);
  manifestFile.bytes = manifestFile.data.length;
  manifestFile.sha256 = hash(manifestFile.data);
  const compiler = JSON.parse(contents.find(file => file.path === 'tsconfig.json').data);
  assert.equal(compiler.compilerOptions.strict, true, 'Strict checking must remain enabled');
  assert.equal(compiler.compilerOptions.noImplicitAny, undefined,
    'Do not weaken the upstream implicit-any checks');
  const tsLink = dependencies.find(item => item.name === 'typescript');
  const ts = createRequire(join(tsLink.target, 'package.json'))(tsLink.target);
  const surface = inspectModelDesignSource(ts, contents);
  assert.deepEqual(surface.keys, probe.report.sourceSurface.keys, 'UIAction registration drift');
  return { files: contents, inputs: fingerprint(entriesOnly(contents)), patches, indexDiagnosticsAddressed,
    manifest, dependencies, surface, ts };
}

function dependencyPlan(probe, runtime, plan) {
  // The probe verifier has already verified both receipts, not just their flags.
  const framework = JSON.parse(read(probe.report.frameworkEvidence.reportPath));
  const cli = JSON.parse(read(probe.report.cliEvidence.reportPath));
  assert.equal(hash(read(probe.report.frameworkEvidence.reportPath)), probe.report.frameworkEvidence.sha256);
  assert.equal(hash(read(probe.report.cliEvidence.reportPath)), probe.report.cliEvidence.sha256);
  return planDependencyLock(plan.dependencies, {
    workspace,
    verifiedOwnTargets: [
      ...framework.sources.filter(pkg => !['hub-config', 'ai-code'].includes(pkg.id)).map(pkg => pkg.staged),
      join(cli.stage, 'packages/core'), join(cli.stage, 'packages/cli'), runtime.report.buildRoot,
    ],
  });
}

function lockedLinks(lock, packageRoot) {
  return lock.roots.map(root => ({
    ...root, target: join(packageRoot, '.dependencies', root.id),
  }));
}

export function verifyConsumedRuntime(runtime, packageRoot, lock) {
  const link = lockedLinks(lock, packageRoot).find(item => item.name === RUNTIME_NAME);
  assert.ok(link, 'Locked runtime input missing');
  const path = join(packageRoot, 'node_modules', RUNTIME_NAME);
  assert.equal(fs.realpathSync(path), link.target, 'Consumed runtime escaped its snapshot');
  const entries = [
    { path: 'package.json', bytes: read(join(link.target, 'package.json')).length,
      sha256: hash(read(join(link.target, 'package.json'))) },
    ...['dist', 'loader'].flatMap(output =>
      readTree(join(link.target, output), { jsonOnly: false }).entries
        .map(file => ({ ...file, path: `${output}/${file.path}` }))),
  ].sort((a, b) => a.path.localeCompare(b.path));
  const expected = [
    { path: 'package.json', bytes: read(join(runtime.report.buildRoot, 'package.json')).length,
      sha256: hash(read(join(runtime.report.buildRoot, 'package.json'))) },
    ...runtime.report.outputs.entries,
  ].sort((a, b) => a.path.localeCompare(b.path));
  assert.deepEqual(entries, expected, 'Consumed runtime bytes differ from source-built receipt');
  assert.ok(entries.some(file => file.path === 'loader/index.d.ts'));
  assert.ok(entries.some(file => file.path === 'dist/types/index.d.ts'));
  return { snapshot: slash(relative(packageRoot, link.target)),
    entries, ...fingerprint(entries), sourceReportSha256: runtime.reportSha256, verified: true };
}

export function copyRuntimeResources(packageRoot, resourceFiles) {
  const sourceEntries = entriesOnly(resourceFiles);
  assert.ok(sourceEntries.length, 'Runtime JSON resources are required');
  assert.equal(new Set(sourceEntries.map(file => file.path)).size, sourceEntries.length,
    'Duplicate runtime JSON resource path');
  for (const file of resourceFiles) {
    assert.match(file.path, /^[A-Za-z0-9._-]+\.json$/, 'Unexpected runtime JSON resource path');
    assert.equal(file.bytes, file.data.length, `Runtime JSON byte count drift: ${file.path}`);
    assert.equal(file.sha256, hash(file.data), `Runtime JSON hash drift: ${file.path}`);
    JSON.parse(file.data.toString('utf8'));
  }
  const destinations = ['dist', 'es', 'lib'].map(output =>
    join(packageRoot, output, 'assets/json/runtime-model'));
  // Check every existing ancestor for all outputs before opening any writable
  // descriptor. A late symlink/path failure must not leave a partial resource set.
  for (const destination of destinations) directoryPath(destination, { allowMissing: true });
  const plans = destinations.map(destination => {
    const info = optionalStat(destination);
    const existing = info ? readTree(destination).entries : [];
    for (const entry of existing) {
      assert.deepEqual(entry, sourceEntries.find(file => file.path === entry.path),
        `Existing resource copy drift: ${destination}/${entry.path}`);
    }
    return { destination, existing };
  });
  const directories = new PinnedDirectories();
  try {
    // Validate all existing trees before adding any missing resource files.
    for (const { destination, existing } of plans) {
      const directory = directories.open(destination, { create: true });
      const names = new Set(existing.map(file => file.path));
      for (const file of resourceFiles) {
        if (!names.has(file.path)) directories.write(directory, file.path, file.data);
      }
      assert.deepEqual(readTree(destination).entries, sourceEntries, 'Runtime JSON copy is not exact');
    }
  } finally { directories.close(); }
  return plans.map(({ destination }) => ({
    path: slash(relative(packageRoot, destination)),
    ...fingerprint(readTree(destination).entries), verified: true,
  }));
}

function inspectOutputs(plan, packageRoot, resources) {
  const entries = outputInventory(packageRoot);
  const styles = compileDeterministicCss(packageRoot);
  assert.deepEqual(read(join(packageRoot, 'dist/index.min.css')), styles.css,
    'Deterministic stylesheet output drift');
  const paths = new Set(entries.entries.map(file => file.path));
  for (const file of ['dist/index.system.min.js', 'dist/index.min.css', 'es/index.mjs',
    'es/index.d.ts', 'lib/index.cjs']) {
    assert.ok(entries.entries.some(item => item.path === file && item.bytes > 0), `Build output missing: ${file}`);
  }
  const declaredModules = plan.files.filter(file => file.path.startsWith('src/') &&
    /\.(?:ts|tsx)$/.test(file.path) && !file.path.endsWith('.d.ts')).map(file => {
    const stem = file.path.slice(4).replace(/\.(?:ts|tsx)$/, '');
    const outputs = [`es/${stem}.mjs`, `es/${stem}.d.ts`, `lib/${stem}.cjs`];
    for (const path of outputs) assert.ok(paths.has(path), `Declared module output missing: ${path}`);
    return { source: file.path, outputs };
  });
  const declaredStyles = plan.files.filter(file => file.path.startsWith('src/') &&
    file.path.endsWith('.scss')).map(file => {
    const stem = file.path.slice(4).replace(/\.scss$/, '');
    const outputs = [`es/${stem}.css`, `lib/${stem}.css`];
    for (const path of outputs) assert.ok(paths.has(path), `Declared stylesheet output missing: ${path}`);
    return { source: file.path, outputs };
  });
  const system = plan.ts.createSourceFile('index.system.js', read(join(packageRoot,
    'dist/index.system.min.js')).toString(), plan.ts.ScriptTarget.Latest, true);
  const imports = [];
  function visit(node) {
    if (plan.ts.isCallExpression(node) && plan.ts.isPropertyAccessExpression(node.expression) &&
        node.expression.expression.getText(system) === 'System' && node.expression.name.text === 'register') {
      const array = node.arguments.find(item => plan.ts.isArrayLiteralExpression(item));
      assert.ok(array, 'SystemJS dependency array missing');
      imports.push(...array.elements.filter(item => plan.ts.isStringLiteral(item)).map(item => item.text));
    }
    plan.ts.forEachChild(node, visit);
  }
  visit(system);
  assert.ok(imports.includes(`${RUNTIME_NAME}/loader`), 'Source-built runtime loader must remain an external');
  const builtKeys = inspectModelDesignSource(plan.ts, [{
    // The generated module is JavaScript, but the AST helper intentionally
    // audits TypeScript/TSX extensions only.
    path: 'es/ui-action/index.ts', data: read(join(packageRoot, 'es/ui-action/index.mjs')),
  }]).keys;
  assert.deepEqual(builtKeys, plan.surface.keys, 'Built UIAction registration drift');
  const resourceCopies = ['dist', 'es', 'lib'].map(output => {
    const path = `${output}/assets/json/runtime-model`;
    const tree = readTree(join(packageRoot, path));
    assert.deepEqual(tree.entries, entriesOnly(resources), 'Runtime resource output drift');
    return { path, ...fingerprint(tree.entries), verified: true };
  });
  return { outputs: entries, systemImports: imports, builtUiActionKeys: builtKeys, resourceCopies,
    declaredModules, declaredStyles, deterministicStyles: styles.evidence };
}

function commandPlans(links) {
  const vueTscLink = links.find(item => item.name === 'vue-tsc');
  const manifest = JSON.parse(read(join(vueTscLink.target, 'package.json')));
  const vueTsc = join(vueTscLink.target, typeof manifest.bin === 'string' ? manifest.bin : manifest.bin['vue-tsc']);
  const cli = links.find(item => item.name === '@ibiz-template/cli');
  const cliManifest = JSON.parse(read(join(cli.target, 'package.json')));
  const bin = typeof cliManifest.bin === 'string' ? cliManifest.bin : cliManifest.bin['ibiz-temp'];
  return [
    { id: 'typecheck', entry: vueTsc, args: ['--noEmit'] },
    { id: 'bundle', entry: join(cli.target, bin), args: ['build', '-c'] },
    { id: 'deterministic-styles', entry: join(pluginRoot, 'deterministic-css.mjs'), args: [] },
    { id: 'declarations', entry: vueTsc, args: ['--declaration', '--emitDeclarationOnly'] },
  ];
}

function runBuildPass({ plan, dependencies, runtime, packageRoot, destination, pass, timeout,
  directories, report }) {
  const logs = directories.open(join(destination, 'logs', pass), { create: true });
  directories.open(packageRoot, { create: true, exclusive: true });
  for (const file of plan.files) {
    const path = join(packageRoot, file.path);
    directories.write(directories.open(dirname(path), { create: true }), basename(path), file.data);
  }
  const links = stageDependencyLock(dependencies, packageRoot);
  const evidence = { packageRoot, commands: [], outputs: null, consumedRuntime: null };
  report.builds.push(evidence);
  const recheck = () => {
    assert.deepEqual(entriesOnly(sourceFiles(packageRoot, { names: sourceNames })),
      report.inputs.entries, 'Candidate source/config/resource input drift');
    assert.deepEqual(builderInputs(), report.builderInputs, 'Builder input drift');
    const summary = verifyDependencyLock(dependencies.lock, packageRoot);
    assert.equal(summary.sha256, dependencies.sha256, 'Dependency lock hash drift');
    evidence.consumedRuntime = verifyConsumedRuntime(runtime, packageRoot, dependencies.lock);
  };
  for (const step of commandPlans(links)) {
    recheck();
    const entrySha256 = hash(read(step.entry));
    const result = spawnSync(process.execPath, [step.entry, ...step.args], {
      cwd: packageRoot, encoding: 'utf8', timeout, maxBuffer: 32 * 1024 * 1024,
      env: { ...process.env, NODE_PATH: '', NODE_OPTIONS: '', CI: 'true', NO_COLOR: '1',
        npm_config_ignore_scripts: 'true', npm_config_offline: 'true',
        npm_config_registry: 'http://127.0.0.1:9/', COREPACK_ENABLE_NETWORK: '0' },
    });
    const data = Buffer.from(`${result.stdout ?? ''}${result.stderr ?? ''}`);
    directories.write(logs, `${step.id}.log`, data);
    const command = { ...step, executable: process.execPath, entrySha256, cwd: packageRoot,
      exitCode: result.status, signal: result.signal, error: result.error?.message ?? null,
      log: `logs/${pass}/${step.id}.log`, logBytes: data.length, logSha256: hash(data) };
    evidence.commands.push(command);
    assert.equal(hash(read(step.entry)), entrySha256, 'Build tool changed');
    recheck();
    if (step.id === 'typecheck') {
      evidence.typecheckDiagnostics = summarizeModelDesignDiagnostics(data.toString());
      assert.equal(evidence.typecheckDiagnostics.count, 0, 'Typecheck diagnostics remain');
    }
    assert.ok(succeeded(command), `${pass}/${step.id} failed; see ${command.log}`);
  }
  const resources = plan.files.filter(file => file.path.startsWith('public/assets/json/runtime-model/'))
    .map(file => ({ ...file, path: basename(file.path) }));
  copyRuntimeResources(packageRoot, resources);
  Object.assign(evidence, inspectOutputs(plan, packageRoot, resources));
  recheck();
  return evidence;
}

export function runLocalModelDesignBuild({ probeReport, runtimeSourceReport, output, timeout = 180000 } = {}) {
  assert.ok(Number.isSafeInteger(timeout) && timeout > 0, 'Positive build timeout required');
  const runtime = verifyRuntimeModelSourceBuild({ sourceReport: localPath(runtimeSourceReport) });
  validateRuntimeEvidence(runtime);
  const probe = verifyNativeModelDesignBuildReport({ sourceReport: localPath(probeReport) });
  const plan = candidatePlan(probe, runtime);
  const dependencies = dependencyPlan(probe, runtime, plan);
  const destination = resolve(workspace, output ?? join(artifactRoot, `build-${randomUUID()}`));
  assert.equal(dirname(destination), artifactRoot, 'Output must be a direct local candidate artifact');
  assert.match(basename(destination), /^[A-Za-z0-9][A-Za-z0-9._-]*$/, 'Invalid candidate output name');
  assert.ok(!optionalStat(destination), 'Existing candidate must not be overwritten');
  const packageRoot = join(destination, 'package');
  const report = {
    schemaVersion: 1, contract: 'independent-model-design-alpha122-source-candidate',
    package: CANDIDATE_NAME, version: CANDIDATE_VERSION,
    status: 'failed', exitCode: 1, generatedAt: new Date().toISOString(),
    workspace, destination, packageRoot,
    baseline: { reportPath: probe.reportPath, reportSha256: probe.reportSha256,
      originalTypecheckDiagnostics: probe.report.typecheckDiagnostics },
    runtime: { reportPath: runtime.reportPath, reportSha256: runtime.reportSha256,
      package: RUNTIME_NAME, version: runtime.report.candidateVersion,
      sourceBuildVerified: true, originalSourceRecovered: false,
      sourceFingerprint: runtime.report.inputs.files?.fingerprint ?? runtime.report.inputs.fingerprint,
      outputs: runtime.report.outputs },
    builderInputs: builderInputs(),
    upstream: probe.report.source, resources: probe.report.resources,
    patches: plan.patches, indexDiagnosticsAddressed: plan.indexDiagnosticsAddressed,
    manifestSha256: hash(jsonBytes(plan.manifest)),
    inputs: { ...plan.inputs, entries: entriesOnly(plan.files) },
    dependencies: plan.dependencies, dependencyLock: dependencies.lock,
    dependencyLockSha256: dependencies.sha256, dependencyLockVerified: false,
    reproducibleBuildVerified: false, packageManagerInstallVerified: false,
    uiActionKeys: plan.surface.keys, builds: [],
    commands: [], errors: [], outputs: null,
    typecheckSucceeded: false, fullDeclaredBuildSucceeded: false, resourceCopiesVerified: false,
    runtimeLoaderBuildInputVerified: false, runtimeLoaderBrowserDeliveryVerified: false,
    originalSourceRecovered: false, nativeCompatibilityVerified: false,
    exactVersionReproductionVerified: false, nativeAccepted: false, acceptedForProduction: false,
    networkRequestsExecutedByBuilder: false, networkAccessPrevented: false,
    arbitraryNpmScriptsExecuted: false,
    blockers: ['alpha90-api-behavior-not-verified', 'browser-loader-and-editor-save-reload-not-verified',
      'isolated-dependency-lock-not-reproduced'],
  };
  const directories = new PinnedDirectories();
  try {
    const run = directories.open(destination, { create: true, exclusive: true });
    try {
      const first = runBuildPass({ plan, dependencies, runtime, packageRoot, destination,
        pass: 'first', timeout, directories, report });
      report.commands = first.commands;
      report.typecheckDiagnostics = first.typecheckDiagnostics;
      report.typecheckSucceeded = true;
      report.fullDeclaredBuildSucceeded = true;
      for (const key of ['outputs', 'systemImports', 'builtUiActionKeys', 'resourceCopies', 'consumedRuntime',
        'declaredModules', 'declaredStyles', 'deterministicStyles']) {
        report[key] = first[key];
      }
      report.resourceCopiesVerified = true;
      const second = runBuildPass({ plan, dependencies, runtime,
        packageRoot: join(destination, 'reproduction'), destination,
        pass: 'second', timeout, directories, report });
      assert.deepEqual(second.outputs, first.outputs, 'Complete build is not byte-reproducible');
      assert.deepEqual(second.consumedRuntime, first.consumedRuntime, 'Runtime input differs between builds');
      report.dependencyLockVerified = true;
      report.reproducibleBuildVerified = true;
      report.runtimeLoaderBuildInputVerified = true;
      assert.equal(verifyRuntimeModelSourceBuild({ sourceReport: runtime.reportPath }).reportSha256,
        runtime.reportSha256, 'Runtime source-build evidence drift');
      assert.equal(verifyNativeModelDesignBuildReport({ sourceReport: probe.reportPath }).reportSha256,
        probe.reportSha256, 'Baseline source-build evidence drift');
      assert.deepEqual(builderInputs(), report.builderInputs, 'Builder input drift');
      directories.verify(run);
      report.status = 'source-build-complete-not-native-accepted';
      report.exitCode = 2;
      report.blockers = ['alpha90-api-behavior-not-verified', 'browser-loader-and-editor-save-reload-not-verified'];
    } catch (error) {
      report.errors.push(error instanceof Error ? error.message : String(error));
    }
    const data = jsonBytes(report);
    directories.write(run, 'report.json', data);
    directories.write(run, 'report.sha256', Buffer.from(`${hash(data)}\n`));
    assert.deepEqual(readPinnedFile(directories, run, 'report.json').data, data);
    return { report, reportPath: join(destination, 'report.json'), reportSha256: hash(data) };
  } finally { directories.close(); }
}

export function verifyLocalModelDesignBuild({ sourceReport } = {}) {
  const reportPath = localPath(sourceReport);
  const destination = dirname(reportPath);
  assert.equal(basename(reportPath), 'report.json');
  assert.equal(dirname(destination), artifactRoot);
  const data = read(reportPath);
  const reportSha256 = hash(data);
  assert.equal(read(join(destination, 'report.sha256')).toString().trim(), reportSha256, 'Report hash drift');
  const report = JSON.parse(data);
  assert.equal(report.schemaVersion, 1);
  assert.equal(report.contract, 'independent-model-design-alpha122-source-candidate');
  assert.equal(report.status, 'source-build-complete-not-native-accepted');
  assert.equal(report.exitCode, 2);
  assert.equal(report.package, CANDIDATE_NAME);
  assert.equal(report.version, CANDIDATE_VERSION);
  assert.equal(report.workspace, workspace);
  assert.equal(report.destination, destination);
  assert.equal(report.packageRoot, join(destination, 'package'));
  const runtime = verifyRuntimeModelSourceBuild({ sourceReport: localPath(report.runtime.reportPath) });
  assert.equal(runtime.reportSha256, report.runtime.reportSha256, 'Runtime report changed');
  const probe = verifyNativeModelDesignBuildReport({ sourceReport: localPath(report.baseline.reportPath) });
  assert.equal(probe.reportSha256, report.baseline.reportSha256, 'Original probe changed');
  assert.deepEqual(report.baseline.originalTypecheckDiagnostics, probe.report.typecheckDiagnostics);
  const plan = candidatePlan(probe, runtime);
  assert.deepEqual(report.builderInputs, builderInputs(), 'Builder source drift');
  assert.deepEqual(report.upstream, probe.report.source, 'Upstream source evidence changed');
  assert.deepEqual(report.resources, probe.report.resources, 'Resource receipt changed');
  assert.deepEqual(report.patches, plan.patches, 'Source adaptation evidence changed');
  assert.equal(report.indexDiagnosticsAddressed, 22);
  assert.equal(report.manifestSha256, hash(jsonBytes(plan.manifest)));
  assert.deepEqual(report.inputs, { ...plan.inputs, entries: entriesOnly(plan.files) });
  assert.deepEqual(entriesOnly(sourceFiles(report.packageRoot, { names: sourceNames })), report.inputs.entries);
  assert.deepEqual(report.dependencies, plan.dependencies);
  const dependencies = dependencyPlan(probe, runtime, plan);
  assert.deepEqual(report.dependencyLock, dependencies.lock, 'Dependency input or graph drift');
  assert.equal(report.dependencyLockSha256, dependencies.sha256);
  assert.deepEqual(report.uiActionKeys, plan.surface.keys);
  assert.deepEqual(report.runtime, {
    reportPath: runtime.reportPath, reportSha256: runtime.reportSha256,
    package: RUNTIME_NAME, version: runtime.report.candidateVersion,
    sourceBuildVerified: true, originalSourceRecovered: false,
    sourceFingerprint: runtime.report.inputs.files?.fingerprint ?? runtime.report.inputs.fingerprint,
    outputs: runtime.report.outputs,
  });
  const resources = plan.files.filter(file => file.path.startsWith('public/assets/json/runtime-model/'))
    .map(file => ({ ...file, path: basename(file.path) }));
  assert.equal(report.builds.length, 2, 'Two complete builds required');
  for (const [passIndex, pass] of ['first', 'second'].entries()) {
    const build = report.builds[passIndex];
    const packageRoot = join(destination, passIndex === 0 ? 'package' : 'reproduction');
    assert.equal(build.packageRoot, packageRoot);
    assert.deepEqual(entriesOnly(sourceFiles(packageRoot, { names: sourceNames })), report.inputs.entries);
    assert.equal(verifyDependencyLock(dependencies.lock, packageRoot).sha256, dependencies.sha256);
    assert.deepEqual(build.consumedRuntime, verifyConsumedRuntime(runtime, packageRoot, dependencies.lock));
    const steps = commandPlans(lockedLinks(dependencies.lock, packageRoot));
    assert.equal(build.commands.length, steps.length);
    for (const [index, step] of steps.entries()) {
      const command = build.commands[index];
      for (const [key, value] of Object.entries(step)) assert.deepEqual(command[key], value);
      assert.equal(command.executable, process.execPath);
      assert.equal(command.cwd, packageRoot);
      assert.equal(command.entrySha256, hash(read(step.entry)));
      assert.ok(succeeded(command), 'Failed command cannot establish source-build success');
      assert.equal(command.log, `logs/${pass}/${step.id}.log`);
      const log = read(join(destination, command.log));
      assert.equal(log.length, command.logBytes);
      assert.equal(hash(log), command.logSha256, 'Build log drift');
    }
    assert.deepEqual(build.typecheckDiagnostics, summarizeModelDesignDiagnostics(
      read(join(destination, `logs/${pass}/typecheck.log`)).toString()));
    assert.equal(build.typecheckDiagnostics.count, 0);
    for (const [key, value] of Object.entries(inspectOutputs(plan, packageRoot, resources))) {
      assert.deepEqual(build[key], value, `Output evidence drift: ${pass}/${key}`);
    }
  }
  const [first, second] = report.builds;
  assert.deepEqual(second.outputs, first.outputs, 'Complete build is not byte-reproducible');
  assert.deepEqual(second.consumedRuntime, first.consumedRuntime);
  for (const key of ['commands', 'typecheckDiagnostics', 'outputs', 'systemImports',
    'builtUiActionKeys', 'resourceCopies', 'consumedRuntime', 'declaredModules', 'declaredStyles',
    'deterministicStyles']) {
    assert.deepEqual(report[key], first[key], `First build receipt drift: ${key}`);
  }
  for (const key of ['typecheckSucceeded', 'fullDeclaredBuildSucceeded', 'resourceCopiesVerified',
    'runtimeLoaderBuildInputVerified', 'dependencyLockVerified', 'reproducibleBuildVerified']) {
    assert.equal(report[key], true);
  }
  for (const key of ['originalSourceRecovered', 'nativeCompatibilityVerified', 'exactVersionReproductionVerified',
    'nativeAccepted', 'acceptedForProduction', 'runtimeLoaderBrowserDeliveryVerified',
    'networkRequestsExecutedByBuilder', 'networkAccessPrevented', 'arbitraryNpmScriptsExecuted',
    'packageManagerInstallVerified']) {
    assert.equal(report[key], false, `Unjustified acceptance claim: ${key}`);
  }
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.blockers, ['alpha90-api-behavior-not-verified',
    'browser-loader-and-editor-save-reload-not-verified']);
  assert.deepEqual(read(reportPath), data, 'Report changed during verification');
  return { report, reportPath, reportSha256, sourceBuildVerified: true, nativeAccepted: false };
}

export function main(args = process.argv.slice(2)) {
  const { values } = parseArgs({
    args, options: {
      'probe-report': { type: 'string' }, 'runtime-source-report': { type: 'string' },
      output: { type: 'string' }, 'verify-report': { type: 'string' }, help: { type: 'boolean' },
    },
  });
  if (values.help) {
    console.log('Build: node modelingweb/local-plugins/model-design/build.mjs --probe-report PATH --runtime-source-report PATH [--output PATH]');
    console.log('Read-only verification: --verify-report PATH. Exit 2 means source build only, never native acceptance.');
    return 0;
  }
  assert.ok(!values['verify-report'] || Object.keys(values).length === 1,
    '--verify-report cannot be combined with build options');
  const result = values['verify-report']
    ? verifyLocalModelDesignBuild({ sourceReport: values['verify-report'] })
    : runLocalModelDesignBuild({
      probeReport: values['probe-report'], runtimeSourceReport: values['runtime-source-report'], output: values.output,
    });
  console.log(JSON.stringify({
    reportPath: result.reportPath, reportSha256: result.reportSha256,
    status: result.report.status, errors: result.report.errors,
    typecheckSucceeded: result.report.typecheckSucceeded,
    fullDeclaredBuildSucceeded: result.report.fullDeclaredBuildSucceeded,
    resourceCopiesVerified: result.report.resourceCopiesVerified, nativeAccepted: false,
  }, null, 2));
  return result.report.exitCode;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { process.exitCode = main(); }
  catch (error) {
    console.error(`Independent model-design candidate failed: ${error.message}`);
    process.exitCode = 1;
  }
}
