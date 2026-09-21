#!/usr/bin/env node
import { createRequire } from 'node:module';
import { existsSync, readFileSync } from 'node:fs';
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import {
  fingerprint,
  treeFingerprint,
} from '../../../scripts/localization-baseline.mjs';
import {
  selectPackages,
  sourcePackages,
  sourceCompilerOptions,
} from './build-source-runtime.mjs';
import { verifySourceDependencies } from '../../source-build-deps/verify.mjs';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspace = resolve(appRoot, '../..');
const sources = join(workspace, 'modelingweb/packages-latest');
const require = createRequire(join(appRoot, 'package.json'));
const ts = require('typescript');
const vueTsc = require('vue-tsc');
const readJson = async path => JSON.parse(await readFile(path, 'utf8'));
const localPath = path => relative(workspace, path);
const aiChatReference = {
  name: '@ibiz-template-plugin/ai-chat',
  version: '0.0.94',
  path: 'modelingweb/packages-latest/@ibiz-template-plugin/ai-chat',
};

export function sourceTypeConfig(
  names,
  { root = workspace, dependencyProfile = 'candidate' } = {},
) {
  if (!['candidate', 'installed'].includes(dependencyProfile))
    throw new Error('Invalid dependency profile');
  names = selectPackages(names.join(','));
  const app = join(root, 'modelingweb/app');
  const sourceRoot = join(root, 'modelingweb/packages-latest');
  const paths = {};
  for (const name of sourcePackages) {
    paths[`@ibiz-template/${name}`] = [
      join(sourceRoot, '@ibiz-template', name, 'src/index.ts'),
    ];
  }
  paths['@ibiz/model-core'] = [
    join(sourceRoot, '@ibiz/model-core/src/index.ts'),
  ];
  const dependencyRoots = [
    join(root, 'modelingweb/source-build-deps/node_modules/*'),
    join(app, 'node_modules/*'),
    join(app, 'node_modules/.pnpm/node_modules/*'),
    join(root, 'ibiz-app-hub/node_modules/*'),
    join(root, 'ibiz-app-hub/node_modules/.pnpm/node_modules/*'),
  ];
  const dependencyNames = new Set();
  for (const name of [
    ...sourcePackages.map(name => `@ibiz-template/${name}`),
    '@ibiz/model-core',
  ]) {
    const packageRoot = join(sourceRoot, name);
    const manifestPath = join(packageRoot, 'package.json');
    if (!existsSync(manifestPath)) continue;
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    for (const field of [
      'dependencies',
      'peerDependencies',
      'devDependencies',
    ]) {
      for (const dependency of Object.keys(manifest[field] || {}))
        dependencyNames.add(dependency);
    }
    for (const file of ts.sys.readDirectory(join(packageRoot, 'src'), [
      '.ts',
      '.tsx',
    ])) {
      const imported = ts.preProcessFile(
        readFileSync(file, 'utf8'),
        true,
        true,
      ).importedFiles;
      for (const { fileName } of imported) {
        if (
          fileName.startsWith('.') ||
          fileName.startsWith('/') ||
          fileName.startsWith('node:')
        )
          continue;
        const dependency = fileName
          .split('/')
          .slice(0, fileName.startsWith('@') ? 2 : 1)
          .join('/');
        dependencyNames.add(dependency);
      }
    }
  }
  for (const name of [...dependencyNames].sort()) {
    if (Object.hasOwn(paths, name)) continue;
    paths[name] = dependencyRoots.map(path => path.replace('*', name));
    paths[`${name}/*`] = dependencyRoots.map(path =>
      path.replace('*', `${name}/*`),
    );
  }
  paths['xlsx-js-style'] = [
    join(root, 'modelingweb/source-build-deps/references/xlsx-js-style'),
  ];
  if (dependencyProfile === 'candidate') {
    paths[aiChatReference.name] = [join(root, aiChatReference.path)];
  } else {
    paths['interactjs'] = [join(app, 'node_modules/interactjs')];
    paths['@interactjs/types'] = [
      join(app, 'node_modules/.pnpm/node_modules/@interactjs/types'),
    ];
  }
  return {
    compilerOptions: {
      target: 'ESNext',
      module: 'ESNext',
      moduleResolution: 'Node',
      lib: ['ESNext', 'DOM', 'DOM.Iterable'],
      strict: true,
      noEmit: true,
      incremental: false,
      skipLibCheck: true,
      isolatedModules: true,
      resolveJsonModule: true,
      esModuleInterop: true,
      experimentalDecorators: true,
      ...sourceCompilerOptions,
      jsx: 'preserve',
      jsxImportSource: 'vue',
      baseUrl: app,
      paths,
      types: ['node', 'systemjs'],
      typeRoots: [
        join(app, 'node_modules/@types'),
        join(app, 'node_modules/.pnpm/node_modules/@types'),
        join(root, 'ibiz-app-hub/node_modules/@types'),
        join(root, 'ibiz-app-hub/node_modules/.pnpm/node_modules/@types'),
      ],
    },
    vueCompilerOptions: { target: 3.3, strictTemplates: true },
    include: names.flatMap(name =>
      ['ts', 'tsx', 'vue'].map(extension =>
        join(sourceRoot, '@ibiz-template', name, `src/**/*.${extension}`),
      ),
    ),
  };
}

