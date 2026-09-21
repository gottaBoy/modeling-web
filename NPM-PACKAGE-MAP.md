 # modelingweb npm 包版本映射

 记录 modelingweb 前端所有 npm 包的版本对应关系，用于源码迭代时精确还原运行时环境。

 ## 版本来源说明

 | 列 | 含义 |
 |---|---|
 | **package.json specifier** | app/package.json 中声明的依赖范围 |
 | **pnpm-lock resolved** | pnpm-lock.yaml 实际锁定的版本（构建时使用） |
 | **dist import map** | dist/extras/json/system-import.json 中运行时加载的版本（部署后实际运行） |
 | **原下载(错误)** | 之前从 npm 下载的最新版（版本不匹配，已备份到 packages-latest/） |
 | **精确版本(已替换)** | 已下载并放入 packages/ 的精确匹配版本 |

 关键原则：**dist import map 是运行时 ground truth**。对插件包（有版本号子目录），以 import map 版本为准；对框架核心包（无版本号子目录、由 app 构建打包），以 pnpm-lock 锁定版本为准。

 ## 一、iBiz 自研框架包（@ibiz-template/* + @ibiz/*）

 这些包在 dist 中由 app 的 vite 构建打包（import map 无版本号子目录），版本由 pnpm-lock 决定。

 | 包名 | package.json specifier | pnpm-lock resolved | dist import map | 原下载(错误) | 精确版本(已替换) | 文件数 |
 |---|---|---|---|---|---|---|
 | @ibiz-template/core | 0.7.38-alpha.57 | 0.7.38-alpha.57 | bundled | 0.7.41-alpha.119 | 0.7.38-alpha.57 | 289 |
 | @ibiz-template/runtime | 0.7.38-alpha.57 | 0.7.38-alpha.57 | bundled | 0.7.41-alpha.127 | 0.7.38-alpha.57 | 2929 |
 | @ibiz-template/vue3-components | 0.7.38-alpha.56 | 0.7.38-alpha.56 | bundled | 0.7.41-alpha.122 | 0.7.38-alpha.56 | 2709 |
 | @ibiz-template/vue3-util | 0.7.38-alpha.57 | 0.7.38-alpha.57 | bundled | 0.7.41-alpha.127 | 0.7.38-alpha.57 | 834 |
 | @ibiz-template/model-helper | 0.7.38-alpha.57 | 0.7.38-alpha.57 | bundled | 0.7.41-alpha.127 | 0.7.38-alpha.57 | 58 |
 | @ibiz-template/web-theme | 1.1.28-alpha.2 | 1.1.28-alpha.2 | bundled | 3.16.0 | 1.1.28-alpha.2 | 300 |
 | @ibiz-template/theme | ^0.7.0 | 0.7.0 | — | 0.7.39 | 0.7.0 | 9 |
 | @ibiz-template/devtool | 0.0.4 | 0.0.4 | bundled | 0.0.16 | 0.0.4 | 118 |
 | @ibiz/model-core | ^0.1.64 | 0.1.64 | — | 0.1.89 | 0.1.64 | 2287 |

 web-theme 额外说明：dist 中有 sourcemap（index.system.min.js.map，含 sourcesContent），已提取 65 个 TS 文件到 web-theme-src/。npm 精确版（1.1.28-alpha.2，300 文件）更完整，web-theme-src/ 作为 sourcemap 校验保留。

 ## 二、iBiz 插件包（@ibiz-template-plugin/*）

 这些包在 dist 中以版本号子目录存放，import map 精确指定版本，是运行时实际加载的版本。

 | 包名 | package.json specifier | pnpm-lock resolved | dist import map | 原下载(错误) | 精确版本(已替换) | 文件数 |
 |---|---|---|---|---|---|---|
 | @ibiz-template-plugin/ai-chat | ^0.0.5 | 0.0.5 | **0.0.28** | 0.0.94 | 0.0.28 | 103 |
 | @ibiz-template-plugin/bi-report | 0.0.25 | 0.0.25 | **0.0.26** | 0.0.32 | 0.0.26 | 179 |
 | @ibiz-template-plugin/data-view | 0.0.3 | 0.0.3 | **0.0.4** | 0.0.8 | 0.0.4 | 116 |
 | @ibiz-template-plugin/gantt | —（lockfile间接） | — | **0.1.8-alpha.299** | 0.1.8-alpha.468 | 0.1.8-alpha.299 | 18 |

 注意：插件包的 package.json specifier 与 pnpm-lock 版本早于 dist import map 版本，说明部署时 mw 镜像使用了更新的插件版本。以 dist import map 为准。

 dist 中还缓存了插件包的多个历史版本（未全部列出），import map 只加载上表所列版本：
 - ai-chat: 0.0.20 ~ 0.0.28（import map 用 0.0.28）
 - bi-report: 0.0.26（仅此版本）
 - data-view: 0.0.1 ~ 0.0.4（import map 用 0.0.4）
 - gantt: 0.1.1 ~ 0.1.8-alpha.299（import map 用 0.1.8-alpha.299）

 ## 三、第三方依赖包（运行时版本，来自 dist import map）

 以下版本全部来自 dist/extras/json/system-import.json，是运行时实际加载的第三方库版本。

 | 包名 | 运行时版本 | import map 路径 |
 |---|---|---|
 | vue | 3.3.8 | vue/3.3.8/vue.runtime.global.system.prod.js |
 | vue-router | 4.2.5 | vue-router/4.2.5/vue-router.system.min.js |
 | vue-i18n | 9.6.5 | vue-i18n/9.6.5/vue-i18n.runtime.system.prod.js |
 | vue-grid-layout | 3.0.0-beta1 | vue-grid-layout/3.0.0-beta1/index.system.min.js |
 | pinia | 2.1.7 | pinia/2.1.7/pinia.system.prod.js |
 | element-plus | 2.4.4 | element-plus/2.4.4/element-plus.system.min.js |
 | axios | 1.6.1 | axios/1.6.1/axios.system.min.js |
 | dayjs | 1.11.10 | dayjs/1.11.10/index.system.min.js |
 | echarts | 5.4.3 | echarts/5.4.3/echarts.min.js |
 | qs | 6.11.2 | qs/6.11.2/qs.system.min.js |
 | ramda | 0.29.1 | ramda/0.29.1/ramda.system.min.js |
 | lodash-es | 4.17.21 | lodash/4.17.21/lodash.system.min.js |
 | qx-util | 0.4.8 | qx-util/0.4.8/qx-util.system.js |
 | async-validator | 4.2.5 | async-validator/4.2.5/async-validator.system.min.js |
 | path-browserify | 1.0.1 | path-browserify/1.0.1/index.system.min.js |
 | mqtt | 2.18.9 | mqtt/2.18.9/mqtt.min.js |
 | interactjs | 1.10.20 | interactjs/1.10.20/interact.system.min.js |
 | sortablejs | 1.15.0 | sortablejs/1.15.0/sortable.system.min.js |
 | vuedraggable | 4.1.0 | vuedraggable/4.1.0/vuedraggable.system.min.js |
 | handlebars | 4.7.8 | handlebars/4.7.8/handlebars.system.min.js |
 | cherry-markdown | 0.8.58 | cherry-markdown/0.8.58/cherry-markdown.system.min.js |
 | loglevel | 1.8.1 | loglevel/1.8.1/loglevel.system.min.js |
 | loglevel-plugin-prefix | 0.8.4 | loglevel-plugin-prefix/0.8.4/...system.min.js |
 | @floating-ui/dom | 1.5.3 | @floating-ui/dom/1.5.3/...system.min.js |
 | @wangeditor/editor | 5.1.23 | @wangeditor/editor/5.1.23/index.system.js |
 | @wangeditor/editor-for-vue | 5.1.12 | @wangeditor/editor-for-vue/5.1.12/index.system.js |
 | @imengyu/vue3-context-menu | 1.3.3 | @imengyu/vue3-context-menu/1.3.3/...min.js |
 | @antv/x6 | 2.15.5 | @antv/x6/2.15.5/index.system.min.js |
 | react | 18.2.0 | react/18.2.0/react.system.min.js |
 | react-dom | 18.2.0 | react-dom/18.2.0/react-dom.system.min.js |
 | scheduler | 18.2.0 | scheduler/18.2.0/scheduler.system.min.js |
 | systemjs | 6.14.2 | system/6.14.2/system.min.js |

 react/react-dom/scheduler 是 ai-chat 插件的间接依赖（ai-chat 使用 react 渲染聊天界面）。

 ## 四、CSS 样式映射（dist import map styles）

 | 包 | CSS 路径 |
 |---|---|
 | @ibiz-template/vue3-components | @ibiz-template/vue3-components/index.min.css |
 | @ibiz-template/vue3-util | @ibiz-template/vue3-util/index.min.css |
 | @ibiz-template/web-theme | @ibiz-template/web-theme/index.min.css |
 | @ibiz-template/devtool | @ibiz-template/devtool/index.min.css |
 | @ibiz-template-plugin/ai-chat | @ibiz-template-plugin/ai-chat/0.0.28/index.min.css |
 | @ibiz-template-plugin/gantt | @ibiz-template-plugin/gantt/0.1.8-alpha.299/index.min.css |
 | @ibiz-template-plugin/bi-report | @ibiz-template-plugin/bi-report/0.0.26/index.min.css |
 | @ibiz-template-plugin/data-view | @ibiz-template-plugin/data-view/0.0.4/index.min.css |
 | @wangeditor/editor | @wangeditor/editor/5.1.23/css/style.css |
 | cherry-markdown | cherry-markdown/0.8.58/cherry-markdown.min.css |
 | @imengyu/vue3-context-menu | @imengyu/vue3-context-menu/1.3.3/index.min.css |
 | @antv/x6 | @antv/x6/2.15.5/index.min.css |
 | vue-grid-layout | vue-grid-layout/3.0.0-beta1/index.min.css |

 ## 五、dist 中 sourcemap 清单

 仅以下包在 dist 中含 .map sourcemap（可从中提取源码）：

 | sourcemap | 含 sourcesContent | 已提取 |
 |---|---|---|
 | @ibiz-template/web-theme/index.system.min.js.map | 是 (65 文件) | 是 → web-theme-src/ |
 | @wangeditor/editor/5.1.23/index.system.js.map | 是 (332 文件) | 否（第三方） |
 | interactjs/1.10.20/interact.system.min.js.map | 是 (77 文件) | 否（第三方） |
 | axios/1.6.1/axios.system.min.js.map | 是 (43 文件) | 否（第三方） |
 | vuedraggable/4.1.0/vuedraggable.system.min.js.map | 是 (9 文件) | 否（第三方） |
 | sortablejs/1.15.0/sortable.system.min.js.map | 是 (12 文件) | 否（第三方） |
 | @imengyu/vue3-context-menu/1.3.3/index.system.min.js.map | 是 (14 文件) | 否（第三方） |
 | @antv/x6/2.15.5/index.system.min.js.map | — | 否（第三方） |

 其余 @ibiz-template/* 包（core/runtime/vue3-components 等）在 dist 中仅有 min.js，无 sourcemap，源码只能通过 npm 获取。

 ## 六、备份与替换说明

 - 旧版（latest，不匹配）包已备份到 `modelingweb/packages-latest/`，未删除
 - 精确版本包放在 `modelingweb/packages/`，版本与运行时一致
 - npm tarball 原始下载在 `/tmp/ibiz-npm/exact/`，解压在 `/tmp/ibiz-npm/exact/extracted/`
 - 所有精确版本已逐一验证存在于 npm registry

## 七、devDependencies（开发依赖，未运行时加载）

| 包名 | package.json specifier | pnpm-lock resolved | 说明 |
|---|---|---|---|
| @ibiz-template/cli | ^0.3.12 | 0.3.12 | ibiz-temp 工具，compute-pkg/download-pkg 脚本依赖 |
| @commitlint/cli | ^18.4.3 | — | 提交规范检查 |
| @commitlint/config-conventional | ^18.4.3 | — | 提交规范配置 |
| @types/lodash-es | ^4.17.12 | — | TypeScript 类型 |
| @types/node | ^20.10.5 | — | Node.js 类型 |
| @types/nprogress | ^0.2.3 | — | NProgress 类型 |
| @types/path-browserify | ^1.0.2 | — | path-browserify 类型 |
| @types/qs | ^6.9.10 | — | qs 类型 |
| @types/ramda | ^0.29.9 | — | ramda 类型 |
| @types/systemjs | ^6.13.5 | — | systemjs 类型 |
| @typescript-eslint/eslint-plugin | ^6.13.2 | — | ESLint TS 插件 |
| @typescript-eslint/parser | ^6.13.2 | — | ESLint TS 解析器 |
| @vitejs/plugin-legacy | ^5.2.0 | — | Vite legacy 兼容 |
| @vitejs/plugin-vue | ^4.5.2 | — | Vite Vue 插件 |
| @vitejs/plugin-vue-jsx | ^3.1.0 | — | Vite Vue JSX |
| @vitest/ui | ^1.3.1 | — | Vitest UI |
| @vue/babel-helper-vue-jsx-merge-props | ^1.4.0 | — | Vue JSX 合并 |
| cpy | 8.1.2 | — | 文件拷贝（ibiz-vite-plugin 用） |
| eslint | ^8.55.0 | — | ESLint |
| eslint-config-airbnb-base | ^15.0.0 | — | Airbnb ESLint 配置 |
| eslint-config-prettier | ^9.1.0 | — | Prettier ESLint 配置 |
| eslint-plugin-import | ^2.29.1 | — | import 插件 |
| eslint-plugin-prettier | ^5.0.1 | — | Prettier 插件 |
| eslint-plugin-unused-imports | ^3.0.0 | — | 未用 import 插件 |
| eslint-plugin-vue | ^9.19.2 | — | Vue ESLint 插件 |
| husky | ^8.0.3 | — | Git hooks |
| lint-staged | ^15.2.0 | — | 暂存区 lint |
| postcss | ^8.4.32 | — | CSS 后处理器 |
| postcss-scss | ^4.0.9 | — | PostCSS SCSS |
| prettier | ^3.1.1 | — | 代码格式化 |
| rollup-plugin-visualizer | ^5.10.0 | — | 打包分析 |
| sass | ^1.69.5 | — | SCSS 编译 |
| stylelint | 15.11.0 | — | 样式 lint |
| stylelint-config-ali | 1.1.0 | — | 阿里 stylelint 配置 |
| stylelint-config-prettier | 9.0.5 | — | Prettier stylelint |
| stylelint-config-recess-order | 4.4.0 | — | 属性排序 |
| stylelint-config-standard | 34.0.0 | — | 标准 stylelint |
| stylelint-config-standard-scss | 11.1.0 | — | 标准 SCSS stylelint |
| stylelint-scss | 5.3.1 | — | SCSS lint 插件 |
| terser | ^5.26.0 | — | JS 压缩 |
| typescript | ^5.3.3 | — | TypeScript 编译器 |
| vite | ^5.0.11 | — | 构建工具 |
| vite-plugin-eslint | ^1.8.1 | — | Vite ESLint 插件 |
| vitest | ^1.3.1 | — | 测试框架 |
| vue-eslint-parser | ^9.4.0 | — | Vue ESLint 解析器 |
| vue-tsc | ^1.8.27 | — | Vue TypeScript 检查 |

## 八、版本差异（package.json vs pnpm-lock vs dist import map）

dist import map 是运行时实际加载的版本。以下包在 package.json/pnpm-lock 与 dist 间存在差异：

| 包名 | package.json | pnpm-lock | dist import map | 差异说明 |
|---|---|---|---|---|
| @antv/x6 | ^2.18.1 | 2.18.1 | 2.15.5 | dist 使用旧版（mw 镜像构建时间早于 scaffold 模板） |
| @imengyu/vue3-context-menu | ^1.3.5 | 1.3.6 | 1.3.3 | dist 使用旧版 |
| cherry-markdown | 0.8.26 | 不在 lock | 0.8.58 | dist 使用更新版（可能由插件带入） |
| @ibiz-template-plugin/ai-chat | ^0.0.5 | 0.0.5 | 0.0.28 | dist 使用更新版（插件独立更新） |
| @ibiz-template-plugin/bi-report | 0.0.25 | 0.0.25 | 0.0.26 | dist 使用更新版 |
| @ibiz-template-plugin/data-view | 0.0.3 | 0.0.3 | 0.0.4 | dist 使用更新版 |

原因：mw 镜像在部署时使用了比 scaffold 模板更新的插件版本。以 dist import map 为运行时 ground truth。

## 九、仅在 dist import map 中的包（不在 package.json）

以下包不在 app/package.json 中，但出现在 dist import map，由 @ibiz-template/* 框架包或插件运行时加载：

| 包名 | dist 版本 | 来源 |
|---|---|---|
| handlebars | 4.7.8 | 框架包内部依赖（模板渲染） |
| sortablejs | 1.15.0 | vuedraggable 依赖 |
| react | 18.2.0 | ai-chat 插件依赖（React 渲染聊天 UI） |
| react-dom | 18.2.0 | ai-chat 插件依赖 |
| scheduler | 18.2.0 | react-dom 间接依赖 |
| loglevel | 1.8.1 | 框架包内部日志 |
| loglevel-plugin-prefix | 0.8.4 | loglevel 前缀插件 |

## 十、仅在 package.json 中（打包进 bundle，不在 import map）

以下包在 package.json 中声明，但不在 dist import map 中（由 vite 构建时打包进主 bundle，非 SystemJS 动态加载）：

| 包名 | package.json | 说明 |
|---|---|---|
| vue | ^3.3.8 | 核心框架，打包进主 bundle |
| vue-router | ^4.2.5 | 路由，打包进主 bundle |
| vue-i18n | ^9.6.5 | 国际化，打包进主 bundle |
| vue-grid-layout | 3.0.0-beta1 | 网格布局，打包进主 bundle |
| pinia | ^2.1.7 | 状态管理，打包进主 bundle |
| element-plus | 2.4.4 | UI 库，打包进主 bundle |
| nprogress | ^0.2.0 | 进度条，打包进主 bundle |
| vue-text-format | ^3.1.2 | 文本格式化，打包进主 bundle |
| qx-util | ^0.4.8 | 工具库，打包进主 bundle |

注：vue/vue-router/pinia/element-plus 等核心库在 dist 中也有独立 system 模块（import map 中有），但同时也会被打包进主 bundle 作为 fallback。以 dist import map 版本为准。

## 十一、关联应用插件包 (ibiz-ref-app-pkg.config.ts)

| 包名 | 版本 | 说明 |
|---|---|---|
| monaco-editor | 0.45.0 | 代码编辑器，由 ibiz-ref-app-pkg 配置引用 |

## 十二、内部 Nexus 仓库 (ibiz-download-pkg.config.ts)

插件包下载配置引用内部 Nexus 仓库:
- registry: `http://172.16.240.221:8081/repository/ibizsys/`
- outDir: `./public/plugins`
- 当前 dependencies 为空（使用 dist 中已有的插件包）
