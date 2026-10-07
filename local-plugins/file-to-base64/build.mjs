import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const pluginRoot = dirname(fileURLToPath(import.meta.url));
const externals = ['@ibiz-template/runtime', '@ibiz-template/vue3-util', 'vue'];
const inputNames = [
  'build.mjs', 'package.json', 'src/controller.ts', 'src/editor.ts',
  'src/file-logic.ts', 'src/index.ts', 'src/provider.ts', 'src/style.css',
];
const hash = data => createHash('sha256').update(data).digest('hex');

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

export async function buildLocalFileToBase64({ outputDir = join(pluginRoot, 'dist') } = {}) {
  const output = resolve(outputDir);
  const rel = relative(pluginRoot, output);
  if (!rel || rel.startsWith('..') || isAbsolute(rel)) {
    throw new Error('Build output must be inside the local plugin directory.');
  }
  const { typescript: ts, rollup, typescriptPath, rollupPath } = loadToolchain();
  const transform = {
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
  };
  const artifacts = new Map();
  const imported = new Set();
  for (const [entry, formats] of [
    ['src/index.ts', [['es', 'index.mjs'], ['system', 'index.system.js']]],
    ['src/file-logic.ts', [['es', 'file-logic.mjs']]],
  ]) {
    const bundle = await rollup.rollup({
      input: join(pluginRoot, entry),
      external: externals,
      plugins: [transform],
      onwarn(warning) { throw new Error(warning.message); },
    });
    try {
      for (const [format, name] of formats) {
        const generated = await bundle.generate({ format, sourcemap: false });
        for (const chunk of generated.output) {
          if (chunk.type !== 'chunk') throw new Error('Unexpected build asset.');
          artifacts.set(name, chunk.code);
          chunk.imports.forEach(id => imported.add(id));
        }
      }
    } finally {
      await bundle.close();
    }
  }
  artifacts.set('style.css', await readFile(join(pluginRoot, 'src/style.css'), 'utf8'));
  const manifest = JSON.parse(await readFile(join(pluginRoot, 'package.json'), 'utf8'));
  const receipt = {
    schemaVersion: 1,
    package: { name: manifest.name, version: manifest.version },
    sourceStatus: 'independent-local-implementation',
    originalSourceRecovered: false,
    nativeCompatibilityVerified: false,
    compilerChecks: 'TypeScript syntax diagnostics; no full application typecheck',
    toolchain: {
      typescript: { version: ts.version, sha256: hash(await readFile(typescriptPath)) },
      rollup: { version: rollup.VERSION, sha256: hash(await readFile(rollupPath)) },
    },
    inputs: await Promise.all(inputNames.map(async name => ({
      path: name, sha256: hash(await readFile(join(pluginRoot, name))),
    }))),
    runtimeImports: [...imported].sort(),
    outputs: [...artifacts].map(([name, data]) => ({ path: name, sha256: hash(data) })),
  };
  await mkdir(output, { recursive: true });
  for (const [name, data] of artifacts) await writeFile(join(output, name), data);
  await writeFile(join(output, 'build-receipt.json'), `${JSON.stringify(receipt, null, 2)}\n`);
  return receipt;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const receipt = await buildLocalFileToBase64();
  console.log(`${receipt.package.name}@${receipt.package.version}: ${receipt.outputs.length} outputs; runtime imports external.`);
}
