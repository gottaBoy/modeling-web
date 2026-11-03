# Local Language And Console

PLM's embedded Modeling IDE runs at a different origin from its host. The
`language=en` or `language=zh-CN` query parameter selects its locale before the
runtime's i18n singleton loads. `public/environments/embedded-language.js`
accepts no other values and does not transfer credentials. Storage denial
does not prevent startup.

For native Central/ModelDesign deployments, `src/locale/model-locale.ts` wraps
newly registered model providers and the default-layout fill operation. It
copies only display metadata and model field labels used for search.
Identifiers, technical names, scripts, API records and user-authored content
are not translated. The provider's receiver, arguments and failures are
preserved; unrelated applications are not localized by this adapter.
Element Plus and Dayjs use the same selected language.

The console plugin localizes its own controls, statuses and known deployment
messages. Received logs and unknown broker diagnostics remain verbatim.
The console reads its topic from `context.srfconsoleid`, never from an invented
fallback.

The local candidate configuration sets `ENABLEMQTT=false`. No authenticated
host client is created, so the console reports `disabled`, with a localized
explanation. This is not a successful broker connection. An enabled runtime
with missing application topic, unavailable service or rejected exact-topic
subscription remains a visible error. Shared clients are never ended or
unsubscribed by the plugin.

## Verification

From `modelingweb/app`:

```sh
node --test tests/model-locale.test.mjs
node node_modules/vue-tsc/bin/vue-tsc.js --noEmit
```

From the workspace:

```sh
node modelingweb/local-plugins/console-layout/build.mjs
node --test scripts/tests/local-console-layout.test.mjs \
  scripts/tests/local-console-layout.browser.mjs
```

The console build receipt records its actual sources and delivery hashes.
Plugin updates require a new native candidate and runtime-asset receipt, not
overwriting the prior candidate's files or acceptance flags. The follow-up
candidate roots use `locale-console-20261103`; native and production acceptance
remain false. Full plugin/business translation and real MQTT delivery remain
separate acceptance work.
