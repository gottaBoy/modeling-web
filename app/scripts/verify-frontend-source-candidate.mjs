import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { basename, dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { PinnedDirectories, readPinnedFile } from '../../../scripts/native-candidate-files.mjs';
import { fingerprint, treeFingerprint } from '../../../scripts/localization-baseline.mjs';
import { sourceCompilerOptions, sourcePackages } from './build-source-runtime.mjs';
import { verifySourceRuntime } from './verify-source-runtime.mjs';
import {
  candidateBuildEnvironment, candidateHostFiles, frontendAssemblerToolchain, relativeAsset,
  validateTypeEvidence, verifyCandidateImportMap,
} from './assemble-source-candidate.mjs';
import { frontendDistPaths as paths, validateFrontendDistBinding } from './frontend-source-dist.mjs';
export { validateFrontendDistBinding, verifyFrontendSourceCandidateSync } from './frontend-source-dist.mjs';

const verifier = fileURLToPath(import.meta.url);
const assembler = 'modelingweb/app/scripts/assemble-source-candidate.mjs';
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const bind = file => ({ path: file.path, bytes: file.data.length, sha256: hash(file.data) });
const pluginVersions = {
  '@ibiz-template-plugin/ai-chat': '0.0.94',
  '@ibiz-template-plugin/gantt': '0.1.8-alpha.468',
  '@ibiz-template-plugin/data-view': '0.0.8',
  '@ibiz-template-plugin/bi-report': '0.0.32',
};
const repackVersions = {
  interactjs: '1.10.26', axios: '1.13.2', 'cherry-markdown': '0.8.58', echarts: '5.4.3',
  ...Object.fromEntries(['minMax', 'isSameOrBefore', 'quarterOfYear', 'weekOfYear', 'isoWeek', 'customParseFormat']
    .map(name => [`dayjs/plugin/${name}`, '1.11.10'])),
  'mqtt/dist/mqtt.min': '2.18.9',
};

function child(root, path) {
  assert.equal(typeof path, 'string');
  const value = resolve(root, path);
  const part = relative(root, value);
  assert.ok(part && part !== '..' && !part.startsWith(`..${sep}`) && !part.startsWith(sep));
  assert.ok(!/[,\r\n\0:]/.test(value));
  return value;
}

export async function verifyFrontendSourceCandidate(options, {
  verifyFramework = verifySourceRuntime,
  verifyTypes = validateTypeEvidence,
  toolchain = frontendAssemblerToolchain,
} = {}) {
  const { workspace, dist, receipt, receiptSha256 } = paths(options);
  const directories = new PinnedDirectories();
  const boundFiles = [];
  const read = path => {
    const absolute = child(workspace, resolve(workspace, path));
    const file = readPinnedFile(directories, directories.open(dirname(absolute)), basename(absolute));
    const row = { ...file, path: absolute };
    boundFiles.push(row);
    return row;
  };
  const readJson = path => {
    const file = read(path);
    return { file, value: JSON.parse(file.data) };
  };
  const sameFile = expected => {
    assert.deepEqual(Object.keys(expected).sort(), ['bytes', 'path', 'sha256']);
    const file = read(expected.path);
    assert.deepEqual({ ...bind(file), path: relative(workspace, file.path) }, expected);
    return file;
  };
  try {
    const persisted = read(receipt);
    assert.equal(hash(persisted.data), receiptSha256);
    const report = JSON.parse(persisted.data);
    assert.equal(report.schemaVersion, 1);
    assert.equal(report.contract, 'isolated-frontend-source-candidate-v1');
    assert.equal(report.profile, 'native-modeling');
    assert.equal(report.status, 'assembled-not-deployed');
    for (const key of ['productionModified', 'deployable', 'browserVerified', 'nativeAccepted', 'acceptedForProduction']) {
      assert.equal(report[key], false);
    }
    assert.equal(report.assembler.path, assembler);
    sameFile(report.assembler);
    assert.deepEqual(report.compilerOptions, sourceCompilerOptions);
    assert.deepEqual(report.buildEnvironment, candidateBuildEnvironment);
    assert.deepEqual(report.node, {
      executable: process.execPath, version: process.version, ...(await fingerprint(process.execPath)),
    });
    const currentTools = await toolchain();
    assert.deepEqual(report.toolchain, currentTools);
    const frameworkRoot = child(join(workspace, '.artifacts/frontend-source'),
      resolve(workspace, report.frameworkBuild));
    assert.equal(dirname(frameworkRoot), join(workspace, '.artifacts/frontend-source'));
    const frameworkFile = sameFile(report.frameworkReceipt);
    assert.equal(frameworkFile.path, join(frameworkRoot, 'report.json'));
    const framework = JSON.parse(frameworkFile.data);
    assert.deepEqual(framework.packages.map(row => row.name).sort(),
      sourcePackages.map(name => `@ibiz-template/${name}`).sort());
    const verified = await verifyFramework(frameworkRoot, { quiet: true });
    assert.equal(verified.sourceArtifactsVerified, true);
    assert.deepEqual(verified.failures, []);
    assert.deepEqual(await verifyTypes(child(workspace, report.types.path)), report.types);
    const typeReport = readJson(report.types.path);
    assert.equal(bind(typeReport.file).sha256, report.types.sha256);
    assert.deepEqual(typeReport.value.selectedPackages.toSorted(), sourcePackages.toSorted());
    assert.equal(typeReport.value.sourceTypeCheckPassed, true);
    assert.equal(typeReport.value.dependencyProfile, 'candidate');
    assert.deepEqual(typeReport.value.diagnostics, []);
    assert.deepEqual(typeReport.value.inputChanges, []);
    assert.equal(report.hostSource.path, 'modelingweb/app/src');
    assert.deepEqual(report.hostSource.before, report.hostSource.after);
    assert.deepEqual(await treeFingerprint(join(workspace, report.hostSource.path)), report.hostSource.before);
    const captureFile = sameFile(report.captureReceipt);
    const captureRoot = child(join(workspace, '.artifacts/localization-baseline'), dirname(captureFile.path));
    assert.equal(dirname(captureRoot), join(workspace, '.artifacts/localization-baseline'));
    assert.equal(basename(captureFile.path), 'capture-verification.json');
    assert.equal(report.baseline.path, relative(workspace, join(captureRoot, 'modelingweb-dist')));
    const captured = JSON.parse(captureFile.data);
    const capturedDist = await treeFingerprint(join(workspace, report.baseline.path), { exclude: new Set() });
    assert.equal(capturedDist.sha256, report.baseline.sha256);
    assert.equal(captured.copies.find(row => row.path === 'modelingweb-dist')?.sha256, capturedDist.sha256);
    const expectedImportMap = JSON.parse(read(join(workspace,
      report.baseline.path, 'extras/json/system-import.json')).data);
    assert.ok(Array.isArray(report.inputs) && report.inputs.length > 0 && report.inputs.length <= 100_000);
    const seen = new Map();
    for (const input of report.inputs) {
      const file = sameFile(input);
      if (seen.has(file.path)) assert.deepEqual(bind(file), seen.get(file.path));
      seen.set(file.path, bind(file));
    }
    for (const path of ['modelingweb/app/src/main.ts', 'modelingweb/environment.config',
      'modelingweb/app/source-candidate.html', 'modelingweb/app/source-candidate.css']) {
      assert.ok(seen.has(join(workspace, path)), `Required frontend input absent: ${path}`);
    }
    assert.deepEqual(report.framework, framework.packages.map(row => ({
      name: row.name, version: row.sourceVersion,
      output: relative(workspace, join(dist, 'source-runtime', row.name.split('/').at(-1))),
      sourceArtifactHash: row.output.sha256,
    })));
    for (const row of framework.packages) {
      const root = join(dist, 'source-runtime', row.name.split('/').at(-1));
      const output = await treeFingerprint(root,
        { exclude: new Set() });
      assert.equal(output.sha256, row.output.sha256);
      expectedImportMap.imports[row.name] = relativeAsset(dist, join(root, 'index.system.js'));
      const css = row.output.files.filter(file => file.path.endsWith('.css'))
        .map(file => relativeAsset(dist, join(root, file.path)));
      if (css.length) expectedImportMap.styles[row.name] = css.length === 1 ? css[0] : css;
    }
    assert.deepEqual(report.dependencies.map(row => row.name).sort(),
      [...Object.keys(pluginVersions), ...Object.keys(repackVersions)].sort());
    for (const dependency of report.dependencies) {
      let target;
      if (Object.hasOwn(pluginVersions, dependency.name)) {
        assert.equal(dependency.kind, 'existing-plugin-distribution-not-original-source');
        assert.equal(dependency.version, pluginVersions[dependency.name]);
        const root = join(workspace, 'modelingweb/packages-latest', dependency.name);
        assert.deepEqual({ path: relative(workspace, root),
          ...(await treeFingerprint(root, { exclude: new Set() })) }, dependency.input);
        const manifest = readJson(join(root, 'package.json')).value;
        assert.equal(manifest.name, dependency.name);
        assert.equal(manifest.version, dependency.version);
        target = join(dist, 'source-plugins', dependency.name, dependency.version);
        assert.deepEqual(await treeFingerprint(join(target, 'dist'), { exclude: new Set() }),
          await treeFingerprint(join(root, 'dist'), { exclude: new Set() }));
        assert.deepEqual(read(join(target, 'package.json')).data, read(join(root, 'package.json')).data);
        expectedImportMap.imports[dependency.name] = relativeAsset(dist, join(target, manifest.system));
        expectedImportMap.styles[dependency.name] = relativeAsset(dist, join(target, 'dist/style.css'));
      } else {
        assert.equal(dependency.kind, 'repackaged-third-party-distribution-not-framework-source');
        assert.equal(dependency.version, repackVersions[dependency.name]);
        const packageName = dependency.name.startsWith('dayjs/') ? 'dayjs'
          : dependency.name.startsWith('mqtt/') ? 'mqtt' : dependency.name;
        const root = fs.realpathSync(join(workspace,
          packageName === 'interactjs' ? 'modelingweb/source-build-deps/node_modules/interactjs'
            : packageName === 'cherry-markdown'
              ? 'ibiz-app-hub/node_modules/.pnpm/cherry-markdown@0.8.58/node_modules/cherry-markdown'
              : `modelingweb/app/node_modules/${packageName}`));
        const manifestFile = sameFile(dependency.manifest);
        assert.equal(manifestFile.path, join(root, 'package.json'));
        const manifest = JSON.parse(manifestFile.data);
        assert.equal(manifest.name, packageName);
        assert.equal(manifest.version, dependency.version);
        const input = sameFile(dependency.input);
        const entry = packageName === 'interactjs' ? 'dist/interact.min.js'
          : packageName === 'cherry-markdown' ? 'dist/cherry-markdown.esm.js'
            : packageName === 'dayjs' ? `${dependency.name.slice('dayjs/'.length)}.js`
              : packageName === 'mqtt' ? 'dist/mqtt.min.js' : 'index.js';
        assert.equal(input.path, join(root, entry));
        target = join(dist, 'source-externals', dependency.name);
        expectedImportMap.imports[dependency.name] = relativeAsset(dist, join(target, 'index.system.js'));
        if (packageName === 'cherry-markdown') {
          assert.deepEqual(await treeFingerprint(join(target, 'original-dist'), { exclude: new Set() }),
            await treeFingerprint(join(root, 'dist'), { exclude: new Set() }));
          expectedImportMap.styles[dependency.name] = relativeAsset(dist,
            join(target, 'original-dist/cherry-markdown.min.css'));
        }
      }
      assert.deepEqual({ path: relative(workspace, target),
        ...(await treeFingerprint(target, { exclude: new Set() })) }, dependency.output);
    }
    assert.deepEqual(await verifyCandidateImportMap(dist), report.importMapAssets);
    assert.deepEqual(JSON.parse(read(join(dist, 'extras/json/system-import.json')).data), expectedImportMap,
      'Frontend import map differs from the complete reviewed assembly recipe');
    const expectedHost = candidateHostFiles(
      read(join(workspace, 'modelingweb/app/source-candidate.html')).data.toString('utf8'),
      { nativeModeling: true },
    );
    assert.equal(read(join(dist, 'index.html')).data.toString('utf8'), expectedHost.html);
    assert.equal(read(join(dist, 'source-app/environment.js')).data.toString('utf8'), expectedHost.environment);
    assert.equal(report.output.path, relative(workspace, dist));
    const output = await treeFingerprint(dist, { exclude: new Set() });
    assert.deepEqual({ ...output, path: relative(workspace, dist) }, report.output);
    assert.deepEqual(await toolchain(), currentTools);
    for (const file of boundFiles) {
      const current = readPinnedFile(directories,
        directories.open(dirname(file.path)), basename(file.path), file.identity);
      assert.equal(hash(current.data), hash(file.data), 'Frontend input changed during verification');
    }
    const binding = {
      contract: 'native-frontend-source-dist-binding-v1', dist,
      receipt: bind(persisted),
      output: { files: output.files.length, bytes: output.files.reduce((sum, row) => sum + row.bytes, 0),
        sha256: output.sha256 },
    };
    validateFrontendDistBinding(binding, { workspace, dist, receipt, receiptSha256 });
    return binding;
  } finally { directories.close(); }
}

if (process.argv[1] && resolve(process.argv[1]) === verifier) {
  const { values } = parseArgs({ options: {
    dist: { type: 'string' }, receipt: { type: 'string' }, 'receipt-sha256': { type: 'string' },
  } });
  verifyFrontendSourceCandidate({
    dist: values.dist, receipt: values.receipt, receiptSha256: values['receipt-sha256'],
  }).then(binding => console.log(JSON.stringify(binding)))
    .catch(() => { console.error('Independent frontend source candidate verification refused'); process.exitCode = 1; });
}
