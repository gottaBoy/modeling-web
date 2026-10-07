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
| `ibiz-service-hub` | `010b6f6b` |
| `modelingservice` | `bbcbfc9` |
| `modelingweb` | `1c4b4c4d` |
| `plm-e2e` | `ec416fb` |
| `plm-web` | `7786d764` |
| `plm` | `88a104bb` |
| `scripts` | `9d8f29c5` |
| `task7` | `6873cda8` |
| `ibizlab-runtime/ibzuaa` | `39f09e1a` |

Git revision 是定位构建输入的依据。2026-09-28 最终回归后的工作树审计结果如下；文档提交本身不改变运行时代码 revision：

| 仓库 | 未提交状态 |
| --- | --- |
| `ibiz-service-hub` | clean |
| `modelingweb` | clean |
| `plm` | clean |
| `scripts` | clean |

其余仓库在该次检查时无未提交改动。`ibiz-service-hub` 的
`backend-local-build-clean-20260928.json` 已从 `7b073023` 的 clean tree
生成，作为历史回执保留；当前构建输入 `010b6f6b` 的回执为
`backend-local-build-final-20260928.json`，记录 `git_dirty: false`，
使用独立文件名，避免覆盖历史证据。上表 clean 指运行时代码状态，
本次版本文档和新回执在回归通过后独立提交。

## 应用和镜像

| 项目 | 版本或镜像 | image ID / 用途 |
| --- | --- | --- |
| 建模应用 `@ibiz-template/next` | `0.7.38-alpha.55` | 应用自身版本 |
| PLM Web runner | `swr.ap-southeast-1.myhuaweicloud.com/find1024/ibiz-cloud-web-runner:9.0.7.41-alpha.55.plm.251228` | `sha256:fa8797829109130aeaded82f2eda5a4d511ddbc91fca97839cb0150ed4d1cf76` |
| 建模 Web 远程回滚 overlay | `swr.ap-southeast-1.myhuaweicloud.com/find1024/ibiz-cloud-web-runner:v9.0.7.40-alpha.19` | `sha256:aaaa59bc47f296365e2bbc5f2ce15f6861a5d6204bb06989492558cd2b928282`；`linux/amd64`；Compose 目标端口 `8080` |
| 建模 Web 本地镜像（正式 Compose 默认） | `aibiz/modelingweb:local` | `sha256:c97051540e65c441f4a0084c920d83c5dd62dde0faaedc864b13bac229789549`；`linux/arm64`；容器端口 `8080`；UID `101`；含 Docker healthcheck |
| 建模 Service | 本地部署镜像 | `sha256:c8008ede053f78c48f3977745d3701f298672247e24058ba85abb9137e7bb318` |
| PLM Service | 本地部署镜像 | `sha256:fc7c318c645b35ab150ab9dc7812aa1b9458261910a0b4e31d488fec2ff998c6` |
| allinone 本地 clean 镜像 | `aibiz/ibiz-ebsx-allinone-rt:8.1.0.584.1-local-clean-20260928` | `sha256:8d6ec725d83b030b534afaf087f08a6ad9fc23ffd374ba7a27c0cfc3bf0670da`；`linux/arm64`；artifact `db2f18e4e43f0489cc2c40b145b626a24d28076295278e193e86b22f96212aad` |
| gateway 本地 clean 镜像 | `aibiz/ibiz-ebsx-gateway:8.1.0.584.1-local-clean-20260928` | `sha256:60187c28d0f800bed325344bb9e640a8f0fe6343f6023689b650af5032032a2a`；`linux/arm64`；artifact `a6aba9b82f8f6ae498d66e981b94852dffb77c9f478844771e8e16f76fe333de` |
| allinone 本轮构建镜像 | `aibiz/ibiz-ebsx-allinone-rt:8.1.0.584.1-local-final-20260928` | `sha256:ad6dac86cbf303551b734616f034ba586c2dfd4b865e26d8c21f37eaf3ebda31`；`linux/arm64`；artifact `1202b01ba43ff983a9802c43945f683d99d1339bbf165c533464d9bd642fceed`；源码 `010b6f6b` |
| gateway 本轮构建镜像 | `aibiz/ibiz-ebsx-gateway:8.1.0.584.1-local-final-20260928` | `sha256:b8c6faf2f7431851f741415036b4dd5ccc27fbc4497a52412da0c90476508b46`；`linux/arm64`；artifact `1e5e011048eb74f16cfc604480608794217ed4103a12f562150cd6fe1991e5d7`；源码 `010b6f6b` |

