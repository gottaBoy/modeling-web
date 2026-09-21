# Isolated Source Candidate

This lane does not call the normal release plugin, replace app/dist, install
into the working app, or restart modelingweb/modelingservice/plmservice.

## Current Run

2026-09-16: `http://127.0.0.1:32707/modeldesign/`, served by
`modelingweb-source-candidate-a0rpn5`.
Run directory:
`.artifacts/frontend-candidates/2026-09-16T08-08-34.321Z-A0RPn5`.

Desktop/mobile-viewport login rendering and input interaction were verified,
but the overall browser gate is failed on the real extension manifest 404.
No credentials or authenticated write workflows were exercised.
See checks/2026-09-16T08-14-46.455Z-4ENRDF for screenshots and errors.

Only this candidate may be stopped with:

```sh
docker stop modelingweb-source-candidate-a0rpn5
```

Do not restart the original stack to deploy this unaccepted candidate.

## Assemble

Run from modelingweb/app:

```sh
pnpm assemble:source:candidate --framework-build FRAMEWORK_RUN --type-report TYPE_REPORT_JSON --baseline BASELINE_RUN
```

The assembler verifies the seven-package source build and candidate type
evidence before creating a unique `.artifacts/frontend-candidates` directory.
It verifies the captured web tree, copies its models and static assets, builds
the application bootstrap from src/main.ts, and changes the copied import map.
All seven framework mappings point to source-build outputs.

AI chat 0.0.94, gantt alpha.468, data-view 0.0.8 and bi-report 0.0.32 are local
plugin distributions, not recovered original plugin source. Their JS/CSS
directories are retained together. The lane repackages local interactjs
1.10.26, axios 1.13.2, cherry-markdown 0.8.58, echarts, dayjs plugins and MQTT
into SystemJS. Other captured externals and polyfills remain explicit
prebuilt dependencies.

The report records input/output hashes and verifies every import-map resource
is local and present. Assembly alone does not certify browser behavior, peer
version ranges, original-source completeness or reproducible installation of
the entire toolchain.

## Serve

```sh
pnpm serve:source:candidate --run CANDIDATE_RUN --port 32703 --daemon
pnpm check:source:candidate --run CANDIDATE_RUN
```

The host launcher chooses the next port if its requested port is occupied,
records the PID and port in server.json, and rejects changed artifact bytes.
Where host background listeners/browsers are restricted, use a dedicated
container with the workspace mounted read-only, candidate logs writable, and
dist read-only. Bind the host port to 127.0.0.1 only. Do not modify the running
production containers to work around host restrictions.

The server proxies existing local APIs. It permits GET/HEAD/OPTIONS, explicit
fetch_* query POSTs, recents/my_summary and login/logout. Other POSTs and all
PUT/PATCH/DELETE and WebSocket upgrades are denied. This limits explicit
business mutations; it does not prove every existing GET or query handler
is side-effect-free. The candidate is for startup/login/read verification,
not for user editing or save/reload acceptance.

The browser checker uses a fresh profile, blocks external origins and records
desktop/mobile-viewport screenshots, errors, asset failures and schema API
responses. It does not read a user's normal Chrome profile, use credentials
implicitly or claim authenticated business workflows passed.

## Acceptance

A passing startup check is not deployment acceptance. Review browser console
events, missing images, source-artifact requests, model loading, dependency
versions and authenticated workflows separately. Mobile viewport checks of
this desktop entry are not mobile application equivalence tests.

Preserve failed run reports and the original baseline. Stop only containers
created for this candidate lane. Do not prune images/volumes or delete the
vendor service snapshot.
