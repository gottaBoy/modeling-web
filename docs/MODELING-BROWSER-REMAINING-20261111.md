# Modeling Browser Remaining Work

Date: 2026-11-11. This document records the M01/M03/M04 browser boundary for
the new owned backend fixture. It does not claim native or production
acceptance.

## Static Contract

The new bounded browser verifier is:

`modelingweb/app/tests/owned-five-dataset.browser.mjs`

It binds:

- the owned launch report and private launch state;
- the exact `25dd6a7232c7` deployment input and hash;
- the owned frontend source distribution through the already verified assets
  receipt;
- the source five-dataset contract;
- the private `owned-editor-registry-native-seed-v1` receipt with ten native
  create evidences;
- both loopback bridge specs and the existing full mounted/runtime guards.

The exact dataset set is:

| Entity | Published method | Collection |
| --- | --- | --- |
| `PSSysDBScheme` | `POST fetchcursys` | `pssysdbschemes` |
| `PSSysApp` | `POST fetchcursys` | `pssysapps` |
| `PSSysSFPub` | `POST fetchcursys2` | `pssyssfpubs` |
| `PSSysServiceAPI` | `POST fetchcursys` | `pssysserviceapis` |
| `PSSubSysServiceAPI` | `POST fetchcursys` | `pssubsysserviceapis` |

The browser records an observed GET alias as GET. It never upgrades a GET into
the published POST contract. Every accepted row must match the selected root's
native-created key, name, logical system, user tag, and physical system name;
foreign-root sentinels must be absent.

The verifier allows normal login, local model/plugin/static resources, the
published read fetches, and necessary GET aliases. It rejects mutation methods,
foreign origins, missing authentication, foreign organization headers,
unreviewed routes, hidden mutation payloads, and nonlocal requests. It does not
inject tokens, organizations, headers, controllers, or force-click actions.

## Current Verification

Only the deterministic helper suite has run:

```sh
node --test scripts/tests/owned-five-dataset-browser.test.mjs
```

Result: **23 passed, 0 failed, 0 skipped, 0 todo**.

Static receipt:

`.artifacts/owned-five-dataset-browser/static-contract-20261111-r1/report.json`

Status is `STATIC-CONTRACT-VERIFIED-NOT-RUN`. No browser, Docker, SQL, or
shared-port operation was performed in that initial static-only phase.

## Live Follow-up: November 12

The config-r6 backend was rechecked against its real deployment receipt:

```text
.artifacts/native-nonadmin-fixtures/25dd6a7232c7/backend-runtime-registry-backend-config-r6/deployment-input.private.json
SHA-256: 9a772586ded08da8b17b053cba6a450774dddc38e5f601527500d9542ac34453
```

The old registry frontend launch was stale: its two frontend containers no
longer existed, its deployment referenced backend-r1, and its loopback entries
returned HTTP 502. It was not accepted as current config-r6 evidence.

A fresh owned input and two new owned frontends were prepared and launched
through the unchanged source-bound tools:

```text
.artifacts/native-model-design-owned-backend/registry-config6-owned-20261111-r1/input.json
SHA-256: a2b16c171fe41a99fd2935f845182994da6e19d0ce90e6daea83f3a7855c6d6b

.artifacts/owned-native-modeldesign-launch/registry-config6-owned-20261111-r1/report.json
SHA-256: 439071c54453fe797eb5e922aba14c7b55eb09d677bcd5e9e2ec33cb82d681c7
```

The two new frontends are healthy, bind-mounted read-only, and unpublished by
Docker. Their owned loopback bridges reuse now-unused 32458/32459; shared
32008/32009 and PLM 30250 were not modified. No SQL, model save, native seed
creation, backend restart, or production-source change was performed.

### Actual Browser Results

The new source-bound diagnostic runner is:

`modelingweb/app/tests/owned-modeling-bootstrap.browser.mjs`

It uses normal UI login and real application-generated token/org headers,
verifies ordinary-user appdata, and repeats the original owned bridge/runtime
inspector before and after execution. It neither injects identity nor invokes
controller actions.

