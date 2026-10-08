#!/usr/bin/env node
// Provenance lookup for the source overlay that sits next to the installed
// release assets in `dist/extras/js/@ibiz-template/*`. An overlay file is only
// acceptable when its bytes are identical to the recorded output of an
// isolated source-candidate build whose report still verifies clean against
// the current source tree, toolchain and build inputs. Anything else stays a
// release blocker.
import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { verifySourceRuntime } from './verify-source-runtime.mjs';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const workspace = resolve(appRoot, '../..');
export const sourceRunRoot = join(workspace, '.artifacts/frontend-source');

export function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

export function shortPackageName(name) {
  return String(name ?? '')
    .split('/')
    .at(-1);
}

// Indexes every recorded output file of a source-candidate report by sha256 so
// a published overlay byte string can be traced back to its build.
export function indexRunOutputs(report, runName) {
  const index = new Map();
  for (const entry of report?.packages ?? []) {
    const packageName = shortPackageName(entry.name);
    if (!packageName || entry.status !== 'built') continue;
    for (const file of entry.output?.files ?? []) {
      if (!file?.sha256 || !file?.path) continue;
      const records = index.get(file.sha256) ?? [];
      records.push({
        run: runName,
        runPath: entry.output.path,
        packageName,
        sourceVersion: entry.sourceVersion ?? null,
        path: file.path,
        bytes: file.bytes ?? null,
      });
      index.set(file.sha256, records);
    }
  }
  return index;
}

export async function readSourceRuns(root = sourceRunRoot) {
  let entries = [];
  try {
    entries = await readdir(root, { withFileTypes: true });
  } catch {
    return { runs: [], root };
  }
  const runs = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const path = join(root, entry.name);
    try {
      const report = JSON.parse(await readFile(join(path, 'report.json'), 'utf8'));
      runs.push({
        name: entry.name,
        path,
        report,
        generatedAt: report.generatedAt ?? null,
        index: indexRunOutputs(report, entry.name),
      });
    } catch (error) {
      runs.push({ name: entry.name, path, report: null, error: error.message, index: new Map() });
    }
  }
  return { runs, root };
}

export function findProvenanceCandidates(runs, { sha, packageName }) {
  const matches = [];
  for (const run of runs) {
    for (const record of run.index.get(sha) ?? []) {
      if (packageName && record.packageName !== packageName) continue;
      matches.push(record);
    }
  }
  return matches;
}

export function createSourceOverlayResolver({
  root = sourceRunRoot,
  verifyRun = runPath => verifySourceRuntime(runPath, { quiet: true }),
} = {}) {
  const verifiedRuns = new Map();
  let loaded = null;

  async function runs() {
    if (!loaded) loaded = (await readSourceRuns(root)).runs;
    return loaded;
  }

  async function isRunVerified(runPath) {
    if (!verifiedRuns.has(runPath)) {
      try {
        const result = await verifyRun(runPath);
        verifiedRuns.set(runPath, result?.sourceArtifactsVerified === true);
      } catch {
        verifiedRuns.set(runPath, false);
      }
    }
    return verifiedRuns.get(runPath);
  }

  // Resolves provenance for a list of files that are not part of the installed
  // release tree. `files` entries carry the bytes already read by the caller.
  return {
    async resolvePackageOverlay(packageName, files) {
      const allRuns = await runs();
      const allowed = [];
      const unprovenanced = [];
      for (const file of files) {
        const sha = sha256(file.bytes);
        const candidates = findProvenanceCandidates(allRuns, { sha, packageName });
        let provenance = null;
        for (const candidate of candidates) {
          const candidatePath = join(root, candidate.run);
          if (await isRunVerified(candidatePath)) {
            provenance = { ...candidate, runPath: candidatePath, sha256: sha };
            break;
          }
        }
        if (provenance) allowed.push({ path: file.path, ...provenance });
        else unprovenanced.push({ path: file.path, sha256: sha, candidates: candidates.length });
      }
      return { allowed, unprovenanced };
    },
    async provenanceFor(packageName, bytes) {
      const sha = sha256(bytes);
      for (const candidate of findProvenanceCandidates(await runs(), { sha, packageName })) {
        const candidatePath = join(root, candidate.run);
        if (await isRunVerified(candidatePath)) {
          return { ...candidate, runPath: candidatePath, sha256: sha };
        }
      }
      return null;
    },
    verifiedRuns: () => [...verifiedRuns.entries()].filter(([, ok]) => ok).map(([path]) => path),
  };
}
