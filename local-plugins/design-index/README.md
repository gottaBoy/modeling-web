# Independent Design Index

`@aibiz/design-index@0.1.0` implements only `VIEW_CUSTOM / DESIGN_INDEX_VIEW`.
It is independently authored editable source, not recovered source of
`@ibiz-template-plugin/layout-design@0.0.3-alpha.90`.
Original source recovered: **false**. Native compatibility verified: **false**.
This is a first-stage implementation, not production or whole-package acceptance.
`SWAGGER_PREVIEW_VIEW` is not registered or supported.

## Supported Implementation

- Default Vue installer registers only `VIEW_CUSTOM_DESIGN_INDEX_VIEW` and a local
  component alias. It uses the actual host `IBizView`, `ViewController`,
  APPINDEXVIEW engine, layout rendering, navigation cache/tabs and SHORTCUT.
  It does not reinstall host providers or bundle a second Vue/runtime.
- Runtime receives the host model-helper's transformed APPINDEXVIEW. The controller
  clones its model, checks the six original controls (including nested layout
  controls), and preserves the original model, menu functions, visibility and
  permission states. It does not replace the model with a new generic layout.
- Existing side-menu controller instances receive local adapters. Visible,
  permitted `openDefault` items dispatch independently, including the terminal.
  Existing nested routes are retained for route-opening defaults. Dispatch errors
  are retained in `state.designIndexErrors` and rejected tasks, not reported as PASS.
  A pending command is not proof that its target rendered.
- Unbound side menus resolve their original model from layout controls. Host
  flattening, item providers and permission calculation run on staged state;
  disposal prevents publishing late results. Prior visibility/permission
  restrictions can narrow fresh states but cannot grant a newly denied item.
- Static-menu binding supports both the linked runtime/components
  `0.7.41-alpha.86/.78` and candidate `packages-latest` source controller.
  `calcDynamicMenu` and `convertMultipleLanguages` are newer-host capabilities,
  not mandatory imports. An old host explicitly rejects `dynamicMode=1`;
  it is not reported as a functional dynamic-menu implementation.
- `disableClose` APPVIEW menu targets are protected within this index: duplicate
  in-flight clicks coalesce, navigation bulk/single closes exclude protected keys,
  and observed target view modals reject dismissal until the index is destroyed.
  The protected modal remains usable; it is not replaced by an empty panel.
- DEBUG without an AppFunc calls the actual `ibiz.devTool.triggerVisible()` API.
  A missing devtool rejects explicitly. Other missing AppFuncs retain host failure.
- SHORTCUT requires the actual host `IBizShortCut` provider/controller. The host
  owns rendering, minimized-view restoration and subscription cleanup.
- Disposal removes local listeners and restores only methods still owned by this
  controller. No global framework prototype/provider is patched.

## Boundaries Still Requiring Native Validation

- Native rendering, terminal/console functionality, all menu target plugins,
  permissions against the real platform and browser lifecycle are not accepted.
- Menus without a corresponding host side-menu placeholder are preserved and
  reported in `designIndexErrors`; no invented render destination is claimed.
- Host tabs retain their original close affordance; a protected close is refused
  by the controller. Modal protection depends on host CTX/navigation child-view
  observation. Native popup/drawer observation must be verified.
- Already dispatched host commands have no cancellation API. Disposal prevents
  subsequent dispatch after async configuration reads and ignores late completion;
  it cannot cancel a platform request already in flight.
- No original layout implementation, Swagger/schema API, custom search service
  or console transport is fabricated.

## Local Contract Evidence

Editable host sources used to establish the interfaces:

- `ibiz-app-hub/packages/runtime/src/controller/common/view/view.controller.ts`
- `ibiz-app-hub/packages/runtime/src/model/view/view.ts`
- `ibiz-app-hub/packages/vue3-util/src/view/common/{index.ts,view.tsx}`
- `ibiz-app-hub/components/ibiz-next-vue3/src/view-engine/index-view.engine.ts`
- `ibiz-app-hub/components/ibiz-next-vue3/src/panel-component/nav-pos-index/`
- `ibiz-app-hub/components/ibiz-next-vue3/src/panel-component/app-extend-menu/`
- `modelingweb/packages-latest/@ibiz-template/vue3-components/src/panel-component/app-extend-menu/`
- `ibiz-app-hub/components/ibiz-next-vue3/src/panel-component/short-cut/`
- `ibiz-app-hub/plugins/ibiz-template-devtools/src/controller/center.controller.ts`

The focused tests inspect both local host SystemJS export sets and execute
both source side-menu controllers with controlled external boundaries. These are
local interface evidence, not proof of the candidate container's deployed bytes.

## Build

Run `node modelingweb/local-plugins/design-index/build.mjs` from the workspace.
TypeScript 5.3.3 and Rollup 4.9.3 resolve from the local plugin or installed
modeling application toolchain. Only `index.mjs`, `index.system.js`, `style.css`
and `build-receipt.json` are written under `dist`.
`buildLocalDesignIndex({ writeOutputs: false })` reproduces the three runtime
artifacts and receipt in memory without writing. Input/output hashes are SHA-256.
Compiler checks are syntax diagnostics, not a full host application typecheck.
