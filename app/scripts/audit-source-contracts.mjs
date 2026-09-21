#!/usr/bin/env node
import { createRequire } from 'node:module';
import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  realpath,
  writeFile,
} from 'node:fs/promises';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import vm from 'node:vm';
import { fingerprint } from '../../../scripts/localization-baseline.mjs';
import { verifySourceRuntime } from './verify-source-runtime.mjs';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspace = resolve(appRoot, '../..');
const require = createRequire(join(appRoot, 'package.json'));
const ts = require('typescript');
const semver = require(join(appRoot, 'node_modules/.pnpm/node_modules/semver'));
const readJson = async path => JSON.parse(await readFile(path, 'utf8'));
const localPath = path => relative(workspace, path);
const unwrap = node =>
  ts.isParenthesizedExpression(node) ? unwrap(node.expression) : node;
const propertyName = node =>
  node && (ts.isIdentifier(node) || ts.isStringLiteralLike(node))
    ? node.text
    : null;
const isFunctionLike = node =>
  ts.isFunctionExpression(node) ||
  ts.isArrowFunction(node) ||
  ts.isFunctionDeclaration(node) ||
  ts.isMethodDeclaration(node);
const GUARD_OPERATORS = new Set([
  ts.SyntaxKind.BarBarToken,
  ts.SyntaxKind.AmpersandAmpersandToken,
  ts.SyntaxKind.QuestionQuestionToken,
]);
const FALLBACK_OPERATORS = new Set([
  ts.SyntaxKind.BarBarToken,
  ts.SyntaxKind.QuestionQuestionToken,
]);
const TRUTHINESS_OPERATORS = new Set([
  ts.SyntaxKind.EqualsEqualsToken,
  ts.SyntaxKind.EqualsEqualsEqualsToken,
  ts.SyntaxKind.ExclamationEqualsToken,
  ts.SyntaxKind.ExclamationEqualsEqualsToken,
]);

/** Climb parentheses; returns [outermost parenthesized self, its parent]. */
function ascend(node) {
  let self = node;
  let parent = node.parent;
  while (parent && ts.isParenthesizedExpression(parent)) {
    self = parent;
    parent = parent.parent;
  }
  return [self, parent];
}

/** A member access is only probed when a logical/conditional operator or
 *  optional chain guards it before the value is relied upon. */
function isGuardedAccess(node) {
  if (node.questionDotToken) return true;
  let current = node;
  while (current && !ts.isStatement(current) && !isFunctionLike(current)) {
    if (
      ts.isBinaryExpression(current) &&
      GUARD_OPERATORS.has(current.operatorToken.kind)
    )
      return true;
    if (ts.isConditionalExpression(current)) return true;
    current = current.parent;
  }
  return false;
}