本轮后端构建回执：
`ibiz-service-hub/scripts/records/backend-local-build-final-20260928.json`。
该回执记录完整源码 revision
`010b6f6bfb601b1191a2defca4624ad2f66a6a97`、Maven/Java 基础镜像
digest、`linux/arm64` 架构、产物 SHA256 和两个 Docker image ID。
镜像是本地构建产物，尚无 registry repo digest，image ID 不等同于 repo digest。

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
`originalSourceCandidates: 21`（仅候选，不是认证源码）、
`originalExtensionsVerified: 0`、`coreExactRequested: 11`、
`coreExactComplete: 1`、`migrationVerified: 0`。证据见
`../../.artifacts/modeling-extension-inventory/continue-20260930-p1-pinned/inventory.json`
和 `../../.artifacts/modeling-core-localization/continue-20260930-p1/audit.json`。
在获得可验证的核心模型
源码及扩展集合前，不得用 PLM 模型冒充，也不得把原生 ModelDesign 集成标记为完成。

### 候选源码与精确版本边界

`vendor-upstream/ibizmodeling-standard` 的 Git revision 为
`96e9e54e5a20c0eea7f9ada21bdd1a38177caf9f`，包含 Central 和 ModelDesign
模型资源，但其 `pom.xml` 声明 `ibiz.cloud.version=8.1.0.542`；当前本地
后端回执使用 `8.1.0.584.1`。模型存在不等于已验证两版兼容，也不等于当前
32003 已切换为原生模型。

迁移目标 `@ibiz-template-plugin/ai-code@0.0.3-alpha.141` 已在
`vendor-upstream/gottaboy-plm-web/plugin-src/` 本地构建，回执位于包内
`.artifacts/build-receipt.json`，记录 31 个输入、67 个输出及源码/产物
SHA-256 指纹。其源文件来自同版本发布快照，不能据此认证上游原始仓库；
回执输出与当前 `plm-web/public/plugins` 目标存在缺失和哈希差异，不能直接
作为 native 映射的构建回执；核心模型精确引用是 `alpha.92`，没有原生运行时验收。
`model-design@0.0.3-alpha.122` 有 55 个 TS/TSX 源文件，但依赖的
`@ibiz-template-plugin/runtime-model@0.2.2` 尚无可用完整源码，不能生成
完整本地构建回执，也不能代替核心模型精确引用的 `alpha.90`。候选源码的
指纹和来源状态见 `scripts/fixtures/modeling-core-source-candidates.json`。

本地依赖调查见 `scripts/docs/NATIVE-PLUGIN-SOURCE-AUDIT.md`：发布目标内嵌的
`runtime-model` 只有 7 个编译后 `.mjs`，缺完整包 manifest、源码和构建配置；
两份运行时 JSON 配置快照各有 1414 个文件，但候选源码尚未恢复这些资源输入。
每份快照另有 17 个 JSON 因字符串内未转义控制字符无法解析；文件集合指纹一致
不等于资源可用。审计回归只校验缺陷清单与记录一致，不代表资源或原生功能验收通过。
该插件依赖不是已经本地化的 `@ibiz/rt-model-api`，不能以模型 API 源码代替。

独立候选版本迁移生成器由主线程负责。候选构建入口、依赖版本差异与建议交接边界
见上述审计文档的 `Candidate build path` 和 `Candidate Generation Handoff`；
这些是待实现/待验证的交接要求，不是生成器已经通过或 native 迁移已经完成的证明。

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
其中 73 个被 `plm-web/tools/plugin-recovery/runtime-plugins.txt` 引用，余下 51 个
仅作为历史产物保留，不参与当前运行时。PLM 插件目录还发现
`data-info-title/node_modules` 内嵌的 `@ibiz/model-core@0.1.89` 和
`@ibiz/rt-model-api@0.2.72`；该目录可能影响插件独立构建，需单独清理或在版本检查器中阻断，
但不改变当前应用的本地链接基线。

## PLM lockfile 审计

`plm-web/package.json` 和 `plm-web/pnpm-lock.yaml` 的顶层 `@ibiz/rt-model-api` 均为 `link:../ibiz-app-hub/models/rt-model-api`，因此 PLM 运行时使用本地源码。lockfile 中另有 registry 版 `/@ibiz/rt-model-api@0.2.82`，该条目标记为 `dev: true`，依赖链为 `@ibiz-template/full-code-generator@0.0.10` -> `@ibizlab/cli@0.2.30` -> `@ibizlab/template@0.2.30` -> `@ibizlab/template-model@0.2.30` -> `@ibiz/rt-model-api@0.2.82`，属于代码生成工具链的传递开发依赖。

不要从 `plm-web/pnpm-lock.yaml` 手工删除该 registry 条目，否则可能破坏 `pnpm install --frozen-lockfile` 或代码生成工具链。若未来需要完全消除它，应先升级或修复 `@ibizlab/template-model` 的上游依赖，并在隔离环境验证安装和生成流程。

## PLM 插件关系

