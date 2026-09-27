# 建模应用 iBiz 本地版本关系

本记录是本地开发、Docker 构建和问题定位的版本基线。记录日期：2026-09-27。每次更新代码或镜像时同步追加 Git revision、镜像 ID 和验证报告路径。

## 跨仓库基线

| 项目 | 路径 | 分支 | 功能基线 Git revision |
| --- | --- | --- | --- |
| iBiz 源码仓库 | `ibiz-app-hub` | `master` | `456b8477f981a83ce8d01a368b669122966e567d` |
| 建模应用 | `modelingweb` | `main` | `b6f944d57db707d478dab89692b61ff71fadc96b` |
| PLM 前端 | `plm-web` | `main` | `cfedb58a4b77274fba8257b5ae5981f26a8c56e5` |
| PLM 部署与服务 | `plm` | `mydev` | `55cd6f72c80b6d46794ba34451dbb8c4ca181145` |
| PLM E2E | `plm-e2e` | `main` | `b64696aa56b07fd32d582fa7df150c35b0df7fee` |

Git revision 是定位构建输入的依据。当前 `ibiz-app-hub` 有未跟踪的 `lerna-debug.log`，`plm-e2e` 有四个临时诊断脚本，均不属于基线提交；排查时不要把它们当作源码变更。

## 应用和镜像

| 项目 | 版本或镜像 | image ID / 用途 |
| --- | --- | --- |
| 建模应用 `@ibiz-template/next` | `0.7.38-alpha.55` | 应用自身版本 |
| PLM Web runner | `swr.ap-southeast-1.myhuaweicloud.com/find1024/ibiz-cloud-web-runner:9.0.7.41-alpha.55.plm.251228` | `sha256:fa8797829109130aeaded82f2eda5a4d511ddbc91fca97839cb0150ed4d1cf76` |
| 建模 Web | 本地部署镜像 | `sha256:aaaa59bc47f296365e2bbc5f2ce15f6861a5d6204bb06989492558cd2b928282` |
| 建模 Service | 本地部署镜像 | `sha256:c8008ede053f78c48f3977745d3701f298672247e24058ba85abb9137e7bb318` |
| PLM Service | 本地部署镜像 | `sha256:fc7c318c645b35ab150ab9dc7812aa1b9458261910a0b4e31d488fec2ff998c6` |

本地入口和测试账号：

| 应用 | 地址 | 账号 |
| --- | --- | --- |
| PLM Web | `http://127.0.0.1:30250/ibizplm-plmweb/` | `aibizhi` / `123456` |
| 建模应用 | `http://127.0.0.1:32003/modeldesign/` | `aibizhi` / `123456` |
| 建模 Service | `http://127.0.0.1:32002` | 服务接口 |

PLM 本地 compose 使用 `plm/deploy/compose/docker-compose-plm-local.yml`，将宿主机 `plm-web/dist` 以只读方式挂载到容器 `/dist`，因此 `/ibizplm-plmweb/` 和 `/doc/` 使用本地构建产物。全量 compose 的基础 Web runner 仍是上表外部镜像，代码通过本地 dist overlay 注入；如需完全可复现的 Docker 构建，需要继续将该 runner 基础镜像纳入本地构建链。

## 本地 iBiz 包

建模应用 `modelingweb/app/package.json` 和 `pnpm-lock.yaml` 均使用 `link:../../ibiz-app-hub/...`。PLM Web 使用 `link:../ibiz-app-hub/...`。下表版本来自链接源码目录的 `package.json`，不是历史 npm 安装目录。

