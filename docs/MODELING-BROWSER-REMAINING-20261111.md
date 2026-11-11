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
shared-port operation was performed in this task.

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
