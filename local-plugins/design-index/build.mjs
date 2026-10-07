import { createHash } from 'node:crypto';
import {
  closeSync, constants, fstatSync, ftruncateSync, lstatSync,
  mkdirSync, openSync, writeFileSync,
} from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, isAbsolute, join, parse, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const pluginRoot = dirname(fileURLToPath(import.meta.url));
const outputNames = ['index.mjs', 'index.system.js', 'style.css', 'build-receipt.json'];
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const sorted = names => [...names].sort((a, b) => a.localeCompare(b));

function optionalStat(path) {
  try { return lstatSync(path); }
  catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

function checkFile(path, label) {
  const info = optionalStat(path);
  if (info && (info.isSymbolicLink() || !info.isFile() || info.nlink !== 1)) {
    throw new Error(`${label} must be a non-symlink, single-link regular file: ${path}`);
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
      throw new Error(`Build output must have non-symlink directory ancestors: ${current}`);
    }
  }
  for (const name of outputNames) checkFile(join(output, name), 'Build output');
}

function sameIdentity(left, right) {
  return left.dev === right.dev && left.ino === right.ino;
}

function writeArtifacts(output, artifacts) {
  if (process.platform !== 'linux') {
    throw new Error('Safe build output requires Linux directory descriptors and /proc/self/fd.');
  }
  validateOutputPath(output);
  const directories = [];
  const files = [];
  const verify = directory => {
    if (directory.parent) verify(directory.parent);
    const current = optionalStat(directory.entry);
    if (!current?.isDirectory() || current.isSymbolicLink() ||
        !sameIdentity(current, directory.identity) ||
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
      throw new Error(`Build output must have non-symlink directory ancestors: ${path}`);
    }
    const descriptor = openSync(entry, constants.O_RDONLY | constants.O_DIRECTORY | constants.O_NOFOLLOW);
    const directory = { path, parent, entry, descriptor, identity: fstatSync(descriptor),
      access: `/proc/self/fd/${descriptor}` };
    directories.push(directory);
    if (!sameIdentity(info, directory.identity)) throw new Error(`Build output directory changed: ${path}`);
    verify(directory);
    return directory;
  };
  try {
    const directory = pin(output);
    // Pin the destination and validate/open the entire group before truncating any file.
    // Trusted parent ownership and one writer are still required.
    const plans = [...artifacts].map(([name, data]) => {
      const path = join(directory.access, name);
      return { path, data, identity: checkFile(path, 'Build output') };
    });
    for (const plan of [...plans.filter(file => file.identity), ...plans.filter(file => !file.identity)]) {
      verify(directory);
      const flags = constants.O_WRONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK |
        (plan.identity ? 0 : constants.O_CREAT | constants.O_EXCL);
      const descriptor = openSync(plan.path, flags, 0o644);
      const file = { ...plan, descriptor };
      files.push(file);
      const opened = fstatSync(descriptor);
      if (!opened.isFile() || opened.nlink !== 1 ||
          (plan.identity && !sameIdentity(opened, plan.identity))) {
        throw new Error(`Build output file changed: ${plan.path}`);
      }
      file.identity = opened;
    }
    for (const file of files) {
      verify(directory);
      const current = checkFile(file.path, 'Build output');
      if (!current || !sameIdentity(current, file.identity)) {
        throw new Error(`Build output file changed: ${file.path}`);
      }
    }
    for (const file of files) {
      verify(directory);
      const opened = fstatSync(file.descriptor);
      if (!opened.isFile() || opened.nlink !== 1 || !sameIdentity(opened, file.identity)) {
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
    if (info.isSymbolicLink() || !info.isDirectory()) {
      throw new Error(`Source directory must be a non-symlink directory: ${prefix}`);
    }
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = `${prefix}/${entry.name}`;
      if (entry.isDirectory()) await walk(path);
      else {
        if (!checkFile(join(pluginRoot, path), 'Build input')) throw new Error(`Missing build input: ${path}`);
        names.push(path);
      }
    }
  };
  await walk('src');
  return new Map(await Promise.all(sorted(names).map(async path => {
    if (!checkFile(join(pluginRoot, path), 'Build input')) throw new Error(`Missing build input: ${path}`);
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

export async function buildLocalDesignIndex({
  outputDir = join(pluginRoot, 'dist'), writeOutputs = true,
} = {}) {
  if (typeof writeOutputs !== 'boolean') throw new Error('writeOutputs must be boolean.');
  const output = resolve(outputDir);
  const rel = relative(pluginRoot, output);
  if (!rel || rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel)) {
    throw new Error('Build output must be inside the local plugin directory.');
  }
  if (writeOutputs) validateOutputPath(output);
  const inputs = await readInputs();
  const manifest = JSON.parse(inputs.get('package.json'));
  if (manifest.name !== '@aibiz/design-index' || manifest.version !== '0.1.0' ||
      manifest.private !== true || manifest.type !== 'module' ||
      manifest.main !== 'dist/index.mjs' || manifest.module !== 'dist/index.mjs' ||
      manifest.system !== 'dist/index.system.js' ||
      JSON.stringify(manifest.styles) !== '["dist/style.css"]' ||
      Object.hasOwn(manifest, 'gitHead') || Object.keys(manifest.dependencies ?? {}).length ||
      manifest.devDependencies?.rollup !== '4.9.3' ||
      manifest.devDependencies?.typescript !== '5.3.3' ||
      Object.keys(manifest.devDependencies).length !== 2) {
    throw new Error('Expected private independent design-index manifest and pinned host-only build.');
  }
  if (!inputs.has('src/index.ts') || !inputs.has('src/style.css')) {
    throw new Error('Design index requires src/index.ts and src/style.css.');
  }
  const { typescript: ts, rollup, typescriptPath, rollupPath } = loadToolchain();
  const toolchain = {
    typescript: { version: ts.version, sha256: hash(await readFile(typescriptPath)) },
    rollup: { version: rollup.VERSION, sha256: hash(await readFile(rollupPath)) },
  };
  const sources = new Map();
  const diagnosticText = diagnostics => diagnostics.map(item =>
    ts.flattenDiagnosticMessageText(item.messageText, '\n')).join('\n');
  for (const [name, bytes] of inputs) {
    if (!name.startsWith('src/') || !name.endsWith('.ts')) continue;
    const id = join(pluginRoot, name);
    const parsed = ts.createSourceFile(id, bytes.toString('utf8'), ts.ScriptTarget.ES2020, true);
    if (parsed.parseDiagnostics.length) throw new Error(diagnosticText(parsed.parseDiagnostics));
    const compiled = ts.transpileModule(bytes.toString('utf8'), {
      fileName: id, reportDiagnostics: true,
      compilerOptions: {
        module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020,
        useDefineForClassFields: false,
      },
    });
    if (compiled.diagnostics?.length) throw new Error(diagnosticText(compiled.diagnostics));
    sources.set(id, compiled.outputText);
  }
  const peers = new Set(Object.keys(manifest.peerDependencies ?? {}));
  const runtimeImports = new Set();
  const bundle = await rollup.rollup({
    input: join(pluginRoot, 'src/index.ts'),
    external(id) {
      if (!peers.has(id)) return false;
      runtimeImports.add(id);
      return true;
    },
    plugins: [{
      name: 'local-design-index-typescript',
      resolveId(id, importer) {
        if (sources.has(id)) return id;
        if (id.startsWith('.') && importer) {
          const path = resolve(dirname(importer), id);
          const candidates = [path, `${path}.ts`, join(path, 'index.ts')]
            .filter(candidate => sources.has(candidate));
          if (candidates.length !== 1) throw new Error(`Missing or ambiguous local source import: ${id}`);
          return candidates[0];
        }
        throw new Error(`Undeclared host peer or non-local source import: ${id}`);
      },
      load(id) {
        if (!sources.has(id)) throw new Error(`Unrecorded source input: ${id}`);
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
        throw new Error('Design index must build as one host-peer-only module per format.');
      }
      artifacts.set(name, chunk.code);
    }
  } finally {
    await bundle.close();
  }
  if (!runtimeImports.size) throw new Error('Design index must use actual declared host peers.');
  artifacts.set('style.css', inputs.get('src/style.css'));
  const current = await readInputs();
  if (JSON.stringify([...current.keys()]) !== JSON.stringify([...inputs.keys()])) {
    throw new Error('Design index source input set changed during build.');
  }
  for (const [name, bytes] of inputs) {
    if (!current.get(name).equals(bytes)) throw new Error(`Design index source changed during build: ${name}`);
  }
  for (const [name, path] of [['typescript', typescriptPath], ['rollup', rollupPath]]) {
    if (hash(await readFile(path)) !== toolchain[name].sha256) {
      throw new Error(`Design index toolchain changed during build: ${name}`);
    }
  }
  const receipt = {
    schemaVersion: 1,
    package: { name: manifest.name, version: manifest.version },
    sourceStatus: 'independent-local-implementation',
    originalSourceRecovered: false,
    nativeCompatibilityVerified: false,
    supportedPluginCodes: ['DESIGN_INDEX_VIEW'],
    compilerChecks: 'TypeScript isolated transpilation and syntax diagnostics; no full host application typecheck',
    inputs: [...inputs].map(([path, bytes]) => ({ path, sha256: hash(bytes) })),
    outputs: [...artifacts].map(([path, bytes]) => ({ path, sha256: hash(bytes) })),
    toolchain,
    runtimeImports: sorted(runtimeImports),
  };
  if (writeOutputs) {
    writeArtifacts(output, new Map([
      ...artifacts, ['build-receipt.json', `${JSON.stringify(receipt, null, 2)}\n`],
    ]));
  }
  return { receipt, artifacts };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { receipt } = await buildLocalDesignIndex();
  console.log(`${receipt.package.name}@${receipt.package.version}: ${receipt.outputs.length} outputs; index only, host peers external.`);
}