export function inspectModuleContract(code) {
  const file = ts.createSourceFile(
    '/contract.js',
    code,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS,
  );
  if (file.parseDiagnostics.length)
    throw new Error('Invalid JavaScript contract');
  const options = { allowJs: true, noResolve: true, noLib: true };
  const host = ts.createCompilerHost(options);
  host.getSourceFile = name => (name === file.fileName ? file : undefined);
  const program = ts.createProgram([file.fileName], options, host);
  const checker = program.getTypeChecker();
  const walk = (node, visit) => {
    visit(node);
    ts.forEachChild(node, child => walk(child, visit));
  };
  const registrations = [];
  walk(file, node => {
    if (
      ts.isCallExpression(node) &&
      node.expression.getText(file) === 'System.register'
    ) {
      registrations.push(node);
    }
  });
  const unknown = new Set();
  const exports = new Set();
  const imports = [];
  const dynamicImports = [];
  const empty = reason => ({
    exports: [],
    imports: [],
    dynamicImports: [],
    unknown: [reason],
  });
  if (registrations.length !== 1) {
    return empty('Expected one System.register declaration');
  }
  const call = registrations[0];
  const offset =
    call.arguments[0] && ts.isStringLiteralLike(call.arguments[0]) ? 1 : 0;
  const dependencies = call.arguments[offset];
  const declaration =
    call.arguments[offset + 1] && unwrap(call.arguments[offset + 1]);
  if (
    !dependencies ||
    !ts.isArrayLiteralExpression(dependencies) ||
    !declaration ||
    !(
      ts.isFunctionExpression(declaration) || ts.isArrowFunction(declaration)
    ) ||
    !ts.isBlock(declaration.body) ||
    !declaration.parameters[0]
  ) {
    return empty('Unsupported System.register declaration');
  }
  const exportSymbol = checker.getSymbolAtLocation(
    declaration.parameters[0].name,
  );
  const contextParameter = declaration.parameters[1];
  const contextSymbol =
    contextParameter && ts.isIdentifier(contextParameter.name)
      ? checker.getSymbolAtLocation(contextParameter.name)
      : null;
  const symbolOf = node => checker.getSymbolAtLocation(node);

  /** Track how the module namespace value at `valueNode` is consumed. */
  function trackValue(valueNode, usage) {
    const [self, parent] = ascend(valueNode);
    if (!parent) return;
    const record = (name, access) => {
      if (isGuardedAccess(access)) usage.probed.add(name);
      else usage.names.add(name);
    };
    if (ts.isPropertyAccessExpression(parent) && parent.expression === self) {
      record(parent.name.text, parent);
      return;
    }
    if (ts.isElementAccessExpression(parent) && parent.expression === self) {
      if (
        parent.argumentExpression &&
        ts.isStringLiteralLike(parent.argumentExpression)
      )
        record(parent.argumentExpression.text, parent);
      else {
        usage.namespace = true;
        usage.reasons.add('Computed member access on the module namespace');
      }
      return;
    }
    if (ts.isVariableDeclaration(parent) && parent.initializer === self) {
      if (ts.isIdentifier(parent.name)) {
        const symbol = symbolOf(parent.name);
        let scope = parent;
        while (scope.parent && !isFunctionLike(scope)) scope = scope.parent;
        walk(scope, node => {
          if (
            ts.isIdentifier(node) &&
            node !== parent.name &&
            symbolOf(node) === symbol
          )
            trackValue(node, usage);
        });
        return;
      }
      if (ts.isObjectBindingPattern(parent.name)) {
        for (const element of parent.name.elements) {
          if (element.dotDotDotToken) {
            usage.namespace = true;
            usage.reasons.add('Rest binding of the module namespace');
            continue;
          }
          const name = element.propertyName
            ? propertyName(element.propertyName)
            : ts.isIdentifier(element.name)
              ? element.name.text
              : null;
          if (!name) {
            usage.namespace = true;
            usage.reasons.add('Computed binding of the module namespace');
          } else if (element.initializer) usage.optional.add(name);
          else usage.names.add(name);
        }
        return;
      }
      usage.namespace = true;
      usage.reasons.add('Array binding of the module namespace');
      return;
    }
    if (ts.isBinaryExpression(parent)) {
      const kind = parent.operatorToken.kind;
      if (TRUTHINESS_OPERATORS.has(kind)) return;
      if (kind === ts.SyntaxKind.AmpersandAmpersandToken && parent.left === self)
        return;
      if (GUARD_OPERATORS.has(kind)) {
        usage.namespace = true;
        usage.reasons.add(
          FALLBACK_OPERATORS.has(kind) && parent.right === self
            ? 'Module namespace used as a fallback value'
            : 'Module namespace used as the value of a logical expression',
        );
        return;
      }
    }
    if (
      ts.isConditionalExpression(parent) &&
      (parent.whenTrue === self || parent.whenFalse === self)
    ) {
      usage.namespace = true;
      usage.reasons.add('Module namespace used as a conditional branch value');
      return;
    }
    if (
      (ts.isConditionalExpression(parent) && parent.condition === self) ||
      (ts.isIfStatement(parent) && parent.expression === self) ||
      (ts.isPrefixUnaryExpression(parent) &&
        parent.operator === ts.SyntaxKind.ExclamationToken) ||
      ts.isExpressionStatement(parent)
    )
      return;
    usage.namespace = true;
    usage.reasons.add(
      `Module namespace escapes through ${ts.SyntaxKind[parent.kind]}`,
    );
  }

  function trackCallback(callback, usage) {
    callback = unwrap(callback);
    if (!isFunctionLike(callback) || !callback.body) {
      usage.namespace = true;
      usage.reasons.add('then callback is not a function literal');
      return;
    }
    const parameter = callback.parameters[0];
    if (!parameter) return;
    if (!ts.isIdentifier(parameter.name)) {
      usage.namespace = true;
      usage.reasons.add('Destructured then callback parameter');
      return;
    }
    const symbol = symbolOf(parameter.name);
    walk(callback.body, node => {
      if (ts.isIdentifier(node) && symbolOf(node) === symbol)
        trackValue(node, usage);
    });
  }

  function trackPromise(call, usage) {
    let current = call;
    for (;;) {
      const [self, parent] = ascend(current);
      if (!parent) return;
      if (ts.isAwaitExpression(parent)) {
        trackValue(parent, usage);
        return;
      }
      if (
        ts.isPropertyAccessExpression(parent) &&
        parent.expression === self &&
        ts.isCallExpression(parent.parent) &&
        parent.parent.expression === parent
      ) {
        const method = parent.name.text;
        const chained = parent.parent;
        if (method === 'then') {
          if (chained.arguments[0]) trackCallback(chained.arguments[0], usage);
          else {
            current = chained;
            continue;
          }
          return;
        }
        if (method === 'catch' || method === 'finally') {
          current = chained;
          continue;
        }
        usage.namespace = true;
        usage.reasons.add(`Promise method ${method} is not tracked`);
        return;
      }
      usage.namespace = true;
      if (
        ts.isReturnStatement(parent) ||
        (ts.isArrowFunction(parent) && parent.body === self)
      )
        usage.reasons.add(
          'Import promise is returned to an opaque consumer (loader callback)',
        );
      else if (ts.isCallExpression(parent) || ts.isNewExpression(parent))
        usage.reasons.add('Import promise passed as an argument');
      else
        usage.reasons.add(
          `Import promise escapes through ${ts.SyntaxKind[parent.kind]}`,
        );
      return;
    }
  }

  walk(declaration.body, node => {
    if (!ts.isCallExpression(node)) return;
    if (
      ts.isIdentifier(node.expression) &&
      symbolOf(node.expression) === exportSymbol
    ) {
      const value = node.arguments[0];
      if (value && ts.isStringLiteralLike(value)) exports.add(value.text);
      else if (value && ts.isObjectLiteralExpression(value)) {
        for (const property of value.properties) {
          const name = propertyName(property.name);
          if (name) exports.add(name);
          else unknown.add('Dynamic export property');
        }
      } else unknown.add('Dynamic export object');
      return;
    }
    const callee = node.expression;
    if (
      contextSymbol &&
      ts.isPropertyAccessExpression(callee) &&
      callee.name.text === 'import' &&
      ts.isIdentifier(callee.expression) &&
      symbolOf(callee.expression) === contextSymbol
    ) {
      const specifier = node.arguments[0];
      const usage = {
        names: new Set(),
        probed: new Set(),
        optional: new Set(),
        namespace: false,
        reasons: new Set(),
      };
      if (!specifier || !ts.isStringLiteralLike(specifier)) {
        usage.namespace = true;
        usage.reasons.add('Dynamic import specifier is not a string literal');
      } else trackPromise(node, usage);
      dynamicImports.push({
        specifier:
          specifier && ts.isStringLiteralLike(specifier)
            ? specifier.text
            : null,
        names: [...usage.names].sort(),
        probed: [...usage.probed]
          .filter(name => !usage.names.has(name))
          .sort(),
        optional: [...usage.optional]
          .filter(name => !usage.names.has(name) && !usage.probed.has(name))
          .sort(),
        namespace: usage.namespace,
        reasons: [...usage.reasons].sort(),
      });
    }
  });
  const returned = declaration.body.statements.find(node =>
    ts.isReturnStatement(node),
  );
  const object = returned?.expression && unwrap(returned.expression);
  const settersProperty =
    object &&
    ts.isObjectLiteralExpression(object) &&
    object.properties.find(node => propertyName(node.name) === 'setters');
  const setters =
    settersProperty &&
    ts.isPropertyAssignment(settersProperty) &&
    unwrap(settersProperty.initializer);
  if (
    dependencies.elements.length &&
    (!setters ||
      !ts.isArrayLiteralExpression(setters) ||
      setters.elements.length !== dependencies.elements.length)
  ) {
    unknown.add('Unresolved dependency setters');
  } else {
    dependencies.elements.forEach((dependency, index) => {
      if (!ts.isStringLiteralLike(dependency)) {
        unknown.add('Dynamic dependency specifier');
        return;
      }
      const setter = unwrap(setters.elements[index]);
      const names = new Set();
      let namespace = false;
      if (
        (ts.isFunctionExpression(setter) || ts.isArrowFunction(setter)) &&
        setter.parameters.length === 1 &&
        ts.isIdentifier(setter.parameters[0].name)
      ) {
        const parameter = setter.parameters[0].name;
        const symbol = checker.getSymbolAtLocation(parameter);
        walk(setter.body, node => {
          if (
            !ts.isIdentifier(node) ||
            checker.getSymbolAtLocation(node) !== symbol
          )
            return;
          const parent = node.parent;
          if (
            ts.isPropertyAccessExpression(parent) &&
            parent.expression === node
          )
            names.add(parent.name.text);
          else if (
            ts.isElementAccessExpression(parent) &&
            parent.expression === node &&
            parent.argumentExpression &&
            ts.isStringLiteralLike(parent.argumentExpression)
          )
            names.add(parent.argumentExpression.text);
          else namespace = true;
        });
      } else if (setter.kind !== ts.SyntaxKind.NullKeyword) {
        unknown.add(`Unsupported setter: ${dependency.text}`);
      }
      imports.push({
        specifier: dependency.text,
        names: [...names].sort(),
        namespace,
      });
    });
  }
  return {
    exports: [...exports].sort(),
    imports,
    dynamicImports,
    unknown: [...unknown].sort(),
  };
}

