import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { basename, dirname, join, relative, resolve, sep } from 'node:path';
import {
  fingerprint, PinnedDirectories, readPinnedFile,
} from '../../../scripts/native-candidate-files.mjs';

const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const slash = path => path.split(sep).join('/');
const jsonBytes = value => Buffer.from(`${JSON.stringify(value, null, 2)}\n`);
const ownPackage = name => /^@(?:ibiz(?:-template(?:-plugin)?)?|ibizlab)\//.test(name);
const namePattern = /^(?:@[A-Za-z0-9._-]+\/)?[A-Za-z0-9._-]+$/;
const entriesOnly = files => files.map(({ path, bytes, sha256, executable }) =>
  ({ path, bytes, sha256, executable }));

export function dependencyFiles(root) {
  const directories = new PinnedDirectories();
  const files = [];
  function visit(directory, prefix = '') {
    for (const name of fs.readdirSync(directory.access).sort()) {
      if (!prefix && (name === 'node_modules' || name === '.git')) continue;
      // preserveModules outputs can contain ordinary node_modules directories.
      // Only the package-root installation tree is replaced by explicit links.
      const path = prefix ? `${prefix}/${name}` : name;
      const info = fs.lstatSync(directories.entry(directory, name));
      assert.ok(!info.isSymbolicLink(), `Symlink dependency file rejected: ${path}`);
      if (info.isDirectory()) visit(directories.open(join(directory.path, name)), path);
      else {
        const { data } = readPinnedFile(directories, directory, name, info);
        files.push({ path, bytes: data.length, sha256: hash(data),
          executable: Boolean(info.mode & 0o111), data });
      }
    }
    directories.verify(directory);
  }
  try { visit(directories.open(root)); }
  finally { directories.close(); }
  return files.sort((a, b) => a.path.localeCompare(b.path));
}

function installedTarget(root, name) {
  assert.match(name, namePattern, 'Invalid dependency name');
  assert.ok(name.split('/').every(part => part !== '.' && part !== '..'), 'Invalid dependency name');
  const req = createRequire(join(root, 'package.json'));
  const path = req.resolve.paths('__candidate_dependency__')
    .map(parent => join(parent, name, 'package.json')).find(path => fs.existsSync(path));
  return path ? fs.realpathSync(dirname(path)) : null;
}

