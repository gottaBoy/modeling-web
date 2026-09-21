import { access, lstat, readdir, readFile, realpath } from 'node:fs/promises';
import { constants } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, parse, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageJsonPath = join(root, 'package.json');
const lockfilePath = join(root, 'pnpm-lock.yaml');
const nodeModulesPath = join(root, 'node_modules');
const modulesMetadataPath = join(nodeModulesPath, '.modules.yaml');
const distPath = join(root, 'dist');
const sourceImportMapPath = join(root, 'public/extras/json/system-import.json');
const sourceEnvironmentPath = join(root, 'public/environments/environment.js');
const nginxConfigPath = resolve(root, '..', 'nginx-local.conf');
const modelPluginSourcePath = resolve(
  root,
  '..',
  '..',
  'plm-web/public/plugins',
);
const modelPluginModelPaths = [
  resolve(
    root,
    '..',
    '..',
    'plm/model/PSSYSAPPS/plmweb/PSSYSAPP.simple.json',
  ),
  resolve(root, '..', '..', 'plm/model/PSSYSAPPS/plmweb/PSSYSAPP.json'),
  resolve(
    root,
    '..',
    '..',
    'plm/model/PSSYSAPPS/plmweb/PSSYSAPP.hubsubapp.json',
  ),
  resolve(
    root,
    '..',
    '..',
    'plm-web/public/static/app/sub-app.json',
  ),
].filter((modelPath, index, modelPaths) => {
  return modelPaths.indexOf(modelPath) === index;
});

const requiredPackages = {
  '@ibiz-template-plugin/ai-chat': '0.0.66',
  '@ibiz-template-plugin/bi-report': '0.0.32',
  '@ibiz-template-plugin/data-view': '0.0.6',
  '@ibiz-template-plugin/gantt': '0.1.8-alpha.378',
  '@ibiz-template/core': '0.7.41-alpha.78',
  '@ibiz-template/devtool': '0.0.14',
  '@ibiz-template/model-helper': '0.7.41-alpha.86',
  '@ibiz-template/runtime': '0.7.41-alpha.86',
  '@ibiz-template/theme': '0.7.39',
  '@ibiz-template/vue3-components': '0.7.41-alpha.78',
  '@ibiz-template/vue3-util': '0.7.41-alpha.86',
  '@ibiz-template/web-theme': '3.11.0',
  '@ibiz/model-core': '0.1.84',
  '@ibiz/rt-model-api': '0.2.82',
  vite: '5.0.12',
  'vue-tsc': '1.8.27',
};

const publishedVersionedAssets = {
  'vue-i18n': {
    section: 'imports',
    file: 'vue-i18n.runtime.system.prod.js',
  },
  '@antv/x6': {
    section: 'imports',
    file: 'index.system.min.js',
  },
  '@ibiz-template-plugin/ai-chat': {
    section: 'imports',
    file: 'index.system.min.js',
    styleFile: 'index.min.css',
  },
  '@ibiz-template-plugin/gantt': {
    section: 'imports',
    file: 'index.system.min.js',
    styleFile: 'index.min.css',
  },
  '@ibiz-template-plugin/bi-report': {
    section: 'imports',
    file: 'index.system.min.js',
    styleFile: 'index.min.css',
  },
  '@ibiz-template-plugin/data-view': {
    section: 'imports',
    file: 'index.system.min.js',
    styleFile: 'index.min.css',
  },
};

const publishedTemplateAssets = {
  '@ibiz-template/core': {
    source: 'dist/index.system.min.js',
    target: 'extras/js/@ibiz-template/core/index.system.min.js',
  },
  '@ibiz-template/runtime': {
    source: 'dist/index.system.min.js',
    target: 'extras/js/@ibiz-template/runtime/index.system.min.js',
  },
  '@ibiz-template/model-helper': {
    source: 'dist/index.system.min.js',
    target: 'extras/js/@ibiz-template/model-helper/index.system.min.js',
  },
};

const publishedComponentPackages = [
  '@ibiz-template/vue3-util',
  '@ibiz-template/vue3-components',
  '@ibiz-template/web-theme',
  '@ibiz-template/devtool',
];

const publishedPluginAssets = {
  '@ibiz-template-plugin/ai-chat': {
    source: {
      script: 'dist/index.legacy.js',
      style: 'dist/style.css',
      polyfill: 'dist/polyfills.legacy.js',
    },
    target: {
      script: 'index.system.min.js',
      style: 'index.min.css',
      polyfill: 'polyfills.legacy.js',
    },
  },
  '@ibiz-template-plugin/gantt': {
    source: {
      script: 'dist/index.legacy.js',
      style: 'dist/style.css',
      polyfill: 'dist/polyfills.legacy.js',
    },
    target: {
      script: 'index.system.min.js',
      style: 'index.min.css',
      polyfill: 'polyfills.legacy.js',
    },
  },
  '@ibiz-template-plugin/bi-report': {
    source: {
      script: 'dist/index.legacy.js',
      style: 'dist/style.css',
      polyfill: 'dist/polyfills.legacy.js',
    },
    target: {
      script: 'index.system.min.js',
      style: 'index.min.css',
      polyfill: 'polyfills.legacy.js',
    },
  },
  '@ibiz-template-plugin/data-view': {
    source: {
      script: 'dist/index.legacy.js',
      style: 'dist/style.css',
      polyfill: 'dist/polyfills.legacy.js',
    },
    target: {
      script: 'index.system.min.js',
      style: 'index.min.css',
      polyfill: 'polyfills.legacy.js',
    },
  },
};

