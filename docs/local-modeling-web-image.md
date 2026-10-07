# Local Modeling Web Image

This repository now has a standalone Docker packaging lane for the main
Modeling Web static application. It uses the official open-source Nginx image,
copies `app/dist` to `/dist`, and keeps the existing `/modeldesign/` route and
API proxy configuration. It does not build or replace the modeling plugin
sidecar and it does not operate Compose or shared containers.

## Modes

`--dist-only` packages the existing `app/dist`. It does not install packages or
run a source build, so it makes no claim about source reproducibility or
third-party dependency provenance.

`--source-build` runs the locked app install and `pnpm build:release` before
packaging. The iBiz packages declared with `link:` are resolved from the local
`ibiz-app-hub` workspace. Open-source third-party packages remain pnpm-managed
dependencies and are not claimed to be equivalent local source.

`--offline` is only valid with `--source-build`. The required pnpm store and
the Corepack-managed pnpm `8.15.9` must already be available locally.

## Commands

From the `modelingweb` repository root:

```sh
node app/tests/modeling-web-docker.harness.mjs
./scripts/build-modeling-web-image.sh --dist-only --tag aibiz/modelingweb:local
node app/tests/modeling-web-docker.harness.mjs --image aibiz/modelingweb:local
```

For a local source build:

```sh
./scripts/build-modeling-web-image.sh \
  --source-build \
  --tag aibiz/modelingweb:source-local
```

For an offline source build:

```sh
./scripts/build-modeling-web-image.sh \
  --source-build \
  --offline \
  --tag aibiz/modelingweb:source-offline
```

The default base is `nginxinc/nginx-unprivileged:alpine`; the image listens on
container port `8080`. Override the base with `--nginx-image IMAGE`. The image
pre-creates and assigns Nginx cache/temp and log directories to UID 101 so
request-body and proxy buffering remain writable without root. The image build
requires these files in `app/dist`:
`index.html`, `environments/environment.js`, `doc/index.html`,
`doc/README.md`, and `doc/script/docsify.js`.

The image harness starts a uniquely named temporary container on a random
loopback port, waits for the Docker healthcheck, verifies UID 101 can write the
Nginx temp/log directories, and checks HTTP 200 for `/modeldesign/`,
`/modeldesign/doc/`, and `/modeldesign/doc/README.md` both with the packaged
`app/dist` and with `LOCAL_DIST_SOURCE` enabled. It removes only those
temporary containers.

Verification snapshot for September 28, 2026:

- `aibiz/modelingweb:local`
- image ID `sha256:c97051540e65c441f4a0084c920d83c5dd62dde0faaedc864b13bac229789549`
- `linux/arm64`, UID `101`, container port `8080`
- Docker healthcheck target `http://127.0.0.1:8080/modeldesign/`
- base tag `nginxinc/nginx-unprivileged:alpine`

The formal development Compose file
`plm/deploy/compose/docker-compose-dev.yml` uses `aibiz/modelingweb:local` by
default, with `pull_policy: never`, the local `Dockerfile.modelingweb`, and the
`32003:8080` mapping. The optional
`plm/deploy/compose/docker-compose-modeling-local.yml` overlay is only for
host-side `app/dist` iteration through `LOCAL_DIST_SOURCE`. The
`docker-compose-modeling-remote.yml` overlay is the explicit rollback path to
the previous `ibiz-cloud-web-runner`; it removes the local build and tmpfs
settings before restoring the old command and volumes.

The local plugin sidecar and the full-stack browser smoke are part of the
verification gate. This proves the local static delivery boundary, not the
provenance of the real iBizModeling Central/ModelDesign core model. That core
audit remains fail-closed until an exact upstream source and extension set are
found.

## Regression Command Matrix

Run the following from `modelingweb/app` with pnpm 8.15.9:

```sh
cd modelingweb/app
corepack pnpm@8.15.9 install --frozen-lockfile
pnpm ibiz:versions:check
pnpm test:run
pnpm verify:release
pnpm build:release
pnpm verify:plugins
pnpm test:plugins:deployment
pnpm test:docker:web
```

The release lane checks the linked local iBiz packages, TypeScript, Vite
output, import-map assets, route configuration, and published model plugins.
The current September 29, 2026 evidence records `551 passed, 0 failed` for
the Vitest suite, release/build verification passed, and 73 model plugins
resolved from the build output:

```text
.artifacts/modelingweb-regression-20260929/test-run.log
.artifacts/modelingweb-regression-20260929/build-release.log
.artifacts/modelingweb-regression-20260929/verify-release.log
.artifacts/modelingweb-regression-20260929/plugins-deployment.log
.artifacts/modeling-runtime-current-20260929/report.json
```

For a running local stack, add the deployment checks:

```sh
cd modelingweb/app
PLAYWRIGHT_MODULE="$WORKSPACE_ROOT/plm-e2e/node_modules/@playwright/test" \
  pnpm smoke:deployment
PLAYWRIGHT_MODULE="$WORKSPACE_ROOT/plm-e2e/node_modules/@playwright/test" \
  pnpm smoke:plugins:deployed
```

`PLAYWRIGHT_MODULE` is only required when the module cannot be resolved from
the current project. `CHROME_PATH` is optional and platform-dependent; omit it
to use Playwright Chromium, or set a valid executable path for the current
host. The historical macOS path
`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` must not be
copied into a Linux or CI command.

`smoke:plugins` starts an isolated plugin service and checks restart/recovery;
`smoke:plugins:deployed` checks the already deployed 32003-sidecar endpoint.
The Docker harness uses temporary uniquely named containers and does not
restart the shared Compose stack. A passing local plugin or static-image check
does not prove that the original Central/ModelDesign source has been recovered.
