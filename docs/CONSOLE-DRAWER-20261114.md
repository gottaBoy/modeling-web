# Console Drawer Source Fix

Date: 2026-11-14, Asia/Singapore. Scope: B04/M03 IDE usability.

## Cause

The official `ModelingIndex` model explicitly marks the bottom `terminal` menu
`openDefault: true`. The independent index controller honors this at mount.
This is intentional model behavior, not a Console CSS or MQTT side effect.

The target `PSSysDevBKTaskTabExpView` has `openMode: DRAWER_BOTTOM` and no height.
The host `AppDrawerComponent` defaults a bottom drawer without numeric height
to `100%`. The standard header is hidden by existing drawer options, and the
embedded Console itself has no outer-drawer close command. The result is a
full-frame overlay without a visible close control.

Restoring the header also exposed the host drawer stylesheet's absolute
right-aligned header: the title and close button overlapped. This is now fixed
only for the Console drawer.

## Changes

- `src/model.ts`: a narrowly matched target helper supplies 45% height,
  `withHeader/showClose`, localized menu title, Escape support and a dedicated
  CSS class. A different view, direction, function type or mismatched view ID
  does not receive these defaults. Explicit height and modal options win.
- `src/controller.ts`: only the permitted bottom `terminal` item without an
  overriding custom provider uses these options. It still dispatches the actual
  `AppFuncCommand`, preserving context, AppFunc navigation and modal lifecycle.
  Visibility, enabled state, permission and disposal are rechecked before queued
  execution, after each asynchronous target lookup and before fallback/command
  dispatch. Pending clicks retain the existing coalescing behavior.
- `src/style.css`: `ibiz-drawer.aibiz-console-drawer` alone gets a normal flex
  header, a separate 32px close button, readable header background/text and a
  minimum-height-safe body. No global drawer selector is changed.
- `tests/permitted-menu.test.mjs`: normal defaults, exact target restrictions,
  explicit target configuration and source-controller authorization races.
- `app/tests/console-drawer.browser.mjs`: four source browser scenarios, described below.

The model's automatic open is not removed. The overlay remains a normal modal
drawer: close it to operate the main area, then reopen through the Console menu.
No synthetic Escape, forced click, CSS overlay hiding, parent-view dismissal
injection or MQTT warning suppression is used.

No Console transport/body source, original vendor model, generic drawer/locale,
shared `dist`, container, shared service or business data is modified.
The independent, unmounted `local-plugins/design-index/dist` was subsequently
rebuilt with its formal builder, including its three artifacts and receipt.
This is versioned package maintenance, not replacement of `app/dist` or a
running private plugin directory.

## Verification

From the workspace root:

```sh
node --test modelingweb/local-plugins/design-index/tests/permitted-menu.test.mjs modelingweb/local-plugins/design-index/tests/todo-counter.test.mjs
node --test modelingweb/app/tests/console-drawer.browser.mjs
node --test scripts/tests/local-design-index.test.mjs
```

The browser test calls both plugin builders with `writeOutputs: false`.
The new design-index and unchanged Console bundles remain in memory, as do
compiled host command/drawer modules and Sass. Only screenshots and a report
are written under private `.artifacts/console-drawer-browser/probe-*/`.
The local fixture server and browser are closed after testing.

The fixture executes source `AppFuncCommand`, `OpenAppViewCommand` and
`AppDrawerComponent` with actual Vue 3, Element Plus 2.4.4, host drawer Sass and
the real Console view. Host context, permissions, configuration, modal boundary
and transport are controlled fixtures, not a live Modeling service.

For `zh-CN/en-US` on desktop `1144x856` and mobile `390x844`, it verifies:

1. The model still automatically opens Console through the AppFunc/OpenView chain.
2. Drawer height is 45%, not the full frame.
3. Localized title and close control do not overlap and remain inside the drawer.
4. The standard close button receives the pointer and closes through normal clicks.
5. The main action receives a normal click after dismissal.
6. The Console menu reopens the drawer and it closes normally again.
7. The disabled-MQTT warning remains visible in the matching language.
8. No horizontal overflow, console/page error or external request is ignored.

Unit result: 7 passing tests. Browser result: four passing cases plus the parent
test. Package contract result: 102 passing tests. The joint command reported
114 passed, zero failed and zero skipped, without counting any case twice.
Initial pointer measurements were taken during
the open animation; the final test waits for the close button's normal
actionability before measuring. This does not bypass overlays or force clicks.

The reviewed local receipt is
`.artifacts/console-drawer-browser/probe-078aa53e-8d54-4e5c-b94b-de04c43d20f1/report.json`;
its directory contains `zh-CN-mobile-open.png`, `en-US-desktop-open.png` and
matching closed-state screenshots for all four cases. Desktop height was
385.19/856 pixels and mobile height 379.80/844 pixels, with title/close overlap
false, normal pointer delivery and two successful main-region clicks per case.

The two new authorization-race test groups execute the actual controller source
in an isolated VM with controlled host boundaries. During deferred application
and view-configuration reads they revoke permission/visibility, hide or disable
the item, or destroy the source fixture controller. Every case rejects with zero
command/fallback calls; revocation during the application read also prevents
starting the view lookup. A queued revocation before the first read is covered.
No live application controller is injected or modified for these tests.

The package CSS audit now builds current source in memory instead of inspecting
only stale delivery CSS. It admits the four exact
`.ibiz-drawer.aibiz-console-drawer` selectors and their exact bounded
property/value maps. Negative cases still reject global/loose selectors,
fixed positioning, full-viewport close sizing, unexpected z-index, `!important`,
imports and resource URLs. Strict package input/receipt file lists are unchanged;
the new browser fixture and this note live outside that package directory.

Element Plus 2.4.4's bundled Chinese locale lacks `el.drawer.close`; its built-in
close-button accessible label remains that key in the fixture. The visible title
is localized. This framework locale residue is recorded, not hidden or counted as
complete Chinese accessibility support.

## Remaining Gates

This is a source/build/browser-contract fix, not full native IDE acceptance.
The independent package's versioned `dist` and receipt now match current source;
102 package tests verify that match. The shared application's `app/dist` and
running private replacement directory are unchanged. Their deployed or pinned
candidate bundles still need a reviewed isolated rebuild and a new source pin.
Old runtime receipts must not be claimed to cover the modified source.

The actual IDE must then verify the loaded bundle/CSS hashes, authenticated model
defaults and explicit custom modal settings, normal close/reopen and main-region
navigation in both languages/viewports. Full-screen or non-closable settings
explicitly chosen by a model remain authoritative, not silently overridden.

The test does not validate real MQTT delivery, connection authentication,
subscription authorization, task execution, model CRUD/save/readback, native
permissions or all other menu capabilities. Those B04/M03/MQTT gates stay open.
