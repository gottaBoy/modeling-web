#!/usr/bin/env node
import { createRequire } from 'node:module';
import { cp, mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import {
  fingerprint,
  treeFingerprint,
} from '../../../scripts/localization-baseline.mjs';
import {
  dependencyRoot,
  verifySourceDependencies,
} from '../../source-build-deps/verify.mjs';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspace = resolve(appRoot, '../..');
const sourceRoot = resolve(appRoot, '../packages-latest/@ibiz-template');
const require = createRequire(join(appRoot, 'package.json'));
const hubRequire = createRequire(join(workspace, 'ibiz-app-hub/package.json'));
export const sourcePackages = [
  'core',
  'runtime',
  'model-helper',
  'vue3-util',
  'vue3-components',
  'devtool',
  'web-theme',
];
export const sourceCompilerOptions = Object.freeze({
  useDefineForClassFields: false,
});
const repositoryPackages = {
  core: 'packages/core',
  runtime: 'packages/runtime',
  'model-helper': 'packages/model-helper',
  'vue3-util': 'packages/vue3-util',
  'vue3-components': 'components/ibiz-next-vue3',
  devtool: 'plugins/ibiz-template-devtools',
  'web-theme': 'components/web-theme',
};
const relativeToWorkspace = path => relative(workspace, path);
const readJson = async path => JSON.parse(await readFile(path, 'utf8'));
const under = (root, path) => {
  const rel = relative(resolve(root), resolve(path));
  return rel === '' || (!rel.startsWith('..') && !isAbsolute(rel));
};

export function selectPackages(value) {
  const names = value ? value.split(',') : [...sourcePackages];
  if (
    new Set(names).size !== names.length ||
    names.some(name => !sourcePackages.includes(name))
  ) {
    throw new Error(
      `Unsupported or duplicate source package. Allowed: ${sourcePackages.join(',')}`,
    );
  }
  return names;
}

export function isolatedOutput(run, name) {
  if (
    !sourcePackages.includes(name) ||
    !under(join(workspace, '.artifacts/frontend-source'), run)
  ) {
    throw new Error(
      'Source builds must stay inside .artifacts/frontend-source',
    );
  }
  return join(run, 'packages', name);
}

const vendoredDependencies = {
  'xlsx-js-style':
    'vue3-components/es/node_modules/.pnpm/xlsx-js-style@1.2.0_patch_hash_jx5e37rj2robepsdcjw2utakd4/node_modules/xlsx-js-style/dist/xlsx.min.mjs',
  'qr-code-styling':
    'vue3-components/es/node_modules/.pnpm/qr-code-styling@1.9.2/node_modules/qr-code-styling/lib/qr-code-styling.mjs',
};

export async function buildSourceRuntime(names) {
  selectPackages(names.join(','));
  const outputRoot = join(workspace, '.artifacts/frontend-source');
  await mkdir(outputRoot, { recursive: true });
  const run = await mkdtemp(
    join(outputRoot, `${new Date().toISOString().replaceAll(':', '-')}-`),
  );
  const importMap = await readJson(
    join(appRoot, 'public/extras/json/system-import.json'),
  );
  const externalNames = new Set(Object.keys(importMap.imports));
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    lane: 'source-candidate',
    deployable: false,
    runtimeVerified: false,
    typesVerified: false,
    productionModified: false,
    sourceSet: relativeToWorkspace(sourceRoot),
    compilerOptions: sourceCompilerOptions,
    lockfile: await fingerprint(join(appRoot, 'pnpm-lock.yaml')),
    toolchain: {},
    packages: [],
    status: 'building',
    builder: {
      path: relativeToWorkspace(fileURLToPath(import.meta.url)),
      ...(await fingerprint(fileURLToPath(import.meta.url))),
    },
    importMap: await fingerprint(
      join(appRoot, 'public/extras/json/system-import.json'),
    ),
    hubLockfile: await fingerprint(
      join(workspace, 'ibiz-app-hub/pnpm-lock.yaml'),
    ),
    errors: [],
  };
  try {
    report.sourceDependencies = await verifySourceDependencies();
    const { build: buildFn } = await import(
      pathToFileURL(
        join(
          dirname(require.resolve('vite/package.json')),
          'dist/node/index.js',
        ),
      )
    );
    const vueJsx = (
      await import(pathToFileURL(require.resolve('@vitejs/plugin-vue-jsx')))
    ).default;
    const vue = (
      await import(pathToFileURL(require.resolve('@vitejs/plugin-vue')))
    ).default;
    const { nodeResolve } = hubRequire('@rollup/plugin-node-resolve');
    for (const name of [
      'vite',
      'typescript',
      '@vitejs/plugin-vue',
      '@vitejs/plugin-vue-jsx',
      'sass',
    ]) {
      const manifest = join(appRoot, 'node_modules', name, 'package.json');
      report.toolchain[name] = {
        version: (await readJson(manifest)).version,
        ...(await fingerprint(manifest)),
      };
    }
    const resolverManifest = join(
      workspace,
      'ibiz-app-hub/node_modules/@rollup/plugin-node-resolve/package.json',
    );
    report.toolchain['@rollup/plugin-node-resolve'] = {
      version: (await readJson(resolverManifest)).version,
      ...(await fingerprint(resolverManifest)),
    };
    for (const name of names) {
      try {
        const root = join(sourceRoot, name);
        const sourceManifest = await readJson(join(root, 'package.json'));
        const installed = await readJson(
          join(appRoot, 'node_modules/@ibiz-template', name, 'package.json'),
        );
        const source = await treeFingerprint(join(root, 'src'));
        const entry = {
          name: sourceManifest.name,
          sourceVersion: sourceManifest.version,
          productionVersion: installed.version,
          versionMatchesProduction:
            sourceManifest.version === installed.version,
          sourceManifest: await fingerprint(join(root, 'package.json')),
          source,
          theme: await treeFingerprint(join(sourceRoot, 'theme/style')),
          dependencies: [],
          externals: [],
          chunks: [],
          warnings: [],
          status: 'building',
        };
        report.packages.push(entry);
        const modulePaths = [
          join(dependencyRoot, 'node_modules'),
          join(appRoot, 'node_modules'),
          join(appRoot, 'node_modules/.pnpm/node_modules'),
          join(
            workspace,
            'ibiz-app-hub',
            repositoryPackages[name],
            'node_modules',
          ),
          join(workspace, 'ibiz-app-hub/node_modules'),
        ];
        const resolved = new Map();
        const output = isolatedOutput(run, name);
        const external = id => externalNames.has(id);
        await buildFn({
          configFile: false,
          root,
          publicDir: false,
          logLevel: 'warn',
          cacheDir: join(run, 'cache', name),
          esbuild: { tsconfigRaw: { compilerOptions: sourceCompilerOptions } },
          plugins: [
            vue(),
            vueJsx(),
            {
              name: 'local-source-dependencies',
              enforce: 'pre',
              resolveId(id) {
                if (Object.hasOwn(vendoredDependencies, id))
                  return join(sourceRoot, vendoredDependencies[id]);
                return null;
              },
              generateBundle(_options, bundle) {
                for (const id of this.getModuleIds()) {
                  if (
                    isAbsolute(id) &&
                    !id.includes('?') &&
                    !under(join(root, 'src'), id)
                  ) {
                    resolved.set(id, {
                      kind: 'bundled-dependency-not-framework-source',
                    });
                  }
                }
                entry.externals = [...this.getModuleIds()]
                  .filter(id => this.getModuleInfo(id)?.isExternal)
                  .sort();
                entry.chunks = Object.values(bundle)
                  .filter(value => value.type === 'chunk')
                  .map(chunk => ({
                    file: chunk.fileName,
                    exports: chunk.exports,
                    imports: chunk.imports,
                    dynamicImports: chunk.dynamicImports,
                    sourceModuleCount: Object.keys(chunk.modules).filter(id =>
                      under(join(root, 'src'), id),
                    ).length,
                  }));
              },
            },
            {
              ...nodeResolve({
                browser: true,
                rootDir: appRoot,
                modulePaths,
                preferBuiltins: false,
              }),
              enforce: 'pre',
            },
          ],
          css: {
            preprocessorOptions: {
              scss: {
                additionalData: `@use "${join(sourceRoot, 'theme/style/global.scss')}" as *;\n`,
                includePaths: [
                  join(appRoot, 'node_modules'),
                  join(workspace, 'ibiz-app-hub/node_modules'),
                ],
              },
            },
          },
          build: {
            outDir: output,
            emptyOutDir: true,
            sourcemap: true,
            minify: 'esbuild',
            lib: {
              entry: join(root, 'src/index.ts'),
              formats: ['system'],
              fileName: () => 'index.system.js',
            },
            rollupOptions: {
              external,
              onwarn(warning, warn) {
                if (
                  ['UNRESOLVED_IMPORT', 'MISSING_EXPORT'].includes(warning.code)
                )
                  throw new Error(warning.message);
                entry.warnings.push({
                  code: warning.code,
                  message: warning.message,
                });
                if (warning.code !== 'UNUSED_EXTERNAL_IMPORT') warn(warning);
              },
            },
          },
        });
        entry.runtimeAssets = [];
        if (name === 'vue3-components') {
          const images = join(appRoot, 'public/assets/images');
          await cp(images, join(output, 'assets/images'), { recursive: true });
          entry.runtimeAssets.push({
            path: relativeToWorkspace(images),
            ...(await treeFingerprint(images)),
          });
          entry.assetMountRequirement =
            'Serve assets/images under the application base; root-absolute source CSS URLs still require deployment verification.';
        }
        for (const [file, metadata] of resolved) {
          entry.dependencies.push({
            ...metadata,
            path: relativeToWorkspace(file),
            ...(await fingerprint(file)),
          });
        }
        entry.externalDependencies = [];
        for (const specifier of entry.externals) {
          const dependency = specifier.startsWith('@')
            ? specifier.split('/').slice(0, 2).join('/')
            : specifier.split('/')[0];
          const expected =
            sourceManifest.dependencies?.[dependency] ||
            sourceManifest.peerDependencies?.[dependency] ||
            null;
          try {
            const manifest = join(
              appRoot,
              'node_modules',
              dependency,
              'package.json',
            );
            entry.externalDependencies.push({
              specifier,
              requiredBySource: expected,
              installedVersion: (await readJson(manifest)).version,
              manifest: relativeToWorkspace(manifest),
              ...(await fingerprint(manifest)),
              compatibilityVerified: false,
            });
          } catch {
            entry.externalDependencies.push({
              specifier,
              requiredBySource: expected,
              installedVersion: null,
              compatibilityVerified: false,
            });
          }
        }
        entry.output = {
          path: relativeToWorkspace(output),
          ...(await treeFingerprint(output, { exclude: new Set() })),
        };
        if (
          (await treeFingerprint(join(root, 'src'))).sha256 !== source.sha256
        ) {
          throw new Error(`${name} source changed during build`);
        }
        if (!entry.chunks.some(chunk => chunk.sourceModuleCount > 0))
          throw new Error(`${name} did not compile any source modules`);
        entry.status = 'built';
      } catch (error) {
        report.errors.push({ name, message: error.message });
        const last = report.packages.at(-1);
        if (last?.status === 'building') {
          last.status = 'failed';
          last.error = error.message;
        }
      }
    }
    report.status = report.errors.length ? 'failed' : 'built-not-deployed';
  } catch (error) {
    report.status = 'failed';
    report.error = error.message;
    const last = report.packages.at(-1);
    if (last?.status === 'building') last.status = 'failed';
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
        packages: report.packages.map(p => ({
          name: p.name,
          version: p.sourceVersion,
          status: p.status,
        })),
        error: report.error,
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
  const { values } = parseArgs({ options: { packages: { type: 'string' } } });
  const report = await buildSourceRuntime(selectPackages(values.packages));
  if (report.status === 'failed') process.exitCode = 1;
}
