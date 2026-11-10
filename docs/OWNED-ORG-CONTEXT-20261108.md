# Owned Browser Organization Context

Date: 2026-11-08. This is source diagnosis, not runtime acceptance.

## Observed Boundary

The existing receipt
`.artifacts/owned-native-modeldesign-browser/multiagent-20261108-r1/report.json`
passes model loading, plugin assets and login in Central and ModelDesign.
Authenticated `/appdata` returns 200, but user-theme configuration returns 500
with an invalid current organization-user context. Notification initialization
also requests an extension route that returns 404. These are separate gates;
no response, token, header or organization selection was fabricated here.

## Normal Source Chain

1. `ibiz-app-hub/components/ibiz-next-vue3/src/web-app/guard/auth-guard/auth-guard.ts`
   calls `loadOrgData()` only for `isSaaSMode === true` and
   `isLocalModel !== true`. That method requests
   `/uaa/getbydcsystem/${ibiz.env.dcSystem}` and stores the first server-returned
   `OrgData` in `ibiz.orgData`. It then loads `/appdata`, initializes the model,
   notification service, and finally custom themes. The legacy local-mode
   behavior skips that branch. The explicit opt-in described below now forces
   the same real organization-list flow without changing the legacy default.
2. `ibiz-app-hub/packages/core/src/utils/interceptor/core-interceptor.ts`
   adds the real token and `srfsystemid = ibiz.env.dcSystem`; only existing
   `ibiz.orgData` overrides that system and adds `srforgid`. It does not copy
   `ibiz.appData.context.srforgid` into a header. The SSE path in
   `packages/core/src/utils/net/net.ts` follows the same organization rule.
   `packages/runtime/src/application.ts` creates the application network as a
   regular `Net`; configuration service does not provide organization headers.
3. Backend `UAARestController.getAppData` accepts system/organization headers.
   Its `/appdata/{srfdcsystem}` variant first obtains legitimate organization
   systems and selects a returned system/org pair. Plain `/appdata` does not
   perform this selection. A 200 status alone does not prove an organization
   was selected: inspect the returned context fields.
4. `SysUAAUtilRuntimeBase.doFilterInternal` and `redoFilterInternal` create a
   normal user's `EmployeeContext` from the token-scoped employee cache only
   when **both** `srfsystemid` and `srforgid` are present. Portal and privileged
   API/super-user branches are different paths and must not be substituted for
   ordinary users. Missing `srforgid` is not automatically resolved by this
   normal-user filter branch.
5. `CloudUAAUtilRuntimeBase.onGetAppData` obtains an employee from the SaaS
   runtime and returns system/org/person context. The RT JWT implementation
   caches the derived employee and sets organization fields only when an
   authenticated membership matches the requested organization.
   `EBSXCloudSaaSUtilRuntime.onGetEmployee` selects `DCEmployee` by actual
   `UAAUSERID` and `ORGID`, resolves the system in that employee's tenant, and
   fills the real employee's relationships. `onGetOrgSystems` filters the
   tenant directory and ordinary-user system-access grants.
6. `CloudSaaSUtilRuntimeBase.getConfig` requires
   `EmployeeContext.getCurrentMust()` before reading the user configuration.
   `EmployeeContext.getCurrentMust()` throws when no context can be resolved.
   Creating missing directory rows can repair legitimate lookups, but cannot
   itself cause a browser that omitted the organization header to send it.

The initial investigation did not change organization behavior based only on
the status-only receipt. Subsequent parent integration seeded the reviewed
directory and proved that the normal Bearer-only organization catalog returns
one real organization and `/appdata/ibizmodeling` returns the correct context.
That evidence motivated the explicit source option below.

## Passive Diagnostic Capture

After the directory seed, use a fresh ordinary-user login and record:

- Environment `dcSystem`, `isSaaSMode`, `isLocalModel`.
- Existing `ibiz.orgData` and selected `/appdata` context fields:
  `srfsystemid`, `srforgid`, `srfdcsystemid`, `srfdcid`, `srfuserid`.
- Those same five request headers on real `/appdata` and subsequent
  `/configs/customtheme/...` requests. Record Authorization presence only,
  never token values, refresh-token URLs, passwords or complete request bodies.
- Actual statuses and application error messages without retrying through a
  different API or injecting headers from Playwright/proxy code.

If a legitimate org header is present but employee lookup fails, inspect the
directory/cache/runtime chain. If the server returns a valid organization but
the frontend never initializes its real org selection, investigate that UI
policy separately. A missing/forbidden directory result remains a fixture or
authorization issue, not permission to invent a browser organization.

## Central Route

`modelingweb/app/src/main.ts` previously hardcoded the default Central model
route to `psdevcenterid=demo`. That is a development-center navigation context,
not `srforgid`, and does not establish an authenticated employee. Its optional
runtime override is independent of this organization-context investigation.
Existing deep links and the ModelDesign root injection remain unchanged.

The independent source fix now reads
`Environment.nativeDevelopmentCenterId`, mapped from
`NATIVE_DEVELOPMENT_CENTER_ID` in `modelingweb/environment.config`.
`app/src/native-development-center.ts` accepts the same bounded ASCII identifier
shape as the existing ModelDesign root resolver. An absent/empty override keeps
`demo`; an invalid explicit value is rejected; an existing hash/deep link is not
replaced. Only native Central uses this field. ModelDesign continues using
`nativeModelingSystemId` and its existing root logic.

The parent must inject the reviewed manifest center ID into Central's owned
environment, then rebuild through the normal source/candidate/assets/preparation
chain. No deployed distribution, Docker container, SQL row, script launcher or
receipt was changed by this frontend task.

Focused checks: 30 new center tests passed. Combined center, ModelDesign root
and release-contract tests: 70 passed, zero failed.

## Explicit Organization Context: 2026-11-09

`IEnvironment.requireOrganizationContext?: boolean` defaults to `false`.
`requireOrganizationContext:REQUIRE_ORGANIZATION_CONTEXT` is mapped by
`modelingweb/environment.config`; the owned deployment explicitly enables it,
while shared/default deployments retain their previous behavior.

With this option set to boolean `true`, Web AuthGuard loads the existing
`/uaa/getbydcsystem/{dcSystem}` catalog even in local-model mode. It clears any
stale organization before that request and assigns only the first legitimate
server-returned organization. A missing/empty catalog, invalid system/org ID,
non-ok result or failed request prevents subsequent application/model/theme
initialization. It does not invent an organization, silently choose a later
tenant, synthesize a successful response, or inject headers outside the normal
CoreInterceptor flow.

Initial loading and authentication-refresh retry use the same policy.
Absent/false retains the old SaaS/local branching and its legacy catalog
handling. Context failures have English and Chinese messages.

Pure Node tests avoid the framework's browser/global application setup:

```sh
pnpm -C ibiz-app-hub exec vitest run --config components/ibiz-next-vue3/vitest.auth-guard.config.ts
pnpm -C modelingweb/app exec vitest run tests/native-development-center.test.ts tests/native-modeling-root.test.ts tests/release-contract.test.ts
```

Results: 53 framework/environment tests and 70 host/root/release tests passed.
The new source has not been built or deployed by this task; native browser
acceptance still requires the parent's fresh source-bound delivery chain.

The equivalent policy was subsequently ported, without whole-package copying,
to the independently maintained `modelingweb/packages-latest` builder sources.
The shared suite now passes 53 tests per source origin, 106 total. Exact source
mapping, preserved fork behavior and file hashes are recorded in
`ORG-CONTEXT-SOURCE-MAPPING-20261109.md`.