const exactPackageManager = 'pnpm@8.15.9';
const exactLockfileVersion = '6.0';
const shouldCheckDist = process.argv.includes('--dist');
const relativeAssetPattern =
  /(?:["'`])((?:\.{1,2}\/)[^"'`\s)]+)(?:["'`])|url\(\s*["']?((?:\.{1,2}\/)[^"'\s)]+)["']?\s*\)/g;
const relativeAssetExtensions =
  /\.(?:js|mjs|cjs|css|json|svg|png|jpe?g|gif|webp|woff2?|eot|ttf|otf)(?:[?#].*)?$/i;
const typeCompatibilityDeclarations = {
  '@ibiz-template/vue3-components':
    "declare module '@ibiz-template/vue3-components'",
  '@ibiz-template-plugin/gantt': "declare module '@ibiz-template-plugin/gantt'",
  '@ibiz-template/devtool': "declare module '@ibiz-template/devtool'",
};

const checks = [];

function pass(message) {
  checks.push({ ok: true, message });
  console.log(`[release-harness] OK: ${message}`);
}

function fail(message) {
  checks.push({ ok: false, message });
  console.error(`[release-harness] FAIL: ${message}`);
  process.exitCode = 1;
}

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function filesInDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await filesInDirectory(entryPath)));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }
  return files;
}

async function directoryContains(directory, text) {
  if (!(await exists(directory))) return false;
  const files = await filesInDirectory(directory);
  for (const file of files) {
    if ((await readFile(file, 'utf8')).includes(text)) return true;
  }
  return false;
}

async function verifyFileCopy(
  sourcePath,
  targetPath,
  label,
  transformSource = (_sourcePath, source) => source,
) {
  if (!(await exists(sourcePath))) {
    fail(`${label} source is missing: ${relativePath(sourcePath)}`);
    return false;
  }
  if (!(await exists(targetPath))) {
    fail(`${label} published file is missing: ${relativePath(targetPath)}`);
    return false;
  }

  const [source, target] = await Promise.all([
    readFile(sourcePath),
    readFile(targetPath),
  ]);
  if (!transformSource(sourcePath, source).equals(target)) {
    fail(
      `${label} differs from its installed source: ${relativePath(targetPath)}`,
    );
    return false;
  }
  return true;
}

function normalizeRuntimeAsset(sourcePath, source) {
  if (!sourcePath.endsWith('.js')) return source;
  const normalized = source
    .toString('utf8')
    .replace(
      'get batchToolbarController(){return this.view.getController("".concat(this.model.name,"_batchtoolbar"))}',
      'get batchToolbarController(){return this.view?this.view.getController("".concat(this.model.name,"_batchtoolbar")):void 0}',
    )
    .replace(
      'get quickToolbarController(){return this.view.getController("".concat(this.model.name,"_quicktoolbar"))}',
      'get quickToolbarController(){return this.view?this.view.getController("".concat(this.model.name,"_quicktoolbar")):void 0}',
    )
    .replace(
      'default:return void ibiz.log.error(ibiz.i18n.t("runtime.controller.control.grid.unsupported",{type:n[e].type}))',
      'default:if(!n[e].type||["array","object"].includes(n[e].type))return;return void ibiz.log.error(ibiz.i18n.t("runtime.controller.control.grid.unsupported",{type:n[e].type}))',
    )
    .replace(
      'default:ibiz.log.error(ibiz.i18n.t("runtime.controller.control.grid.unsupported",{type:s[e].type}))',
      'default:if(s[e].type&&!["array","object"].includes(s[e].type))ibiz.log.error(ibiz.i18n.t("runtime.controller.control.grid.unsupported",{type:s[e].type}))',
    )
    .replace(
      'default:return void ibiz.log.error(ibiz.i18n.t("runtime.controller.control.grid.unsupported",{type:a[e].type}))',
      'default:if(!a[e].type||["array","object"].includes(a[e].type))return;return void ibiz.log.error(ibiz.i18n.t("runtime.controller.control.grid.unsupported",{type:a[e].type}))',
    )
    .replace(
      '):ibiz.log.error(ibiz.i18n.t("runtime.controller.control.grid.unsupported",{type:""}),e.type)}),r}',
      '):e.type&&ibiz.log.error(ibiz.i18n.t("runtime.controller.control.grid.unsupported",{type:""}),e.type)}),r}',
    )
    .replace(
      'const n=a.view.getController(i.codeName.toLowerCase())',
      'const n=a.view?a.view.getController(i.codeName.toLowerCase()):void 0',
    )
    .replace(
      'ibiz.log.error(ibiz.i18n.t("runtime.uiLogic.viewLogicInitializationParameter",{codeName:i.codeName}))',
      'ibiz.log.debug(ibiz.i18n.t("runtime.uiLogic.viewLogicInitializationParameter",{codeName:i.codeName}))',
    );
  return Buffer.from(normalized);
}

async function verifyCopiedDirectory(
  sourceDirectory,
  targetDirectory,
  label,
  additionalSources = [],
  transformSource = (_sourcePath, source) => source,
) {
  if (!(await exists(sourceDirectory))) {
    fail(`${label} source directory is missing: ${relativePath(sourceDirectory)}`);
    return;
  }
  if (!(await exists(targetDirectory))) {
    fail(
      `${label} published directory is missing: ${relativePath(targetDirectory)}`,
    );
    return;
  }

  const expectedFiles = (
    await Promise.all([
      ...(await filesInDirectory(sourceDirectory)).map(async file => ({
        relativePath: relative(sourceDirectory, file),
        sourcePath: file,
      })),
      ...additionalSources.flatMap(
        ({ directory, targetPrefix }) =>
          filesInDirectory(directory).then(files =>
            files.map(file => ({
              relativePath: join(
                targetPrefix,
                relative(directory, file),
              ),
              sourcePath: file,
            })),
          ),
      ),
    ])
  ).flat();
  const expectedFileMap = new Map(
    expectedFiles.map(file => [file.relativePath, file.sourcePath]),
  );
  const sourceFiles = [...expectedFileMap.keys()].sort();
  const targetFiles = (await filesInDirectory(targetDirectory))
    .map(file => relative(targetDirectory, file))
    .sort();
  const sourceSet = new Set(expectedFileMap.keys());
  const targetSet = new Set(targetFiles);
  const missing = sourceFiles.filter(file => !targetSet.has(file));
  const extra = targetFiles.filter(file => !sourceSet.has(file));
  const different = [];

  for (const file of sourceFiles) {
    if (!targetSet.has(file)) continue;
    const [source, target] = await Promise.all([
      readFile(expectedFileMap.get(file)),
      readFile(join(targetDirectory, file)),
    ]);
    if (!transformSource(expectedFileMap.get(file), source).equals(target)) {
      different.push(file);
    }
  }

  if (missing.length || extra.length || different.length) {
    const details = [
      missing.length ? `missing [${missing.join(', ')}]` : '',
      extra.length ? `extra [${extra.join(', ')}]` : '',
      different.length ? `different [${different.join(', ')}]` : '',
    ]
      .filter(Boolean)
      .join('; ');
    fail(`${label} is not an exact copy of its installed source: ${details}`);
    return;
  }

  pass(`${label} exactly matches ${sourceFiles.length} expected file(s)`);
}

async function findPackageJson(entryPath) {
  let directory = dirname(entryPath);
  const filesystemRoot = parse(directory).root;

  while (directory !== filesystemRoot) {
    const candidate = join(directory, 'package.json');
    if (await exists(candidate)) {
      return candidate;
    }
    directory = dirname(directory);
  }

  return null;
}

function declaredVersion(packageName, packageJson) {
  return (
    packageJson.dependencies?.[packageName] ??
    packageJson.devDependencies?.[packageName] ??
    null
  );
}

function parseVersion(version) {
  const match = version?.match(/^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?/);
  return match
    ? {
        major: Number(match[1]),
        minor: Number(match[2]),
        patch: Number(match[3]),
        prerelease: match[4] ?? '',
      }
    : null;
}

function compareVersions(left, right) {
  for (const key of ['major', 'minor', 'patch']) {
    if (left[key] !== right[key]) {
      return left[key] > right[key] ? 1 : -1;
    }
  }
  if (left.prerelease === right.prerelease) return 0;
  if (!left.prerelease) return 1;
  if (!right.prerelease) return -1;
  return left.prerelease > right.prerelease ? 1 : -1;
}

function satisfiesDeclaredVersion(version, range) {
  if (!range || range === '*' || range === 'latest') return true;
  const installed = parseVersion(version);
  const base = parseVersion(range.replace(/^[~^<>= ]+/, ''));
  if (!installed || !base) return false;

  if (/^\^/.test(range)) {
    if (base.major > 0) {
      return (
        installed.major === base.major && compareVersions(installed, base) >= 0
      );
    }
    if (base.minor > 0) {
      return (
        installed.major === 0 &&
        installed.minor === base.minor &&
        compareVersions(installed, base) >= 0
      );
    }
    return (
      installed.major === 0 &&
      installed.minor === 0 &&
      installed.patch === base.patch
    );
  }

  if (/^~/.test(range)) {
    return (
      installed.major === base.major &&
      installed.minor === base.minor &&
      compareVersions(installed, base) >= 0
    );
  }

  return compareVersions(installed, base) === 0;
}

function runtimePackageManager() {
  const userAgent = process.env.npm_config_user_agent ?? '';
  const match = userAgent.match(/(?:^|\s)pnpm\/(\S+)/);
  return match ? `pnpm@${match[1]}` : null;
}

function relativePath(path) {
  return relative(root, path) || '.';
}

function isWithin(parent, child) {
  const pathFromParent = relative(parent, child);
  return (
    pathFromParent === '' ||
    (!pathFromParent.startsWith('..') && !parse(pathFromParent).root)
  );
}

function activeEnvironmentValue(environment, key) {
  return environment.match(new RegExp(`^\\s*${key}:\\s*'([^']+)'`, 'm'))?.[1];
}

