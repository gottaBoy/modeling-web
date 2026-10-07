import { createHash } from 'node:crypto';
import {
  closeSync, constants, existsSync, fstatSync, ftruncateSync, lstatSync,
  mkdirSync, openSync, writeFileSync,
} from 'node:fs';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, isAbsolute, join, parse, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const pluginRoot = dirname(fileURLToPath(import.meta.url));
export const inputNames = ['build.mjs', 'package.json', 'src/index.ts'];
const hash = data => createHash('sha256').update(data).digest('hex');
const outputNames = ['index.mjs', 'index.system.js', 'build-receipt.json'];

function optionalStat(path) {
  try { return lstatSync(path); }
  catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

function checkOutputFile(path) {
  const info = optionalStat(path);
  if (info && (info.isSymbolicLink() || !info.isFile() || info.nlink !== 1)) {
    throw new Error(`Build output must be a non-symlink, single-link regular file: ${path}`);
  }
  return info;
}

function validateOutputPath(output) {
  let current = parse(output).root;
  for (const part of output.slice(current.length).split(sep).filter(Boolean)) {
    current = join(current, part);
    const info = optionalStat(current);
    if (!info) return;
    if (info.isSymbolicLink() || !info.isDirectory()) {
      throw new Error(`Build output directory must have non-symlink directory ancestors: ${current}`);
    }
  }
  for (const name of outputNames) checkOutputFile(join(output, name));
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
      throw new Error(`Build output directory changed: ${directory.entry}`);
    }
  };
  const pin = path => {
    const parent = path === parse(path).root ? null : pin(dirname(path));
    const entry = parent ? join(parent.access, relative(dirname(path), path)) : path;
    if (parent) verify(parent);
    if (!optionalStat(entry)) mkdirSync(entry);
    const info = lstatSync(entry);
    if (info.isSymbolicLink() || !info.isDirectory()) {
      throw new Error(`Build output directory must have non-symlink directory ancestors: ${path}`);
    }
    const descriptor = openSync(entry, constants.O_RDONLY | constants.O_DIRECTORY | constants.O_NOFOLLOW);
    const directory = { parent, entry, descriptor, identity: fstatSync(descriptor),
      access: `/proc/self/fd/${descriptor}` };
    directories.push(directory);
    if (!sameIdentity(info, directory.identity)) throw new Error(`Build output directory changed: ${path}`);
    verify(directory);
    return directory;
  };
  try {
    const directory = pin(output);
    // Validate the entire group before opening any destination, without truncation.
    const plans = [...artifacts].map(([name, data]) => {
      const path = join(directory.access, name);
      return { path, data, identity: checkOutputFile(path) };
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
          (plan.identity && !sameIdentity(plan.identity, opened))) {
        throw new Error(`Build output file changed: ${plan.path}`);
      }
      file.identity = opened;
    }
    verify(directory);
    for (const file of files) {
      const current = checkOutputFile(file.path);
      if (!current || !sameIdentity(current, file.identity)) {
        throw new Error(`Build output file changed: ${file.path}`);
      }
    }
    for (const file of files) {
      verify(directory);
      ftruncateSync(file.descriptor, 0);
      writeFileSync(file.descriptor, file.data);
    }
  } finally {
    for (const file of files.reverse()) closeSync(file.descriptor);
    for (const directory of directories.reverse()) closeSync(directory.descriptor);
  }
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

export async function buildLocalGlobalUtil({ outputDir = join(pluginRoot, 'dist'), writeOutputs = true } = {}) {
  if (typeof writeOutputs !== 'boolean') throw new Error('writeOutputs must be boolean.');
  const output = resolve(outputDir);
  const rel = relative(pluginRoot, output);
  if (!rel || rel.startsWith('..') || isAbsolute(rel)) {
    throw new Error('Build output must be inside the local plugin directory.');
  }
  if (writeOutputs) validateOutputPath(output);
  const { typescript: ts, rollup, typescriptPath, rollupPath } = loadToolchain();
  const program = ts.createProgram([join(pluginRoot, 'src/index.ts')], {
    module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020,
    strict: true, noEmit: true,
  });
  const diagnostics = ts.getPreEmitDiagnostics(program);
  if (diagnostics.length) {
    throw new Error(diagnostics.map(item =>
      ts.flattenDiagnosticMessageText(item.messageText, '\n')).join('\n'));
  }
  const bundle = await rollup.rollup({
    input: join(pluginRoot, 'src/index.ts'),
    external: [],
    plugins: [{
      name: 'local-typescript-source',
      resolveId(id, importer) {
        if (!id.startsWith('.') || !importer) return null;
        const file = resolve(dirname(importer), id.endsWith('.ts') ? id : `${id}.ts`);
        if (!existsSync(file)) throw new Error(`Missing local source import: ${file}`);
        return file;
      },
      transform(code, id) {
        if (!id.endsWith('.ts')) return null;
        const compiled = ts.transpileModule(code, {
          fileName: id,
          reportDiagnostics: true,
          compilerOptions: {
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ES2020,
            useDefineForClassFields: false,
          },
        });
        const errors = compiled.diagnostics?.filter(item => item.category === ts.DiagnosticCategory.Error) || [];
        if (errors.length) {
          throw new Error(errors.map(item => ts.flattenDiagnosticMessageText(item.messageText, '\n')).join('\n'));
        }
        return { code: compiled.outputText, map: null };
      },
    }],
    onwarn(warning) { throw new Error(warning.message); },
  });
  const artifacts = new Map();
  try {
    for (const [format, name] of [['es', 'index.mjs'], ['system', 'index.system.js']]) {
      const generated = await bundle.generate({ format, sourcemap: false });
      if (generated.output.length !== 1 || generated.output[0].type !== 'chunk' ||
          generated.output[0].imports.length) {
        throw new Error('Global utilities must build as one dependency-free module.');
      }
      artifacts.set(name, generated.output[0].code);
    }
  } finally {
    await bundle.close();
  }
  const manifest = JSON.parse(await readFile(join(pluginRoot, 'package.json'), 'utf8'));
  const receipt = {
    schemaVersion: 1,
    package: { name: manifest.name, version: manifest.version },
    sourceStatus: 'independent-local-implementation',
    originalSourceRecovered: false,
    nativeCompatibilityVerified: false,
    compilerChecks: 'TypeScript strict isolated-plugin typecheck; no full application typecheck',
    toolchain: {
      typescript: { version: ts.version, sha256: hash(await readFile(typescriptPath)) },
      rollup: { version: rollup.VERSION, sha256: hash(await readFile(rollupPath)) },
    },
    inputs: await Promise.all(inputNames.map(async name => ({
      path: name, sha256: hash(await readFile(join(pluginRoot, name))),
    }))),
    runtimeImports: [],
    outputs: [...artifacts].map(([name, data]) => ({ path: name, sha256: hash(data) })),
  };
  if (writeOutputs) {
    writeArtifacts(output, new Map([
      ...artifacts, ['build-receipt.json', `${JSON.stringify(receipt, null, 2)}\n`],
    ]));
  }
  return receipt;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const receipt = await buildLocalGlobalUtil();
  console.log(`${receipt.package.name}@${receipt.package.version}: ${receipt.outputs.length} outputs; no bundled runtime.`);
}
