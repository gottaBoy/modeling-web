import { defineConfig } from 'vite';
import { existsSync, readdirSync, readFileSync } from 'fs';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import eslint from 'vite-plugin-eslint';
import legacy from '@vitejs/plugin-legacy';
// import { visualizer } from 'rollup-plugin-visualizer'; // 打包内容分析
import IBizVitePlugin from './vite-plugins/ibiz-vite-plugin';

/**
 * 判断是否为自定义标签
 *
 * @author chitanda
 * @date 2023-01-03 16:01:00
 * @param {string} tag
 * @return {*}  {boolean}
 */
function isCustomElement(tag: string): boolean {
  return tag.startsWith('ion-');
}

function sourceTypeExportCompat(): Plugin {
  return {
    name: 'ibiz-source-type-export-compat',
    enforce: 'pre',
    transform(code, id) {
      if (
        !isSourceDebug ||
        !id.startsWith(sourceWorkspaceRoot) ||
        !/\.(?:ts|tsx)$/.test(id)
      ) {
        return undefined;
      }

      const typeExports = [
        ...code.matchAll(
          /export\s+(?:declare\s+)?(?:interface|type)\s+([A-Za-z_$][\w$]*)/g,
        ),
      ].map(match => match[1]);
      const uniqueTypeExports = [...new Set(typeExports)];
      if (!uniqueTypeExports.length) return undefined;

      return `${code}\n${uniqueTypeExports
        .map(name => `export const ${name} = undefined;`)
        .join('\n')}`;
    },
  };
}

const sourcePackageRoot = path.resolve(
  __dirname,
  '../packages-latest/@ibiz-template',
);
const isSourceDebug = process.env.IBIZ_SOURCE_DEBUG === 'true';
const sourceWorkspaceRoot = path.resolve(__dirname, '../packages-latest');
const appNodeModules = path.resolve(__dirname, 'node_modules');
const sourceShimRoot = path.resolve(__dirname, 'src/dev-source-shims');
const dependencyRoots = [
  appNodeModules,
  path.resolve(appNodeModules, '.pnpm/node_modules'),
  path.resolve(__dirname, '../../plm-web/node_modules'),
  path.resolve(__dirname, '../../ibiz-app-hub/node_modules'),
  path.resolve(
    sourcePackageRoot,
    'vue3-components/es/node_modules',
  ),
  path.resolve(
    sourcePackageRoot,
    'vue3-components/lib/node_modules',
  ),
];

const sourcePackageNames = [
  '@ibiz-template/core',
  '@ibiz-template/model-helper',
  '@ibiz-template/runtime',
  '@ibiz-template/vue3-util',
  '@ibiz-template/vue3-components',
  '@ibiz-template/web-theme',
  '@ibiz-template/devtool',
  '@ibiz/model-core',
];

function readPackageJson(packagePath: string): Record<string, unknown> {
  try {
    return JSON.parse(readFileSync(packagePath, 'utf8')) as Record<
      string,
      unknown
    >;
  } catch {
    return {};
  }
}

function getPackageDependencyNames(packagePath: string): string[] {
  const packageJson = readPackageJson(packagePath);
  return [
    packageJson.dependencies,
    packageJson.devDependencies,
    packageJson.peerDependencies,
    packageJson.optionalDependencies,
  ].flatMap((dependencies) =>
    dependencies && typeof dependencies === 'object'
      ? Object.keys(dependencies)
      : [],
  );
}

function resolveDependencyFromRoot(
  root: string,
  packageName: string,
): string | undefined {
  const direct = path.resolve(root, packageName);
  if (existsSync(direct)) return direct;

  const pnpmRoot = path.resolve(root, '.pnpm');
  if (!existsSync(pnpmRoot)) return undefined;

  const hoisted = path.resolve(pnpmRoot, 'node_modules', packageName);
  if (existsSync(hoisted)) return hoisted;

  for (const entry of readdirSync(pnpmRoot)) {
    const nested = path.resolve(pnpmRoot, entry, 'node_modules', packageName);
    if (existsSync(nested)) return nested;
  }
  return undefined;
}