`plm-web/tools/plugin-recovery/runtime-plugins.txt` 记录当前模型直接引用的 73 个运行时插件，`plm-web/plugin-src/@scope/name/package.json` 是本地源码和权威版本，构建产物写回 `plm-web/public/plugins/@scope/name@version`。`pnpm plugins:check` 检查产物，`pnpm ibiz:versions:check` 检查源码、产物和版本目录的一致性。

当前 73 个插件均已恢复到本地可编辑、可构建目录：`cron-editor` 保留上游原始源码，`person-select` 加本批 8 个共 9 个为拆分式源码，其余 63 个为 bundle 级可编辑源码；bundle 级恢复不等于认证上游原始源码。第三方编辑器和库资产继续使用 pinned 产物，不混入 iBiz 本地源码范围。PLM 常规插件使用临时 staging 构建并在 HTTP 层校验本地文件哈希，`cron-editor` 仍使用专用构建路径。

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

- 建模单测：`547 passed, 1 skipped`。
- PLM 已知问题回归：桌面端 `4 passed`，移动端 `3 skipped`。
- PLM 全量扫描：桌面端 `13 passed`，移动端 `12 skipped`，`0 failed`。
- 建模部署 smoke 覆盖未登录入口、登录工作台、模块导航、项目向导和 Idea 创建刷新；本轮报告为 `/home/my/workspace/ainfra/aibiz/.artifacts/modelingweb/final-regression-20260928-rerun/report.json`，5 个阶段全部通过。
- Modeling runtime required harness：容器、日志、32002/32003 HTTP 门禁全部通过；报告目录为 `/home/my/workspace/ainfra/aibiz/.artifacts/modeling-runtime/2026-09-28T05-50-47-862Z/`。
- 本地 allinone/gateway target-port smoke：`30100/30186`，7/7 通过；报告目录为 `/home/my/workspace/ainfra/aibiz/.artifacts/source-platform-smoke/final-local-clean-20260928/`。
- PLM 插件批次报告：`/home/my/workspace/ainfra/aibiz/.artifacts/plm-plugin-regression/2026-09-27T11-32-03-665Z-1820132/plugin-regression.json`。
- 建模插件部署 smoke：46 个插件/语言场景全部通过，92 个 viewport 场景全部通过，清理 46 个文档；报告为 `/home/my/workspace/ainfra/aibiz/.artifacts/modeling-plugins/2026-09-28T06-18-47.737Z-a07bae60/report.json`。
- 建模插件本地源验证：schemas、types、tests、client-build、server-build 全部通过；报告为 `/home/my/workspace/ainfra/aibiz/.artifacts/modeling-plugins-source/2026-09-28T06-18-47-557Z-f808c6c1/report.json`。
- 当前运行时回归报告：`/home/my/workspace/ainfra/aibiz/.artifacts/modeling-runtime/2026-09-28T06-03-26-182Z/report.json`，建模服务、建模 Web 和插件 sidecar 均 healthy，32002/32003 门禁通过。
- 外部 UI `http://127.0.0.1:19323/#?` 已接入 `scripts/external-ui-harness.mjs`、`npm run test:external-ui` 和 required 模式；本机本轮服务未启动，因此自动模式按设计记录 skip，报告为 `/home/my/workspace/ainfra/aibiz/.artifacts/external-ui/current-20260928/report.json`。
- 项目级 harness：`npm run test:baseline` 通过，报告目录为 `/home/my/workspace/ainfra/aibiz/.artifacts/harness-baseline/20260928-142935/`；其中外部 UI 仍为 unavailable skip。

## 定位规则

发生版本、类型或运行时兼容问题时，按以下顺序定位：

1. 查看本文件的仓库 revision、镜像 ID 和本地包版本。
2. 执行 `pnpm ibiz:versions:check`，确认 `package.json`、`pnpm-lock.yaml` 和源码 manifest 一致。
3. PLM 执行 `pnpm plugins:check`，检查 73 个插件的源码版本、输出目录和入口文件。
4. 查看 `dist/extras/js`、`public/extras/json/system-import.json` 和 `public/plugins` 是否仍有旧版本目录。
5. 对照对应仓库 commit，区分 iBiz 源码、建模应用、PLM 插件和部署 overlay 问题，不把第三方开源组件版本混入本地化基线。

`modelingweb/packages`、`modelingweb/packages-latest` 是历史或源码候选目录，不作为当前运行时链接来源。
其中 `modelingweb/packages/@ibiz-template/devtool/dist/index.min.css` 也属于历史产物；
建模应用当前通过 `link:../../ibiz-app-hub/plugins/ibiz-template-devtools` 解析
`@ibiz-template/devtool`，正式构建后的
`app/dist/extras/js/@ibiz-template/devtool/index.min.css` 必须与该链接源码的
`dist/index.min.css` 一致。不要用 `modelingweb/packages` 下的文件覆盖正式 dist。

