# Optional Extension Manifest Contract

`/remotemodel/ext/package.json` is an optional capability probe, not a
required application resource.

The runtime requests the exact manifest only when `enableExtensionPlugin` is
not explicitly `false`. A missing manifest is caught and reported as the
localized `noExtensionPlugin` warning. The runtime must not synthesize an
empty manifest or mark the extension as loaded.

The backend extension controller serves
`/{id}/extension/dynamodels/pssysapps/{app}/ext/**`. When the application has
no extension runtime or the requested file is absent, it returns HTTP 404.
This behavior applies to the exact manifest path only. Missing extension
scripts, styles, or other model files remain delivery failures.

The source contract is covered by the `release contract` test in
`app/tests/release-contract.test.ts`. A live 404 remains a capability
observation until an owned deployment explicitly enables and serves the
extension bundle; it is not evidence that a fabricated `200 {}` response is
correct.