/**
 * Execute a non-System.register (UMD/global) script the way SystemJS 6.14.2's
 * bundled global extra treats it: no `define`, `module` or `exports` exist, the
 * last own global property added by the script is the module value, and the
 * module exposes `default` plus every enumerable (for-in) property of that
 * value (system.js `_export(globalExport)` followed by
 * `_export({ default: globalExport, __useDefault: true })`).
 */
export function inspectGlobalModuleContract(
  code,
  { filename = 'global.js', timeout = 10000 } = {},
) {
  const empty = (reason, extra = {}) => ({
    exports: [],
    imports: [],
    dynamicImports: [],
    unknown: [reason],
    mode: 'global-vm',
    ...extra,
  });
  const sandbox = {};
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  const context = vm.createContext(sandbox);
  const before = new Set(Object.keys(sandbox));
  try {
    vm.runInContext(code, context, { filename, timeout });
  } catch (error) {
    return empty(
      `Global script threw inside the vm sandbox: ${error?.message || error}`,
    );
  }
  const added = Object.keys(sandbox).filter(
    key => !before.has(key) && Number.isNaN(Number(key)),
  );
  const globalName = added.at(-1);
  if (!globalName)
    return empty(
      'No new global property detected; SystemJS would instantiate an empty module',
    );
  const value = sandbox[globalName];
  const exports = new Set(['default']);
  if (value !== null && (typeof value === 'object' || typeof value === 'function'))
    for (const key in value) exports.add(key);
  return {
    exports: [...exports].sort(),
    imports: [],
    dynamicImports: [],
    unknown: [],
    mode: 'global-vm',
    globalName,
    detectedGlobals: added,
  };
}

