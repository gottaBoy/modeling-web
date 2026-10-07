# Local File To Base64

`@aibiz/file-to-base64@0.1.0` is a new, editable local implementation.
It is not recovered or authenticated source of the original
`@ibiz-template-plugin/file-to-base64@0.1.8-alpha.165`.
No original version, `gitHead`, migration acceptance or native login claim is made.

## Build And Test

From the workspace root:

```sh
node modelingweb/local-plugins/file-to-base64/build.mjs
node --test scripts/tests/local-file-to-base64.test.mjs
```

The build uses local Rollup 4.9.3 and TypeScript 5.3.3, directly or through the
existing `modelingweb/app` toolchain. It does not install packages or execute
published iBiz build tools/binaries. Vue, runtime and vue3-util imports remain
external. The deterministic receipt records source, toolchain and output hashes.
TypeScript compilation checks syntax, not a full application typecheck.

The isolated tests execute editable local runtime/vue3-util source
`0.7.41-alpha.86`, model-core `0.1.84`, and Vue `3.3.8`. The iBiz peer versions
are pinned to that tested source contract; other runtime versions need a
separate compatibility check. No published iBiz runtime binary is executed by
the build or these tests. Unused runtime services are explicit test boundaries.
The Vue interaction tests use happy-dom, not a native browser or a live backend.

The default Vue plugin registers component `AIBizFileToBase64` and
`registerEditorProvider('EDITOR_CUSTOMSTYLE_FILE_TO_BASE64', ...)`.
The provider supplies both form and grid editors and awaits controller `init()`.
For later candidate integration, stage the real root `package.json` with `dist/`.
Use an explicit independent replacement mapping; never relabel this manifest as
the original package. Static ESM consumers must also load `dist/style.css`.
No mapping, candidate output, model or running service is changed by this package.

## Local Configuration Contract

Editor parameter names are case-insensitive:

| Parameter | Meaning |
| --- | --- |
| `encoding` | `data-url` (default), `dataurl`, `base64` or `raw-base64` |
| `rawbase64` | `true` or `1` selects raw base64 when `encoding` is absent |
| `filename` | Additional data field receiving the original filename |
| `accept` | Comma/semicolon-separated extensions or MIME types/wildcards |
| `fileexts` | Alternative to `accept`; also falls back to model `fileExts` |
| `maxsizebytes` | Explicit size limit in bytes; takes precedence |
| `size`, `MAXFILESIZE` | Size limit in MiB; also falls back to model `maxFileSize` |
| `MAXFILECNT` | Only `1` or `-1` is supported; both mean one scalar file |
| `readonly`, `disabled` | Boolean or string `true`/`1` disables editing |

Size `0` or `-1` means unlimited. Positive limits include their exact boundary.
Null numeric options are treated as absent, including the explicit byte limit.
Multi-file configuration is rejected rather than silently losing files.
Selecting emits `change(encodedValue)`, followed by `change(file.name, filename)`
when the filename field is configured. Removing emits the same events with null.
Accept and size errors/read failures retain the previous stored value.
Old reads are cancelled on reselection, external value change, locking,
removal and unmount; they cannot publish stale values.
An empty raw-base64 file can be displayed using its selected or companion
filename. Without either filename, a persisted empty string cannot be
distinguished from an empty field.

## Compatibility Limits

The four inspected native PSDEPrint/PSDEReport QuickCreate/QuickCfg editors use
`FILEUPLOADER_ONE`, `filename=reportfile`, `MAXFILECNT=1`, model size `-1`, and
values `printmodel` or `reportmodel`. They do not specify an encoding.
Data URL is this implementation's documented default, not proof of the original
plugin's or backend's expected format. Configure raw base64 explicitly if needed
and verify actual form save/reload before accepting the replacement.

The local MiB size convention follows the existing uploader's `size` parameter;
the original missing plugin's `MAXFILESIZE`/model-size units are unverified.
Client-side accept checks use filename/MIME metadata, not content sniffing or
server-side security validation. This implementation has no remote upload,
OSS attachment records, download tickets, image resizing, preview, directory
upload or multi-file serialization. It keeps one whole file in memory.
The remove control uses the host's existing `ion-icon` with a text fallback.
Unit/component tests are not native browser/backend workflow acceptance.