export function diagnosticRecord(diagnostic, root = workspace) {
  const position =
    diagnostic.file && diagnostic.start !== undefined
      ? diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start)
      : null;
  return {
    code: diagnostic.code,
    category: ts.DiagnosticCategory[diagnostic.category],
    file: diagnostic.file ? relative(root, diagnostic.file.fileName) : null,
    line: position ? position.line + 1 : null,
    column: position ? position.character + 1 : null,
    message: ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
  };
}

export function checkTypes(rootNames, options) {
  const host = ts.createCompilerHost(options);
  const program = vueTsc.createProgram({ rootNames, options, host });
  return {
    diagnostics: ts
      .getPreEmitDiagnostics(program)
      .map(item => diagnosticRecord(item)),
    checkedFiles: program.getSourceFiles().map(file => file.fileName),
  };
}

export async function auditSourceTypes(
  names,
  { dependencyProfile = 'candidate' } = {},
) {
  names = selectPackages(names.join(','));
  const directory = join(workspace, '.artifacts/frontend-source-types');
  await mkdir(directory, { recursive: true });
  const run = await mkdtemp(
    join(directory, `${new Date().toISOString().replaceAll(':', '-')}-`),
  );
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    status: 'checking',
    selectedPackages: names,
    dependencyProfile,
    sourceTypeCheckPassed: false,
    deployable: false,
    browserVerified: false,
    productionModified: false,
    sources: [],
    inputs: [],
    diagnostics: [],
    scope:
      'Selected framework source and transitively imported source, including TSX/Vue; existing declaration files use skipLibCheck. Not deployment compatibility.',
  };
  try {
    report.sourceDependencies = await verifySourceDependencies();
    report.candidateReferences = [];
    if (dependencyProfile === 'candidate') {
      const root = join(workspace, aiChatReference.path);
      const manifest = await readJson(join(root, 'package.json'));
      if (
        manifest.name !== aiChatReference.name ||
        manifest.version !== aiChatReference.version
      )
        throw new Error('Candidate AI chat reference identity changed');
      const entry = join(root, 'dist/index.es.js');
      const code = ts.createSourceFile(
        entry,
        await readFile(entry, 'utf8'),
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.JS,
      );
      const factoryExport = code.statements.some(
        node =>
          ts.isExportDeclaration(node) &&
          node.exportClause &&
          ts.isNamedExports(node.exportClause) &&
          node.exportClause.elements.some(
            item => item.name.text === 'createFlatChat',
          ),
      );
      if (!factoryExport)
        throw new Error(
          'Candidate AI chat factory is not exported by its actual JS',
        );
      report.candidateReferences.push({
        ...aiChatReference,
        scope:
          'Prebuilt candidate dependency, not recovered plugin source or deployed compatibility',
        manifest: await fingerprint(join(root, 'package.json')),
        javascript: await fingerprint(entry),
        types: await fingerprint(join(root, 'dist/types/index.d.ts')),
        factoryExportVerified: true,
      });
    }
    const config = sourceTypeConfig(names, { dependencyProfile });
    const configFile = join(run, 'tsconfig.json');
    await writeFile(configFile, `${JSON.stringify(config, null, 2)}\n`, {
      flag: 'wx',
    });
    for (const path of [
      fileURLToPath(import.meta.url),
      join(appRoot, 'scripts/build-source-runtime.mjs'),
      join(appRoot, 'pnpm-lock.yaml'),
      join(workspace, 'ibiz-app-hub/pnpm-lock.yaml'),
      join(appRoot, 'node_modules/typescript/package.json'),
      join(appRoot, 'node_modules/vue-tsc/package.json'),
    ]) {
      report.inputs.push({
        path: localPath(path),
        ...(await fingerprint(path)),
      });
    }
    for (const name of [
      ...sourcePackages.map(name => `@ibiz-template/${name}`),
      '@ibiz/model-core',
    ]) {
      const root = join(sources, name);
      const manifest = await readJson(join(root, 'package.json'));
      report.sources.push({
        name,
        version: manifest.version,
        path: localPath(root),
        manifest: await fingerprint(join(root, 'package.json')),
        ...(await treeFingerprint(join(root, 'src'))),
      });
    }
    const parsed = ts.parseJsonConfigFileContent(
      config,
      ts.sys,
      run,
      undefined,
      configFile,
    );
    const rootNames = parsed.fileNames;
    const result = checkTypes(rootNames, parsed.options);
    report.diagnostics = [
      ...parsed.errors.map(error => diagnosticRecord(error)),
      ...result.diagnostics,
    ];
    report.rootFileCount = rootNames.length;
    const sourceRoots = report.sources.map(
      source => join(workspace, source.path, 'src') + '/',
    );
    const isSource = file => sourceRoots.some(root => file.startsWith(root));
    report.checkedSourceFiles = result.checkedFiles
      .filter(isSource)
      .map(localPath)
      .sort();
    report.checkedDependencies = [];
    for (const file of result.checkedFiles) {
      if (isSource(file) || !existsSync(file)) continue;
      report.checkedDependencies.push({
        path: localPath(file),
        ...(await fingerprint(file)),
      });
    }
    const inputChanges = [];
    for (const source of report.sources) {
      const root = join(workspace, source.path);
      if (
        (await treeFingerprint(join(root, 'src'))).sha256 !== source.sha256 ||
        (await fingerprint(join(root, 'package.json'))).sha256 !==
          source.manifest.sha256
      ) {
        inputChanges.push(source.name);
      }
    }
    report.inputChanges = inputChanges;
    report.diagnosticCounts = {};
    for (const diagnostic of report.diagnostics) {
      const key = `TS${diagnostic.code}`;
      report.diagnosticCounts[key] = (report.diagnosticCounts[key] || 0) + 1;
    }
    report.sourceTypeCheckPassed =
      rootNames.length > 0 &&
      !report.diagnostics.some(item => item.category === 'Error') &&
      !inputChanges.length;
    report.status = report.sourceTypeCheckPassed
      ? 'passed-not-deployed'
      : 'failed';
  } catch (error) {
    report.status = 'failed';
    report.error = error.message || String(error);
  }
  report.finishedAt = new Date().toISOString();
  await writeFile(
    join(run, 'report.json'),
    `${JSON.stringify(report, null, 2)}\n`,
    { flag: 'wx' },
  );
  console.log(
    JSON.stringify(
      {
        run,
        status: report.status,
        rootFiles: report.rootFileCount,
        checkedSourceFiles: report.checkedSourceFiles?.length,
        diagnosticCounts: report.diagnosticCounts,
        error: report.error,
        deployable: false,
      },
      null,
      2,
    ),
  );
  return report;
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const { values } = parseArgs({
    options: {
      packages: { type: 'string' },
      'dependency-profile': { type: 'string', default: 'candidate' },
    },
  });
  const report = await auditSourceTypes(selectPackages(values.packages), {
    dependencyProfile: values['dependency-profile'],
  });
  if (!report.sourceTypeCheckPassed) process.exitCode = 1;
}
