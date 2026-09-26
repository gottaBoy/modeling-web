/* eslint-disable import/no-extraneous-dependencies */
import {
  copyFileSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
} from 'node:fs';
import { copyFile, cp, readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { HtmlTagDescriptor, Plugin } from 'vite';
import cpy from 'cpy';
import { localDocumentationPlugin } from './local-documentation';

type PluginManifest = {
  version?: string;
  system?: string;
  styles?: string | string[];
};

function collectRuntimePluginRefs(
  value: unknown,
  pluginRefs: Set<string>,
): void {
  if (Array.isArray(value)) {
    value.forEach(item => collectRuntimePluginRefs(item, pluginRefs));
    return;
  }
  if (!value || typeof value !== 'object') {
    return;
  }

  Object.entries(value).forEach(([key, child]) => {
    if (key.toLowerCase() === 'rtobjectrepo' && typeof child === 'string') {
      pluginRefs.add(child);
    }
    collectRuntimePluginRefs(child, pluginRefs);
  });
}

function pluginPathParts(pluginRef: string): string[] {
  const parts = pluginRef.split('/');
  if (
    !pluginRef ||
    pluginRef.startsWith('/') ||
    parts.some(part => !part || part === '.' || part === '..')
  ) {
    throw new Error(`Invalid runtime plugin repository: ${pluginRef}`);
  }
  return parts;
}

function findPluginSource(cwd: string): string | undefined {
  const candidates = [
    process.env.IBIZ_PLUGIN_SOURCE,
    join(cwd, 'public/plugins'),
    join(cwd, '../../plm-web/public/plugins'),
  ].filter((candidate): candidate is string => Boolean(candidate));

  return candidates.find(candidate => existsSync(candidate));
}

function findPluginModelFiles(cwd: string): string[] {
  return [
    process.env.IBIZ_PLUGIN_MODEL_FILE,
    join(
      cwd,
      '../../plm/model/PSSYSAPPS/plmweb/PSSYSAPP.simple.json',
    ),
    join(cwd, '../../plm/model/PSSYSAPPS/plmweb/PSSYSAPP.json'),
    join(cwd, '../../plm/model/PSSYSAPPS/plmweb/PSSYSAPP.hubsubapp.json'),
    join(cwd, '../../plm-web/public/static/app/sub-app.json'),
  ].filter(
    (modelFile, index, modelFiles): modelFile is string =>
      Boolean(modelFile) &&
      modelFiles.indexOf(modelFile) === index &&
      existsSync(modelFile),
  );
}

async function copyModelPlugins(cwd: string): Promise<void> {
  const pluginSource = findPluginSource(cwd);
  if (!pluginSource) {
    console.warn(
      '[iBizVitePlugin] runtime plugin source is unavailable; skipping dist/plugins copy',
    );
    return;
  }

  const pluginRefs = new Set<string>();
  const modelFiles = findPluginModelFiles(cwd);
  modelFiles.forEach(modelFile => {
    const model = JSON.parse(readFileSync(modelFile, 'utf-8')) as unknown;
    collectRuntimePluginRefs(model, pluginRefs);
  });

  if (!pluginRefs.size) {
    console.warn(
      `[iBizVitePlugin] no rTObjectRepo entries found in ${modelFiles.join(', ') || 'available model files'}`,
    );
    return;
  }

  const targetRoot = join(cwd, 'dist/plugins');
  const pluginEntries = [...pluginRefs].sort().map(pluginRef => {
    const parts = pluginPathParts(pluginRef);
    return {
      pluginRef,
      source: join(pluginSource, ...parts),
      target: join(targetRoot, ...parts),
    };
  });
  const missing = pluginEntries.filter(
    ({ source }) =>
      !existsSync(join(source, 'package.json')) ||
      !existsSync(join(source, 'dist')),
  );
  if (missing.length) {
    throw new Error(
      `[iBizVitePlugin] missing runtime plugin package(s): ${missing
        .map(({ pluginRef }) => pluginRef)
        .join(', ')}`,
    );
  }

  await Promise.all(
    pluginEntries.map(async ({ source, target }) => {
      const manifestPath = join(source, 'package.json');
      const manifest = JSON.parse(
        readFileSync(manifestPath, 'utf-8'),
      ) as PluginManifest;
      if (!manifest.version) {
        throw new Error(
          `[iBizVitePlugin] runtime plugin manifest has no version: ${manifestPath}`,
        );
      }
      const runtimeFiles = [
        manifest.system,
        ...(Array.isArray(manifest.styles)
          ? manifest.styles
          : manifest.styles
            ? [manifest.styles]
            : []),
      ].filter((file): file is string => Boolean(file));
      const missingRuntimeFiles = runtimeFiles.filter(
        file => !existsSync(join(source, file)),
      );
      if (missingRuntimeFiles.length) {
        throw new Error(
          `[iBizVitePlugin] runtime plugin ${manifest.version} is missing declared file(s): ${missingRuntimeFiles.join(', ')}`,
        );
      }

      mkdirSync(target, { recursive: true });
      await Promise.all([
        cp(manifestPath, join(target, 'package.json'), {
          force: true,
        }),
        cp(join(source, 'dist'), join(target, 'dist'), {
          recursive: true,
          force: true,
        }),
      ]);
    }),
  );
  console.log(
    `[iBizVitePlugin] copied ${pluginEntries.length} model runtime plugin package(s) to dist/plugins`,
  );
}

function IBizVitePlugin(): Plugin[] {
  const p: Plugin = {
    name: 'iBizSys:System',
    apply: 'build',
    async closeBundle() {
      // 模板底包
      const templatePackages = ['core', 'runtime', 'model-helper'];
      // 组件底包
      const componentPackages = [
        'vue3-util',
        'vue3-components',
        'web-theme',
        'devtool',
      ];
      const cwd = process.cwd();
      const baseModule = join(cwd, 'node_modules/@ibiz-template');
      const baseOutModule = join(cwd, 'dist/extras/js/@ibiz-template');
      const pluginPackages = [
        ['ai-chat', '@ibiz-template-plugin'],
        ['gantt', '@ibiz-template-plugin'],
        ['bi-report', '@ibiz-template-plugin'],
        ['data-view', '@ibiz-template-plugin'],
      ] as const;
      // 创建目录
      mkdirSync(baseOutModule, { recursive: true });
      // eslint-disable-next-line no-lone-blocks
      {
        // 拷贝模板底包并修改文件名称
        templatePackages.forEach(pkg => {
          if (!existsSync(join(baseOutModule, pkg))) {
            mkdirSync(join(baseOutModule, pkg), { recursive: true });
          }
          const cpFile = join(baseModule, pkg, 'dist/index.system.min.js');
          const outFile = join(baseOutModule, pkg, 'index.system.min.js');
          copyFileSync(cpFile, outFile);
        });
      }
      // eslint-disable-next-line no-lone-blocks
      {
        // 拷贝组件底包并修改文件名称
        await Promise.all(
          componentPackages.map(async pkg => {
            if (!existsSync(join(baseOutModule, pkg))) {
              mkdirSync(join(baseOutModule, pkg), { recursive: true });
            }
            const cpDir = join(baseModule, pkg, 'dist/**');
            const outDir = join(baseOutModule, pkg);
            await cpy(cpDir, outDir, { overwrite: true });
          }),
        );
      }
      // Chrome blocks unload handlers under the current Permissions Policy.
      // The app already destroys the hub from Vue's unmount lifecycle.
      const vue3ComponentsDir = join(baseOutModule, 'vue3-components');
      for (const fileName of await readdir(vue3ComponentsDir)) {
        if (!fileName.endsWith('.js')) {
          continue;
        }
        const filePath = join(vue3ComponentsDir, fileName);
        const content = await readFile(filePath, 'utf-8');
        const sanitized = content
          // The published SystemJS bundle does not use the patched ES/CJS entry.
          .replace(
            /!0===ibiz\.env\.isSaaSMode&&await this\.loadOrgData\(\)/g,
            '!0===ibiz.env.isSaaSMode&&!0!==ibiz.env.isLocalModel&&await this.loadOrgData()',
          )
          // The handler is often an operand of a comma expression, so drop the
          // trailing comma there as well; deleting it on its own leaves the
          // minified `return ,next()` behind, which fails to parse and stops the
          // app from booting at all.
          .replace(
            /return window\.addEventListener\("unload",[^\)]*\),/g,
            'return ',
          )
          .replace(/window\.addEventListener\("unload",[^\)]*\);?/g, '')
          .replace(
            /this\.routeDepth&&this\.state\.drTabPages\[0\]&&this\.router\.push\(this\.state\.drTabPages\[0\]\.fullPath\)/g,
            'this.routeDepth&&this.state.drTabPages[0]&&this.state.drTabPages[0].fullPath&&this.router.push(this.state.drTabPages[0].fullPath)',
          )
          // IBizRouterView already returns a VNode; do not wrap it again.
          .replace(
            /this\.c\.noCache\?e\?a\(e,null,null\):null:a\(i\("keepAlive"\),\{include:o,max:30,isKey:!0\},\{default:\(\)=>\[e&&a\(e,null,null\)\]\}\)/g,
            'this.c.noCache?e||null:a(i("keepAlive"),{include:o,max:30,isKey:!0},{default:()=>[e]})',
          );
        if (sanitized !== content) {
          await writeFile(filePath, sanitized, 'utf-8');
        }
      }
      const elementPlusBundlePath = join(
        cwd,
        'dist/extras/js/element-plus/2.4.4/element-plus.system.min.js',
      );
      if (existsSync(elementPlusBundlePath)) {
        const content = await readFile(elementPlusBundlePath, 'utf-8');
        const sanitized = content.replace(
          'unmounted(e){const{container:t,onScroll:n}=e[xo];',
          'unmounted(e){if(!e[xo])return;const{container:t,onScroll:n}=e[xo];',
        );
        if (sanitized !== content) {
          await writeFile(elementPlusBundlePath, sanitized, 'utf-8');
        }
      }
      const vueRuntimeBundlePath = join(
        cwd,
        'dist/extras/js/vue/3.3.8/vue.runtime.global.system.prod.js',
      );
      if (existsSync(vueRuntimeBundlePath)) {
        const content = await readFile(vueRuntimeBundlePath, 'utf-8');
        const sanitized = content.replace(
          'nextSibling:e=>e.nextSibling',
          'nextSibling:e=>e?e.nextSibling:null',
        ).replace(
          'remove:e=>{const t=e.parentNode;t&&t.removeChild(e)}',
          'remove:e=>{const t=e&&e.parentNode;t&&t.removeChild(e)}',
        ).replace(
          'parentNode:e=>e.parentNode',
          'parentNode:e=>e?e.parentNode:null',
        );
        if (sanitized !== content) {
          await writeFile(vueRuntimeBundlePath, sanitized, 'utf-8');
        }
      }
      const vue3UtilBundlePath = join(
        baseOutModule,
        'vue3-util/index.system.min.js',
      );
      if (existsSync(vue3UtilBundlePath)) {
        const content = await readFile(vue3UtilBundlePath, 'utf-8');
        const sanitized = content.replace(
          /const e=""!==n&&t\?A\(t,null,null\):null/g,
          'const e=""!==n&&t?t:null',
        ).replace(
          'setup(t,{attrs:e}){return{renderComp:i=>i?A(i,{...e,key:t.manualKey}):void 0}}',
          'setup(t,{attrs:e}){const n={};let o=!0;l(()=>t.manualKey,(l,s)=>{et(l)&&l!==s&&(o=!0)});const r=(l,s)=>{if(!o)return n.vNode;o=!1;if(l){const s={...l.props};delete s.onVnodeUnmounted;delete s.ref;const r=w(l.type,{...s,...e,key:t.manualKey});return n.vNode=r,r}return void 0};return{renderComp:r}}',
        );
        if (sanitized !== content) {
          await writeFile(vue3UtilBundlePath, sanitized, 'utf-8');
        }
      }
      const runtimeBundlePath = join(
        baseOutModule,
        'runtime/index.system.min.js',
      );
      if (existsSync(runtimeBundlePath)) {
        const content = await readFile(runtimeBundlePath, 'utf-8');
        const sanitized = content
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
        if (sanitized !== content) {
          await writeFile(runtimeBundlePath, sanitized, 'utf-8');
        }
      }
      // vue3-components keeps these images as relative runtime resources.
      const componentAssets = join(
        baseOutModule,
        'vue3-components/assets/images',
      );
      await cp(join(cwd, 'public/assets/images'), componentAssets, {
        recursive: true,
        force: true,
      });
      // 插件包的发布资源使用 legacy bundle，保持 SystemJS import map 的历史命名约定。
      await Promise.all(
        pluginPackages.map(async ([pkg, scope]) => {
          const packageRoot = join(cwd, 'node_modules', scope, pkg);
          const manifestPath = join(packageRoot, 'package.json');
          const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8')) as {
            version: string;
          };
          const outDir = join(
            cwd,
            'dist/extras/js',
            scope,
            pkg,
            manifest.version,
          );
          mkdirSync(outDir, { recursive: true });
          await Promise.all([
            copyFile(
              join(packageRoot, 'dist/index.legacy.js'),
              join(outDir, 'index.system.min.js'),
            ),
            copyFile(
              join(packageRoot, 'dist/style.css'),
              join(outDir, 'index.min.css'),
            ),
            copyFile(
              join(packageRoot, 'dist/polyfills.legacy.js'),
              join(outDir, 'polyfills.legacy.js'),
            ),
          ]);
        }),
      );
      await copyModelPlugins(cwd);
      // 重新改写 index.html 部分代码
      const htmlFilePath = join(cwd, 'dist/index.html');
      if (existsSync(htmlFilePath)) {
        let html = readFileSync(htmlFilePath, 'utf-8');
        html = html
          .replace(
            '<script type="module">import.meta.url;import("_").catch(()=>1);(async function*(){})().next();if(location.protocol!="file:"){window.__vite_is_modern_browser=true}</script>',
            '',
          )
          .replace(
            `<script type="module">!function(){if(window.__vite_is_modern_browser)return;console.warn("vite: loading legacy chunks, syntax error above and the same error below should be ignored");var e=document.getElementById("vite-legacy-polyfill"),n=document.createElement("script");n.src=e.src,n.onload=function(){System.import(document.getElementById('vite-legacy-entry').getAttribute('data-src'))},document.body.appendChild(n)}();</script>`,
            '',
          );
        // 标准 vite 编译后脚本
        const rootJsReg =
          /<script type="module" crossorigin src=".\/assets\/index.(.*).js"><\/script>/;
        html = html.replace(rootJsReg, '');
        html = html.replace('<script nomodule', '<script');
        html = html.replace('<script nomodule', '<script');
        html = html.replace('<script nomodule', '<script');
        html = html.replace('<script nomodule', '<script');
        html = html.replace(
          '<script src="./assets/ionicons/ionicons/ionicons.js"></script>',
          '<script nomodule src="./assets/ionicons/ionicons/ionicons.js"></script>',
        );
        // 匹配所有的 css 和 js 文件，加上时间戳
        const scriptReg = /\.(css|js|json)"/g;
        const time = new Date().getTime();
        html = html.replace(scriptReg, `.$1?time=${time}"`);
        writeFileSync(htmlFilePath, html, 'utf-8');
      } else {
        console.error(`ERROR: ${htmlFilePath} 文件未找到`);
      }
      // 重新修改 system-import.json 补充时间戳
      {
        const systemImportPath = join(
          cwd,
          'dist/extras/json/system-import.json',
        );
        if (existsSync(systemImportPath)) {
          const content = readFileSync(systemImportPath, 'utf-8');
          if (content) {
            const json = JSON.parse(content);
            const items = json.imports as Record<string, string>;
            const styles = json.styles as Record<string, string | string[]>;
            const date = new Date();
            // eslint-disable-next-line no-restricted-syntax, guard-for-in
            for (const key in items) {
              const val = items[key];
              items[key] = `${val}?time=${date.getTime()}`;
            }
            // eslint-disable-next-line no-restricted-syntax, guard-for-in
            for (const key in styles) {
              const val = styles[key];
              if (Array.isArray(val)) {
                styles[key] = val.map(v => `${v}?time=${date.getTime()}`);
              } else {
                styles[key] = `${val}?time=${date.getTime()}`;
              }
            }
            writeFileSync(
              systemImportPath,
              JSON.stringify(json, null, 2),
              'utf-8',
            );
          }
        } else {
          console.error(`ERROR: ${systemImportPath} 文件未找到`);
        }
      }
      // 修改 dist/environments/environment.js 把 dev 模式改为 false
      {
        const envPath = join(cwd, 'dist/environments/environment.js');
        if (existsSync(envPath)) {
          let env = readFileSync(envPath, 'utf-8');
          if (env) {
            env = env.replace(/dev:(.*)true/, 'dev: false');
            env = env.replace(/logLevel:(.*)'TRACE'/, `logLevel: 'ERROR'`);
            writeFileSync(envPath, env, 'utf-8');
          }
        } else {
          console.error(`ERROR: ${envPath} 文件未找到`);
        }
      }
    },
  };

  const devP: Plugin = {
    name: 'iBizSys:System:Dev',
    apply: 'serve',
    configureServer(server) {
      const pluginSource = findPluginSource(process.cwd());
      if (!pluginSource) {
        console.warn(
          '[iBizVitePlugin] runtime plugin source is unavailable for dev server',
        );
        return;
      }

      server.middlewares.use(async (req, res, next) => {
        const requestUrl = req.url || '';
        const prefix = '/modeldesign/plugins/';
        if (!requestUrl.startsWith(prefix)) {
          next();
          return;
        }

        let relativePath: string;
        try {
          relativePath = decodeURIComponent(
            requestUrl.slice(prefix.length).split('?', 1)[0],
          );
        } catch {
          next();
          return;
        }
        const filePath = resolve(pluginSource, relativePath);
        if (
          !filePath.startsWith(`${pluginSource}/`) ||
          !existsSync(filePath)
        ) {
          next();
          return;
        }

        const contentTypes: Record<string, string> = {
          '.css': 'text/css; charset=utf-8',
          '.js': 'application/javascript; charset=utf-8',
          '.json': 'application/json; charset=utf-8',
        };
        try {
          const content = await readFile(filePath);
          res.statusCode = 200;
          res.setHeader(
            'Content-Type',
            contentTypes[filePath.slice(filePath.lastIndexOf('.'))] ||
              'application/octet-stream',
          );
          res.setHeader('Cache-Control', 'no-store');
          res.end(content);
        } catch {
          next();
        }
      });
    },
    configResolved() {
      const baseModule = resolve(__dirname, '../node_modules');
      if (!existsSync(baseModule)) {
        return;
      }
      // vue/runtime-core 包有扩展修改，开发态拷贝到 node_modules 避免功能缺失
      const cpDir = join(__dirname, 'extras/@vue/runtime-core/3.3.8/**');
      const outDir = join(
        baseModule,
        '.pnpm/@vue+runtime-core@3.3.8/node_modules/@vue/runtime-core/dist',
      );
      cpy(cpDir, outDir);
    },
    transformIndexHtml(html) {
      const tags: HtmlTagDescriptor[] = [];
      const extraPath = resolve(__dirname, '../public/extras');
      const json = JSON.parse(
        readFileSync(resolve(extraPath, 'json/system-import.json'), 'utf-8'),
      ) as Record<string, unknown>;
      const styles = json.styles as Record<string, string | string[]>;
      if (styles) {
        // eslint-disable-next-line no-restricted-syntax
        for (const key in styles) {
          if (Object.prototype.hasOwnProperty.call(styles, key)) {
            const val = styles[key];
            if (Array.isArray(val)) {
              val.forEach(v => {
                tags.push({
                  tag: 'link',
                  attrs: {
                    type: 'text/css',
                    rel: 'stylesheet',
                    href: v.replace('../', './extras/'),
                  },
                  injectTo: 'head',
                });
              });
            } else {
              tags.push({
                tag: 'link',
                attrs: {
                  type: 'text/css',
                  rel: 'stylesheet',
                  href: val.replace('../', './extras/'),
                },
                injectTo: 'head',
              });
            }
          }
        }
      }
      return {
        html,
        tags,
      };
    },
  };

  return [
    p,
    devP,
    localDocumentationPlugin({
      sourceDirectory: resolve(__dirname, '../../../plm/doc/docsify'),
      mountPaths: ['/doc/', '/modeldesign/doc/'],
    }),
  ];
}

export default IBizVitePlugin;