| 包 | 源码路径（相对 `modelingweb/app`） | 源码版本 |
| --- | --- | --- |
| `@ibiz-template-plugin/ai-chat` | `../../ibiz-app-hub/plugins/ibiz-ai-chat` | `0.0.60` |
| `@ibiz-template-plugin/bi-report` | `../../ibiz-app-hub/plugins/ibiz-bi-report` | `0.0.32` |
| `@ibiz-template-plugin/data-view` | `../../ibiz-app-hub/plugins/ibiz-data-view` | `0.0.6` |
| `@ibiz-template-plugin/gantt` | `../../ibiz-app-hub/plugins/ibiz-gantt` | `0.1.8-alpha.378` |
| `@ibiz-template/core` | `../../ibiz-app-hub/packages/core` | `0.7.41-alpha.78` |
| `@ibiz-template/devtool` | `../../ibiz-app-hub/plugins/ibiz-template-devtools` | `0.0.14` |
| `@ibiz-template/model-helper` | `../../ibiz-app-hub/packages/model-helper` | `0.7.41-alpha.86` |
| `@ibiz-template/runtime` | `../../ibiz-app-hub/packages/runtime` | `0.7.41-alpha.86` |
| `@ibiz-template/theme` | `../../ibiz-app-hub/packages/theme` | `0.7.39` |
| `@ibiz-template/vue3-components` | `../../ibiz-app-hub/components/ibiz-next-vue3` | `0.7.41-alpha.78` |
| `@ibiz-template/vue3-util` | `../../ibiz-app-hub/packages/vue3-util` | `0.7.41-alpha.86` |
| `@ibiz-template/web-theme` | `../../ibiz-app-hub/components/web-theme` | `3.11.0` |
| `@ibiz/model-core` | `../../ibiz-app-hub/models/model-core` | `0.1.84` |
| `@ibiz/rt-model-api` | `../../ibiz-app-hub/models/rt-model-api` | `0.2.82` |

`@ibiz/model-core` 和 `@ibiz/rt-model-api` 已完成本地源码链接；它们不再从 npm 安装运行时版本。第三方开源组件仍按 npm 依赖管理，不纳入本地 iBiz 基线。

## PLM 插件关系

`plm-web/tools/plugin-recovery/runtime-plugins.txt` 记录当前模型直接引用的 66 个运行时插件，`plm-web/plugin-src/@scope/name/package.json` 是本地源码和权威版本，构建产物写回 `plm-web/public/plugins/@scope/name@version`。`pnpm plugins:check` 检查产物，`pnpm ibiz:versions:check` 检查源码、产物和版本目录的一致性。

当前 66 个插件均已恢复到本地可编辑、可构建目录：`cron-editor` 保留原始源码，`person-select` 为拆分式源码，其余主要是 bundle 级可编辑源码；第三方编辑器和库资产继续使用 pinned 产物，不混入 iBiz 本地源码范围。

## 校验、构建和测试

建模应用：

```bash
cd modelingweb/app
pnpm ibiz:versions:check
pnpm install --frozen-lockfile --offline
pnpm test:run
pnpm verify:release
pnpm build
pnpm verify:dist
```

建模部署 smoke：

```bash
cd modelingweb/app
PLAYWRIGHT_MODULE=/home/my/workspace/ainfra/aibiz/plm-e2e/node_modules/@playwright/test \
MODEL_DESIGN_USER=aibizhi \
MODEL_DESIGN_PASSWORD=123456 \
SMOKE_ARTIFACT_DIR=/home/my/workspace/ainfra/aibiz/.artifacts/modelingweb/version-alignment-smoke-final \
pnpm smoke:deployment
```

PLM Web：

```bash
cd plm-e2e
pnpm test:known
pnpm test:sweep
```

已验证结果：

- 建模单测：`543 passed, 1 skipped`。
- PLM 已知问题回归：桌面端 `4 passed`，移动端 `3 skipped`。
- PLM 全量扫描：桌面端 `13 passed`，移动端 `12 skipped`，`0 failed`。
- 建模部署 smoke 覆盖未登录入口、登录工作台、模块导航、项目向导和 Idea 创建刷新。
- 报告目录：`/home/my/workspace/ainfra/aibiz/.artifacts/modelingweb/version-alignment-smoke-final/`。

## 定位规则

发生版本、类型或运行时兼容问题时，按以下顺序定位：

1. 查看本文件的仓库 revision、镜像 ID 和本地包版本。
2. 执行 `pnpm ibiz:versions:check`，确认 `package.json`、`pnpm-lock.yaml` 和源码 manifest 一致。
3. PLM 执行 `pnpm plugins:check`，检查 66 个插件的源码版本、输出目录和入口文件。
4. 查看 `dist/extras/js`、`public/extras/json/system-import.json` 和 `public/plugins` 是否仍有旧版本目录。
5. 对照对应仓库 commit，区分 iBiz 源码、建模应用、PLM 插件和部署 overlay 问题，不把第三方开源组件版本混入本地化基线。

`modelingweb/packages`、`modelingweb/packages-latest` 是历史或源码候选目录，不作为当前运行时链接来源。
