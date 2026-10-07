import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, posix, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  PinnedDirectories, readPinnedFile,
} from '../../../scripts/native-candidate-files.mjs';
import { sourceFiles } from '../../../scripts/harness-native-ai-code-source-deps.mjs';

const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const entriesOnly = files => files.map(({ path, bytes, sha256 }) => ({ path, bytes, sha256 }));

// Rollup transforms finish concurrently. Cascade order instead follows the
// candidate's static module graph, retaining each stylesheet on its first visit.
export function stylesheetOrder(ts, files, entry = 'src/index.ts') {
  const byPath = new Map(files.map(file => [file.path, file]));
  assert.equal(byPath.size, files.length, 'Duplicate source path');
  const visited = new Set();
  const ordered = [];
  function visit(path) {
    if (visited.has(path)) return;
    visited.add(path);
    const file = byPath.get(path);
    assert.ok(file, `Unresolved local style graph input: ${path}`);
    if (path.endsWith('.scss')) {
      ordered.push(file);
      return;
    }
    if (path.endsWith('.json') || path.endsWith('.d.ts')) return;
    assert.match(path, /\.(?:ts|tsx)$/, 'Unsupported style graph input');
    const module = ts.createSourceFile(path, file.data.toString('utf8'), ts.ScriptTarget.Latest, true);
    assert.equal(module.parseDiagnostics.length, 0, `Invalid style graph source: ${path}`);
    for (const statement of module.statements) {
      if (!ts.isImportDeclaration(statement) && !ts.isExportDeclaration(statement)) continue;
      if (statement.isTypeOnly || statement.importClause?.isTypeOnly) continue;
      const specifier = statement.moduleSpecifier;
      if (!specifier || !ts.isStringLiteral(specifier) || !specifier.text.startsWith('.')) continue;
      const target = posix.normalize(posix.join(posix.dirname(path), specifier.text));
      assert.ok(target.startsWith('src/'), 'Style graph escaped candidate src');
      const resolved = [target, `${target}.ts`, `${target}.tsx`,
        `${target}/index.ts`, `${target}/index.tsx`].find(name => byPath.has(name));
      assert.ok(resolved, `Unresolved local style graph import: ${path} -> ${specifier.text}`);
      visit(resolved);
    }
  }
  visit(entry);
  const declared = files.filter(file => file.path.endsWith('.scss')).map(file => file.path).sort();
  assert.deepEqual(ordered.map(file => file.path).sort(), declared,
    'All declared stylesheets must be reachable from the bundle entry');
  assert.ok(ordered.length, 'No reachable stylesheets');
  return ordered;
}

export function compileDeterministicCss(packageRoot) {
  const req = createRequire(join(packageRoot, 'package.json'));
  const ts = req('typescript');
  const files = sourceFiles(packageRoot, { names: ['src'] });
  const ordered = stylesheetOrder(ts, files);
  const cliRoot = dirname(req.resolve('@ibiz-template/cli/package.json'));
  const cliReq = createRequire(join(cliRoot, 'package.json'));
  const coreRoot = dirname(cliReq.resolve('@ibiz-template/cli-core/package.json'));
  const coreReq = createRequire(join(coreRoot, 'package.json'));
  const sass = coreReq('sass');
  const sassRoot = dirname(coreReq.resolve('sass'));
  const directories = new PinnedDirectories();
  let sassManifest;
  try {
    sassManifest = JSON.parse(readPinnedFile(directories, directories.open(sassRoot), 'package.json').data);
  } finally { directories.close(); }
  const config = req(join(packageRoot, 'ibiz.config.cjs'));
  const theme = join(packageRoot, 'node_modules/@ibiz-template/theme/style/global.scss');
  assert.equal(config.theme.prefix, `@import "${theme}";`, 'Unexpected Sass theme prefix');
  assert.ok(!config.theme.fileName || config.theme.fileName === 'index.min.css');
  // Current alpha.122 styles use only the prefix's mixins. Reject new Sass
  // imports rather than silently changing the CLI plugin's importer semantics.
  assert.ok(ordered.every(file => !/@(?:import|use|forward)\b/.test(file.data.toString('utf8'))),
    'Additional Sass imports require an explicit source-bound adaptation');
  const includePaths = [...new Set([
    join(packageRoot, 'node_modules'), packageRoot,
    ...ordered.map(file => dirname(join(packageRoot, file.path))),
  ])];
  const warnings = [];
  const result = sass.renderSync({
    data: `${config.theme.prefix}\n${ordered.map(file => file.data.toString('utf8')).join('')}`,
    outFile: 'index.min.css', outputStyle: 'compressed', includePaths,
    logger: { warn: message => warnings.push(message) },
  });
  const css = Buffer.from(result.css);
  assert.ok(css.length, 'Deterministic Sass compilation returned empty CSS');
  return {
    css, warnings,
    evidence: {
      contract: 'model-design-source-import-order-css',
      order: entriesOnly(ordered),
      compiler: { name: sassManifest.name, version: sassManifest.version },
      output: { path: 'dist/index.min.css', bytes: css.length, sha256: hash(css) },
    },
  };
}

export function writeDeterministicCss(packageRoot) {
  const result = compileDeterministicCss(packageRoot);
  const directories = new PinnedDirectories();
  try {
    const parent = directories.open(join(packageRoot, 'dist'));
    const name = 'index.min.css';
    const { identity } = readPinnedFile(directories, parent, name);
    const fd = fs.openSync(directories.entry(parent, name),
      fs.constants.O_WRONLY | fs.constants.O_NOFOLLOW | fs.constants.O_NONBLOCK);
    try {
      const opened = fs.fstatSync(fd);
      assert.ok(opened.isFile() && opened.dev === identity.dev && opened.ino === identity.ino,
        'CSS output changed before deterministic write');
      directories.verify(parent);
      fs.ftruncateSync(fd, 0);
      fs.writeFileSync(fd, result.css);
    } finally { fs.closeSync(fd); }
    assert.deepEqual(readPinnedFile(directories, parent, name).data, result.css);
  } finally { directories.close(); }
  return { ...result.evidence, compilerWarnings: result.warnings };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    assert.equal(process.argv.length, 2, 'Deterministic stylesheet step uses only its locked cwd');
    console.log(JSON.stringify(writeDeterministicCss(process.cwd())));
  } catch (error) {
    console.error(`Deterministic styles failed: ${error.message}`);
    process.exitCode = 1;
  }
}
