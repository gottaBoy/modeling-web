# Local Global Utilities

Independent implementation: `@aibiz/global-util@0.1.0`.
Candidate mapping: `@ibiz-template-plugin/global-util-design@0.0.3-alpha.87`.
This is editable local source, not recovered original package source.

## Implemented Contract

The native ModelDesign model calls `ibiz.fullscreenUtil.isFullScreen`,
`openElementFullscreen(element)` and `closeElementFullscreen()`, including in
`PSSystemDSLCompileView`. These calls are supported by a real browser Fullscreen
API implementation. The legacy `FullscreenClass` and `data.class` options remain
available. Entry and exit return a success boolean Promise; rejected browser
operations report an error through `ibiz.log.error` and `lastError`, without an
unhandled rejection from the native fire-and-forget UI scripts.

The local utility handles repeated/pending requests, Escape/browser exits,
connected-element validation, class/background restoration, page teardown and
disposal. Background shorthand/longhand declarations and their individual
priorities are restored without reverting unrelated inline styles changed during
fullscreen, including custom properties and background blending. A denied
request does not simulate fullscreen or modify the target. Installation across
Vue roots reuses one runtime instance; explicit disposal restores the previous
runtime tools only when this package still owns their slots. Persisted `pagehide`
keeps that instance alive for bfcache restoration; persisted `pageshow` reconciles
fullscreen styles with the browser's current state. Non-persisted page teardown
and explicit disposal remove both lifecycle listeners and restore owned slots.

No overlay toolbar is injected. The model already contains fullscreen/exit
actions, and browser Escape remains available. No router, appData, authentication,
model clipboard or provider is fabricated. `openView.push` and `hub.getApp` must
be supplied by the framework before installation. Clipboard ownership remains
with the model-design plugin.

## Build And Tests

```sh
node modelingweb/local-plugins/global-util/build.mjs
node --test scripts/tests/local-global-util.test.mjs
node --test scripts/tests/native-global-util.browser.mjs
```

The local build pins TypeScript 5.3.3 and Rollup 4.9.3. It runs a strict isolated
plugin typecheck and emits dependency-free ESM and SystemJS bundles plus a
source/output/toolchain SHA-256 receipt. This is not a full application typecheck.
The three bound inputs remain `build.mjs`, `package.json` and `src/index.ts`.
Writing outputs requires Linux `/proc/self/fd`, non-symlink directory ancestors,
and absent or single-link regular output files. The complete output group is
checked before any existing artifact is truncated; pinned directory and no-follow
file descriptors prevent symlink traversal. Existing safe `dist` artifacts can
be overwritten. A build output directory requires a trusted single writer;
multi-file replacement is not a transactional filesystem operation.

Unit fixtures use a real CSSStyleDeclaration implementation. The browser suite
checks actual Chromium fullscreen and CSS restoration at desktop/narrow
viewports, plus persisted lifecycle events. Those events do not claim an actual
history-cache navigation, and fixture success does not establish native app
acceptance. Browser evidence is written under `.artifacts/native-global-util-browser`.

The original private plugin's full behavior remains unknown. Model observations
and tests establish only the explicitly implemented contract above. Candidate
deployment, browser prerequisites, native editor/save/new-session readback and
production acceptance remain separate gates. Original-source and migration
acceptance flags must not be upgraded merely because this plugin builds or loads.
