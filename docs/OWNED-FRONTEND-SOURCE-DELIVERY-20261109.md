# Owned Frontend Source Delivery

Date: 2026-11-09. Workspace: `/home/my/workspace/ainfra/aibiz`.

This records a real source build and a strictly bound independent distribution.
It is not browser, native-business, or production acceptance. No shared
`modelingweb/app/dist`, public directory, Docker container, or database was
modified by this frontend delivery task.

## Source Origin And Fresh Build

The seven active packages were built from
`modelingweb/packages-latest/@ibiz-template`, not substituted with the separate
`ibiz-app-hub` source tree:

- `core`, `runtime`, `model-helper`, `vue3-util`
- `vue3-components`, `devtool`, `web-theme`

The explicit organization-context opt-in exists in both independent origins.
Their original control flow remains distinct; see
`ORG-CONTEXT-SOURCE-MAPPING-20261109.md`.

Actual stages, all exit 0 with unchanged bound inputs:

| Stage | Source Receipt | Result |
| --- | --- | --- |
| Framework | `.artifacts/frontend-source/2026-11-09T03-01-22.396Z-WFKWkX/report.json` | Seven packages, `built-not-deployed` |
| Candidate types | `.artifacts/frontend-source-types/2026-11-09T03-08-47.039Z-QR5Zly/report.json` | 3,651 source files, zero diagnostics, `passed-not-deployed` |
| Native assembly | `.artifacts/frontend-candidates/2026-11-09T04-09-56.136Z-XpM8G8/report.json` | `assembled-not-deployed` |

Command, timing, input inventories, and stdout/stderr hashes are recorded in:

- `.artifacts/frontend-owned-delivery-20261109-r1/framework-report.json`
- `.artifacts/frontend-owned-delivery-20261109-r1/types-report.json`
- `.artifacts/frontend-owned-delivery-20261109-r3/assembly-report.json`

Assembly used the verified baseline
`.artifacts/localization-baseline/2026-09-28T13-14-43.969Z-Egw0NW`.
Earlier failed assembly attempts were retained, not promoted or overwritten.
The legitimate tool-resolution fixes resolve esbuild in Vite's context and
discover an exported tool's package manifest from its resolved entry.

Four plugin distributions (`ai-chat`, `gantt`, `data-view`, `bi-report`) remain
explicitly classified as existing plugin distributions, not original-source
builds. Third-party repackaged distributions also remain distinctly classified.
The seven framework builds must not be presented as proof that every dependency
has original source or that every business capability is complete.

## Independent Distribution

```text
dist:
/home/my/workspace/ainfra/aibiz/.artifacts/frontend-candidates/2026-11-09T04-09-56.136Z-XpM8G8/dist

receipt:
/home/my/workspace/ainfra/aibiz/.artifacts/frontend-candidates/2026-11-09T04-09-56.136Z-XpM8G8/report.json

receipt bytes: 4104752
receipt sha256:
497c8e88dcdd7911c60e990e2beb7c88ccd2474fd8a6f34efff7a8435393d810

output files: 18110
output bytes: 397789602
output tree sha256:
8a53528f14bbcf2b6618f1f713e7f3e5386f6eefaf5369b20d624dad8e2a3cb1
```

`assemble-source-candidate.mjs --native-modeling` creates the native profile.
Its relative HTML base supports both Central and ModelDesign, and its generated
environment adapter preserves the deployment's explicit plugin base URL.
Omitting the flag preserves the existing preview profile.

The assembler's SHA-256 is
`6078a3420a083ea14e2bbca4e87ebc024131e7f4d8a5d7c346c87e19c475e0b9`.
Changing it invalidates this source receipt and requires a fresh assembly.

## Consumption Contract

Both runtime-assets preparation and isolated-launch preparation accept these
optional flags together:

```text
--frontend-dist ABSOLUTE_DIST
--frontend-receipt ABSOLUTE_REPORT
--frontend-receipt-sha256 EXPLICIT_SHA256
```

The corresponding API fields are `frontendDist`, `frontendReceipt`, and
`frontendReceiptSha256`. All absent preserves the legacy shared-dist path and
receipt shape. Any explicit option requires all three; there is no silent
fallback to shared assets.

`frontend-source-dist.mjs` is a lightweight entrypoint. Its fixed, read-only
Node subprocess runs `verify-frontend-source-candidate.mjs`, without a shell
or inherited `NODE_OPTIONS`/`NODE_PATH`. A binding-shape check alone is not
source authority.

The verified binding has exactly this shape:

```js
{
  contract: 'native-frontend-source-dist-binding-v1',
  dist: ABSOLUTE_DIST,
  receipt: { path: ABSOLUTE_REPORT, bytes: 4104752, sha256: RECEIPT_SHA256 },
  output: { files: 18110, bytes: 397789602, sha256: OUTPUT_TREE_SHA256 },
}
```

Only a direct `.artifacts/frontend-candidates/<run>/dist` and its sibling
`report.json` are allowed. Arbitrary directories, ambiguous paths, symlink
ancestors, missing hashes, and receipt replay are refused.

The verifier checks current assembler, Node binary and complete toolchain,
real seven-package framework verification, real candidate type evidence,
all recorded source inputs, host source trees, captured baseline, exact
dependency identities and assets, generated native host files, and the full
output inventory. It reconstructs the entire expected import map from the
baseline and reviewed recipe instead of accepting merely rehashed output.

Selected runtime-assets receipts contain `.frontend`; the import map comes
from that independent distribution. Preparation and verification both repeat
source verification. Selected isolated plans must contain the exact same
binding as their runtime-assets receipt, and mount that distribution read-only
at `/opt/aibiz/local-dist`.

The parent owns integration in `native-model-design-owned-backend-input.mjs`
and the owned launcher. Every reconstructed isolated plan, private JSON guard,
input/assets binding check, and authority check must preserve this binding.
No pure plan constructor substitutes for the real source verifier.

## Verification Evidence

Real asynchronous and fixed-subprocess synchronous verification both passed
after the complete import-map recipe gate was added. Helper/assembler source
hashes were unchanged before and after:

```text
.artifacts/frontend-owned-delivery-20261109-r3/frontend-verification-r3.private.json
sha256: 17b717f4c51f5dcf5b341cd608a71d900fc8bfc18cc2012004759a214cf3bae8
status: VERIFIED-ASYNC-AND-SYNC-SOURCE-DIST-NOT-ACCEPTED
```

Logged focused regression: **503 passed, 0 failed, 0 skipped**, stable sources,
208 seconds:

```text
.artifacts/frontend-owned-delivery-20261109-r4/tests-report.json
sha256: 47a5cbeae20a6ad7a4dae40171092ecea4f25ab51180e9e9c41258ff71025340
```

Suites: `frontend-source-dist`, `frontend-candidate`,
`native-ai-code-runtime-assets`, `native-model-design-isolated`.
This includes framework-import redirection, extra import injection, and
plugin-style redirection with refreshed receipt/output hashes; all are refused.
The earlier 500-case report remains retained in `r3`.

## Chinese And English Browser Login

`native-modeldesign.browser.mjs` now initializes only the normal saved
`language` preference in its independent browser context. Setting Chromium's
locale alone is insufficient because this active application's i18n constructor
reads `localStorage.language`, defaulting to Chinese.

Each run normalizes its selected Chinese/English language, asserts both
`document.documentElement.lang` and real `ibiz.i18n.getLang()`, then clicks the
exact `Login` or Chinese login label. A wrong-language document or button
cannot count as an English pass. No identity, token, organization, header,
backend response, or runtime i18n implementation is injected.

Controlled real-browser contract tests exercise trusted DOM clicks, reloads,
and negative language cases. Together with existing login/network and target
contracts: **104 passed, 0 failed, 0 skipped**, stable sources, 10.5 seconds:

```text
.artifacts/frontend-owned-delivery-20261109-r4/browser-tests-report.json
sha256: 2a930e2d311a3a61531dd066c0642ab7de13fb9b74b0335f292dead69da1aa4f

modelingweb/app/tests/native-modeldesign.browser.mjs
sha256: 551c24bfd7b77c3970e08671c1ac27ad7e86e3da3c84e9693a17ec9dafdbfd48
```

These controlled tests are not a live owned application acceptance run.
The parent must run fresh ordinary-user Central/ModelDesign flows separately
for `zh-CN` and `en-US`, including organization context, theme loading,
notifications, model-linked navigation, authorization, and permitted editing.
Source/artifact verification does not promote any native or production
acceptance flag. All frontend delivery source and tests are now frozen for
the parent's integrated regression and real browser execution.

## Live Browser Follow-up: Unfinished MQTT Policy

The real Chinese browser receipt is:

```text
.artifacts/owned-native-modeldesign-browser/current-source-zh-20261109-r1/report.json
```

Both applications passed model, plugin-assets, ordinary UI login, and
theme-rendering stages. This receipt does not pass home, navigation, reload,
or browser-error acceptance. The parent is separately correcting observation
of transient `document.body === null` during document replacement and the
precise classification of ordinary pre-login organization-catalog 401s.
Those observation changes must not erase the following real resource failures.