## 2026-09-29 侧线 E 运行时版本审计

本节记录当前运行容器与源码台账的交叉核对结果。完整报告：
`.artifacts/version-ledger/20260929-side-e-final-rerun/version-ledger.txt`。

执行命令：

```bash
cd scripts
node --test tests/version-ledger.test.mjs
node version-ledger.mjs --live --json \
  --report-dir ../.artifacts/version-ledger/20260929-side-e-final-rerun
```

Ledger 单测结果为 `25 passed, 0 failed`。Live ledger 返回退出码 `1`，
原因是发现真实版本 provenance 冲突，不是脚本异常。

| 级别 | 未对齐关系 | 当前证据 |
| --- | --- | --- |
| FAIL | `ibiz-ebsx-allinone-local`、`ibiz-ebsx-gateway-local` 运行镜像分别为 `sha256:6ecdfa4a...`、`sha256:8207849b...`，镜像 ID 与 `verify2` 回执一致；但回执源码 `e08457c5` 与当前 `ibiz-service-hub@5ffc8077` 不一致，且两者均 dirty | `ibiz-service-hub/scripts/records/backend-local-build-verify2-20260928.json` |
| FAIL | `plmweb` 当前运行 `sha256:92780fed...`，`aibiz/plmweb:local` tag 当前指向 `sha256:f2a117d3...` | live ledger `container plmweb` |
| WARN | `plmservice` 使用本地镜像，但没有源码 commit 回执或 image revision label | live ledger `container plmservice` |
| WARN | `modelingservice` 可核对宿主机/容器 JAR SHA-256，但没有源码构建回执 | live ledger `container modelingservice` |
| WARN | `modeling-plugins` 使用本地镜像，但没有源码 commit 回执或 image revision label | live ledger `container modeling-plugins` |
| WARN | `modelingservice-source-smoke`、`aibiz-modelingweb-debug-2771273` 是主 Compose 基线之外的旧辅助容器 | live ledger auxiliary entries |

当前关键运行版本：

| 容器 | 当前源码 HEAD | 镜像 ID | 状态 |
| --- | --- | --- | --- |
| `modelingweb` | `modelingweb@5bd4e9e5`，dirty | `sha256:4199c26a...` | bind-mounted dist/source |
| `modelingservice` | `ibiz-service-hub@5ffc8077`，dirty | `sha256:cbab2c97...` | 仅有 artifact hash，无 receipt |
| `modeling-plugins` | `modelingweb@5bd4e9e5`，dirty | `sha256:8801449b...` | 无 source receipt |
| `plmweb` | `plm-web@80376e6b`，dirty | `sha256:92780fed...` | bind mounts 存在，但 tag 不一致 |
| `plmservice` | `plm@88a104bb`，dirty | `sha256:fc7c318c...` | 无 source receipt |
| `task` | `task7@6873cda8`，dirty | `sha256:112eb2a1...` | 明确外部预构建镜像 |

正式 registry 的 allinone、gateway、UAA，以及 Task 外部镜像均已在 ledger
中标记为 external，不作为本地源码构建证据。当前未修改业务实现、Compose
或 harness；本轮只补充版本台账。后续应生成当前运行镜像对应的 clean
backend receipt、处理 `plmweb` tag/image 差异，并为三个 WARN 本地镜像补齐
源码构建回执；在这些动作完成前，不能把 live ledger 标记为通过。

## 当前本地运行时复核

2026-09-29 已完成上述历史冲突的修复。当前后端源码回执为
`ibiz-service-hub/scripts/records/backend-local-build-current-20260929.json`，
源码版本为 `8.1.0.584.1`，目标架构为 `linux/arm64`。

两个本地平台容器已按当前回执重建，未删除
`ibiz-ebsx-allinone-local-data` 数据卷：

| 容器 | 当前镜像 | 镜像 ID |
| --- | --- | --- |
| `ibiz-ebsx-allinone-local` | `aibiz/ibiz-ebsx-allinone-rt:8.1.0.584.1-local-current-20260929` | `sha256:0e34841f50e9e05d8f49723ff04ae888075828592c87245900f6619537d56da0` |
| `ibiz-ebsx-gateway-local` | `aibiz/ibiz-ebsx-gateway:8.1.0.584.1-local-current-20260929` | `sha256:e96737b49c54dde95930a43148b269f41927e39a451ee009b73d838cc4fbb516` |

当前 live ledger 报告为
`.artifacts/version-ledger/20260929-current-local/version-ledger.txt`，
结果为 `RESULT PASS`，硬失败数为 0。剩余 WARN 仅表示旧辅助容器仍被发现，
以及部分本地镜像尚未附带独立 build receipt；运行时 artifact、bind mount
和功能 harness 已分别覆盖这些组件。
