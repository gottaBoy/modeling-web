import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import {
  closeSync, constants, fstatSync, ftruncateSync, lstatSync, mkdirSync,
  openSync, readFileSync, readdirSync, writeFileSync,
} from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, isAbsolute, join, parse, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const pluginRoot = dirname(fileURLToPath(import.meta.url));
export const compilerChecks =
  'TypeScript isolated transpilation and syntax diagnostics; no full host application typecheck';
export const variants = Object.freeze([
  { variant: 'console', name: '@aibiz/console-terminal', version: '0.1.0', pluginCode: 'CONSOLE_VIEW' },
  { variant: 'swagger', name: '@aibiz/swagger-preview', version: '0.1.0', pluginCode: 'SWAGGER_PREVIEW_VIEW' },
]);
export const inputNames = [
  'build.mjs', 'package.json', 'src/console.css', 'src/console.ts',
  'src/swagger.css', 'src/swagger.ts', 'src/view.ts',
];
const outputNames = ['package.json', 'index.mjs', 'index.system.js', 'style.css'];
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const sameIdentity = (a, b) => a.dev === b.dev && a.ino === b.ino;
const sorted = names => [...names].sort((a, b) => a.localeCompare(b));

function optionalStat(path) {
  try { return lstatSync(path); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

// Descriptors protect every ancestor. Trusted parents and one writer are still required.
class Directories {
  pinned = new Map();

  verify(directory) {
    if (directory.parent) this.verify(directory.parent);
    const current = lstatSync(directory.entry);
    assert.ok(current.isDirectory() && !current.isSymbolicLink() &&
      sameIdentity(current, directory.identity) &&
      sameIdentity(fstatSync(directory.fd), directory.identity),
    `Build directory changed: ${directory.path}`);
  }

  open(path, create = false) {
    assert.equal(process.platform, 'linux', 'Safe local builds require Linux /proc/self/fd');
    path = resolve(path);
    if (this.pinned.has(path)) {
      const directory = this.pinned.get(path);
      this.verify(directory);
      return directory;
    }
    const parent = path === parse(path).root ? null : this.open(dirname(path), create);
    if (parent) this.verify(parent);
    const entry = parent ? join(parent.access, relative(dirname(path), path)) : path;
    if (!optionalStat(entry) && create) mkdirSync(entry, { mode: 0o755 });
    const info = lstatSync(entry);
    assert.ok(info.isDirectory() && !info.isSymbolicLink(), `Symlink/non-directory build ancestor: ${path}`);
    const fd = openSync(entry, constants.O_RDONLY | constants.O_DIRECTORY | constants.O_NOFOLLOW);
    const directory = { fd, path, parent, entry, identity: fstatSync(fd), access: `/proc/self/fd/${fd}` };
    this.pinned.set(path, directory);
    this.verify(directory);
    assert.ok(sameIdentity(info, directory.identity), `Build directory changed while opening: ${path}`);
    return directory;
  }

  close() {
    for (const directory of [...this.pinned.values()].reverse()) closeSync(directory.fd);
  }
}

function checkFile(path) {
  const info = optionalStat(path);
  assert.ok(!info || (info.isFile() && !info.isSymbolicLink() && info.nlink === 1),
    `Build file must be non-symlink and single-link regular file: ${path}`);
  return info;
}

function readInputs(root) {
  const directories = new Directories();
  try {
    const source = directories.open(join(root, 'src'));
    assert.deepEqual(sorted(readdirSync(source.access)), inputNames.filter(name => name.startsWith('src/'))
      .map(name => name.slice(4)).sort((a, b) => a.localeCompare(b)), 'Unexpected local source file set');
    return new Map(inputNames.map(name => {
      const parent = directories.open(dirname(join(root, name)));
      directories.verify(parent);
      const path = join(parent.access, name.split('/').at(-1));
      const info = checkFile(path);
      assert.ok(info, `Missing build input: ${name}`);
      const fd = openSync(path, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
      try {
        const opened = fstatSync(fd);
        assert.ok(sameIdentity(info, opened) && opened.nlink === 1, `Build input changed: ${name}`);
        const data = readFileSync(fd);
        const after = fstatSync(fd);
        const current = checkFile(path);
        assert.ok(current && sameIdentity(opened, current) && sameIdentity(opened, after) &&
          after.size === data.length && after.mtimeMs === opened.mtimeMs &&
          after.ctimeMs === opened.ctimeMs && current.mtimeMs === after.mtimeMs &&
          current.ctimeMs === after.ctimeMs, `Build input changed while reading: ${name}`);
        directories.verify(parent);
        return [name, data];
      } finally { closeSync(fd); }
    }));
  } finally { directories.close(); }
}

function writeArtifacts(output, artifacts) {
  const directories = new Directories();
  const openedFiles = [];
  try {
    const root = directories.open(output, true);
    assert.ok(readdirSync(root.access).every(name => ['console', 'swagger', 'build-receipt.json'].includes(name)),
      'Unexpected build output entry');
    const plans = [...artifacts].map(([name, data]) => {
      const directory = directories.open(dirname(join(output, name)), true);
      if (directory !== root) assert.ok(readdirSync(directory.access).every(name => outputNames.includes(name)),
        'Unexpected variant output entry');
      directories.verify(directory);
      const path = join(directory.access, name.split('/').at(-1));
      return { directory, path, data, identity: checkFile(path) };
    });
    // Validate/open the whole group before truncation, including existing receipts.
    for (const plan of [...plans.filter(file => file.identity), ...plans.filter(file => !file.identity)]) {
      directories.verify(plan.directory);
      const fd = openSync(plan.path, constants.O_WRONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK |
        (plan.identity ? 0 : constants.O_CREAT | constants.O_EXCL), 0o644);
      const file = { ...plan, fd };
      openedFiles.push(file);
      const info = fstatSync(fd);
      assert.ok(info.isFile() && info.nlink === 1 && (!plan.identity || sameIdentity(info, plan.identity)),
        `Build output changed: ${plan.path}`);
      file.identity = info;
    }
    for (const file of openedFiles) {
      directories.verify(file.directory);
      const current = checkFile(file.path);
      assert.ok(current && sameIdentity(current, file.identity), `Build output changed: ${file.path}`);
    }
    for (const file of openedFiles) {
      directories.verify(file.directory);
      const info = fstatSync(file.fd);
      assert.ok(info.isFile() && info.nlink === 1 && sameIdentity(info, file.identity),
        `Build output changed: ${file.path}`);
      ftruncateSync(file.fd, 0);
      writeFileSync(file.fd, file.data);
    }
  } finally {
    for (const file of openedFiles.reverse()) closeSync(file.fd);
    directories.close();
  }
}

export function loadToolchain(root = pluginRoot) {
  const localRequire = createRequire(join(root, 'package.json'));
  const appRequire = createRequire(resolve(root, '../../app/package.json'));
  let typescriptPath;
  let rollupPath;
  try { typescriptPath = localRequire.resolve('typescript'); }
  catch { typescriptPath = appRequire.resolve('typescript'); }
  try { rollupPath = localRequire.resolve('rollup'); }
  catch { rollupPath = createRequire(appRequire.resolve('vite')).resolve('rollup'); }
  const ts = localRequire(typescriptPath);
  const rollup = localRequire(rollupPath);
  assert.equal(ts.version, '5.3.3', 'Expected TypeScript 5.3.3');
  assert.equal(rollup.VERSION, '4.9.3', 'Expected Rollup 4.9.3');
  return {
    ts, rollup, typescriptPath, rollupPath,
    evidence: {
      typescript: { version: ts.version, sha256: hash(readFileSync(typescriptPath)) },
      rollup: { version: rollup.VERSION, sha256: hash(readFileSync(rollupPath)) },
    },
  };
}

export function deliveryManifest(variant, peers) {
  return {
    name: variant.name, version: variant.version, private: true, type: 'module',
    main: 'index.mjs', module: 'index.mjs', system: 'index.system.js', styles: ['style.css'],
    peerDependencies: peers,
  };
}

export async function buildLocalConsoleLayout({
  root = pluginRoot, outputDir = join(root, 'dist'), writeOutputs = true,
} = {}) {
  root = resolve(root);
  const output = resolve(outputDir);
  const rel = relative(root, output);
  assert.ok(rel && rel !== '..' && !rel.startsWith(`..${sep}`) && !isAbsolute(rel),
    'Build output must be inside the local bundle');
  assert.equal(typeof writeOutputs, 'boolean', 'writeOutputs must be boolean');
  const inputs = readInputs(root);
  const manifest = JSON.parse(inputs.get('package.json'));
  assert.equal(`${manifest.name}@${manifest.version}`, '@aibiz/console-layout-bundle@0.1.0');
  assert.equal(manifest.private, true);
  assert.equal(manifest.type, 'module');
  assert.equal(Object.hasOwn(manifest, 'gitHead'), false, 'Independent bundle cannot claim upstream identity');
  assert.deepEqual(manifest.dependencies ?? {}, {});
  assert.deepEqual(manifest.devDependencies, { rollup: '4.9.3', typescript: '5.3.3' });
  assert.deepEqual(manifest.peerDependencies,
    { '@ibiz-template/runtime': '*', '@ibiz-template/vue3-util': '*', vue: '^3.3.8' });
  const tools = loadToolchain(root);
  const { ts, rollup } = tools;
  const sources = new Map();
  for (const [name, data] of inputs) {
    if (!name.endsWith('.ts')) continue;
    const id = join(root, name);
    const text = data.toString('utf8');
    const parsed = ts.createSourceFile(id, text, ts.ScriptTarget.ES2020, true);
    const compiled = ts.transpileModule(text, {
      fileName: id, reportDiagnostics: true,
      compilerOptions: {
        module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020, useDefineForClassFields: false,
      },
    });
    const diagnostics = [...parsed.parseDiagnostics, ...(compiled.diagnostics || [])];
    if (diagnostics.length) throw new Error(diagnostics.map(item =>
      ts.flattenDiagnosticMessageText(item.messageText, '\n')).join('\n'));
    sources.set(id, compiled.outputText);
  }
  const peers = new Set(Object.keys(manifest.peerDependencies));
  const artifacts = new Map();
  const runtimeImports = {};
  for (const variant of variants) {
    const imports = new Set();
    const bundle = await rollup.rollup({
      input: join(root, `src/${variant.variant}.ts`),
      external(id) { if (!peers.has(id)) return false; imports.add(id); return true; },
      plugins: [{
        name: 'local-console-layout-typescript',
        resolveId(id, importer) {
          if (sources.has(id)) return id;
          if (id.startsWith('.') && importer) {
            const path = resolve(dirname(importer), id);
            const matches = [path, `${path}.ts`].filter(candidate => sources.has(candidate));
            assert.equal(matches.length, 1, `Missing or ambiguous local source import: ${id}`);
            return matches[0];
          }
          throw new Error(`Undeclared peer or source import: ${id}`);
        },
        load(id) {
          assert.ok(sources.has(id), `Unrecorded build source: ${id}`);
          return sources.get(id);
        },
      }],
      onwarn(warning) { throw new Error(warning.message); },
    });
    try {
      for (const [format, name] of [['es', 'index.mjs'], ['system', 'index.system.js']]) {
        const generated = await bundle.generate({ format, sourcemap: false });
        const chunk = generated.output[0];
        assert.ok(generated.output.length === 1 && chunk.type === 'chunk' &&
          !chunk.dynamicImports.length && chunk.imports.every(id => peers.has(id)),
        'Variants must be single modules with only declared host peers');
        artifacts.set(`${variant.variant}/${name}`, Buffer.from(chunk.code));
      }
    } finally { await bundle.close(); }
    assert.deepEqual(sorted(imports), sorted(peers), 'All declared host peers must be used');
    runtimeImports[variant.variant] = sorted(imports);
    artifacts.set(`${variant.variant}/style.css`, inputs.get(`src/${variant.variant}.css`));
    artifacts.set(`${variant.variant}/package.json`,
      Buffer.from(`${JSON.stringify(deliveryManifest(variant, manifest.peerDependencies), null, 2)}\n`));
  }
  const current = readInputs(root);
  assert.deepEqual([...current.keys()], [...inputs.keys()], 'Build input set changed');
  for (const [name, data] of inputs) assert.ok(data.equals(current.get(name)), `Build input changed: ${name}`);
  assert.deepEqual(loadToolchain(root).evidence, tools.evidence, 'Build toolchain changed');
  const receipt = {
    schemaVersion: 1, package: { name: manifest.name, version: manifest.version },
    packages: variants.map(({ variant, name, version, pluginCode }) =>
      ({ variant, name, version, supportedPluginCodes: [pluginCode] })),
    sourceStatus: 'independent-local-implementation', originalSourceRecovered: false,
    nativeCompatibilityVerified: false, compilerChecks,
    inputs: [...inputs].map(([path, data]) => ({ path, sha256: hash(data) })),
    outputs: [...artifacts].map(([path, data]) => ({ path, sha256: hash(data) }))
      .sort((a, b) => a.path.localeCompare(b.path)),
    toolchain: tools.evidence, runtimeImports,
  };
  if (writeOutputs) writeArtifacts(output, new Map([
    ...artifacts, ['build-receipt.json', Buffer.from(`${JSON.stringify(receipt, null, 2)}\n`)],
  ]));
  return { receipt, artifacts };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { receipt } = await buildLocalConsoleLayout();
  console.log(`${receipt.package.name}@${receipt.package.version}: ${receipt.outputs.length} outputs; independent, native compatibility unverified.`);
}
