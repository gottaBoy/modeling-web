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
loopback port, verifies UID 101 can write the Nginx temp/log directories, and
checks HTTP 200 for `/modeldesign/`, `/modeldesign/doc/`, and
`/modeldesign/doc/README.md` both with the packaged `app/dist` and with
`LOCAL_DIST_SOURCE` enabled. It removes only those temporary containers.

Verification snapshot for September 27, 2026:

- `aibiz/modelingweb:local`
- image ID `sha256:7e9d79c5a0f34459bb134e34bb558d736fdc92526905584c04e7dc2aaa970712`
- `linux/arm64`, UID `101`, container port `8080`
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
