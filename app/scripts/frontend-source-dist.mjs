import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { basename, dirname, relative, resolve, sep, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { directoryPath } from '../../../scripts/native-candidate-files.mjs';

const workspaceDefault = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const verifier = fileURLToPath(new URL('./verify-frontend-source-candidate.mjs', import.meta.url));
const shaPattern = /^[a-f0-9]{64}$/;

export function frontendDistPaths({ workspace = workspaceDefault, dist, receipt, receiptSha256 }) {
  workspace = resolve(workspace);
  assert.match(receiptSha256 ?? '', shaPattern);
  assert.equal(typeof dist, 'string');
  assert.equal(typeof receipt, 'string');
  dist = resolve(workspace, dist);
  const root = join(workspace, '.artifacts/frontend-candidates');
  const child = relative(root, dist);
  assert.ok(child && child !== '..' && !child.startsWith(`..${sep}`) && !child.startsWith(sep));
  assert.ok(!/[,\r\n\0:]/.test(dist));
  assert.equal(basename(dist), 'dist');
  assert.equal(dirname(dirname(dist)), root);
  assert.match(basename(dirname(dist)), /^[A-Za-z0-9][A-Za-z0-9._-]*$/);
  receipt = resolve(workspace, receipt);
  assert.equal(receipt, join(dirname(dist), 'report.json'));
  directoryPath(dirname(receipt));
  directoryPath(dist);
  return { workspace, dist, receipt, receiptSha256 };
}

export function validateFrontendDistBinding(binding, options) {
  const normalized = frontendDistPaths(options);
  assert.deepEqual(Object.keys(binding).sort(), ['contract', 'dist', 'output', 'receipt']);
  assert.equal(binding.contract, 'native-frontend-source-dist-binding-v1');
  assert.equal(binding.dist, normalized.dist);
  assert.deepEqual(Object.keys(binding.receipt).sort(), ['bytes', 'path', 'sha256']);
  assert.equal(binding.receipt.path, normalized.receipt);
  assert.equal(binding.receipt.sha256, normalized.receiptSha256);
  assert.ok(Number.isSafeInteger(binding.receipt.bytes) && binding.receipt.bytes > 0);
  assert.deepEqual(Object.keys(binding.output).sort(), ['bytes', 'files', 'sha256']);
  assert.ok(Number.isSafeInteger(binding.output.files) && binding.output.files > 0 && binding.output.files <= 50_000);
  assert.ok(Number.isSafeInteger(binding.output.bytes) && binding.output.bytes > 0 &&
    binding.output.bytes <= 512 * 1024 * 1024);
  assert.match(binding.output.sha256, shaPattern);
  return normalized;
}

export function verifyFrontendSourceCandidateSync(options, { execute = execFileSync } = {}) {
  const normalized = frontendDistPaths(options);
  const env = { ...process.env };
  delete env.NODE_OPTIONS;
  delete env.NODE_PATH;
  const result = execute(process.execPath, [verifier, '--dist', normalized.dist,
    '--receipt', normalized.receipt, '--receipt-sha256', normalized.receiptSha256], {
    encoding: 'utf8', timeout: 180_000, maxBuffer: 4 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'pipe'], env,
  });
  const binding = JSON.parse(result);
  validateFrontendDistBinding(binding, normalized);
  return binding;
}

export function selectFrontendSourceDist({
  workspace = workspaceDefault, frontendDist, frontendReceipt, frontendReceiptSha256,
} = {}, dependencies) {
  const values = [frontendDist, frontendReceipt, frontendReceiptSha256];
  if (values.every(value => value === undefined)) return undefined;
  assert.ok(values.every(value => typeof value === 'string' && value.length > 0),
    'Explicit frontend dist, receipt and receipt SHA-256 are all required');
  return verifyFrontendSourceCandidateSync({
    workspace, dist: frontendDist, receipt: frontendReceipt, receiptSha256: frontendReceiptSha256,
  }, dependencies);
}