Two actual four-case runs were executed for editor A on root A:

| Run | zh desktop | zh mobile | en desktop | en mobile |
| --- | --- | --- | --- | --- |
| r1 | pointer intercepted | pointer intercepted | pointer intercepted | pointer intercepted |
| r2 | bootstrap/home and natural menu click observed | same | same | same |

First-run strict failure receipt, preserving the original interception:

```text
.artifacts/owned-modeling-bootstrap-browser/config6-editor-a-matrix-20261112-r1/report.private.json
SHA-256: cc0e54922e8ca9233a0003b884a1f3328abf9268b4abdb4e822e226e55428528
status: FAILED-LIVE-BROWSER-REMAINING-BLOCKERS
```

Second-run evidence:

```text
.artifacts/owned-modeling-bootstrap-browser/config6-editor-a-matrix-20261112-r2/report.private.json
SHA-256: 5e47775c880bec73f49efd3bab1b9d5356a41ff1c34bc1c9f2e558f30a7860d0
status: OBSERVED-BOOTSTRAP-NATURAL-CLICK-NOT-FULL-ACCEPTANCE
```

All four real runs have verified normal login, real appdata identity, naturally
supplied `srfsystemid=ibizmodeling` and actor organization, and mounted native
home controllers. Each observed only the normal pre-login catalog 401, with no
post-login 401.

The pointer blocker was the automatically opened Console drawer covering the
System menu. Its center hit-test resolved to the Console's `DETABEXPVIEW`
content, not the menu. In r2 the runner used normal keyboard Escape, as the
existing native navigation harness already does. In all four cases the open
drawer count changed from one to zero and the menu could be clicked naturally.
No `force`, CSS visibility edit, overlay removal, or controller injection was
used. This is a normal dismiss operation, not a production layout fix.

The following remain genuine blockers and are retained in the reports:

- authenticated optional extension-manifest 404, not generally allowlisted;
- authenticated `work_items/count_my_todo` 404;
- the newly opened System page is visually empty at the captured stage;
- the mobile layout keeps wide desktop navigation/content outside its
  390-pixel viewport; mobile navigation is not accepted;
- the observation establishes a click, not completion of five rendered
  dataset/list flows.

### M03 Strict Seed Failure

No complete config-r6 native-create seed receipt exists in this run. The newest
historical receipt has eight records, lacks `PSSysApp`, reports
`partial-native-create-seeds-app-config-blocked`, and binds backend-r1.
The strict five-dataset browser gate was actually executed against that receipt
and correctly rejected it before opening a browser or sending dataset traffic:

```text
.artifacts/owned-five-dataset-browser/config6-editor-a-seed-gate-20261112-r1/report.private.json
SHA-256: c28f51fcbe2006e6b28efe45e650edeb528ce7b731800cb4bf90d3450b550caf
status: FAILED
nativeAcceptance: false
permissionAcceptance: false
datasets: []
```

The missing native-create precondition was not replaced with SQL, fake IDs,
empty HTTP 200, historical record relabeling, or direct HTTP editor writes.
Native editor save, readback, fresh-session readback, and restoration therefore
remain unexecuted and unaccepted.

### M04 Matrix Skeleton

`owned-modeling-bootstrap.browser.mjs` enumerates all six real actors, both
target roots, both languages and both viewports: 48 unique rows. Four editor-A
own-root observations ran; the remaining 44 rows explicitly remain
`NOT-EXECUTED-NOT-ACCEPTED`. Own-root editor/viewer read expectations and all
cross-root/no-access denials are separate expectations, not inferred successes.
Only the editor own-root execution mode is currently enabled.

The dedicated skeleton and existing strict dataset contracts passed together:

```text
node --test modelingweb/app/tests/owned-modeling-bootstrap.test.mjs \
  scripts/tests/owned-five-dataset-browser.test.mjs
30 tests, 30 pass, 0 fail, 0 skipped

.artifacts/owned-modeling-bootstrap-browser/config6-editor-a-matrix-20261112-r2/helper-tests.tap
SHA-256: 62424b43b4cce4ea987b89e913920b6d795d1a71f7fe8151bade7a82974c0fe2
```

Both live runs keep native, permission, editor-save, fresh-session-readback and
production acceptance false. The healthy owned frontends remain available for
the next source-bound browser run; the diagnostic browser processes have closed.

## Required Runtime Matrix

Each case requires a new output directory and the exact launch/deployment/seed
SHA arguments:

| Root | Role | Locale | Viewport | Current status |
| --- | --- | --- | --- | --- |
| A | editor | `zh-CN` | desktop | not executed |
| A | editor | `en-US` | mobile | not executed |
| B | editor | `zh-CN` | desktop | not executed |
| B | editor | `en-US` | mobile | not executed |
| A/B | viewer | both | desktop/mobile | not implemented |
| A/B | no-access | both | desktop/mobile | not implemented |

The implemented bounded run intentionally accepts only an editor acting on the
same root. Viewer, no-access, and foreign-root cases remain explicitly
unaccepted rather than being inferred from API responses.

Example runtime command after the backend seed receipt is ready:

```sh
node modelingweb/app/tests/owned-five-dataset.browser.mjs \
  --launch .artifacts/owned-native-modeldesign-launch/registry-ide-owned-20261111-r1 \
  --launch-report-sha256 LAUNCH_REPORT_SHA256 \
  --state-sha256 LAUNCH_STATE_SHA256 \
  --deployment-input backend-runtime-.../deployment-input.private.json \
  --deployment-input-sha256 DEPLOYMENT_INPUT_SHA256 \
  --seed-receipt editor-registry-...private.json \
  --seed-receipt-sha256 SEED_RECEIPT_SHA256 \
  --run-id 25dd6a7232c7 \
  --actor nf_25dd6a7232c7_a_e \
  --root-side a \
  --locale zh-CN \
  --viewport desktop \
  --output registry-a-editor-zh-desktop-r1 \
  --run-readonly-browser
```

The deployment and seed paths must resolve under the fixture's private root.
Run the same bounded command independently for root `b` using
`nf_25dd6a7232c7_b_e`. Do not reuse an old optimization launch, old root,
old field ID, or old service receipt.

## Blockers

### M01 Bootstrap 401

Pre-login organization-catalog 401 is expected during the normal unauthenticated
transition. The bounded verifier waits for the real login, then requires a
200 appdata response whose normal request carries `srfsystemid=ibizmodeling`
and the selected root organization. Any post-login 401, wrong organization,
missing header, or substituted appdata remains a failure.

### M03 Editor Save/Readback

This task does not perform editor writes. The existing native browser editor
roundtrip uses a historical field path and is not valid for the new five-entity
fixture. A future editor test must use the seed receipt's actual entity/key,
normal UI action, Import/Export response, fresh-session readback, and restore
evidence. No direct HTTP write or fixed field ID is acceptable.

### M04 Pointer Interception

The new verifier clicks the rendered System sidebar, static tree groups, context
menu trigger, and `OpenGridView` action using trusted browser events. It checks
the click starts the exact main-frame request and rejects missing/ambiguous DOM
targets. It does not call controller methods or use `force: true`.

Any background console error, HTTP 4xx/5xx, unexpected WebSocket, blocked
nonlocal request, foreign sentinel, empty 200 response, or controller/root
mismatch remains a blocker for full acceptance even if all five foreground
queries appear successful.

## Acceptance Boundary

The intended first closeout is:

`PASSED-EDITOR-OWN-ROOT-FIVE-DATASET-UI-NOT-FULL-ACCEPTANCE`

This means only the selected ordinary editor, selected root, five real UI
navigation flows, exact observed requests, nonempty owned sentinels, and visible
grid rows passed. It does **not** mean the viewer/no-access matrix, editor
save/readback, physical snapshots, or whole application acceptance passed.
