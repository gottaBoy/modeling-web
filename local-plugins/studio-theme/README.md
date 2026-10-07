# Local Studio Themes

Editable independent implementation: `@aibiz/studio-theme-bundle@0.1.0`.
This is not recovered original studio theme or icon package source.

One TypeScript entry and two editable CSS sources produce two independent
delivery packages:

- `dist/color`: `@aibiz/studio-theme@0.1.0`
- `dist/icon`: `@aibiz/studio-icon@0.1.0`

Each package contains `package.json`, `index.mjs`, `index.system.js` and
`style.css`. Its manifest uses relative ESM/SystemJS entry paths and
`styles: ["style.css"]`, consumed by the normal iBiz SystemJS stylesheet loader.
The default Vue plugins provide immutable independent-implementation metadata;
they do not inject CSS, change root classes or uninstall another theme.

## Theme Scope

The color stylesheet only targets `:root.studio_dark`. It defines neutral dark
surfaces, legible text, border/fill, primary/status/link and editor state tokens,
with ElementPlus variables referencing those iBiz tokens. Without the root
class, the original default theme is unaffected. Existing themes are retained.

The icon stylesheet only targets the two observed model classes beneath
`:root.studio_icon`: `.studio-icon.pssysapp` uses FontAwesome desktop (`f108`);
`.studio-icon.psdeserviceapi` uses FontAwesome exchange (`f0ec`). It reuses the
application's already-loaded FontAwesome 4.7 font. No font, remote stylesheet,
new icon family or unrelated global icon override is shipped.

## Build And Tests

```sh
node modelingweb/local-plugins/studio-theme/build.mjs
node --test scripts/tests/local-studio-theme.test.mjs
```

The build reuses installed TypeScript 5.3.3 and Rollup 4.9.3; it does not download
or install npm packages. It runs a strict isolated-plugin typecheck, not a full
application typecheck, and emits dependency-free ESM/SystemJS modules.

`dist/build-receipt.json` records SHA-256 hashes for `build.mjs`, `package.json`,
`src/index.ts`, `src/color.css`, `src/icon.css`, the loaded toolchain entry files
and all eight variant outputs. CSS output bytes are the editable CSS inputs.
README is descriptive documentation, not a compiler input. Read-only rebuilds
can use `buildLocalStudioTheme({ writeOutputs: false })`.

The receipt retains `sourceStatus: "independent-local-implementation"`,
`originalSourceRecovered: false` and `nativeCompatibilityVerified: false`.
Local build/tests do not establish original repository provenance, the original
private packages' entire behavior, native compatibility, migration acceptance
or production acceptance. Candidate delivery and real browser/theme switching
remain separate verification steps.
