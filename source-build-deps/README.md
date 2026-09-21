# Isolated Source Build Dependencies

This directory does not install into the working application's node_modules.
Archives and registry metadata are retained locally; registry-lock.json pins
the original archive integrity, version, license and usage.

- Installed candidates: js-md5 0.8.3, interactjs 1.10.26 and its matching
  @interactjs/types 1.10.26. They install from local archives only.
- XLSX reference: xlsx-js-style 1.2.0 is retained under
  `references/xlsx-js-style` for original type declarations. Its 14 files
  match the original archive. It is not npm-installed and its dependencies
  are not installed; the runtime still uses the existing patched bundle.
- AI reference: the type auditor separately uses the existing local
  ai-chat 0.0.94 distribution for the candidate profile. This is not newly
  recovered plugin source and has not replaced the deployed ai-chat 0.0.66.

From this directory:

```sh
npm ci --offline --ignore-scripts --no-audit --no-fund --cache ../../.artifacts/frontend-source-npm-cache
node verify.mjs
```

The verifier checks archive integrity and all package bytes. Installed packages
must also match package-lock identity; reference packages have an explicit
`types-reference` usage. Keep the references directory when reproducing the
offline installation. The source builder and type auditor retain this receipt.
No MD5 compatibility shim or fabricated XLSX declaration is used.

The verifier uses the application's existing tar package. This dependency
lane alone does not make the full framework toolchain reproducible or certify
browser or deployment compatibility.
