# Organization Context Source Mapping

Date: 2026-11-09. Source/unit verification only; no build or runtime acceptance.

## Distinct Origins

- Hub: `ibiz-app-hub/packages/core` and
  `ibiz-app-hub/components/ibiz-next-vue3`.
- Active fork: `modelingweb/packages-latest/@ibiz-template/core` and
  `modelingweb/packages-latest/@ibiz-template/vue3-components`.
- `modelingweb/app/scripts/build-source-runtime.mjs` reads the active fork,
  not the Hub source. The directories are independent, not symlinks and not
  claimed to be the same source revision.

The bounded port changes only the environment interface/default, the Web
AuthGuard organization policy/validation, and its English/Chinese error key.
There was no whole-package copy or replacement.

Preserved active-fork behavior:

- Organization data still delegates to `getAppFuncBlockProvider().loadOrgData()`.
- App data still delegates to `ibiz.auth.loadAppData(context)`.
- Extension plugins still load before models in the three existing branches.
- Core still retains its fork-specific `isAdaptiveScreenWidth: false` default.
- The normal provider still requests `/uaa/getbydcsystem/{dcSystem}` via Net.

Both sources implement the same explicit boolean
`requireOrganizationContext` policy, default false, with the same invalid-org,
initialization, refresh, initial-catalog-401 and anonymous-fallback behavior.

## File Hashes

All values below are SHA-256 of the full source file bytes after the port.

| File | Hub | Active Fork |
| --- | --- | --- |
| Core `src/interface/api/environment/i-environment.ts` | `892f4dcda5535fd3c478718caf5ed73da4d1ba096b697c6351c2a1f6147952ca` | `afaac23b71d6fa7eda0c9fe645c6b691460c8c07302661f4c7d2a6a6a53577d8` |
| Core `src/environment/environment.ts` | `ad060a2eeccf6399e7e0e24545de200d19697e39ed04b4053f736b56c2ea748a` | `ef52fa93e197a0769d715250d548d15495185af17f45cf82dff7098317c4058e` |
| Components `src/web-app/guard/auth-guard/auth-guard.ts` | `ac7b34b5d29ee93582629ed982d515a794e44a3f0e34124068c0485aa1385782` | `8522d4238c0eda3e89c1a9ee8ea3139cb8f78e616576db982c39d229e57cb09d` |
| Components `src/locale/en/index.ts` | `8a9a56a8e03edef77fbcdddd4170327de1fd441e795896b28066901876a5854b` | `cca862b2ee9797d9cce0f16f9d02e755ea8d98a1b951c67bde5d10aa5a3fdb6f` |
| Components `src/locale/zh-CN/index.ts` | `3d6fd896dc4c9e3d6c23a0e6ebd558919f1e6926da30343c56e045e5947a86d0` | `582e96558e19d2769051f089535045c3bed84667b9b9e24f828638ce9b42d1c2` |

Unmodified active-fork delegation sources:

- Components `src/web-app/util/app-func-block-provider/app-func-block-provider.ts`:
  `228b9e26fccfb0fadb8ce0d25987c5dbd14e9abdd58fd1bed5f72080215b63c0`.
- Runtime `src/service/service/auth/v7-auth.service.ts`:
  `5880e885a2ca385646d26883c815c7381af32fa6373b51691f1975a91ee3a096`.

## Verification

```sh
pnpm -C ibiz-app-hub exec vitest run --config components/ibiz-next-vue3/vitest.auth-guard.config.ts
pnpm -C modelingweb/app exec vitest run tests/native-development-center.test.ts tests/native-modeling-root.test.ts tests/release-contract.test.ts
```

The same suite imports each AuthGuard and Environment directly from `src`.
Framework mocks resolve to source paths, never compiled framework distributions.
Active-fork tests also execute its real source `AppFuncBlockProvider` against the
mock Net boundary and assert that app-data delegation and extension-plugin
ordering remain intact.

Results: Hub 53/53 plus active fork 53/53, total 106/106; host/root/release
70/70. Zero failures or skipped tests.

The parent can now use the existing active-fork source builder for a fresh
source-bound report, then fresh candidate/assets/owned preparation. Host
`main.ts` and the environment mapping also require a new distribution. No
builder, compiled distribution, deployment receipt, Docker resource or SQL row
was changed by this port.
