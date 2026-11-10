# MQTT Deployment Override

Date: 2026-11-09. Status: implemented and locally tested in source, not live
browser or production acceptance. This task changed only the six source files
listed below, the dedicated tests, and documentation. It did not change build
tools, old receipts, candidate artifacts, shared containers, databases, or port
30250.

## Contract

`AuthGuard` and `runApp` accept optional
`environmentOverrides: { enableMqtt?: boolean }`.

- Absent/undefined overrides preserve existing model-parameter priority.
  An empty plain object also leaves model MQTT policy unchanged.
- Explicit `false` overrides model `true`; explicit `true` overrides model
  `false`. The value is reapplied after normal model environment initialization,
  including when the model has no `userParam`.
- Validation accepts only plain or null-prototype objects with an optional own
  data property `enableMqtt` containing a boolean. Null, strings, arrays,
  boxed values, custom prototypes, unknown own keys, symbol keys, accessors,
  and nonboolean MQTT values are rejected. Getters are not invoked.
- Accepted values are copied and frozen. Caller mutation cannot change a
  guard's policy, including during asynchronous `runApp` initialization.
- `runApp` validates before runtime installation or startup-hook registration.
  A supplied `getAuthGuard` cannot be combined with supplied overrides;
  that combination rejects explicitly rather than silently ignoring the policy.
  Custom guards without overrides retain the old behavior.

The real model, organization loading, authentication, extension initialization,
adaptive-screen behavior, and all unrelated environment parameters retain each
origin's existing flow. No whole-package substitution was performed.

The native host opts in only for the exact `Central` or `ModelDesign` selector
and an explicit boolean from `window.Environment.enableMqtt`. A missing value
leaves model priority unchanged. Invalid explicit native values fail before
startup hooks or route replacement. Non-native hosts do not opt in.

`vite-env.d.ts` now types the override instead of erasing all `runApp` options
as `unknown`; strict host type tests reject strings, objects, null, and unknown
override keys.

## Independent Source Origins

| File | SHA-256 |
| --- | --- |
| `ibiz-app-hub/components/ibiz-next-vue3/src/web-app/guard/auth-guard/auth-guard.ts` | `599299c456484762cd166302763d046b9f4ffbea13be23cea3578c5de6eadcf4` |
| `ibiz-app-hub/components/ibiz-next-vue3/src/web-app/main.ts` | `85db27a2e9a077663d6e888559c588a3bb8eb7c3c9a1c3f7cec851b373122aa0` |
| `modelingweb/packages-latest/@ibiz-template/vue3-components/src/web-app/guard/auth-guard/auth-guard.ts` | `eb0ccd701781ed908b4ede432dc529ca95055d5f5d661b3735bd42cc3cc30381` |
| `modelingweb/packages-latest/@ibiz-template/vue3-components/src/web-app/main.ts` | `b570461ab0fc0962ccfbcb2a1752fb6577e52b66c63a9c2227030bc6f0df8ad1` |
| `modelingweb/app/src/main.ts` | `d899d051c2cd2ac241d8cbd2ddd2815304c0e07b86ae5b70bf48c77cc9d04e33` |
| `modelingweb/app/src/vite-env.d.ts` | `7552ac0bf8487abdd0c9e4d2e3d698075ef9af2f6377aed1f454b55e16dcf163` |

The six source hashes remained unchanged through the final verification runs.
All source and tests are frozen for the parent's new source-bound artifact chain.

## Local Verification

Subsequent source-bound browser replay also passed the bounded disable policy:
`.artifacts/frontend-optimization-20261109-r1/browser-policy-r1/report.json`.
Normal Chinese and English UI logins each observed model MQTT `"true"`,
deployment boolean `false` and effective boolean `false`, with no WebSockets
during each five-second sample. This does not accept collaborative-room
transport, a real broker, or complete ModelDesign navigation.

Only installed local tools were used. No package installation or network lookup
was performed.

The existing auth-guard suite imports both actual independent source classes.
Each origin runs in a reset runtime fixture. Tests also execute the actual
`runApp` declaration and `AppHub.initMqtt` method extracted with the TypeScript
parser, using controlled dependency adapters rather than copied implementation.
False-over-model-true creates no MQTT service; true-over-model-false and the
legacy model-true policy call the controlled MQTT service's real test boundary.
These tests are not a real broker integration.

```sh
cd ibiz-app-hub
./node_modules/.bin/vitest run \
  --config components/ibiz-next-vue3/vitest.auth-guard.config.ts \
  --reporter=default --reporter=json \
  --outputFile=/home/my/workspace/ainfra/aibiz/.artifacts/frontend-owned-delivery-20261109-r6/auth-tests.json
```

Result: **206 passed, 0 failed, 0 pending, 0 todo**. This includes 101 auth,
MQTT and startup tests per independent origin, plus four existing environment
contract tests. Elapsed: 2.18 seconds.

```sh
cd modelingweb/app
./node_modules/.bin/vitest run \
  tests/native-mqtt-overrides.test.ts \
  tests/native-development-center.test.ts \
  tests/native-modeling-root.test.ts \
  tests/release-contract.test.ts \
  --reporter=default --reporter=json \
  --outputFile=/home/my/workspace/ainfra/aibiz/.artifacts/frontend-owned-delivery-20261109-r6/host-tests.json
```

Result: **109 passed, 0 failed, 0 pending, 0 todo**. This includes 39 native
host MQTT execution/type tests and 70 existing center/root/release tests.
Elapsed: 2.35 seconds.

The first new host-test attempt failed because its controlled CommonJS executor
omitted `exports` and a virtual declaration omitted `declare`; those test-adapter
errors were corrected without changing source policy or relaxing assertions.
Both final machine-readable reports are successful.

| Evidence | SHA-256 |
| --- | --- |
| `.artifacts/frontend-owned-delivery-20261109-r6/auth-tests.json` | `8e9b65dc84d956104fb426780d7ba38b8299ecf1dbd32c0cc827e64526989c6d` |
| `.artifacts/frontend-owned-delivery-20261109-r6/host-tests.json` | `e2575ca4a5821fe19920582081769e50c3280bec44e497a44857b875b4b7ec2d` |
| `ibiz-app-hub/components/ibiz-next-vue3/test/web-app/guard/auth-guard.test.ts` | `f64906da60b7ca5c7f403b74a99332e6eb5c53295e63dde24c5e41dcb16679f1` |
| `modelingweb/app/tests/native-mqtt-overrides.test.ts` | `801b1b3e2f597bdd212a21c68779f2af1ad4a4ecee27a96a4bed02aedc445e58` |

## Remaining Boundaries

The recorded live ModelDesign WebSocket 404 remains historical failed evidence;
it is not retroactively promoted by source tests. New framework, type, assembly,
source-dependency, model-candidate, assets and owned-input receipts must be built
from current source before fresh Chinese/English ordinary-user browser runs.
That refresh is parent-owned.

`CollaborateRoom.created()` is an independent connection entrypoint that does
not use `AppHub.initMqtt`; this change does not alter or claim acceptance for
that path. An MQTT-disabled bootstrap is not proof of real-time collaboration
support or a universal transport-disable policy. The optional extension
manifest 404 policy is also unchanged.
