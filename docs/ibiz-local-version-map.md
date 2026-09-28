# 建模应用 iBiz 本地版本关系

本记录是本地开发、Docker 构建和问题定位的版本基线。记录日期：2026-09-28。每次更新代码或镜像时同步追加 Git revision、镜像 ID 和验证报告路径。

## 跨仓库基线

| 项目 | 路径 | 分支 | 功能基线 Git revision |
| --- | --- | --- | --- |
| iBiz 源码仓库 | `ibiz-app-hub` | `master` | `456b8477f981a83ce8d01a368b669122966e567d` |
| 建模应用 | `modelingweb` | `main` | `14027e7c256a3d6c50ca2e9c2c26982340b3e792` |
| PLM 前端 | `plm-web` | `main` | `5faf9d26923b19e10908f157553310e7171ca210` |
| PLM 部署与服务 | `plm` | `mydev` | `55cd6f72c80b6d46794ba34451dbb8c4ca181145` |
| PLM E2E | `plm-e2e` | `main` | `b64696aa56b07fd32d582fa7df150c35b0df7fee` |

## 当前本地化提交

下表是本轮提交后的可定位 revision。上表保留功能基线 revision，用于区分
依赖输入和本轮本地化变更。

| 项目 | 当前提交 |
| --- | --- |
| `ibiz-app-hub` | `e3a0ec7f` |
| `ibiz-service-hub` | `e08457c5` |
| `modelingservice` | `bbcbfc9` |
| `modelingweb` | `54d497cc` |
| `plm-e2e` | `ec416fb` |
| `plm-web` | `7786d764` |
| `plm` | `a3737c9f7` |
| `scripts` | `a4fddf78` |
| `task7` | `6873cda8` |
| `ibizlab-runtime/ibzuaa` | `39f09e1a` |

Git revision 是定位构建输入的依据。2026-09-28 工作树审计结果如下：

| 仓库 | 未提交状态 |
| --- | --- |
| `ibiz-service-hub` | `scripts/build-local-images.sh`、`scripts/tests/backend-local-build.test.mjs`，以及 `scripts/records/` 下三个未跟踪回执 |
| `modelingweb` | `Dockerfile.modelingweb`、`app/tests/modeling-web-docker.harness.mjs` |
| `plm` | `deploy/compose/docker-compose-dev.yml`；保留为现有工作树改动，未在本次文档审查中修改 |
| `scripts` | `package.json`，以及未跟踪的 modeling-runtime harness 和测试 |

其余仓库在该次检查时无未提交改动。上述状态必须与镜像回执中的
`git_dirty` 一起解读，不能把工作树候选误当成干净发布输入。

## 应用和镜像

| 项目 | 版本或镜像 | image ID / 用途 |
| --- | --- | --- |
| 建模应用 `@ibiz-template/next` | `0.7.38-alpha.55` | 应用自身版本 |
| PLM Web runner | `swr.ap-southeast-1.myhuaweicloud.com/find1024/ibiz-cloud-web-runner:9.0.7.41-alpha.55.plm.251228` | `sha256:fa8797829109130aeaded82f2eda5a4d511ddbc91fca97839cb0150ed4d1cf76` |
| 建模 Web 远程回滚 overlay | `swr.ap-southeast-1.myhuaweicloud.com/find1024/ibiz-cloud-web-runner:v9.0.7.40-alpha.19` | `sha256:aaaa59bc47f296365e2bbc5f2ce15f6861a5d6204bb06989492558cd2b928282`；`linux/amd64`；Compose 目标端口 `8080` |
| 建模 Web 本地镜像（正式 Compose 默认） | `aibiz/modelingweb:local` | `sha256:c97051540e65c441f4a0084c920d83c5dd62dde0faaedc864b13bac229789549`；`linux/arm64`；容器端口 `8080`；UID `101`；含 Docker healthcheck |
| 建模 Service | 本地部署镜像 | `sha256:c8008ede053f78c48f3977745d3701f298672247e24058ba85abb9137e7bb318` |
| PLM Service | 本地部署镜像 | `sha256:fc7c318c645b35ab150ab9dc7812aa1b9458261910a0b4e31d488fec2ff998c6` |
| allinone 本地验证镜像 | `aibiz/ibiz-ebsx-allinone-rt:8.1.0.584.1-local-verify2-20260928` | `sha256:6ecdfa4ab495426946fb7d2d7e5b7ae00da68f99d975809b19ce3b181d28d054`；`linux/arm64`；artifact `1fda6284b49c690547a687fbc620010486f520a5751a21be8c153a23a8a9a07a` |
| gateway 本地验证镜像 | `aibiz/ibiz-ebsx-gateway:8.1.0.584.1-local-verify2-20260928` | `sha256:8207849bc150f4b090b7f04c9d72bf8ce4417ce4ccc2d2460a76066d63dbfcb3`；`linux/arm64`；artifact `a1e60b43f5ec7fd3ae3705bc987576348ed5f1e91179cf93d5503e62a9b2076d` |

本地入口和测试账号：

| 应用 | 地址 | 账号 |
| --- | --- | --- |
| PLM Web | `http://127.0.0.1:30250/ibizplm-plmweb/` | `aibizhi` / `123456` |
| 建模应用 | `http://127.0.0.1:32003/modeldesign/` | `aibizhi` / `123456` |
| 建模 Service | `http://127.0.0.1:32002` | 服务接口 |