ModelDesign's WebSocket request to
`/api/ibizmodeling__modeldesign/portal/mqtt/mqtt` returned 404 despite the
owned container's `ENABLEMQTT=false`. Read-only source and served-asset
inspection established this exact configuration chain:

1. `modelingweb/environment.config:8` correctly maps
   `enableMqtt:ENABLEMQTT`; the spelling matches the active core/runtime.
2. `modelingweb/start.sh` serializes the value as boolean `false`, not the
   truthy string `"false"`, and appends the deployment override after the
   captured environment object.
3. The actually served ModelDesign `environments/environment.js` contains
   the final `"enableMqtt": false` override. Its subsequent
   `source-app/environment.js` contains only the native-profile comment.
   `candidateHostFiles` does not turn MQTT back on.
4. `attachEnvironmentConfig()` initially copies that false value to
   `ibiz.env.enableMqtt`.
5. Active `DynaAuthGuard.initModel()` loads the model and calls
   `AuthGuard.initEnvironment()` before `getAppAsync()` creates the app.
   The latter method applies every `app.userParam` key back into `ibiz.env`.
6. All three reviewed ModelDesign candidate models contain
   `getUserParam.enableMqtt: "true"`; all three Central models contain
   `"false"`. ModelDesign therefore overwrites the deployment's false value.
7. `AppHub.createApp()` calls `initMqtt()`, which correctly checks the now
   overwritten `ibiz.env.enableMqtt` and opens the real WebSocket.

The remaining defect is model-parameter precedence, not container flag
spelling, environment serialization, native host generation, or an invented
network failure. No framework, host, model, receipt, or built artifact was
changed during this diagnosis. The MQTT error remains unresolved and retained
as a failed browser observation; no fake WebSocket success or broad error
allowlist is permitted.

A narrowly scoped future source fix can preserve all existing default model
precedence while accepting an optional, strictly boolean deployment override
for `enableMqtt`. The ordinary model parameters would apply first, followed
by that explicit override; the native host would opt in from the real
deployment environment. An absent override must retain legacy behavior.
This is a proposal, not an implemented feature. It requires independent
source-origin tests, new framework/type/assembly receipts, downstream
candidate/assets/input preparation, and fresh Chinese/English browser runs.
Tests must include false-versus-model-true, explicit true, absent override,
invalid string values, login, refresh, and model switching.

Subsequent source work implemented and locally tested that bounded opt-in in
both independent origins and the native host. The complete contract, six source
hashes, and successful 206/109-test evidence are recorded in
`MQTT-DEPLOYMENT-OVERRIDE-20261109.md`. This does not retroactively pass the old
browser receipt; the parent must refresh the full source-bound artifact chain
and run new real browsers. The historical diagnosis above remains unchanged.

### Independent Collaboration Boundary

`runtime/src/utils/collaborate-room/collaborate-room.ts` directly creates
`CollaborateService` and calls `connect()` without checking `enableMqtt`.
This is separate from `AppHub.initMqtt()`. The current model-design candidate
plugin source has no direct collaboration-service call, so this path does not
explain the recorded initial ModelDesign MQTT connection. Fixing the bootstrap
precedence alone must not be presented as a universal MQTT-disable policy or
proof of real-time collaboration support. A global disable policy must
explicitly handle that collaboration entrypoint without fabricating success.

### Optional Extension Manifest Boundary

The same real browser receipt preserves 404s for the exact Central and
ModelDesign `/remotemodel/ext/package.json` paths, before login and, for
ModelDesign, after login. Source establishes an optional probe:

- `AppHub.loadExtensionPlugin()` probes every application's extension plugin
  and catches loading failure with a warning before continuing initialization.
- `PluginFactory.loadPluginRef()` performs the actual manifest GET.
- The original `ExtensionGatewayRestController.downloadAppExtModel()` returns
  404 for an application without hot-extension files.
- The owned nginx uses real static `try_files ... =404`; no extension manifest
  is deployed at the bound native application paths.

The existing source-candidate checker and its tests already distinguish that
exact optional-manifest 404 from other resource failures. However, the current
native browser receipt is not retroactively reclassified and its failures
remain visible. A future native checker classification must bind the selected
same-origin application, exact GET manifest path, actual 404, and evidence
that the bound deployment intentionally has no such manifest. It must record
the optional-resource evidence rather than silently discard it. A present
manifest that cannot be served, 403/500 responses, other extension files,
other applications/origins, and model/plugin delivery failures must still fail.