function declarations(manifest) {
  const values = new Map();
  for (const section of ['dependencies', 'peerDependencies', 'optionalDependencies']) {
    for (const [name, range] of Object.entries(manifest[section] ?? {})) {
      const entry = values.get(name) ?? { name, declarations: {}, optional: true };
      entry.declarations[section] = range;
      if (section === 'dependencies' ||
          (section === 'peerDependencies' && !manifest.peerDependenciesMeta?.[name]?.optional)) {
        entry.optional = false;
      }
      values.set(name, entry);
    }
  }
  for (const name of Object.keys(manifest.optionalDependencies ?? {})) values.get(name).optional = true;
  return [...values.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function planDependencyLock(links, { workspace, verifiedOwnTargets = [] } = {}) {
  workspace = resolve(workspace);
  const ownTargets = new Set(verifiedOwnTargets.map(path => fs.realpathSync(path)));
  const packages = new Map();
  function visit(target, expectedName, declared) {
    target = fs.realpathSync(target);
    const source = slash(relative(workspace, target));
    assert.ok(source && !source.startsWith('../') && !source.startsWith('/'),
      'Dependency input must remain inside the workspace');
    if (packages.has(target)) return packages.get(target).id;
    const files = dependencyFiles(target);
    const manifestFile = files.find(file => file.path === 'package.json');
    assert.ok(manifestFile, `Dependency manifest missing: ${source}`);
    const manifest = JSON.parse(manifestFile.data);
    if (manifest.name !== expectedName) {
      assert.ok(!ownPackage(expectedName) && !ownPackage(manifest.name) &&
        Object.values(declared ?? {}).some(range =>
          typeof range === 'string' && range.startsWith(`npm:${manifest.name}@`)),
      `Dependency identity mismatch: ${expectedName} / ${manifest.name}`);
    }
    if (ownPackage(manifest.name)) {
      assert.ok(ownTargets.has(target), `Published own dependency rejected: ${manifest.name}`);
    }
    const entries = entriesOnly(files);
    const id = hash(jsonBytes({ source, entries })).slice(0, 32);
    const pkg = { id, source, name: manifest.name, version: manifest.version,
      entries, ...fingerprint(entries), edges: [], omitted: [] };
    packages.set(target, { ...pkg, id, target, contents: files });
    const record = packages.get(target);
    for (const declaration of declarations(manifest)) {
      const dependency = installedTarget(target, declaration.name);
      if (!dependency) {
        assert.ok(declaration.optional,
          `Required dependency unavailable: ${manifest.name} -> ${declaration.name}`);
        record.omitted.push(declaration);
      } else {
        record.edges.push({ ...declaration,
          id: visit(dependency, declaration.name, declaration.declarations) });
      }
    }
    return id;
  }
  const roots = links.map(link => ({
    name: link.name, version: link.version, role: link.role,
    id: visit(link.target, link.name),
  })).sort((a, b) => a.name.localeCompare(b.name));
  const records = [...packages.values()].sort((a, b) => a.id.localeCompare(b.id));
  for (const root of roots) assert.equal(records.find(pkg => pkg.id === root.id).version, root.version);
  const lock = {
    schemaVersion: 1, contract: 'model-design-offline-workspace-dependency-lock',
    platform: process.platform, arch: process.arch, node: process.version,
    packageManagerInstallVerified: false,
    roots,
    packages: records.map(({ target, contents, ...record }) => record),
  };
  return { lock, packages: records, sha256: hash(jsonBytes(lock)) };
}

function verifyModuleLinks(root, edges, targets) {
  const modules = join(root, 'node_modules');
  const directories = new PinnedDirectories();
  try { directories.open(modules); }
  finally { directories.close(); }
  const expected = new Map();
  for (const edge of edges) {
    assert.match(edge.name, namePattern, 'Invalid dependency name');
    assert.ok(edge.name.split('/').every(part => part !== '.' && part !== '..'), 'Invalid dependency name');
    assert.ok(targets.has(edge.id), 'Unknown locked dependency');
    const parent = dirname(edge.name);
    const names = expected.get(parent) ?? [];
    names.push(basename(edge.name));
    expected.set(parent, names);
    const path = join(modules, edge.name);
    assert.ok(fs.lstatSync(path).isSymbolicLink(), `Explicit module link missing: ${edge.name}`);
    assert.equal(fs.readlinkSync(path), relative(dirname(path), targets.get(edge.id)),
      `Dependency link drift: ${edge.name}`);
    assert.equal(fs.realpathSync(path), targets.get(edge.id),
      `Dependency escaped its snapshot: ${edge.name}`);
  }
  const rootNames = [...new Set(edges.map(edge => edge.name.split('/')[0]))].sort();
  assert.deepEqual(fs.readdirSync(modules).sort(), rootNames, 'Unexpected dependency link');
  for (const [parent, names] of expected) {
    if (parent !== '.') {
      assert.ok(!fs.lstatSync(join(modules, parent)).isSymbolicLink(), 'Symlink module namespace');
      assert.deepEqual(fs.readdirSync(join(modules, parent)).sort(), names.sort());
    }
  }
}

export function stageDependencyLock(plan, packageRoot) {
  const directories = new PinnedDirectories();
  const targets = new Map(plan.packages.map(pkg => [pkg.id, join(packageRoot, '.dependencies', pkg.id)]));
  try {
    directories.open(join(packageRoot, '.dependencies'), { create: true, exclusive: true });
    for (const pkg of plan.packages) {
      assert.deepEqual(entriesOnly(dependencyFiles(pkg.target)), pkg.entries,
        `Dependency input drift before copy: ${pkg.name}`);
      const target = targets.get(pkg.id);
      for (const file of pkg.contents) {
        const path = join(target, file.path);
        const parent = directories.open(dirname(path), { create: true });
        directories.write(parent, basename(path), file.data);
        if (file.executable) fs.chmodSync(directories.entry(parent, basename(path)), 0o700);
      }
    }
    for (const [root, edges] of [
      [packageRoot, plan.lock.roots],
      ...plan.packages.map(pkg => [targets.get(pkg.id), pkg.edges]),
    ]) {
      directories.open(join(root, 'node_modules'), { create: true, exclusive: true });
      for (const edge of edges) {
        const path = join(root, 'node_modules', edge.name);
        const parent = directories.open(dirname(path), { create: true });
        fs.symlinkSync(relative(dirname(path), targets.get(edge.id)),
          directories.entry(parent, basename(path)), 'dir');
        directories.verify(parent);
      }
    }
    directories.write(directories.open(packageRoot), 'dependency-lock.json', jsonBytes(plan.lock));
  } finally { directories.close(); }
  verifyDependencyLock(plan.lock, packageRoot);
  return plan.lock.roots.map(root => ({ ...root, target: targets.get(root.id) }));
}

export function verifyDependencyLock(lock, packageRoot) {
  const directories = new PinnedDirectories();
  try {
    assert.equal(lock.schemaVersion, 1);
    assert.equal(lock.contract, 'model-design-offline-workspace-dependency-lock');
    const bytes = readPinnedFile(directories, directories.open(packageRoot), 'dependency-lock.json').data;
    assert.deepEqual(JSON.parse(bytes), lock, 'Dependency lock drift');
    assert.equal(lock.platform, process.platform);
    assert.equal(lock.arch, process.arch);
    assert.equal(lock.node, process.version);
    assert.equal(lock.packageManagerInstallVerified, false);
    const targetRoot = join(packageRoot, '.dependencies');
    directories.open(targetRoot);
    assert.deepEqual(fs.readdirSync(targetRoot).sort(), lock.packages.map(pkg => pkg.id).sort(),
      'Unexpected dependency snapshot');
    const targets = new Map(lock.packages.map(pkg => {
      assert.match(pkg.id, /^[a-f0-9]{32}$/);
      return [pkg.id, join(targetRoot, pkg.id)];
    }));
    assert.equal(targets.size, lock.packages.length, 'Duplicate locked package');
    for (const pkg of lock.packages) {
      assert.deepEqual(entriesOnly(dependencyFiles(targets.get(pkg.id))), pkg.entries,
        `Dependency snapshot drift: ${pkg.name}`);
      assert.deepEqual(fingerprint(pkg.entries), {
        files: pkg.files, bytes: pkg.bytes, fingerprintKind: pkg.fingerprintKind,
        fingerprint: pkg.fingerprint,
      }, 'Locked package fingerprint drift');
      verifyModuleLinks(targets.get(pkg.id), pkg.edges, targets);
    }
    verifyModuleLinks(packageRoot, lock.roots, targets);
    return { sha256: hash(bytes), packages: lock.packages.length,
      files: lock.packages.reduce((total, pkg) => total + pkg.files, 0),
      bytes: lock.packages.reduce((total, pkg) => total + pkg.bytes, 0) };
  } finally { directories.close(); }
}