function resolveLocalDependency(packageName: string): string | undefined {
  for (const root of dependencyRoots) {
    const resolvedPath = resolveDependencyFromRoot(root, packageName);
    if (resolvedPath) return resolvedPath;
  }
  return undefined;
}

function resolveGeneratedDependencyFile(
  packageName: string,
  relativePath: string,
): string | undefined {
  const generatedRoots = [
    path.resolve(sourcePackageRoot, 'vue3-components/es/node_modules/.pnpm'),
    path.resolve(sourcePackageRoot, 'vue3-components/lib/node_modules/.pnpm'),
  ];
  for (const root of generatedRoots) {
    if (!existsSync(root)) continue;
    const entry = readdirSync(root).find((name) =>
      name.startsWith(`${packageName}@`),
    );
    if (!entry) continue;
    const candidate = path.resolve(
      root,
      entry,
      'node_modules',
      packageName,
      relativePath,
    );
    if (existsSync(candidate)) return candidate;
  }
  return undefined;
}

const sourceDependencyAliases =
  isSourceDebug
    ? Object.fromEntries(
        [
          ...getPackageDependencyNames(
            path.resolve(__dirname, 'package.json'),
          ),
          'crypto-js',
          ...sourcePackageNames.flatMap((packageName) =>
            getPackageDependencyNames(
              path.resolve(
                sourceWorkspaceRoot,
                ...packageName.split('/'),
                'package.json',
              ),
            ),
          ),
        ]
          .filter(
            (packageName, index, packageNames) =>
              packageNames.indexOf(packageName) === index &&
              !sourcePackageNames.includes(packageName),
          )
          .map((packageName) => {
            const resolvedPath = resolveLocalDependency(packageName);
            return resolvedPath ? [packageName, resolvedPath] : null;
          })
          .filter(
            (entry): entry is [string, string] => entry !== null,
          ),
      )
    : {};

const sourceGeneratedDependencyAliases =
  isSourceDebug
    ? Object.fromEntries(
        [
          ['qr-code-styling', 'lib/qr-code-styling.mjs'],
          ['xlsx-js-style', 'dist/xlsx.min.mjs'],
        ]
          .map(([packageName, relativePath]) => {
            const resolvedPath = resolveGeneratedDependencyFile(
              packageName,
              relativePath,
            );
            return resolvedPath ? [packageName, resolvedPath] : null;
          })
          .filter(
            (entry): entry is [string, string] => entry !== null,
          ),
      )
    : {};

