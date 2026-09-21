import { constants } from 'node:fs';
import { access, lstat, mkdir, readFile, realpath } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { isAbsolute, relative, resolve } from 'node:path';
import catalog from '../src/modeling-plugins/catalog.json';

export function listenOptions(env: NodeJS.ProcessEnv): {
  host: string;
  port: number;
} {
  const port = Number(env.MODELING_PLUGIN_PORT || 4175);
  const host = env.MODELING_PLUGIN_HOST || '127.0.0.1';
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('Invalid MODELING_PLUGIN_PORT');
  }
  if (!['127.0.0.1', 'localhost', '::1', '0.0.0.0', '::'].includes(host)) {
    throw new Error('Invalid MODELING_PLUGIN_HOST');
  }
  return { host, port };
}

export async function checkDataDirectory(directory: string): Promise<void> {
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const info = await lstat(directory);
  if (!info.isDirectory() || info.isSymbolicLink()) {
    throw new Error('Plugin data directory must be a real directory');
  }
  await access(directory, constants.R_OK | constants.W_OK | constants.X_OK);
}

export async function checkPluginArtifact(root: string): Promise<void> {
  const manifest = JSON.parse(
    await readFile(resolve(root, 'plugin-manifest.json'), 'utf8'),
  );
  if (
    manifest.schemaVersion !== 1 ||
    manifest.implementation !== 'local-reimplementation' ||
    JSON.stringify(manifest.plugins) !==
      JSON.stringify(catalog.map(({ id, family }) => ({ id, family }))) ||
    catalog.length !== 23 ||
    !manifest.files ||
    typeof manifest.files !== 'object' ||
    Array.isArray(manifest.files)
  ) {
    throw new Error(
      'Invalid 23-plugin deployment manifest; rebuild with pnpm build:plugins',
    );
  }
  if (
    !manifest.files['server.mjs'] ||
    !manifest.files['modeling-plugins.html']
  ) {
    throw new Error('Plugin deployment manifest is missing an entry point');
  }
  const canonicalRoot = await realpath(root);
  for (const [name, expected] of Object.entries(manifest.files)) {
    if (
      !/^(?:server\.mjs|modeling-plugins\.html|assets\/[a-zA-Z0-9_.-]+)$/.test(
        name,
      ) ||
      name.endsWith('.map') ||
      typeof expected !== 'string' ||
      !/^[a-f0-9]{64}$/.test(expected)
    ) {
      throw new Error('Invalid file in plugin deployment manifest');
    }
    const file = await realpath(resolve(root, name));
    const part = relative(canonicalRoot, file);
    if (isAbsolute(part) || part !== name)
      throw new Error('Unsafe plugin deployment file');
    const digest = createHash('sha256')
      .update(await readFile(file))
      .digest('hex');
    if (digest !== expected)
      throw new Error(`Plugin deployment checksum mismatch: ${name}`);
  }
}
