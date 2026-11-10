# Independent Model-Design Source Candidate

This directory builds `@aibiz/model-design-candidate@0.1.0` from the local
vendored `@ibiz-template-plugin/model-design@0.0.3-alpha.122` source, without
editing that upstream directory. It is not a reproduction of the requested
`@ibiz-template-plugin/model-design@0.0.3-alpha.90`.

The candidate retains all 11 UIAction registrations, every declared source
module and stylesheet, and 1,414 byte-verified runtime JSON resources in each
of `dist`, `es`, and `lib`. Seven explicitly pinned source adaptations address
the 22 TS7053 diagnostics without disabling strict checking.
An additional pinned editor adaptation resolves the Monaco asset URL against
the document base, synchronizes readonly changes without recreating the editor,
and disposes only component-owned editors, models and providers. Generation
guards reject late loader results after recreation or unmount.

## IDE Editing

The maintained `enhancements/` modules extend the native model editor with
JSON-object validation, formatting, bounded undo/redo, structured baseline
changes, JSON download, unsaved-dismissal protection and Chinese/English UI.
Save performs a fresh native export comparison and a post-import readback.
Conflicts block import; a committed but unverified import stays visibly
unverified and does not automatically close. The preflight is not an atomic
server-side compare-and-set, and JSON validity is not model/schema validity.

These modules are copied into the source candidate with explicit builder
input hashes. All eleven native action registrations remain intact.
The boolean/string native readonly action flag is honored by the provider;
view mutation guards remain active after asynchronous transitions.

Details and actual evidence:
`scripts/docs/MODELING-IDE-ENHANCEMENT-20261110.md`.

## Runtime Inputs

Only these reconstructed, source-built runtime identities are supported:

| Version | Source directory |
| --- | --- |
| `0.2.2-local.1` | `modelingweb/local-plugins/runtime-model` |
| `0.2.2-local.2` | `modelingweb/local-plugins/runtime-model-next` |

Each build requires a report accepted by the current runtime source verifier.
The manifest and the complete consumed `package.json`, `dist`, and `loader`
file set, including declarations, must match that verified report. Published
runtime observations cannot replace this evidence. Source kind remains
reconstructed; original source recovery and native acceptance remain false.

## Build and Verify

Run from the workspace root:

```sh
node --test modelingweb/local-plugins/model-design/tests/candidate.test.mjs

node modelingweb/local-plugins/model-design/build.mjs \
  --probe-report .artifacts/native-model-design-build/build-c8c3e614-c829-40ae-8ee4-52ddb75b7f8e/report.json \
  --runtime-source-report .artifacts/runtime-model-source-build/build-500537af-a2fb-4ca6-91ec-80760398c9c7/report.json \
  --output .artifacts/native-model-design-local-candidate/UNIQUE_NEW_DIRECTORY

node modelingweb/local-plugins/model-design/build.mjs \
  --verify-report .artifacts/native-model-design-local-candidate/UNIQUE_NEW_DIRECTORY/report.json
```

Successful build and verification exit **2**, meaning source-build success
only. Exit 1 means failure. Existing output directories cannot be overwritten.

The offline workspace lock snapshots the complete reachable dependency
implementations, file hashes, executable modes, graph edges and explicit
relative links. It rejects published iBiz packages outside the verified
source-build targets. Both independent builds recheck this lock before and
after each command. This is not a package-manager installation receipt, and
the process does not claim OS-level network isolation.

The runtime version alone is not an input pin. Its source report must still
verify against the current source tree. The earlier `.2` report
`build-183d64ee-11ac-44fb-9453-0080e1e2f28a` and model-design `locked-v6`
candidate remain historical evidence, but current source drift prevents
their reuse. The updated `.2` report is explicitly pinned by the tests; it is
not selected implicitly by modification time or by success flags.

Each build runs strict typecheck, the complete source-built iBiz CLI build,
a deterministic CSS step, and declaration generation. The CSS step recompiles
all reachable SCSS in the static source import order using the same locked
Sass compiler and theme prefix. It fixes the CLI SCSS plugin's asynchronous
transform aggregation order without sorting compiled rules, dropping CSS
hashes, or changing upstream source. The reader independently recompiles and
verifies that CSS, as well as both complete output inventories.

The failed `.1` `build-20261006-alpha122-runtime1-locked-v5` receipt and its
two differing CSS outputs remain unchanged as failure evidence.

## Remaining Acceptance

Original source recovery, alpha.90 exact-version/API compatibility,
model-design runtime loader browser delivery, editor save/refresh/new-session
readback, native compatibility and production acceptance remain **false**.
Candidate deployment and real host behavior require separate verification;
registering all actions and copying resources is not behavioral acceptance.