async function resolvePackage(packageName) {
  try {
    const entryPath = require.resolve(packageName, { paths: [root] });
    const manifestPath = await findPackageJson(entryPath);
    if (!manifestPath) {
      throw new Error(`package.json not found above ${entryPath}`);
    }
    const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
    return { entryPath, manifestPath, manifest };
  } catch (error) {
    // Resource-only packages such as @ibiz-template/theme intentionally have no
    // JS entry, but their package manifest and files must still be installed.
    const manifestPath = join(nodeModulesPath, packageName, 'package.json');
    if (!(await exists(manifestPath))) {
      throw error;
    }
    const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
    return {
      entryPath: dirname(manifestPath),
      manifestPath,
      manifest,
    };
  }
}

async function verifyPackageLocation(packageName, entryPath, manifestPath) {
  const nodeModulesRealPath = await realpath(nodeModulesPath);
  const resolvedEntryPath = await realpath(entryPath);
  const resolvedManifestPath = await realpath(manifestPath);
  if (
    !isWithin(nodeModulesRealPath, resolvedEntryPath) ||
    !isWithin(nodeModulesRealPath, resolvedManifestPath)
  ) {
    throw new Error(
      `resolved paths escape app node_modules: entry ${relativePath(resolvedEntryPath)}, manifest ${relativePath(resolvedManifestPath)}`,
    );
  }
}

