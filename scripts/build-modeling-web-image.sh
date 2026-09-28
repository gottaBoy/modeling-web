#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"
APP_ROOT="$REPO_ROOT/app"
IMAGE_TAG="${MODELING_WEB_IMAGE:-aibiz/modelingweb:local}"
NGINX_IMAGE="${NGINX_IMAGE:-nginxinc/nginx-unprivileged:alpine}"
MODE="dist-only"
OFFLINE=false

usage() {
  cat <<'EOF'
Usage:
  scripts/build-modeling-web-image.sh [options]

Modes:
  --source-build       Install the locked app dependencies and build app/dist.
  --dist-only          Package the existing app/dist without a source build.

Options:
  --offline            Use pnpm offline mode during --source-build.
  --tag IMAGE          Docker image tag (default: aibiz/modelingweb:local).
  --nginx-image IMAGE  Nginx base image (default: nginxinc/nginx-unprivileged:alpine).
  -h, --help           Show this help.
EOF
}

while (($#)); do
  case "$1" in
    --source-build)
      MODE="source-build"
      shift
      ;;
    --dist-only)
      MODE="dist-only"
      shift
      ;;
    --offline)
      OFFLINE=true
      shift
      ;;
    --tag)
      [[ $# -ge 2 ]] || { echo "--tag requires an image tag" >&2; exit 2; }
      IMAGE_TAG="$2"
      shift 2
      ;;
    --nginx-image)
      [[ $# -ge 2 ]] || {
        echo "--nginx-image requires an image reference" >&2
        exit 2
      }
      NGINX_IMAGE="$2"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

if [[ "$OFFLINE" == true && "$MODE" != "source-build" ]]; then
  echo "--offline only applies to --source-build; --dist-only does not install dependencies" >&2
  exit 2
fi

command -v docker >/dev/null 2>&1 || {
  echo "docker is required to build the local image" >&2
  exit 1
}

if [[ "$MODE" == "source-build" ]]; then
  command -v corepack >/dev/null 2>&1 || {
    echo "corepack is required to select the package manager declared by app/package.json" >&2
    exit 1
  }
  echo "[modeling-web-image] source-build: using local iBiz links and the app lockfile"
  if [[ "$OFFLINE" == true ]]; then
    echo "[modeling-web-image] source-build: third-party packages must already exist in the pnpm store"
  else
    echo "[modeling-web-image] source-build: third-party packages may be resolved by pnpm"
  fi
  (
    cd "$APP_ROOT"
    install_args=(install --frozen-lockfile)
    if [[ "$OFFLINE" == true ]]; then
      install_args+=(--offline)
    fi
    corepack pnpm "${install_args[@]}"
    corepack pnpm build:release
  )
else
  echo "[modeling-web-image] dist-only: packaging existing app/dist"
  echo "[modeling-web-image] dist-only: no source build or dependency install is performed"
fi

node "$APP_ROOT/tests/modeling-web-docker.harness.mjs"

echo "[modeling-web-image] building $IMAGE_TAG from $NGINX_IMAGE"
docker build \
  --file "$REPO_ROOT/Dockerfile.modelingweb" \
  --build-arg "NGINX_IMAGE=$NGINX_IMAGE" \
  --tag "$IMAGE_TAG" \
  "$REPO_ROOT"

echo "[modeling-web-image] image ready: $IMAGE_TAG"