const sourceAliases =
  isSourceDebug
    ? {
        '@ibiz-template/core/out': path.resolve(
          sourcePackageRoot,
          'core/src',
        ),
        '@ibiz-template/core': path.resolve(sourcePackageRoot, 'core/src'),
        '@ibiz-template/model-helper': path.resolve(
          sourcePackageRoot,
          'model-helper/src',
        ),
        '@ibiz-template/runtime': path.resolve(
          sourcePackageRoot,
          'runtime/src',
        ),
        '@ibiz-template/vue3-util': path.resolve(
          sourcePackageRoot,
          'vue3-util/src',
        ),
        '@ibiz-template/vue3-components': path.resolve(
          sourcePackageRoot,
          'vue3-components/src',
        ),
        '@ibiz-template/web-theme': path.resolve(
          sourcePackageRoot,
          'web-theme/src',
        ),
        '@ibiz-template/devtool': path.resolve(
          sourcePackageRoot,
          'devtool/src',
        ),
        '@ibiz/model-core': path.resolve(
          sourceWorkspaceRoot,
          '@ibiz/model-core/src',
        ),
        'js-md5': path.resolve(sourceShimRoot, 'js-md5.ts'),
      }
    : {};

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  cacheDir: isSourceDebug
    ? path.resolve(__dirname, 'node_modules/.vite-source')
    : path.resolve(__dirname, 'node_modules/.vite'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      ...sourceAliases,
      ...sourceDependencyAliases,
      ...sourceGeneratedDependencyAliases,
    },
  },
  optimizeDeps: {
    entries: ['index.html'],
  },
  build: {
    rollupOptions: {
      external: [
        'vue',
        'vue-router',
        'vue-i18n',
        'element-plus',
        'async-validator',
        'dayjs',
        'interactjs',
        'echarts',
        'axios',
        'qs',
        'ramda',
        'lodash-es',
        'qx-util',
        'vuedraggable',
        'pinia',
        'mqtt/dist/mqtt.min',
        '@floating-ui/dom',
        'vue-grid-layout',
        '@imengyu/vue3-context-menu',
        '@wangeditor/editor',
        '@wangeditor/editor-for-vue',
        '@ibiz-template/core',
        '@ibiz-template/runtime',
        '@ibiz-template/vue3-util',
        '@ibiz-template/model-helper',
        '@ibiz-template/vue3-components',
        '@ibiz-template-plugin/ai-chat',
        '@ibiz-template/web-theme',
        '@ibiz-template/devtool',
        '@antv/x6',
        'cherry-markdown',
        '@antv/x6',
        '@antv/x6-plugin-clipboard',
        '@antv/x6-plugin-dnd',
        '@antv/x6-plugin-export',
        '@antv/x6-plugin-history',
        '@antv/x6-plugin-keyboard',
        '@antv/x6-plugin-minimap',
        '@antv/x6-plugin-scroller',
        '@antv/x6-plugin-selection',
        '@antv/x6-plugin-snapline',
        '@antv/x6-plugin-stencil',
      ],
    },
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api/gsmgmt__gsweb': {
        target: 'http://172.16.103.158:30062',
        rewrite(path) {
          return path.replace('/api', '');
        },
        changeOrigin: true,
      },
      '/api/pms__sclpmswebapp': {
        target: 'http://172.16.103.158:30061',
        rewrite(path) {
          return path.replace('/api', '');
        },
        changeOrigin: true,
      },
      '/api/pms__portalwebapp': {
        target: 'http://172.16.103.158:30060',
        rewrite(path) {
          return path.replace('/api', '');
        },
        changeOrigin: true,
      },
      '/api/sztrainsys__web/portal/mqtt/mqtt': {
        rewrite(path) {
          return path.replace('/api', '');
        },
        target: 'ws://172.16.240.140:20086',
        changeOrigin: true,
      },
      '/api/sztrainsys__web': {
        rewrite(path) {
          return path.replace('/api', '');
        },
        target: 'http://172.16.240.140:20086',
        changeOrigin: true,
      },
      '/api/qdehr__qdehrapp/portal/mqtt/mqtt': {
        target: 'ws://172.16.240.140:46020',
        changeOrigin: true,
      },
      '/api/qdehr__qdehrapp': {
        target: 'http://172.16.102.14:32028',
        changeOrigin: true,
      },
      '/api/ibizcloudcoreos__dcmgr': {
        target: 'http://172.16.102.14:32030',
        changeOrigin: true,
      },
      // '/api/centralstudio__centralstudio/remotemodel/': {
      //   target: 'http://nginx:20003',
      //   changeOrigin: true,
      // },
      '/api/centralstudio__centralstudio': {
        rewrite(path) {
          return path.replace('/api', '');
        },
        target: 'http://172.16.220.130:30080',
        // target: 'http://172.16.240.140:46116',
        changeOrigin: true,
      },
      '/api/test1__pluginapp': {
        target: 'http://172.16.220.130:30041',
        changeOrigin: true,
      },
      '/api/ibizdemoold__sample': {
        rewrite(path) {
          return path.replace('/api', '');
        },
        target: 'http://172.16.220.130:30202',
        changeOrigin: true,
      },
      '/api/ibizcloudmgr__cloudmgr': {
        target: 'http://172.16.240.140:45415',
        changeOrigin: true,
      },
      '/api/ibizkms__webapp': {
        target: 'http://172.16.220.130:30105',
        changeOrigin: true,
      },
      '/api/demosys__web': {
        rewrite(path) {
          return path.replace('/api', '');
        },
        target: 'http://172.16.103.169:30054',
        changeOrigin: true,
      },
      '/api/oa__web': {
        target: 'http://172.16.102.14:32006',
        changeOrigin: true,
      },
      '/api/demosys__webvue3': {
        rewrite(path) {
          return path.replace('/api', '');
        },
        target: 'http://172.16.103.169:30054',
        changeOrigin: true,
      },
      '/api/ibizmodelingia__webapp': {
        target: 'http://172.16.220.130:30104',
        changeOrigin: true,
      },
      '/api/zcyw__web': {
        target: 'http://172.16.220.14:31002',
        changeOrigin: true,
      },
      '/api/zcyw__web/portal/mqtt/mqtt': {
        target: 'ws://172.16.220.14:31002',
        changeOrigin: true,
      },
      '/api/zhks__web': {
        target: 'http://172.16.220.14:32002',
        changeOrigin: true,
      },
      '/api/eam__eamweb': {
        target: 'http://172.16.102.14:32010',
        changeOrigin: true,
      },
      '/api/formdesign__formdesign': {
        target: 'http://172.16.220.130:30200',
        changeOrigin: true,
      },
      '/api/dataflowdesign__dataflowdesign': {
        target: 'http://172.16.220.130:30300',
        changeOrigin: true,
      },
      '/api/workflowdesign__workflowdesign': {
        target: 'http://172.16.220.130:30400',
        changeOrigin: true,
      },
      '/api/ibizplm__plmweb': {
        target: 'http://172.16.220.130:30510',
        changeOrigin: true,
      },
      '/api/ibizplm__plmweb/portal/mqtt/mqtt': {
        target: 'ws://172.16.220.130:30510',
        changeOrigin: true,
      },
      '/api/ibizoa__web': {
        target: 'http://172.16.220.130:30610',
        changeOrigin: true,
      },
      '/api/ibizoa__web/portal/mqtt/mqtt': {
        target: 'ws://172.16.220.130:46020',
        changeOrigin: true,
      },
      '/api/szjcxx__web': {
        target: 'http://172.16.220.14:31032',
        rewrite(path) {
          return path.replace('/api', '');
        },
        changeOrigin: true,
      },
      '/api/logicdesign__logicdesign': {
        target: 'http://172.16.220.130:30321',
        changeOrigin: true,
      },
      '/api/ibizsysmgr__cloudmgr': {
        target: 'http://172.16.103.187:30101',
        changeOrigin: true,
      },
      '/api/ibizsysmgr__sysmgr': {
        target: 'http://172.16.103.187:30101',
        changeOrigin: true,
      },
      '/api/ibizsysmgr__sysmgr/portal/mqtt/mqtt': {
        target: 'ws://172.16.103.187:30101',
        changeOrigin: true,
      },
      '/api/darm__web':{
        target: 'http://172.16.103.146:30102',
        changeOrigin: true,
      },
      '/api/xfstarter__web':{
        target: 'http://172.16.220.14:32018',
        changeOrigin: true,
      },
      '/api/ibizcentrallite4plm__centrallite':{
        target: 'http://172.16.220.130:30710',
        changeOrigin: true,
      },
      ...(process.env.IBIZ_LOCAL_API === 'true'
        ? {
            '/api/ibizmodeling__modeldesign': {
              target: 'http://127.0.0.1:32003',
              changeOrigin: false,
              ws: true,
            },
            '/api/ibizplm__plmweb': {
              target: 'http://127.0.0.1:32003',
              changeOrigin: false,
              ws: true,
            },
          }
        : {}),
    },
    cors: true,
    fs: {
      strict: false,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@ibiz-template/theme/style/global.scss";',
      },
    },
  },
  plugins: [
    // eslint({
    //   include: 'src/**/*.{ts,tsx,js,jsx}',
    // }),
    sourceTypeExportCompat(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement,
        },
      },
    }),
    vueJsx({
      isCustomElement,
    }),
    legacy({ externalSystemJS: true }),
    IBizVitePlugin(),
    // visualizer(),
  ],
});
