import { createHash } from 'node:crypto';
import {
  closeSync, constants, fstatSync, ftruncateSync, lstatSync, mkdirSync,
  openSync, readdirSync, writeFileSync,
} from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, isAbsolute, join, parse, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const pluginRoot = dirname(fileURLToPath(import.meta.url));
const outputNames = ['index.mjs', 'index.system.js', 'style.css', 'build-receipt.json'];
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const sorted = values => [...values].sort();

function optionalStat(path) {
  try { return lstatSync(path); }
  catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

function checkFile(path) {
  const info = optionalStat(path);
  if (info && (info.isSymbolicLink() || !info.isFile() || info.nlink !== 1)) {
    throw new Error(`Expected a non-symlink, single-link regular file: ${path}`);
  }
  return info;
}

function validateOutputPath(output) {
  let current = parse(output).root;
  for (const component of output.slice(current.length).split(sep).filter(Boolean)) {
    current = join(current, component);
    const info = optionalStat(current);
    if (!info) return;
    if (info.isSymbolicLink() || !info.isDirectory()) {
      throw new Error(`Build output requires non-symlink directory ancestors: ${current}`);
    }
  }
  validateOutputContents(output);
}

function validateOutputContents(output) {
  for (const entry of readdirSync(output)) {
    if (!outputNames.includes(entry)) throw new Error(`Unexpected build output: ${entry}`);
  }
  for (const name of outputNames) checkFile(join(output, name));
}

const sameIdentity = (left, right) => left.dev === right.dev && left.ino === right.ino;

function writeArtifacts(output, artifacts) {
  if (process.platform !== 'linux') {
    throw new Error('Safe output writing requires Linux directory descriptors and /proc/self/fd.');
  }
  validateOutputPath(output);
  const directories = [];
  const files = [];
  const verify = directory => {
    if (directory.parent) verify(directory.parent);
    const info = optionalStat(directory.entry);
    if (!info?.isDirectory() || info.isSymbolicLink() ||
        !sameIdentity(info, directory.identity) ||
        !sameIdentity(fstatSync(directory.descriptor), directory.identity)) {
      throw new Error(`Build output directory changed: ${directory.path}`);
    }
  };
  const pin = path => {
    const parent = path === parse(path).root ? null : pin(dirname(path));
    const entry = parent ? join(parent.access, relative(dirname(path), path)) : path;
    if (parent) verify(parent);
    if (!optionalStat(entry)) mkdirSync(entry);
    const info = lstatSync(entry);
    if (info.isSymbolicLink() || !info.isDirectory()) {
      throw new Error(`Build output requires non-symlink directory ancestors: ${path}`);
    }
    const descriptor = openSync(entry, constants.O_RDONLY | constants.O_DIRECTORY | constants.O_NOFOLLOW);
    const directory = {
      path, parent, entry, descriptor, identity: fstatSync(descriptor),
      access: `/proc/self/fd/${descriptor}`,
    };
    directories.push(directory);
    if (!sameIdentity(info, directory.identity)) throw new Error(`Build output directory changed: ${path}`);
    verify(directory);
    return directory;
  };
  try {
    const directory = pin(output);
    validateOutputContents(directory.access);
    // Validate and pin the whole group before truncating any previous build output.
    const plans = [...artifacts].map(([name, data]) => {
      const path = join(directory.access, name);
      return { path, data, identity: checkFile(path) };
    });
    for (const plan of [...plans.filter(item => item.identity), ...plans.filter(item => !item.identity)]) {
      verify(directory);
      const descriptor = openSync(plan.path, constants.O_WRONLY | constants.O_NOFOLLOW |
        constants.O_NONBLOCK | (plan.identity ? 0 : constants.O_CREAT | constants.O_EXCL), 0o644);
      const file = { ...plan, descriptor };
      files.push(file);
      const info = fstatSync(descriptor);
      if (!info.isFile() || info.nlink !== 1 ||
          (plan.identity && !sameIdentity(info, plan.identity))) {
        throw new Error(`Build output file changed: ${plan.path}`);
      }
      file.identity = info;
    }
    for (const file of files) {
      verify(directory);
      const info = checkFile(file.path);
      if (!info || !sameIdentity(info, file.identity)) throw new Error(`Build output file changed: ${file.path}`);
    }
    for (const file of files) {
      verify(directory);
      const info = fstatSync(file.descriptor);
      if (!info.isFile() || info.nlink !== 1 || !sameIdentity(info, file.identity)) {
        throw new Error(`Build output file changed: ${file.path}`);
      }
      ftruncateSync(file.descriptor, 0);
      writeFileSync(file.descriptor, file.data);
    }
  } finally {
    for (const file of files.reverse()) closeSync(file.descriptor);
    for (const directory of directories.reverse()) closeSync(directory.descriptor);
  }
}

async function readInputs() {
  const names = ['build.mjs', 'package.json'];
  const walk = async prefix => {
    const directory = join(pluginRoot, prefix);
    const info = lstatSync(directory);
    if (info.isSymbolicLink() || !info.isDirectory()) throw new Error(`Unsafe source directory: ${prefix}`);
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const name = `${prefix}/${entry.name}`;
      if (entry.isDirectory()) await walk(name);
      else {
        if (!checkFile(join(pluginRoot, name))) throw new Error(`Missing source input: ${name}`);
        names.push(name);
      }
    }
  };
  await walk('src');
  return new Map(await Promise.all(sorted(names).map(async path => {
    if (!checkFile(join(pluginRoot, path))) throw new Error(`Missing build input: ${path}`);
    return [path, await readFile(join(pluginRoot, path))];
  })));
}