export function compareNamedImports(request, provider) {
  const available = new Set(provider.exports);
  const absent = request.names.filter(name => !available.has(name));
  const probed = request.probed || [];
  const probedAbsent = probed.filter(name => !available.has(name));
  const unresolved = provider.unknown.length > 0;
  const missing = unresolved
    ? []
    : probed.length && probedAbsent.length === probed.length
      ? [...absent, ...probedAbsent]
      : absent;
  const result = {
    missing,
    unresolvedNames: unresolved ? [...absent, ...probedAbsent] : [],
    unverified: request.namespace || unresolved,
  };
  if (probed.length) result.probedAbsent = probedAbsent;
  const optional = request.optional || [];
  if (optional.length)
    result.optionalAbsent = optional.filter(name => !available.has(name));
  return result;
}

/** Strict node-semver result plus pnpm's peer semantics (pnpm 8 checks peers
 *  with semver-utils satisfiesWithPrereleases, so `^0.7.0` accepts
 *  `0.7.41-alpha.1`; strict semver excludes prereleases of other tuples). */
export function checkVersionRange(required, version) {
  if (!version || !semver.validRange(required))
    return { matches: null, matchesWithPrereleases: null };
  return {
    matches: semver.satisfies(version, required),
    matchesWithPrereleases: semver.satisfies(version, required, {
      includePrerelease: true,
    }),
  };
}

