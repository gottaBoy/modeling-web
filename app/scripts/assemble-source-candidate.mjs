#!/usr/bin/env node
import { createRequire } from 'node:module';
import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  writeFile,
} from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import {
  fingerprint,
  treeFingerprint,
} from '../../../scripts/localization-baseline.mjs';
import { verifySourceRuntime } from './verify-source-runtime.mjs';
import { containedFile, mappedAssetPath } from './audit-source-contracts.mjs';
import { sourceCompilerOptions } from './build-source-runtime.mjs';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspace = resolve(appRoot, '../..');
const require = createRequire(join(appRoot, 'package.json'));
const hubRequire = createRequire(join(workspace, 'ibiz-app-hub/package.json'));
const json = async path => JSON.parse(await readFile(path, 'utf8'));
const local = path => relative(workspace, path);

export function relativeAsset(dist, path) {
  return relative(join(dist, 'extras/json'), path).split('\\').join('/');
}

export async function verifyCandidateImportMap(dist) {
  const file = join(dist, 'extras/json/system-import.json');
  const map = await json(file);
  const assets = [];
  for (const group of ['imports', 'styles']) {
    for (const [name, value] of Object.entries(map[group] || {})) {
      for (const reference of Array.isArray(value) ? value : [value]) {
        const path = mappedAssetPath(dist, file, reference);
        if (!path) throw new Error(`Nonlocal candidate mapping: ${name}`);
        const actual = await containedFile(dist, path);
        assets.push({
          group,
          name,
          path: relative(dist, actual),
          ...(await fingerprint(actual)),
        });
      }
    }
  }
  return assets;
}

export async function validateTypeEvidence(path) {
  path = await containedFile(
    join(workspace, '.artifacts/frontend-source-types'),
    resolve(path),
  );
  const report = await json(path);
  if (
    !report.sourceTypeCheckPassed ||
    report.dependencyProfile !== 'candidate' ||
    report.diagnostics.length ||
    report.inputChanges.length
  )
    throw new Error('Candidate types have not passed');
  for (const input of report.inputs) {
    if (
      (await fingerprint(join(workspace, input.path))).sha256 !== input.sha256
    )
      throw new Error(`Type input changed: ${input.path}`);
  }
  for (const source of report.sources) {
    if (
      (await treeFingerprint(join(workspace, source.path, 'src'))).sha256 !==
      source.sha256
    )
      throw new Error(`Typed source changed: ${source.name}`);
  }
  for (const dependency of report.checkedDependencies) {
    if (
      (await fingerprint(join(workspace, dependency.path))).sha256 !==
      dependency.sha256
    )
      throw new Error(`Typed dependency changed: ${dependency.path}`);
  }
  return {
    path: local(path),
    ...(await fingerprint(path)),
    dependencyProfile: report.dependencyProfile,
  };
}