async function verifyDeclaredTypes(packageName, manifest, manifestPath) {
  const declaredTypes = manifest.types ?? manifest.typings;
  if (!declaredTypes) {
    pass(`${packageName} has no declared TypeScript entry`);
    return;
  }

  const typesPath = resolve(dirname(manifestPath), declaredTypes);
  if (await exists(typesPath)) {
    pass(`${packageName} declared types resolve to ${relativePath(typesPath)}`);
    return;
  }

  const compatibilityDeclaration = typeCompatibilityDeclarations[packageName];
  const hasCompatibilityDeclaration =
    compatibilityDeclaration &&
    (await directoryContains(join(root, 'src'), compatibilityDeclaration));
  if (hasCompatibilityDeclaration) {
    pass(
      `${packageName} missing declared types are covered by an explicit source compatibility declaration`,
    );
    return;
  }

  fail(
    `${packageName} declares missing types entry ${declaredTypes} and has no explicit source compatibility declaration`,
  );
}

async function verifyPublishedAsset(
  packageName,
  manifest,
  importMap,
  assetConfig,
  baseDirectory,
) {
  const importValue = importMap[assetConfig.section]?.[packageName];
  const assetValues = Array.isArray(importValue) ? importValue : [importValue];
  const expectedVersion = `/${manifest.version}/`;

  if (!importValue) {
    fail(`${packageName} is missing from public system-import.json`);
    return;
  }
  if (!assetValues.some(value => value.includes(expectedVersion))) {
    fail(
      `${packageName} import map must point to installed version ${manifest.version}`,
    );
    return;
  }

  for (const assetValue of assetValues) {
    const cleanPath = assetValue.split('?')[0];
    const assetPath = resolve(baseDirectory, cleanPath);
    if (!(await exists(assetPath))) {
      fail(`${packageName} points to missing asset ${cleanPath}`);
    }
  }

  if (assetConfig.styleFile) {
    const styleValue = importMap.styles?.[packageName];
    const styleValues = Array.isArray(styleValue) ? styleValue : [styleValue];
    if (
      !styleValue ||
      !styleValues.some(value => value.includes(expectedVersion))
    ) {
      fail(
        `${packageName} style map must point to installed version ${manifest.version}`,
      );
    } else {
      for (const stylePathValue of styleValues) {
        const cleanPath = stylePathValue.split('?')[0];
        const stylePath = resolve(baseDirectory, cleanPath);
        if (!(await exists(stylePath))) {
          fail(`${packageName} points to missing style ${cleanPath}`);
        }
      }
    }
  }
}