function loadToolchain() {
  const localRequire = createRequire(join(pluginRoot, 'package.json'));
  const appRequire = createRequire(resolve(pluginRoot, '../../app/package.json'));
  let typescriptPath;
  let rollupPath;
  try { typescriptPath = localRequire.resolve('typescript'); }
  catch { typescriptPath = appRequire.resolve('typescript'); }
  try { rollupPath = localRequire.resolve('rollup'); }
  catch { rollupPath = createRequire(appRequire.resolve('vite')).resolve('rollup'); }
  const typescript = localRequire(typescriptPath);
  const rollup = localRequire(rollupPath);
  if (typescript.version !== '5.3.3' || rollup.VERSION !== '4.9.3') {
    throw new Error(`Expected TypeScript 5.3.3 / Rollup 4.9.3; found ${typescript.version} / ${rollup.VERSION}.`);
  }
  return { typescript, rollup, typescriptPath, rollupPath };
}

export async function buildLocalModelEdit({
  outputDir = join(pluginRoot, 'dist'), writeOutputs = true,
} = {}) {
  if (typeof writeOutputs !== 'boolean') throw new Error('writeOutputs must be boolean.');
  const output = resolve(outputDir);
  const rel = relative(pluginRoot, output);
  if (!rel || rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel) ||
      !(rel === 'dist' || rel.startsWith(`.tmp${sep}`))) {
    throw new Error('Build output must be dist or an isolated .tmp subdirectory inside this package.');
  }
  if (writeOutputs) validateOutputPath(output);
  const inputs = await readInputs();
  const manifest = JSON.parse(inputs.get('package.json'));
  const expectedPeers = {
    '@ibiz-template/runtime': '0.7.41-alpha.86', '@monaco-editor/loader': '1.7.0', vue: '3.3.8',
  };
  if (manifest.name !== '@aibiz/model-edit' || manifest.version !== '0.1.0' ||
      manifest.private !== true || manifest.type !== 'module' ||
      manifest.main !== 'dist/index.mjs' || manifest.module !== 'dist/index.mjs' ||
      manifest.system !== 'dist/index.system.js' ||
      JSON.stringify(manifest.styles) !== '["dist/style.css"]' ||
      Object.hasOwn(manifest, 'gitHead') || Object.keys(manifest.dependencies ?? {}).length ||
      JSON.stringify(manifest.peerDependencies) !== JSON.stringify(expectedPeers) ||
      manifest.devDependencies?.rollup !== '4.9.3' || manifest.devDependencies?.typescript !== '5.3.3' ||
      Object.keys(manifest.devDependencies).length !== 2 ||
      JSON.stringify(manifest.aibiz?.supportedPluginTypes) !== '["DEUIACTION"]' ||
      JSON.stringify(manifest.aibiz?.supportedPluginCodes) !== '["MODEL_EDIT"]') {
    throw new Error('Expected independent model-edit identity and pinned host-only manifest.');
  }
  const { typescript: ts, rollup, typescriptPath, rollupPath } = loadToolchain();
  const toolchain = {
    typescript: { version: ts.version, sha256: hash(await readFile(typescriptPath)) },
    rollup: { version: rollup.VERSION, sha256: hash(await readFile(rollupPath)) },
  };
  const diagnosticsText = items => items.map(item =>
    `${item.file ? `${relative(pluginRoot, item.file.fileName)}: ` : ''}${ts.flattenDiagnosticMessageText(item.messageText, '\n')}`
  ).join('\n');
  const pureFiles = ['src/contracts.ts', 'src/session.ts', 'src/monaco.ts'];
  const options = {
    target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext,
    strict: true, noEmit: true, types: [], lib: ['lib.es2020.d.ts', 'lib.dom.d.ts'],
  };
  const compilerHost = ts.createCompilerHost(options);
  const originalGetSource = compilerHost.getSourceFile.bind(compilerHost);
  compilerHost.getSourceFile = (path, languageVersion, ...args) => {
    const bytes = inputs.get(relative(pluginRoot, path).split(sep).join('/'));
    return bytes ? ts.createSourceFile(path, bytes.toString('utf8'), languageVersion, true)
      : originalGetSource(path, languageVersion, ...args);
  };
  const program = ts.createProgram(pureFiles.map(name => join(pluginRoot, name)), options, compilerHost);
  const semanticDiagnostics = ts.getPreEmitDiagnostics(program);
  if (semanticDiagnostics.length) throw new Error(diagnosticsText(semanticDiagnostics));
  const sources = new Map();
  for (const [name, bytes] of inputs) {
    if (!name.startsWith('src/')) continue;
    if (name === 'src/style.css') continue;
    if (!name.endsWith('.ts')) throw new Error(`Unsupported executable source: ${name}`);
    const id = join(pluginRoot, name);
    const parsed = ts.createSourceFile(id, bytes.toString('utf8'), ts.ScriptTarget.ES2020, true);
    if (parsed.parseDiagnostics.length) throw new Error(diagnosticsText(parsed.parseDiagnostics));
    const compiled = ts.transpileModule(bytes.toString('utf8'), {
      fileName: id, reportDiagnostics: true,
      compilerOptions: {
        target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext, useDefineForClassFields: false,
      },
    });
    if (compiled.diagnostics?.length) throw new Error(diagnosticsText(compiled.diagnostics));
    sources.set(id, compiled.outputText);
  }
  if (!sources.has(join(pluginRoot, 'src/index.ts')) || !inputs.get('src/style.css')?.length) {
    throw new Error('Model edit requires an entry point and nonempty scoped CSS.');
  }
  const peers = new Set(Object.keys(expectedPeers));
  const runtimeImports = new Set();
  const bundle = await rollup.rollup({
    input: join(pluginRoot, 'src/index.ts'),
    external(id) {
      if (!peers.has(id)) return false;
      runtimeImports.add(id);
      return true;
    },
    plugins: [{
      name: 'local-model-edit-typescript',
      resolveId(id, importer) {
        if (sources.has(id)) return id;
        if (id.startsWith('.') && importer) {
          const path = resolve(dirname(importer), id);
          const candidates = [path, `${path}.ts`, join(path, 'index.ts')].filter(name => sources.has(name));
          if (candidates.length !== 1) throw new Error(`Missing or ambiguous local source import: ${id}`);
          return candidates[0];
        }
        throw new Error(`Undeclared host peer or non-local source import: ${id}`);
      },
      load(id) {
        if (!sources.has(id)) throw new Error(`Unrecorded source: ${id}`);
        return sources.get(id);
      },
    }],
    onwarn(warning) { throw new Error(warning.message); },
  });
  const artifacts = new Map();
  try {
    for (const [format, name] of [['es', 'index.mjs'], ['system', 'index.system.js']]) {
      const generated = await bundle.generate({ format, sourcemap: false });
      const chunk = generated.output[0];
      if (generated.output.length !== 1 || chunk.type !== 'chunk' ||
          chunk.dynamicImports.length || chunk.imports.some(id => !peers.has(id))) {
        throw new Error('Model edit must be a single host-peer-only module per format.');
      }
      artifacts.set(name, chunk.code);
    }
  } finally {
    await bundle.close();
  }
  if (JSON.stringify(sorted(runtimeImports)) !== JSON.stringify(sorted(peers))) {
    throw new Error('Model edit must use all pinned host peers and no other runtime imports.');
  }
  artifacts.set('style.css', inputs.get('src/style.css'));
  const current = await readInputs();
  if (JSON.stringify([...current.keys()]) !== JSON.stringify([...inputs.keys()])) {
    throw new Error('Source input set changed during build.');
  }
  for (const [name, bytes] of inputs) {
    if (!current.get(name).equals(bytes)) throw new Error(`Source changed during build: ${name}`);
  }
  for (const [name, path] of [['typescript', typescriptPath], ['rollup', rollupPath]]) {
    if (hash(await readFile(path)) !== toolchain[name].sha256) throw new Error(`Toolchain changed: ${name}`);
  }
  const receipt = {
    schemaVersion: 1,
    package: { name: manifest.name, version: manifest.version },
    sourceStatus: 'independent-local-implementation',
    originalSourceRecovered: false, nativeCompatibilityVerified: false, acceptedForProduction: false,
    supportedPluginTypes: ['DEUIACTION'], supportedPluginCodes: ['MODEL_EDIT'],
    upstreamReference: manifest.aibiz.upstreamReference,
    dependencyRebase: {
      referenceRuntime: '0.7.41-alpha.31', hostRuntime: '0.7.41-alpha.86',
      referenceVue: '^3.3.8', hostVue: '3.3.8',
      referenceLoader: '^1.4.0', hostLoader: '1.7.0', monacoAssets: '0.52.2',
      referenceTypeScript: '~5.2.2', buildTypeScript: '5.3.3', buildRollup: '4.9.3',
    },
    compilerChecks: {
      strictSemanticFiles: pureFiles,
      allTypeScriptSyntaxAndIsolatedTranspilation: true, fullHostApplicationTypecheck: false,
    },
    inputs: [...inputs].map(([path, bytes]) => ({ path, sha256: hash(bytes) })),
    toolchain, runtimeImports: sorted(runtimeImports),
    outputs: [...artifacts].map(([path, bytes]) => ({ path, sha256: hash(bytes) })),
  };
  if (writeOutputs) {
    writeArtifacts(output, new Map([
      ...artifacts, ['build-receipt.json', `${JSON.stringify(receipt, null, 2)}\n`],
    ]));
  }
  return { artifacts, receipt };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { receipt } = await buildLocalModelEdit();
  console.log(`${receipt.package.name}@${receipt.package.version}: ${receipt.outputs.length} outputs; MODEL_EDIT only; native acceptance false.`);
}