export async function assembleCandidate({
  frameworkBuild,
  typeReport,
  baseline,
}) {
  frameworkBuild = await containedFile(
    join(workspace, '.artifacts/frontend-source'),
    resolve(frameworkBuild),
  );
  baseline = await containedFile(
    join(workspace, '.artifacts/localization-baseline'),
    resolve(baseline),
  );
  const integrity = await verifySourceRuntime(frameworkBuild, { quiet: true });
  if (!integrity.sourceArtifactsVerified)
    throw new Error(integrity.failures.join('\n'));
  const types = await validateTypeEvidence(typeReport);
  const framework = await json(join(frameworkBuild, 'report.json'));
  if (framework.packages.length !== 7)
    throw new Error('A full seven-package build is required');
  const parent = join(workspace, '.artifacts/frontend-candidates');
  await mkdir(parent, { recursive: true });
  const run = await mkdtemp(
    join(parent, `${new Date().toISOString().replaceAll(':', '-')}-`),
  );
  const dist = join(run, 'dist');
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    status: 'assembling',
    productionModified: false,
    deployable: false,
    browserVerified: false,
    frameworkBuild: local(frameworkBuild),
    types,
    framework: [],
    dependencies: [],
    inputs: [],
    warnings: [],
    scope:
      'Exploratory isolated app; peer-range reconciliation and authenticated browser workflows are not certified.',
  };
  try {
    report.assembler = {
      path: local(fileURLToPath(import.meta.url)),
      ...(await fingerprint(fileURLToPath(import.meta.url))),
    };
    const capture = await json(join(baseline, 'capture-verification.json'));
    const originalDist = join(baseline, 'modelingweb-dist');
    const original = await treeFingerprint(originalDist, {
      exclude: new Set(),
    });
    if (
      original.sha256 !==
      capture.copies.find(copy => copy.path === 'modelingweb-dist')?.sha256
    )
      throw new Error('Captured deployment bytes changed');
    report.baseline = { path: local(originalDist), sha256: original.sha256 };
    await cp(originalDist, dist, {
      recursive: true,
      force: false,
      errorOnExist: true,
    });
    const importMapPath = join(dist, 'extras/json/system-import.json');
    const importMap = await json(importMapPath);
    for (const entry of framework.packages) {
      const target = join(dist, 'source-runtime', entry.name.split('/').at(-1));
      await cp(join(workspace, entry.output.path), target, {
        recursive: true,
        force: false,
        errorOnExist: true,
      });
      importMap.imports[entry.name] = relativeAsset(
        dist,
        join(target, 'index.system.js'),
      );
      const css = entry.output.files
        .filter(file => file.path.endsWith('.css'))
        .map(file => relativeAsset(dist, join(target, file.path)));
      if (css.length)
        importMap.styles[entry.name] = css.length === 1 ? css[0] : css;
      report.framework.push({
        name: entry.name,
        version: entry.sourceVersion,
        output: local(target),
        sourceArtifactHash: entry.output.sha256,
      });
    }
    const { build } = await import(
      pathToFileURL(
        join(
          dirname(require.resolve('vite/package.json')),
          'dist/node/index.js',
        ),
      )
    );
    const { nodeResolve } = hubRequire('@rollup/plugin-node-resolve');
    const externalNames = new Set(Object.keys(importMap.imports));
    const entriesRoot = join(run, 'entries');
    await mkdir(entriesRoot);
    const modulePaths = [
      join(workspace, 'modelingweb/source-build-deps/node_modules'),
      join(appRoot, 'node_modules'),
      join(appRoot, 'node_modules/.pnpm/node_modules'),
      join(workspace, 'ibiz-app-hub/node_modules'),
      join(workspace, 'ibiz-app-hub/node_modules/.pnpm/node_modules'),
    ];
    async function compile(entry, target, label) {
      const dependencies = new Set();
      await build({
        configFile: false,
        root: appRoot,
        publicDir: false,
        logLevel: 'warn',
        cacheDir: join(run, 'cache', label),
        esbuild: { tsconfigRaw: { compilerOptions: sourceCompilerOptions } },
        plugins: [
          {
            ...nodeResolve({
              browser: true,
              rootDir: appRoot,
              modulePaths,
              preferBuiltins: false,
            }),
            enforce: 'pre',
          },
          {
            name: 'candidate-input-receipt',
            generateBundle() {
              for (const id of this.getModuleIds())
                if (id.startsWith('/') && !id.includes('?'))
                  dependencies.add(id);
            },
          },
        ],
        build: {
          outDir: target,
          emptyOutDir: true,
          sourcemap: true,
          minify: 'esbuild',
          lib: {
            entry,
            formats: ['system'],
            fileName: () => 'index.system.js',
          },
          commonjsOptions: {
            include: [/node_modules/, /localization-baseline/],
            transformMixedEsModules: true,
          },
          rollupOptions: {
            external: id => externalNames.has(id),
            onwarn(warning, warn) {
              if (
                ['MISSING_EXPORT', 'UNRESOLVED_IMPORT'].includes(warning.code)
              )
                throw new Error(warning.message);
              if (warning.code !== 'UNUSED_EXTERNAL_IMPORT') warn(warning);
            },
          },
        },
      });
      for (const path of dependencies)
        report.inputs.push({ path: local(path), ...(await fingerprint(path)) });
    }
    async function repack({
      name,
      root,
      entry,
      version,
      namespaceDefault = false,
      assets = false,
      css,
    }) {
      root = await containedFile(workspace, root);
      const manifest = await json(join(root, 'package.json'));
      if (manifest.version !== version)
        throw new Error(`Unexpected dependency version: ${name}`);
      const target = join(dist, 'source-externals', name);
      const input = await containedFile(root, join(root, entry));
      const wrapper = join(entriesRoot, `${name.replaceAll('/', '_')}.mjs`);
      const spec = JSON.stringify(input);
      const code = namespaceDefault
        ? `import * as library from ${spec};\nexport * from ${spec};\nexport default library;\n`
        : `export * from ${spec};\nexport { default } from ${spec};\n`;
      await writeFile(wrapper, code, { flag: 'wx' });
      await compile(wrapper, target, name.replaceAll('/', '_'));
      if (assets)
        await cp(join(root, 'dist'), join(target, 'original-dist'), {
          recursive: true,
        });
      importMap.imports[name] = relativeAsset(
        dist,
        join(target, 'index.system.js'),
      );
      if (css)
        importMap.styles[name] = relativeAsset(
          dist,
          join(target, 'original-dist', css),
        );
      report.dependencies.push({
        name,
        version,
        kind: 'repackaged-third-party-distribution-not-framework-source',
        manifest: {
          path: local(join(root, 'package.json')),
          ...(await fingerprint(join(root, 'package.json'))),
        },
        input: { path: local(input), ...(await fingerprint(input)) },
        output: {
          path: local(target),
          ...(await treeFingerprint(target, { exclude: new Set() })),
        },
      });
    }
    for (const [name, version] of [
      ['ai-chat', '0.0.94'],
      ['gantt', '0.1.8-alpha.468'],
      ['data-view', '0.0.8'],
      ['bi-report', '0.0.32'],
    ]) {
      const fullName = `@ibiz-template-plugin/${name}`;
      const root = join(workspace, 'modelingweb/packages-latest', fullName);
      const manifest = await json(join(root, 'package.json'));
      if (manifest.version !== version)
        throw new Error(`Candidate plugin version changed: ${fullName}`);
      const target = join(dist, 'source-plugins', fullName, version);
      await mkdir(target, { recursive: true });
      await cp(join(root, 'dist'), join(target, 'dist'), { recursive: true });
      await cp(join(root, 'package.json'), join(target, 'package.json'));
      importMap.imports[fullName] = relativeAsset(
        dist,
        join(target, manifest.system),
      );
      importMap.styles[fullName] = relativeAsset(
        dist,
        join(target, 'dist/style.css'),
      );
      report.dependencies.push({
        name: fullName,
        version,
        kind: 'existing-plugin-distribution-not-original-source',
        input: {
          path: local(root),
          ...(await treeFingerprint(root, { exclude: new Set() })),
        },
        output: {
          path: local(target),
          ...(await treeFingerprint(target, { exclude: new Set() })),
        },
      });
    }
    await repack({
      name: 'interactjs',
      version: '1.10.26',
      root: modulePaths[0] + '/interactjs',
      entry: 'dist/interact.min.js',
    });
    await repack({
      name: 'axios',
      version: '1.13.2',
      root: join(appRoot, 'node_modules/axios'),
      entry: 'index.js',
    });
    await repack({
      name: 'cherry-markdown',
      version: '0.8.58',
      root: join(
        workspace,
        'ibiz-app-hub/node_modules/.pnpm/cherry-markdown@0.8.58/node_modules/cherry-markdown',
      ),
      entry: 'dist/cherry-markdown.esm.js',
      assets: true,
      css: 'cherry-markdown.min.css',
    });
    await repack({
      name: 'echarts',
      version: '5.4.3',
      root: join(appRoot, 'node_modules/echarts'),
      entry: 'index.js',
      namespaceDefault: true,
    });
    for (const name of [
      'minMax',
      'isSameOrBefore',
      'quarterOfYear',
      'weekOfYear',
      'isoWeek',
      'customParseFormat',
    ])
      await repack({
        name: `dayjs/plugin/${name}`,
        version: '1.11.10',
        root: join(appRoot, 'node_modules/dayjs'),
        entry: `plugin/${name}.js`,
      });
    await repack({
      name: 'mqtt/dist/mqtt.min',
      version: '2.18.9',
      root: join(appRoot, 'node_modules/mqtt'),
      entry: 'dist/mqtt.min.js',
    });
    await compile(
      join(appRoot, 'src/main.ts'),
      join(dist, 'source-app'),
      'bootstrap',
    );
    const polyfills = (await readdir(join(originalDist, 'assets'))).filter(
      name => /^polyfills-legacy-.+\.js$/.test(name),
    );
    if (polyfills.length !== 1)
      throw new Error('Ambiguous baseline polyfill artifact');
    await cp(
      join(originalDist, 'assets', polyfills[0]),
      join(dist, 'source-app/polyfills.js'),
    );
    await writeFile(
      join(dist, 'source-app/environment.js'),
      "Object.assign(window.Environment, { pluginBaseUrl: '/modeldesign/plugins' });\n",
      { flag: 'wx' },
    );
    await cp(join(appRoot, 'source-candidate.html'), join(dist, 'index.html'));
    await cp(
      join(appRoot, 'source-candidate.css'),
      join(dist, 'source-app/candidate.css'),
    );
    report.inputs.push({
      path: local(join(appRoot, 'source-candidate.css')),
      ...(await fingerprint(join(appRoot, 'source-candidate.css'))),
    });
    await writeFile(importMapPath, `${JSON.stringify(importMap, null, 2)}\n`);
    report.importMapAssets = await verifyCandidateImportMap(dist);
    report.inputs.push({
      path: local(join(appRoot, 'source-candidate.html')),
      ...(await fingerprint(join(appRoot, 'source-candidate.html'))),
    });
    report.output = {
      path: local(dist),
      ...(await treeFingerprint(dist, { exclude: new Set() })),
    };
    report.status = 'assembled-not-deployed';
    report.warnings.push(
      'Retained baseline third-party assets and polyfills are not compiled framework source.',
      'Framework peer ranges and remaining external versions still require reviewed deployment contracts.',
    );
  } catch (error) {
    report.status = 'failed';
    report.error = error.message;
  }
  report.finishedAt = new Date().toISOString();
  await writeFile(
    join(run, 'report.json'),
    `${JSON.stringify(report, null, 2)}\n`,
    { flag: 'wx' },
  );
  console.log(
    JSON.stringify(
      { run, status: report.status, error: report.error, deployable: false },
      null,
      2,
    ),
  );
  return { run, report };
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const { values } = parseArgs({
    options: {
      'framework-build': { type: 'string' },
      'type-report': { type: 'string' },
      baseline: { type: 'string' },
    },
  });
  if (!values['framework-build'] || !values['type-report'] || !values.baseline)
    throw new Error('Required: --framework-build --type-report --baseline');
  const { report } = await assembleCandidate({
    frameworkBuild: values['framework-build'],
    typeReport: values['type-report'],
    baseline: values.baseline,
  });
  if (report.status === 'failed') process.exitCode = 1;
}