async function verifyRelativeAssets(directory) {
  if (!(await exists(directory))) {
    fail(
      `published component asset directory is missing: ${relativePath(directory)}`,
    );
    return;
  }

  const files = await filesInDirectory(directory);
  let referenceCount = 0;
  for (const file of files) {
    if (!/\.(?:js|mjs|cjs|css)$/i.test(file)) continue;
    const content = await readFile(file, 'utf8');
    let match;
    while ((match = relativeAssetPattern.exec(content))) {
      const reference = match[1] ?? match[2];
      if (!relativeAssetExtensions.test(reference)) continue;
      referenceCount += 1;
      const cleanReference = reference.split(/[?#]/, 1)[0];
      const resolvedAsset = resolve(dirname(file), cleanReference);
      if (!isWithin(directory, resolvedAsset)) {
        fail(
          `${relativePath(file)} references a resource outside its published tree: ${reference}`,
        );
      } else if (!(await exists(resolvedAsset))) {
        fail(
          `${relativePath(file)} references missing relative resource ${reference}`,
        );
      }
    }
    relativeAssetPattern.lastIndex = 0;
  }

  if (referenceCount > 0) {
    pass(
      `published component tree resolves ${referenceCount} relative JS/CSS/media resource reference(s)`,
    );
  } else {
    pass('published component tree contains no relative resource references');
  }
}

function collectRuntimePluginRefs(value, pluginRefs) {
  if (Array.isArray(value)) {
    value.forEach(item => collectRuntimePluginRefs(item, pluginRefs));
    return;
  }
  if (!value || typeof value !== 'object') return;

  for (const [key, child] of Object.entries(value)) {
    if (key.toLowerCase() === 'rtobjectrepo' && typeof child === 'string') {
      pluginRefs.add(child);
    }
    collectRuntimePluginRefs(child, pluginRefs);
  }
}

async function verifyModelPluginAssets() {
  const availableModelPaths = [];
  for (const modelPath of modelPluginModelPaths) {
    if (await exists(modelPath)) availableModelPaths.push(modelPath);
  }
  if (!(await exists(modelPluginSourcePath)) || !availableModelPaths.length) {
    console.log(
      '[release-harness] INFO: model plugin source or model files are unavailable; dist/plugins checks skipped.',
    );
    return;
  }

  const pluginRefs = new Set();
  for (const modelPath of availableModelPaths) {
    collectRuntimePluginRefs(
      JSON.parse(await readFile(modelPath, 'utf8')),
      pluginRefs,
    );
  }

  const targetRoot = join(distPath, 'plugins');
  const missing = [];
  const invalid = [];
  for (const pluginRef of [...pluginRefs].sort()) {
    const parts = pluginRef.split('/');
    if (
      !pluginRef ||
      pluginRef.startsWith('/') ||
      parts.some(part => !part || part === '.' || part === '..')
    ) {
      invalid.push(pluginRef);
      continue;
    }

    const sourceRoot = join(modelPluginSourcePath, ...parts);
    const targetRootForPlugin = join(targetRoot, ...parts);
    const sourceManifestPath = join(sourceRoot, 'package.json');
    const targetManifestPath = join(targetRootForPlugin, 'package.json');
    if (!(await exists(sourceManifestPath))) {
      missing.push(`${pluginRef} (source package.json)`);
      continue;
    }
    if (!(await exists(targetManifestPath))) {
      missing.push(`${pluginRef} (dist package.json)`);
      continue;
    }

    await verifyFileCopy(
      sourceManifestPath,
      targetManifestPath,
      `${pluginRef} runtime plugin manifest`,
    );
    const manifest = JSON.parse(await readFile(sourceManifestPath, 'utf8'));
    const declaredAssets = [
      manifest.system,
      ...(Array.isArray(manifest.styles)
        ? manifest.styles
        : manifest.styles
          ? [manifest.styles]
          : []),
    ].filter(Boolean);
    for (const declaredAsset of declaredAssets) {
      if (!(await exists(join(targetRootForPlugin, declaredAsset)))) {
        missing.push(`${pluginRef} (${declaredAsset})`);
      }
    }
  }

  if (invalid.length) {
    fail(
      `model contains invalid runtime plugin repository path(s): ${invalid.join(', ')}`,
    );
  }
  if (missing.length) {
    fail(`dist/plugins is missing model runtime plugin asset(s): ${missing.join(', ')}`);
  } else {
    pass(
      `dist/plugins resolves ${pluginRefs.size} model runtime plugin package(s)`,
    );
  }
}

const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
const lockfile = await readFile(lockfilePath, 'utf8');

if (packageJson.packageManager !== exactPackageManager) {
  fail(
    `packageManager must be ${exactPackageManager} for lockfileVersion ${exactLockfileVersion}; found ${packageJson.packageManager ?? 'unset'}`,
  );
} else {
  pass(`packageManager declaration is ${exactPackageManager}`);
}

if (!/^lockfileVersion:\s*['"]?6(?:\.0)?['"]?/m.test(lockfile)) {
  fail(`pnpm-lock.yaml must use lockfileVersion ${exactLockfileVersion}`);
} else {
  pass(`pnpm-lock.yaml uses lockfileVersion ${exactLockfileVersion}`);
}

const actualPackageManager = runtimePackageManager();
if (actualPackageManager && actualPackageManager !== exactPackageManager) {
  fail(
    `release script is running under ${actualPackageManager}; invoke it with ${exactPackageManager}`,
  );
} else if (actualPackageManager) {
  pass(`release script is running under ${actualPackageManager}`);
} else {
  console.warn(
    '[release-harness] WARN: npm_config_user_agent does not identify pnpm; packageManager declaration remains authoritative',
  );
}

if (!(await exists(nodeModulesPath))) {
  fail('node_modules is missing; install with pnpm install --frozen-lockfile');
} else {
  const nodeModulesStat = await lstat(nodeModulesPath);
  if (nodeModulesStat.isSymbolicLink()) {
    fail('node_modules must be a real install, not a cross-project symlink');
  } else {
    pass('node_modules is a real directory');
  }

  if (!(await exists(modulesMetadataPath))) {
    fail(
      'node_modules/.modules.yaml is missing; the pnpm installation is incomplete',
    );
  } else {
    pass('pnpm installation metadata is present');
  }
}

for (const [packageName, expectedVersion] of Object.entries(requiredPackages)) {
  try {
    const { entryPath, manifestPath, manifest } =
      await resolvePackage(packageName);
    await verifyPackageLocation(packageName, entryPath, manifestPath);
    const declared = declaredVersion(packageName, packageJson);

    if (expectedVersion && manifest.version !== expectedVersion) {
      fail(
        `${packageName} resolved to ${manifest.version}, expected exact version ${expectedVersion}`,
      );
      continue;
    }
    if (declared && !satisfiesDeclaredVersion(manifest.version, declared)) {
      fail(
        `${packageName} resolved to ${manifest.version}, outside declared range ${declared}`,
      );
      continue;
    }

    console.log(
      `[release-harness] ${packageName}: ${manifest.version} (declared ${declared ?? 'unset'}, manifest ${relativePath(manifestPath)}, entry ${relativePath(entryPath)})`,
    );
    pass(`${packageName} is resolvable at version ${manifest.version}`);
    await verifyDeclaredTypes(packageName, manifest, manifestPath);
  } catch (error) {
    fail(
      `${packageName} is not resolvable from app dependencies: ${error.message}`,
    );
  }
}

if (!(await exists(sourceImportMapPath))) {
  fail('public/extras/json/system-import.json is missing');
} else {
  const sourceImportMap = JSON.parse(
    await readFile(sourceImportMapPath, 'utf8'),
  );
  for (const [packageName, assetConfig] of Object.entries(
    publishedVersionedAssets,
  )) {
    try {
      const { manifest } = await resolvePackage(packageName);
      await verifyPublishedAsset(
        packageName,
        manifest,
        sourceImportMap,
        assetConfig,
        dirname(sourceImportMapPath),
      );
    } catch (error) {
      fail(
        `${packageName} published asset check could not run: ${error.message}`,
      );
    }
  }
  if (checks.every(check => check.ok)) {
    pass('public system-import.json matches installed versioned assets');
  }
}

if (!(await exists(sourceEnvironmentPath))) {
  fail('public/environments/environment.js is missing');
} else {
  const environment = await readFile(sourceEnvironmentPath, 'utf8');
  if (activeEnvironmentValue(environment, 'appId') !== 'ibizmodeling__modeldesign') {
    fail('source environment appId must be ibizmodeling__modeldesign');
  } else {
    pass('source environment appId is ibizmodeling__modeldesign');
  }
  if (
    activeEnvironmentValue(environment, 'mockDcSystemId') !== 'ibizmodeling'
  ) {
    fail('source environment mockDcSystemId must be ibizmodeling');
  } else {
    pass('source environment mockDcSystemId is ibizmodeling');
  }
}

if (!(await exists(nginxConfigPath))) {
  fail('../nginx-local.conf is missing; deployment proxy contract cannot be checked');
} else {
  const nginx = await readFile(nginxConfigPath, 'utf8');
  const modelRoute = nginx.indexOf(
    'location ^~ /api/ibizmodeling__modeldesign/remotemodel/',
  );
  const businessRoute = nginx.indexOf(
    'location ^~ /api/ibizmodeling__modeldesign/ {',
  );
  if (modelRoute < 0 || businessRoute <= modelRoute) {
    fail(
      'nginx-local.conf must keep modeldesign remotemodel routing before its business proxy',
    );
  } else {
    pass('nginx-local.conf keeps modeldesign model routing before business proxy');
  }
  if (
    !nginx.includes('set $modeling_upstream http://modelingservice:32002;') ||
    !nginx.includes(
      'rewrite ^/api/ibizmodeling__modeldesign/(.*)$ /ibizmodeling/serviceapi/$1 break;',
    ) ||
    !nginx.includes('proxy_pass $modeling_upstream;')
  ) {
    fail('nginx-local.conf must route ModelDesign APIs to modelingservice');
  } else if (
    !nginx.includes('set $plm_upstream http://plmservice:30251;') &&
    !nginx.includes('proxy_pass http://plmservice:30251;')
  ) {
    fail('nginx-local.conf must retain the PLM business service proxy');
  } else {
    pass('nginx-local.conf routes ModelDesign to modelingservice and retains PLM proxy');
  }
  for (const applicationId of [
    'ibizmodeling__modeldesign',
    'ibizplm__plmweb',
  ]) {
    const themeRoute = `location = /api/${applicationId}/extension/app_view_themes/fetch_cur_user_all`;
    if (!nginx.includes(themeRoute)) {
      fail(`${themeRoute} must have an explicit optional-theme response`);
    } else {
      pass(`${applicationId} optional-theme route is explicitly handled`);
    }
  }
}

if (shouldCheckDist) {
  const indexPath = join(distPath, 'index.html');
  if (!(await exists(indexPath))) {
    fail(
      'dist/index.html is missing; the production build did not produce an entrypoint',
    );
  } else {
    const index = await readFile(indexPath, 'utf8');
    if (/<script\b[^>]*type=["']module["'][^>]*src=/i.test(index)) {
      fail('dist/index.html still contains a native module entry');
    } else {
      pass('dist/index.html has no native module entry');
    }
    if (!/vite-legacy-entry|nomodule/i.test(index)) {
      fail('dist/index.html has no legacy runtime entry');
    } else {
      pass('dist/index.html contains a legacy runtime entry');
    }
  }

  const importMapPath = join(distPath, 'extras/json/system-import.json');
  if (!(await exists(importMapPath))) {
    fail('dist/extras/json/system-import.json is missing');
  } else {
    const importMap = JSON.parse(await readFile(importMapPath, 'utf8'));
    const assetEntries = [
      ...Object.entries(importMap.imports ?? {}),
      ...Object.entries(importMap.styles ?? {}),
    ];
    for (const [packageName, assetValue] of assetEntries) {
      const assetPaths = Array.isArray(assetValue) ? assetValue : [assetValue];
      for (const assetPath of assetPaths) {
        const cleanPath = assetPath.split('?')[0];
        const absolutePath = resolve(dirname(importMapPath), cleanPath);
        if (!(await exists(absolutePath))) {
          fail(`${packageName} points to missing published asset ${cleanPath}`);
        }
      }
    }
    if (checks.every(check => check.ok)) {
      pass('system-import.json resolves every published JS and CSS asset');
    }
  }

  const vueRuntimePath = join(
    distPath,
    'extras/js/vue/3.3.8/vue.runtime.global.system.prod.js',
  );
  if (!(await exists(vueRuntimePath))) {
    fail('dist Vue runtime bundle is missing');
  } else {
    const vueRuntime = await readFile(vueRuntimePath, 'utf8');
  if (!vueRuntime.includes('nextSibling:e=>e?e.nextSibling:null')) {
    fail('dist Vue runtime bundle is missing the null-safe nextSibling guard');
  } else if (
    !vueRuntime.includes(
      'remove:e=>{const t=e&&e.parentNode;t&&t.removeChild(e)}',
    ) ||
    !vueRuntime.includes('parentNode:e=>e?e.parentNode:null')
  ) {
    fail('dist Vue runtime bundle is missing null-safe DOM cleanup guards');
  } else {
    pass('dist Vue runtime bundle contains null-safe DOM cleanup guards');
  }
  }

  const environmentPath = join(distPath, 'environments/environment.js');
  if (!(await exists(environmentPath))) {
    fail('dist/environments/environment.js is missing');
  } else {
    const environment = await readFile(environmentPath, 'utf8');
    if (activeEnvironmentValue(environment, 'appId') !== 'ibizmodeling__modeldesign') {
      fail('dist environment appId must be ibizmodeling__modeldesign');
    } else {
      pass('dist environment appId is ibizmodeling__modeldesign');
    }
    if (
      activeEnvironmentValue(environment, 'mockDcSystemId') !== 'ibizmodeling'
    ) {
      fail('dist environment mockDcSystemId must be ibizmodeling');
    } else {
      pass('dist environment mockDcSystemId is ibizmodeling');
    }
  }

  const runtimeAssetPath = join(
    distPath,
    'extras/js/@ibiz-template/runtime/index.system.min.js',
  );
  const componentsAssetPath = join(
    distPath,
    'extras/js/@ibiz-template/vue3-components/index.system.min.js',
  );
  const componentsAssetDirectory = join(
    distPath,
    'extras/js/@ibiz-template/vue3-components',
  );
  const runtimeAsset = (await exists(runtimeAssetPath))
    ? await readFile(runtimeAssetPath, 'utf8')
    : '';
  const componentsAsset = (await exists(componentsAssetPath))
    ? await readFile(componentsAssetPath, 'utf8')
    : '';
  if (!runtimeAsset.includes('microAppConfigCenter')) {
    fail('published runtime asset does not contain microAppConfigCenter');
  } else {
    pass('published runtime asset contains microAppConfigCenter');
  }
  if (
    !componentsAsset.includes('appResorceInited') &&
    !(await directoryContains(componentsAssetDirectory, 'appResorceInited'))
  ) {
    fail('published components asset tree does not contain appResorceInited');
  } else {
    pass('published components asset tree contains appResorceInited');
  }
  await verifyRelativeAssets(componentsAssetDirectory);
  const runtimeAssetChecks = [
    [
      'published runtime batch toolbar access is null-safe',
      'get batchToolbarController(){return this.view?this.view.getController("".concat(this.model.name,"_batchtoolbar")):void 0}',
    ],
    [
      'published runtime skips unsupported schema reference types',
      'if(!n[e].type||["array","object"].includes(n[e].type))return',
    ],
    [
      'published runtime view logic access is null-safe',
      'const n=a.view?a.view.getController(i.codeName.toLowerCase()):void 0',
    ],
    [
      'published runtime ignores optional missing view controls',
      'ibiz.log.debug(ibiz.i18n.t("runtime.uiLogic.viewLogicInitializationParameter"',
    ],
  ];
  for (const [label, marker] of runtimeAssetChecks) {
    if (runtimeAsset.includes(marker)) {
      pass(label);
    } else {
      fail(`${label} is missing`);
    }
  }

  for (const [packageName, asset] of Object.entries(publishedTemplateAssets)) {
    try {
      const { manifestPath } = await resolvePackage(packageName);
      await verifyFileCopy(
        join(dirname(manifestPath), asset.source),
        join(distPath, asset.target),
        `${packageName} template asset`,
        packageName === '@ibiz-template/runtime'
          ? normalizeRuntimeAsset
          : undefined,
      );
    } catch (error) {
      fail(
        `${packageName} template asset check could not run: ${error.message}`,
      );
    }
  }

  for (const packageName of publishedComponentPackages) {
    try {
      const { manifestPath } = await resolvePackage(packageName);
      await verifyCopiedDirectory(
        join(dirname(manifestPath), 'dist'),
        join(
          distPath,
          'extras/js/@ibiz-template',
          packageName.split('/').pop(),
        ),
        `${packageName} component asset tree`,
        packageName === '@ibiz-template/vue3-components'
          ? [
              {
                directory: join(root, 'public/assets/images'),
                targetPrefix: 'assets/images',
              },
            ]
          : [],
        packageName === '@ibiz-template/vue3-components'
          ? (sourcePath, source) => {
              if (!sourcePath.endsWith('.js')) return source;
              const sanitized = source
                .toString('utf8')
                .replace(
                  /!0===ibiz\.env\.isSaaSMode&&await this\.loadOrgData\(\)/g,
                  '!0===ibiz.env.isSaaSMode&&!0!==ibiz.env.isLocalModel&&await this.loadOrgData()',
                )
                .replace(/window\.addEventListener\("unload",[^\)]*\);?/g, '')
                .replace(
                  /this\.routeDepth&&this\.state\.drTabPages\[0\]&&this\.router\.push\(this\.state\.drTabPages\[0\]\.fullPath\)/g,
                  'this.routeDepth&&this.state.drTabPages[0]&&this.state.drTabPages[0].fullPath&&this.router.push(this.state.drTabPages[0].fullPath)',
                )
                .replace(
                  /this\.c\.noCache\?e\?a\(e,null,null\):null:a\(i\("keepAlive"\),\{include:o,max:30,isKey:!0\},\{default:\(\)=>\[e&&a\(e,null,null\)\]\}\)/g,
                  'this.c.noCache?e||null:a(i("keepAlive"),{include:o,max:30,isKey:!0},{default:()=>[e]})',
                );
              return Buffer.from(sanitized);
            }
          : packageName === '@ibiz-template/vue3-util'
            ? (sourcePath, source) => {
                if (!sourcePath.endsWith('.js')) return source;
                const sanitized = source
                  .toString('utf8')
                  .replace(
                    /const e=""!==n&&t\?A\(t,null,null\):null/g,
                    'const e=""!==n&&t?t:null',
                  )
                  .replace(
                    'setup(t,{attrs:e}){return{renderComp:i=>i?A(i,{...e,key:t.manualKey}):void 0}}',
                    'setup(t,{attrs:e}){const n={};let o=!0;l(()=>t.manualKey,(l,s)=>{et(l)&&l!==s&&(o=!0)});const r=(l,s)=>{if(!o)return n.vNode;o=!1;if(l){const s={...l.props};delete s.onVnodeUnmounted;delete s.ref;const r=w(l.type,{...s,...e,key:t.manualKey});return n.vNode=r,r}return void 0};return{renderComp:r}}',
                  );
                return Buffer.from(sanitized);
              }
          : undefined,
      );
    } catch (error) {
      fail(
        `${packageName} component asset check could not run: ${error.message}`,
      );
    }
  }

  for (const [packageName, assets] of Object.entries(publishedPluginAssets)) {
    try {
      const { manifestPath, manifest } = await resolvePackage(packageName);
      const versionDirectory = join(
        distPath,
        'extras/js/@ibiz-template-plugin',
        packageName.split('/').pop(),
        manifest.version,
      );
      const packageRoot = dirname(manifestPath);
      await Promise.all(
        Object.entries(assets.source).map(([assetName, source]) =>
          verifyFileCopy(
            join(packageRoot, source),
            join(versionDirectory, assets.target[assetName]),
            `${packageName} ${assetName} asset`,
          ),
        ),
      );
    } catch (error) {
      fail(
        `${packageName} plugin asset check could not run: ${error.message}`,
      );
    }
  }
  await verifyModelPluginAssets();
} else {
  console.log(
    '[release-harness] INFO: dist checks skipped; use verify:dist after build.',
  );
}

if (process.exitCode) {
  const failed = checks.filter(check => !check.ok).length;
  console.error(
    `[release-harness] Release build is blocked by ${failed} check(s). Fix every check before packaging.`,
  );
} else {
  console.log('[release-harness] All release preflight checks passed.');
}