PLM 本地 compose 使用 `plm/deploy/compose/docker-compose-plm-local.yml`，将宿主机
`plm-web/dist` 以只读方式挂载到容器 `/dist`，因此 `/ibizplm-plmweb/` 和
`/doc/` 使用本地构建产物。建模正式开发 Compose
`docker-compose-dev.yml` 默认使用上表本地镜像并将本地 `modelingweb/app/dist`
以只读方式覆盖到 `/dist`，端口统一为 `32003:8080`；可通过
`MODELING_WEB_IMAGE` 显式替换镜像。`docker-compose-modeling-local.yml` 仅用于
宿主机 dist 迭代，`docker-compose-modeling-remote.yml` 是显式远程回滚配置。

## 核心模型阻断

当前已完成的是本地静态 Web、插件 sidecar、Docker 构建和 Compose 接入；真实
iBizModeling Central/ModelDesign 核心模型仍保持 fail-closed。核心审计结果为
`originalSourceCandidates: 0`、`originalExtensionsVerified: 0`、
`coreExactRequested: null`、`coreExactComplete: null`。在获得可验证的核心模型
源码及扩展集合前，不得用 PLM 模型冒充，也不得把原生 ModelDesign 集成标记为完成。

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

## 非活动版本树与历史产物风险

2026-09-27 复核确认，以下目录不是 `modelingweb/app` 的当前解析来源：

| 目录 | 代表版本 | 状态 |
| --- | --- | --- |
| `modelingweb/packages` | `@ibiz/model-core@0.1.64`、`@ibiz-template/core@0.7.38-alpha.57` | 历史源码树 |
| `modelingweb/packages-latest` | `@ibiz/model-core@0.1.89`、`@ibiz-template/core@0.7.41-alpha.119` | 候选源码树 |

当前应用仍以 `app/package.json` 和 `app/pnpm-lock.yaml` 的 `link:../../ibiz-app-hub/...`
为准，不得从上述目录补依赖或构建。

PLM Web 另有 `public/plugins` 历史输出目录。复核时共发现 124 个 manifest，
其中 66 个被 `plm-web/tools/plugin-recovery/runtime-plugins.txt` 引用，余下 58 个
仅作为历史产物保留，不参与当前运行时。PLM 插件目录还发现
`data-info-title/node_modules` 内嵌的 `@ibiz/model-core@0.1.89` 和
`@ibiz/rt-model-api@0.2.72`；该目录可能影响插件独立构建，需单独清理或在版本检查器中阻断，
但不改变当前应用的本地链接基线。

## PLM lockfile 审计

`plm-web/package.json` 和 `plm-web/pnpm-lock.yaml` 的顶层 `@ibiz/rt-model-api` 均为 `link:../ibiz-app-hub/models/rt-model-api`，因此 PLM 运行时使用本地源码。lockfile 中另有 registry 版 `/@ibiz/rt-model-api@0.2.82`，该条目标记为 `dev: true`，依赖链为 `@ibiz-template/full-code-generator@0.0.10` -> `@ibizlab/cli@0.2.30` -> `@ibizlab/template@0.2.30` -> `@ibizlab/template-model@0.2.30` -> `@ibiz/rt-model-api@0.2.82`，属于代码生成工具链的传递开发依赖。

不要从 `plm-web/pnpm-lock.yaml` 手工删除该 registry 条目，否则可能破坏 `pnpm install --frozen-lockfile` 或代码生成工具链。若未来需要完全消除它，应先升级或修复 `@ibizlab/template-model` 的上游依赖，并在隔离环境验证安装和生成流程。

## PLM 插件关系

`plm-web/tools/plugin-recovery/runtime-plugins.txt` 记录当前模型直接引用的 66 个运行时插件，`plm-web/plugin-src/@scope/name/package.json` 是本地源码和权威版本，构建产物写回 `plm-web/public/plugins/@scope/name@version`。`pnpm plugins:check` 检查产物，`pnpm ibiz:versions:check` 检查源码、产物和版本目录的一致性。

当前 66 个插件均已恢复到本地可编辑、可构建目录：`cron-editor` 保留上游原始源码，`person-select` 加本批 8 个共 9 个为拆分式源码，其余 56 个为 bundle 级可编辑源码；第三方编辑器和库资产继续使用 pinned 产物，不混入 iBiz 本地源码范围。PLM 常规插件使用临时 staging 构建并在 HTTP 层校验本地文件哈希，`cron-editor` 仍使用专用构建路径。

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
- PLM 插件批次报告：`/home/my/workspace/ainfra/aibiz/.artifacts/plm-plugin-regression/2026-09-27T11-32-03-665Z-1820132/plugin-regression.json`。

## 定位规则

发生版本、类型或运行时兼容问题时，按以下顺序定位：

1. 查看本文件的仓库 revision、镜像 ID 和本地包版本。
2. 执行 `pnpm ibiz:versions:check`，确认 `package.json`、`pnpm-lock.yaml` 和源码 manifest 一致。
3. PLM 执行 `pnpm plugins:check`，检查 66 个插件的源码版本、输出目录和入口文件。
4. 查看 `dist/extras/js`、`public/extras/json/system-import.json` 和 `public/plugins` 是否仍有旧版本目录。
5. 对照对应仓库 commit，区分 iBiz 源码、建模应用、PLM 插件和部署 overlay 问题，不把第三方开源组件版本混入本地化基线。

`modelingweb/packages`、`modelingweb/packages-latest` 是历史或源码候选目录，不作为当前运行时链接来源。
