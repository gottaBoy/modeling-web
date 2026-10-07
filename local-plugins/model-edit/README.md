# Independent Model Edit

`@aibiz/model-edit@0.1.0` registers only `DEUIACTION_MODEL_EDIT` for the
`DEUIACTION` / `MODEL_EDIT` contract. It is not the original model-design package,
does not register its other actions, and never imports runtime-model/loader.
Original-source recovery and native compatibility/production acceptance are false.

The editable alpha122 source at
`vendor-upstream/gottaboy-plm-web/plugin-src/@ibiz-template-plugin/model-design@0.0.3-alpha.122`
is the interface reference (manifest gitHead
`7780006275953e510a725c449f9638a6ed878b97`). Native models originally request
alpha90; that compatibility is not established. The provider and editor here
are independently implemented against those public model-edit interfaces.

## Supported Scope

- Single-model JSON export/import through the actual host entity service:
  `ExportModelV2` / `ImportModelV2`, entity key, navigation parameters, and
  `srfmodelv2scope`.
- Host navigation, top drawer, fresh UIDomain, current-view save gate,
  refresh only after a successful import, and cleanup on dismissal or failure.
- Monaco JSON editing, readonly enforced both in the editor and save session,
  JSON-object validation, explicit load/save failure, discard confirmation,
  reload, save, save-and-close, and disposal of listener/editor/owned model.
- In-flight requests cannot update state, report success, or dismiss after
  component disposal. The host service has no cancellation argument here, so
  disposal cannot revoke an import already sent to the server.

Multiple-model editing, clipboard/import/export actions, DSL, runtime preview,
Swagger, completion/AI providers, and a full model-design replacement are not
implemented. No missing console/terminal or other model references are removed.

## Local Build And Runtime

Run `node build.mjs` and `node --test tests/local-model-edit.test.mjs` from this
directory.

TypeScript 5.3.3 and Rollup 4.9.3 are resolved from the existing modeling app.
No installation or network fetch is performed. ESM and SystemJS keep host
Vue 3.3.8, runtime alpha86, and loader 1.7.0 external; no Vue/runtime binary is
bundled. The build records the dependency rebase from alpha122's runtime alpha31,
Vue ^3.3.8, loader ^1.4.0, and TypeScript ~5.2.2 declarations. It does not claim
to reproduce the upstream CLI 0.3.30 build.

Deployment must provide the loader SystemJS mapping and local
`monaco-editor@0.52.2/min/vs` assets below `ibiz.env.pluginBaseUrl`. The URL is
made absolute relative to `document.baseURI` and must remain HTTP(S), same-origin,
without credentials/query/fragment. Workers therefore receive an absolute local
path; the package does not install global worker routing or mutate import maps.

`dist` contains exactly three outputs and `build-receipt.json`. Inputs bind
`build.mjs`, `package.json`, and every file under `src`; README/tests are not
executable build inputs. Builds reject output symlinks, unsafe ancestors,
hardlinks, and extra dist files before writing the group. Cooperative single
writer ownership is required; output replacement is not a multi-file transaction.

The focused suite loads the real built SystemJS module and exercises the
session, provider, Monaco lifecycle, and output safety against local host
contract fixtures. It is not native application acceptance. Native/browser
acceptance still needs real authorization, model edit/save, failure/readonly,
unmount cleanup, and fresh-session model readback against the actual platform.
