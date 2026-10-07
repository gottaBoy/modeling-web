# Independent Console and OpenAPI Views

These editable implementations are NOT recovered sources for
`@ibiz-template-plugin/console-terminal@0.0.3-alpha.87` or
`@ibiz-template-plugin/layout-design@0.0.3-alpha.90`.
Original-source recovery and native compatibility remain unverified.
No original package identity, gitHead, or production acceptance is claimed.
Acquisition observations are recorded in `SOURCE-EVIDENCE.json`.

Build with the existing local TypeScript 5.3.3 and Rollup 4.9.3:

```sh
node modelingweb/local-plugins/console-layout/build.mjs
node scripts/prepare-native-console-layout-replacements.mjs
node --test scripts/tests/local-console-layout.test.mjs
node --test scripts/tests/local-console-layout.browser.mjs
```

No npm download is needed. The build generates two independent packages:

| Directory | Identity | Scoped model selector |
| --- | --- | --- |
| `dist/console` | `@aibiz/console-terminal@0.1.0` | `VIEW_CUSTOM` / `CONSOLE_VIEW` |
| `dist/swagger` | `@aibiz/swagger-preview@0.1.0` | `VIEW_CUSTOM` / `SWAGGER_PREVIEW_VIEW` |

Each variant has `package.json`, `index.mjs`, `index.system.js`, `style.css`.
`dist/build-receipt.json` records all source/build inputs, eight delivery output
hashes, pinned toolchain entry hashes, and external host imports. Checks are
isolated TypeScript transpilation/syntax checks, not a full host typecheck.
The strict reader verifies hashes, identities, selectors, toolchain and exact
file sets; `verifyConsoleLayoutBuild` also rebuilds in memory without writing.
Neither command edits migration models or a candidate.

## Console Scope

The view uses the real host `IBizView` and `ViewController` lifecycle, and reads
the model-computed `context.srfconsoleid`. It filters both the exact MQTT topic
and `type: CONSOLE` on the authenticated `ibiz.hub.mqtt.evt` message event.
Missing topic, unavailable transport, and rejected subscriptions are visible
errors. Reconnect re-subscribes; disposal removes all owned listeners and guards
late callbacks. Multiple views share listeners by service/topic.

The host MQTT client is never closed or unsubscribed: it is shared and other
consumers' subscription ownership cannot be determined safely. Subscriptions
remain until the host tears down its connection. This is a deliberate limitation,
not a claim of independent transport ownership.

This is a bounded, read-only log viewer with search, pause, follow and clear.
ANSI/control escapes are stripped; text is never interpreted as HTML. Pause and
buffer eviction count discarded entries. It is not a shell, PTY, ANSI terminal
emulator, log-history fetcher, or proof of native console transport acceptance.

## OpenAPI Scope

The Swagger selector only replaces the read-only `SWAGGER_PREVIEW_VIEW` role.
It MUST NOT rewrite the whole original layout-design package or its
`DESIGN_INDEX_VIEW` role, which has a separate implementation.

The current model supplies no verified schema-fetch endpoint. Therefore no
backend URL is invented. Input is explicit: `params.openapi` (JSON/object) OR
`params.schemaurl` (same-origin HTTP(S)), or JSON entered in the view.
Missing, ambiguous, invalid, oversized and failed network inputs show errors.
It inspects Swagger 2.0 and OpenAPI 3.0/3.1 operations, parameters, request bodies,
responses and the raw document, without executing API requests, resolving remote
references, or claiming full Swagger UI compatibility. Redirects and non-JSON
responses are rejected. Fetches are size-bounded and cancelled on replacement or
disposal; stale completions cannot overwrite the current document.

Controlled browser fixtures exercise actual Vue DOM and lifecycle disposal.
They are not the real modeling runtime, service integration or native acceptance.
Candidate integration and real MQTT/schema delivery still require independent
evidence from the main integration thread.