export function mappedAssetPath(root, importMapFile, mapped) {
  if (typeof mapped !== 'string') return null;
  const origin = 'https://deployment.invalid';
  const base = new URL(relative(root, importMapFile), `${origin}/`);
  const url = new URL(mapped, base);
  if (url.origin !== origin) return null;
  return join(root, decodeURIComponent(url.pathname).slice(1));
}

export async function containedFile(root, path) {
  root = await realpath(root);
  path = await realpath(path);
  const rel = relative(root, path);
  if (isAbsolute(rel) || rel === '..' || rel.startsWith('../'))
    throw new Error('Contract asset escapes its allowed root');
  return path;
}

/** Nearest package.json above a served asset, without leaving the root. */
export async function distributionManifest(root, assetPath) {
  root = await realpath(root);
  let directory = dirname(await containedFile(root, assetPath));
  while (directory.startsWith(`${root}/`)) {
    const candidate = join(directory, 'package.json');
    try {
      await access(candidate);
      return {
        path: await containedFile(root, candidate),
        manifest: await readJson(candidate),
      };
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    directory = dirname(directory);
  }
  return null;
}

/**
 * When the deployed directory is the `dist` of an assembled candidate run, its
 * report.json records every served third-party/plugin distribution with the
 * version it was taken from and the sha256 of each served file. Those
 * versions are trusted only when the served bytes still match.
 */
export async function candidateServedVersions(deployed) {
  const candidatesRoot = join(workspace, '.artifacts/frontend-candidates');
  let reportPath;
  try {
    reportPath = await containedFile(
      candidatesRoot,
      join(dirname(deployed), 'report.json'),
    );
  } catch {
    return null;
  }
  const report = await readJson(reportPath);
  if (
    !report.output?.path ||
    (await realpath(join(workspace, report.output.path))) !==
      (await realpath(deployed))
  )
    return null;
  const served = new Map();
  for (const dependency of report.dependencies || []) {
    let verified = Boolean(dependency.output?.files?.length);
    for (const file of dependency.output?.files || []) {
      try {
        const path = await containedFile(
          deployed,
          join(workspace, dependency.output.path, file.path),
        );
        if ((await fingerprint(path)).sha256 !== file.sha256) verified = false;
      } catch {
        verified = false;
      }
    }
    served.set(dependency.name, {
      version: dependency.version,
      kind: dependency.kind,
      verified,
      output: dependency.output?.path,
    });
  }
  return { reportPath, served };
}

export async function auditSourceContracts(buildDirectory, deployedDirectory) {
  const build = await containedFile(
    join(workspace, '.artifacts/frontend-source'),
    resolve(buildDirectory),
  );
  const deployed = await containedFile(workspace, resolve(deployedDirectory));
  const outputRoot = join(workspace, '.artifacts/frontend-source-contracts');
  await mkdir(outputRoot, { recursive: true });
  const run = await mkdtemp(
    join(outputRoot, `${new Date().toISOString().replaceAll(':', '-')}-`),
  );
  const report = {
    schemaVersion: 2,
    generatedAt: new Date().toISOString(),
    build: localPath(build),
    deployedSnapshot: localPath(deployed),
    status: 'checking',
    contractsVerified: false,
    deployable: false,
    browserVerified: false,
    productionModified: false,
    failures: [],
    unverified: [],
    edges: [],
    installedVersionChecks: [],
    distributionPeerChecks: [],
    assets: [],
    scope:
      'Static SystemJS import contracts (named setters and tracked dynamic imports) against candidate chunks and the served deployment assets; non-System.register providers are executed in a Node vm sandbox emulating the SystemJS 6.14.2 global extra. Served library versions are proven only when an assembled-candidate report records the served file hashes; installed manifest versions are NOT proof of served versions. Version checks report strict node-semver `matches` and pnpm-style `matchesWithPrereleases`; only strict mismatches fail.',
  };
  try {
    const integrity = await verifySourceRuntime(build, { quiet: true });
    report.integrity = integrity;
    report.failures.push(...integrity.failures);
    const buildReport = await readJson(join(build, 'report.json'));
    const importMapPath = await containedFile(
      deployed,
      join(deployed, 'extras/json/system-import.json'),
    );
    const importMap = await readJson(importMapPath);
    report.inputs = [];
    for (const path of [
      fileURLToPath(import.meta.url),
      join(appRoot, 'scripts/verify-source-runtime.mjs'),
      join(build, 'report.json'),
      importMapPath,
      join(appRoot, 'node_modules/typescript/package.json'),
      join(appRoot, 'node_modules/.pnpm/node_modules/semver/package.json'),
    ])
      report.inputs.push({
        path: localPath(path),
        ...(await fingerprint(path)),
      });
    const servedVersions = await candidateServedVersions(deployed);
    if (servedVersions) {
      report.inputs.push({
        path: localPath(servedVersions.reportPath),
        ...(await fingerprint(servedVersions.reportPath)),
      });
      report.servedVersions = [...servedVersions.served].map(
        ([name, entry]) => ({ name, ...entry }),
      );
    }
    const candidates = new Map(
      buildReport.packages.map(entry => [entry.name, entry]),
    );
    const cache = new Map();
    async function load(path, root, { allowGlobal = false } = {}) {
      path = await containedFile(root, path);
      if (!cache.has(path)) {
        const bytes = await fingerprint(path);
        const code = await readFile(path, 'utf8');
        let contract = inspectModuleContract(code);
        if (
          allowGlobal &&
          contract.unknown.includes('Expected one System.register declaration') &&
          !/System\.register\(/.test(code)
        ) {
          contract = inspectGlobalModuleContract(code, {
            filename: localPath(path),
          });
        }
        cache.set(path, contract);
        report.assets.push({
          path: localPath(path),
          ...bytes,
          ...contract,
          dynamicImports: contract.dynamicImports?.length
            ? contract.dynamicImports
            : undefined,
        });
      }
      return cache.get(path);
    }
    const candidateProvider = async name => {
      const target = candidates.get(name);
      if (!target) return null;
      if (target.status !== 'built') return { failed: true };
      const providerPath = await containedFile(
        build,
        join(workspace, target.output.path, 'index.system.js'),
      );
      return { providerPath, provider: await load(providerPath, build) };
    };
    const checkedDeployedProviders = new Set();
    async function resolveRequest(entry, file, root, request) {
      if (request.specifier.startsWith('.')) {
        const providerPath = await containedFile(
          root,
          resolve(dirname(file), request.specifier),
        );
        return { providerPath, provider: await load(providerPath, root) };
      }
      const candidate = await candidateProvider(request.specifier);
      if (candidate?.failed) {
        report.failures.push({
          consumer: entry.name,
          dependency: request.specifier,
          reason: 'Candidate dependency did not build',
        });
        return null;
      }
      if (candidate) return candidate;
      const mapped = mappedAssetPath(
        deployed,
        importMapPath,
        importMap.imports?.[request.specifier],
      );
      if (!mapped) {
        report.unverified.push({
          consumer: entry.name,
          dependency: request.specifier,
          reason: 'No supported local deployment mapping',
        });
        return null;
      }
      const providerPath = await containedFile(deployed, mapped);
      const provider = await load(providerPath, deployed, {
        allowGlobal: true,
      });
      if (!checkedDeployedProviders.has(providerPath)) {
        checkedDeployedProviders.add(providerPath);
        await checkDeployedProvider(providerPath, provider, request.specifier);
      }
      return { providerPath, provider };
    }
    /** A served distribution that itself imports candidate framework packages
     *  (plugins) is a consumer of the candidate too. */
    async function checkDeployedProvider(providerPath, provider, specifier) {
      for (const request of provider.imports || []) {
        const candidate = await candidateProvider(request.specifier);
        if (!candidate || candidate.failed) continue;
        const comparison = compareNamedImports(request, candidate.provider);
        const edge = {
          consumer: localPath(providerPath),
          dependency: request.specifier,
          provider: localPath(candidate.providerPath),
          servedDistribution: specifier,
          ...comparison,
        };
        report.edges.push(edge);
        if (comparison.missing.length) report.failures.push(edge);
        if (comparison.unverified) report.unverified.push(edge);
      }
      const distribution = await distributionManifest(deployed, providerPath);
      if (!distribution) return;
      const { manifest } = distribution;
      report.inputs.push({
        path: localPath(distribution.path),
        ...(await fingerprint(distribution.path)),
      });
      const servedEntry = servedVersions?.served.get(specifier);
      for (const [peer, required] of Object.entries(
        manifest.peerDependencies || {},
      )) {
        const resolution = await resolveVersion(peer, peer, null);
        const check = {
          consumer: specifier,
          consumerVersion: manifest.version,
          consumerManifest: localPath(distribution.path),
          consumerServedVersionVerified: servedEntry
            ? servedEntry.verified
            : null,
          dependency: peer,
          section: 'peerDependencies',
          required,
          ...resolution,
        };
        if (!(peer in (importMap.imports || {})) && !candidates.has(peer)) {
          check.matches = null;
          check.matchesWithPrereleases = null;
          check.versionSource = 'not-a-loader-resolved-module';
          check.resolution =
            'Peer is not in the import map: bundled into the distribution or absent, so the loader never resolves it';
          report.distributionPeerChecks.push(check);
          continue;
        }
        Object.assign(check, checkVersionRange(required, resolution.version));
        report.distributionPeerChecks.push(check);
        if (check.matches === false) report.failures.push(check);
        if (check.matches === null) report.unverified.push(check);
      }
    }
    async function resolveVersion(specifier, name, installedVersion) {
      const target = candidates.get(name);
      if (target)
        return {
          version: target.sourceVersion,
          versionSource: 'candidate-source-manifest',
        };
      const servedEntry =
        servedVersions?.served.get(specifier) || servedVersions?.served.get(name);
      if (servedEntry) {
        return servedEntry.verified
          ? {
              version: servedEntry.version,
              versionSource: 'candidate-served-distribution-hash-verified',
              servedKind: servedEntry.kind,
            }
          : {
              version: null,
              versionSource: 'candidate-served-distribution-hash-mismatch',
              servedKind: servedEntry.kind,
            };
      }
      if (installedVersion === null) {
        try {
          const manifest = await containedFile(
            appRoot,
            join(appRoot, 'node_modules', name, 'package.json'),
          );
          installedVersion = (await readJson(manifest)).version;
        } catch {
          installedVersion = null;
        }
      }
      return {
        version: installedVersion,
        versionSource: 'installed-manifest-not-served-version',
      };
    }
    for (const entry of buildReport.packages.filter(
      entry => entry.status === 'built',
    )) {
      const root = await containedFile(
        build,
        join(workspace, entry.output.path),
      );
      for (const chunk of entry.chunks) {
        const file = await containedFile(root, join(root, chunk.file));
        const contract = await load(file, root);
        if (contract.unknown.length)
          report.unverified.push({
            file: localPath(file),
            reasons: contract.unknown,
          });
        const recorded = [...(chunk.dynamicImports || [])].sort();
        const found = contract.dynamicImports
          .map(request => request.specifier)
          .sort();
        if (JSON.stringify(recorded) !== JSON.stringify(found)) {
          report.unverified.push({
            file: localPath(file),
            reason: 'Dynamic import inventory differs from the build report',
            recorded,
            found,
          });
        }
        for (const request of contract.imports) {
          const resolved = await resolveRequest(entry, file, root, request);
          if (!resolved) continue;
          const comparison = compareNamedImports(request, resolved.provider);
          const edge = {
            consumer: localPath(file),
            dependency: request.specifier,
            provider: localPath(resolved.providerPath),
            ...comparison,
          };
          report.edges.push(edge);
          if (comparison.missing.length) report.failures.push(edge);
          if (comparison.unverified) report.unverified.push(edge);
        }
        for (const request of contract.dynamicImports) {
          if (!request.specifier) {
            report.unverified.push({
              consumer: localPath(file),
              dynamic: true,
              reasons: request.reasons,
            });
            continue;
          }
          const resolved = await resolveRequest(entry, file, root, request);
          if (!resolved) continue;
          const comparison = compareNamedImports(request, resolved.provider);
          const edge = {
            consumer: localPath(file),
            dependency: request.specifier,
            provider: localPath(resolved.providerPath),
            dynamic: true,
            names: request.names,
            probed: request.probed,
            reasons: request.reasons,
            ...comparison,
          };
          report.edges.push(edge);
          if (comparison.missing.length) report.failures.push(edge);
          if (comparison.unverified) report.unverified.push(edge);
        }
      }
      const manifest = await readJson(
        join(
          workspace,
          buildReport.sourceSet,
          entry.name.split('/').at(-1),
          'package.json',
        ),
      );
      for (const external of entry.externalDependencies || []) {
        if (external.manifest) {
          const path = await containedFile(
            workspace,
            join(workspace, external.manifest),
          );
          const current = await fingerprint(path);
          report.inputs.push({ path: localPath(path), ...current });
          if (current.sha256 !== external.sha256) {
            report.failures.push({
              dependency: external.specifier,
              reason: 'Installed manifest changed since build',
            });
          }
        }
        const name = external.specifier.startsWith('@')
          ? external.specifier.split('/').slice(0, 2).join('/')
          : external.specifier.split('/')[0];
        const resolution = await resolveVersion(
          external.specifier,
          name,
          external.installedVersion ?? null,
        );
        for (const section of [
          'dependencies',
          'peerDependencies',
          'devDependencies',
        ]) {
          const required = manifest[section]?.[name];
          if (!required) continue;
          const check = {
            consumer: entry.name,
            dependency: name,
            section,
            required,
            ...resolution,
            ...checkVersionRange(required, resolution.version),
          };
          report.installedVersionChecks.push(check);
          if (check.matches === false) report.failures.push(check);
          if (check.matches === null) report.unverified.push(check);
        }
      }
    }
    report.contractsVerified =
      !report.failures.length &&
      !report.unverified.length &&
      report.edges.length > 0;
    report.status = report.contractsVerified ? 'passed-not-deployed' : 'failed';
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
        edges: report.edges.length,
        failures: report.failures.length,
        unverified: report.unverified.length,
        distributionPeerChecks: report.distributionPeerChecks.length,
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
      build: { type: 'string' },
      'deployed-dir': { type: 'string' },
    },
  });
  if (!values.build || !values['deployed-dir'])
    throw new Error(
      'Required: --build ARTIFACT_RUN --deployed-dir CAPTURED_WEB_DIST',
    );
  const report = await auditSourceContracts(
    values.build,
    values['deployed-dir'],
  );
  if (!report.contractsVerified) process.exitCode = 1;
}
