#!/usr/bin/env node
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { lstat, readFile, realpath } from "node:fs/promises";
import { dirname, isAbsolute, join, posix, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  fingerprint,
  treeFingerprint,
} from "../../scripts/localization-baseline.mjs";

export const dependencyRoot = dirname(fileURLToPath(import.meta.url));
const workspace = resolve(dependencyRoot, "../..");
const require = createRequire(join(workspace, "modelingweb/app/package.json"));
const tar = require(
  join(workspace, "modelingweb/app/node_modules/.pnpm/node_modules/tar"),
);
const json = async (path) => JSON.parse(await readFile(path, "utf8"));

export function verifyArchiveIntegrity(bytes, expected) {
  const integrity = `sha512-${createHash("sha512").update(bytes).digest("base64")}`;
  if (integrity !== expected)
    throw new Error("Source dependency archive integrity mismatch");
  return integrity;
}

async function archiveFiles(file) {
  const files = new Map();
  await tar.t({
    file,
    strict: true,
    onentry(entry) {
      const name = posix.relative("package", entry.path);
      if (
        !entry.path.startsWith("package/") ||
        name.startsWith("..") ||
        posix.isAbsolute(name) ||
        !["File", "Directory"].includes(entry.type)
      ) {
        throw new Error("Unsupported source dependency archive entry");
      }
      if (entry.type === "Directory") return;
      if (files.has(name))
        throw new Error("Duplicate source dependency archive entry");
      const hash = createHash("sha256");
      files.set(name, null);
      entry.on("data", (bytes) => hash.update(bytes));
      entry.on("end", () => files.set(name, hash.digest("hex")));
    },
  });
  return files;
}

export async function verifySourceDependencies(root = dependencyRoot) {
  const lock = await json(join(root, "registry-lock.json"));
  const npmLock = await json(join(root, "package-lock.json"));
  const receipt = {
    registryLock: await fingerprint(join(root, "registry-lock.json")),
    npmLock: await fingerprint(join(root, "package-lock.json")),
    verifier: await fingerprint(fileURLToPath(import.meta.url)),
    packages: [],
  };
  for (const [name, expected] of Object.entries(lock.packages)) {
    if (!/^(?:@[a-z0-9-]+\/)?[a-z0-9-]+$/.test(name))
      throw new Error("Invalid dependency name");
    const archive = resolve(root, expected.archive);
    const archivePath = relative(await realpath(root), await realpath(archive));
    if (isAbsolute(archivePath) || archivePath.startsWith(".."))
      throw new Error("Archive escapes dependency root");
    const integrity = verifyArchiveIntegrity(
      await readFile(archive),
      expected.integrity,
    );
    const metadata = await json(join(root, expected.metadata));
    if (
      metadata.name !== name ||
      metadata.version !== expected.version ||
      metadata.dist.integrity !== integrity ||
      metadata.dist.tarball !== expected.tarball ||
      metadata.license !== expected.license
    ) {
      throw new Error(`Registry metadata differs: ${name}`);
    }
    const usage = expected.usage || "installed";
    if (!["installed", "types-reference"].includes(usage))
      throw new Error("Invalid dependency usage");
    const installed = join(
      root,
      usage === "installed" ? "node_modules" : "references",
      name,
    );
    if (!(await lstat(installed)).isDirectory())
      throw new Error("Dependency must be a real directory");
    const manifest = await json(join(installed, "package.json"));
    if (
      manifest.name !== name ||
      manifest.version !== expected.version ||
      manifest.license !== expected.license ||
      (usage === "installed" &&
        npmLock.packages?.[`node_modules/${name}`]?.integrity !== integrity)
    ) {
      throw new Error(`Installed dependency identity differs: ${name}`);
    }
    const original = await archiveFiles(archive);
    const current = await treeFingerprint(installed, { exclude: new Set() });
    if (
      original.size !== current.files.length ||
      current.files.some((file) => original.get(file.path) !== file.sha256)
    ) {
      throw new Error(`Installed files differ from original archive: ${name}`);
    }
    receipt.packages.push({
      name,
      usage,
      version: expected.version,
      integrity,
      archive: await fingerprint(archive),
      metadata: await fingerprint(join(root, expected.metadata)),
      installed: current,
    });
  }
  if (!receipt.packages.length)
    throw new Error("No locked source dependencies");
  return receipt;
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const receipt = await verifySourceDependencies();
  console.log(
    JSON.stringify(
      {
        verified: true,
        packages: receipt.packages.map((item) => ({
          name: item.name,
          version: item.version,
          usage: item.usage,
          files: item.installed.files.length,
          integrity: item.integrity,
        })),
      },
      null,
      2,
    ),
  );
}
