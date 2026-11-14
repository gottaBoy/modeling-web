import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash, randomBytes } from 'node:crypto';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual, parseArgs } from 'node:util';
import { PinnedDirectories, readPinnedFile } from '../../../scripts/native-candidate-files.mjs';
import { verifyBridgeProcess, verifyOwnedBridgeRuntime } from '../../../scripts/launch-owned-native-modeldesign.mjs';
import { readNativeFiveDatasetContract } from '../../../scripts/native-five-dataset-contract.mjs';
import {
  editorPhysicalInventorySQL, editorPhysicalSnapshotSQL, normalizeEditorPhysicalSnapshot,
  validateEditorPhysicalInventory,
} from '../../../scripts/probe-owned-editor-registry-http.mjs';
import { assertA01ReadOnlySQL } from '../../../scripts/run-owned-a01-root-http.mjs';
import { verifyModelingAppData } from '../../../scripts/run-owned-native-permission-http.mjs';
import { launchChromium } from '../../../scripts/browser-launch.mjs';
import { captureNativeLogin } from './native-model-contract.mjs';
import {
  configureNativeBrowserLanguage, submitNativeLogin, waitForNativeIndexReady,
} from './native-modeldesign.browser.mjs';
import {
  nativeReadCollections, observedDatasetRequest, readOnlyBrowserRequestAllowed,
} from './owned-five-dataset.browser.mjs';

const workspace = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const modelRoot = 'vendor-upstream/ibizmodeling-standard/modelapi-core/src/main/resources/model/net/ibizsys/modeling';
const appId = 'ibizmodeling__modeldesign';
const prefix = `/api/${appId}`;
const shaPattern = /^[a-f0-9]{64}$/;
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const json = value => `${JSON.stringify(value, null, 2)}\n`;
const clean = value => String(value).replace(/(refresh_token\/)[^/"'\s?]+/gi, '$1[redacted]')
  .replace(/(Bearer\s+)[A-Za-z0-9_.-]+/gi, '$1[redacted]');
const sourceRuntime = 'libs/ibiz-modeling-core/src/main/java/net/ibizsys/modeling/core/dataentity/';
const controls = view => [...(view.getPSControls ?? []), ...(view.getPSViewLayoutPanel?.getPSControls ?? [])];
const walk = value => value && typeof value === 'object'
  ? [value, ...Object.values(value).flatMap(walk)] : [];
const inside = (root, value) => {
  assert.equal(typeof value, 'string');
  const path = resolve(workspace, value);
  const child = relative(resolve(root), path);
  assert.ok(child && child !== '..' && !child.startsWith('../') && !child.startsWith('/'));
  assert.ok(!/[\0\r\n\\]/.test(path));
  return path;
};
const folded = row => Object.fromEntries(Object.entries(row).map(([key, value]) => [key.toLowerCase(), value]));
const decode = row => Object.fromEntries(Object.entries(folded(row))
  .map(([key, value]) => [key, value === null ? null : Buffer.from(value, 'hex').toString('utf8')]));
const tableOf = (snapshot, database, name) => {
  const rows = snapshot.tables.filter(row => row.database === database && row.table.toLowerCase() === name);
  assert.equal(rows.length, 1, `Complete physical table required: ${name}`);
  return rows[0];
};
const sameExcept = (before, after, allowed) => {
  const omit = row => Object.fromEntries(Object.entries(folded(row)).filter(([key]) => !allowed.includes(key)));
  assert.deepEqual(omit(after), omit(before), 'Unreviewed physical column mutation');
};

export function moduleEditorTargets(manifest, { actor, rootSide }) {
  const roots = manifest.roots.filter(root => root.side === rootSide);
  const users = manifest.users.filter(user => user.loginname === actor);
  assert.equal(roots.length, 1);
  assert.equal(users.length, 1);
  assert.ok(users[0].role === 'editor' && users[0].rootId === roots[0].rootId,
    'Only the actual manifest editor of the selected owned root may mutate');
  assert.equal(typeof roots[0].sentinelName, 'string');
  assert.ok(roots[0].sentinelName.length > 0 && roots[0].sentinelName.length <= 200);
  for (const value of [roots[0].rootId, roots[0].sentinelId]) assert.match(value, /^[A-Za-z0-9_-]+$/);
  return { actor: users[0], root: roots[0] };
}

// Filesystem loading only. The live guard must validate the backend plus both
// authorized frontend peers, not inspect the backend-only topology again.
export function loadModuleLaunchRuntime({
  workspaceRoot = workspace, runId, deploymentPath, deploymentSha256, input, launchReport, specs, readFile,
}) {
  workspaceRoot = resolve(workspaceRoot);
  assert.match(runId ?? '', /^[a-f0-9]{12}$/);
  assert.match(deploymentSha256 ?? '', shaPattern);
  assert.equal(typeof readFile, 'function');
  const fixture = join(workspaceRoot, '.artifacts/native-nonadmin-fixtures', runId);
  deploymentPath = resolve(workspaceRoot, deploymentPath);
  assert.equal(dirname(dirname(deploymentPath)), fixture);
  assert.match(basename(dirname(deploymentPath)), /^backend-runtime-[a-z0-9][a-z0-9-]{0,48}$/);
  assert.equal(basename(deploymentPath), 'deployment-input.private.json');
  assert.equal(input.ownedBackend.runId, runId);
  assert.equal(input.ownedBackend.deploymentInput.sha256, deploymentSha256);
  assert.equal(resolve(workspaceRoot, launchReport.deploymentInput.path), deploymentPath);
  assert.equal(launchReport.deploymentInput.sha256, deploymentSha256);
  assert.deepEqual(specs.map(row => row.spec.application).sort(), ['Central', 'ModelDesign']);
  assert.deepEqual(specs[0].spec.runtime, specs[1].spec.runtime, 'Both bridges must bind the same owned backend');
  const runtime = specs[0].spec.runtime;
  const manifestPath = join(fixture, 'manifest.json');
  const resourcesPath = join(fixture, 'owned-resources.json');
  const credentialsPath = join(fixture, 'credentials.private.json');
  assert.equal(runtime.manifestPath, manifestPath);
  assert.equal(runtime.resourcesPath, resourcesPath);
  assert.equal(runtime.deploymentPath, deploymentPath);
  assert.ok(Array.isArray(runtime.bindings));
  const bindingFor = (path, privateInput) => {
    const rows = runtime.bindings.filter(row => row.path === path);
    assert.equal(rows.length, 1, 'Required owned launch binding must be present exactly once');
    const [binding] = rows;
    assert.deepEqual(Object.keys(binding).sort(), ['bytes', 'path', 'privateInput', 'sha256']);
    assert.equal(binding.privateInput, privateInput);
    assert.match(binding.sha256, shaPattern);
    assert.ok(Number.isSafeInteger(binding.bytes) && binding.bytes > 0);
    return binding;
  };
  const manifestBinding = bindingFor(manifestPath, false);
  const resourcesBinding = bindingFor(resourcesPath, true);
  const deploymentBinding = bindingFor(deploymentPath, true);
  const credentialsBinding = bindingFor(credentialsPath, true);
  const publicBinding = ({ privateInput, ...binding }) => binding;
  assert.deepEqual(input.ownedBackend.manifest, publicBinding(manifestBinding));
  assert.deepEqual(input.ownedBackend.resources, publicBinding(resourcesBinding));
  assert.deepEqual(launchReport.deploymentInput, publicBinding(deploymentBinding));
  assert.equal(deploymentBinding.sha256, deploymentSha256);
  const load = binding => {
    const file = readFile(binding.path, { privateInput: binding.privateInput });
    assert.ok(Buffer.isBuffer(file.data));
    assert.equal(hash(file.data), binding.sha256, 'Launch-bound owned fixture bytes changed');
    assert.equal(file.data.length, binding.bytes);
    if (binding.privateInput) {
      assert.equal(file.identity.uid, process.geteuid());
      assert.equal(file.identity.mode & 0o077, 0, 'Owned fixture secrets must remain owner-private');
    }
    return JSON.parse(file.data);
  };
  const manifest = load(manifestBinding);
  const resources = load(resourcesBinding);
  const deployment = load(deploymentBinding);
  const credentials = load(credentialsBinding);
  assert.equal(manifest.runId, runId);
  assert.equal(resources.runId, runId);
  assert.equal(deployment.runId, runId);
  assert.equal(resources.contract, 'run-owned-native-fixture-resources-v1');
  assert.match(resources.mysqlId, /^[a-f0-9]{64}$/);
  assert.match(resources.networkId, /^[a-f0-9]{64}$/);
  assert.equal(resources.networkId, input.network);
  assert.equal(resources.networkId, input.ownedBackend.networkId);
  assert.ok(credentials.users && typeof credentials.users === 'object' && !Array.isArray(credentials.users));
  assert.deepEqual(Object.keys(credentials.users).sort(), manifest.users.map(row => row.loginname).sort());
  assert.ok(Object.values(credentials.users).every(value => typeof value === 'string' && value.length > 0));
  const imagePath = resolve(workspaceRoot, deployment.imageReceipt.path);
  assert.equal(runtime.imageReceiptPath, imagePath);
  const imageBinding = bindingFor(imagePath, false);
  assert.equal(imageBinding.sha256, deployment.imageReceipt.sha256);
  assert.deepEqual(input.ownedBackend.imageReceipt, publicBinding(imageBinding));
  return { manifest, resources, deployment, credentials,
    bindings: [manifestBinding, resourcesBinding, deploymentBinding, credentialsBinding].map(publicBinding) };
}

export function readModuleEditorContract({ root = workspace, read = path => JSON.parse(fs.readFileSync(path)) } = {}) {
  const source = path => read(join(root, modelRoot, path));
  const index = source('PSSYSAPPS/ModelDesign/PSAPPINDEXVIEWS/ModelingIndex.json');
  const system = source('PSSYSAPPS/ModelDesign/PSAPPDEVIEWS/PSSystemIndexView.json');
  const dashboard = source('PSSYSAPPS/ModelDesign/PSAPPDEVIEWS/PSSystemDashboardView.json');
  const gridView = source('PSSYSAPPS/ModelDesign/PSAPPDEVIEWS/PSModuleGridView9.json');
  const editor = source('PSSYSAPPS/ModelDesign/PSAPPDEVIEWS/PSModuleQuickCfgView.json');
  const form = source('PSSYSAPPS/ModelDesign/PSAPPDATAENTITIES/PSModule/PSFORMS/QuickCfg.json');
  const entity = source('PSSYSAPPS/ModelDesign/PSAPPDATAENTITIES/PSModule.json');
  const application = source('PSSYSAPPS/ModelDesign/PSSYSAPP.json');
  for (const name of ['PSModule', 'PSSysModelLog']) {
    const metadata = source(`PSMODULES/SysDesign/PSDATAENTITIES/${name}.json`);
    for (const field of ['UPDATEMAN', 'UPDATEDATE', 'CREATEMAN', 'CREATEDATE']) {
      assert.equal(metadata.getAllPSDEFields.find(row => row.name === field)?.predefinedType, field);
    }
  }
  const menu = controls(index).filter(row => row.name === 'appmenu');
  assert.equal(menu.length, 1);
  const item = menu[0].getPSAppMenuItems.filter(row => row.name === 'sysinfo');
  assert.equal(item.length, 1);
  const func = application.getAllPSAppFuncs.filter(row => row.codeName === item[0].getPSAppFunc.id);
  assert.equal(func.length, 1);
  assert.ok(func[0].getPSAppView.path.endsWith('/PSSystemIndexView.json'));
  const info = controls(system).find(row => row.name === 'drbar').getPSDEDRCtrlItems.filter(row => row.name === 'info');
  assert.equal(info.length, 1);
  assert.ok(info[0].getPSAppView.path.endsWith('/PSSystemDashboardView.json'));
  assert.ok(walk(dashboard).some(row => row.getPortletPSAppView?.codeName === 'PSModuleGridView9'));
  const grid = controls(gridView).find(row => row.name === 'grid');
  assert.equal(grid.getFetchPSControlAction.getPSAppDEMethod.id, 'FetchCurSys');
  assert.equal(gridView.gridRowActiveMode, 2);
  const link = grid.getPSDEGridColumns.find(row => row.codeName === 'psmodulename');
  assert.equal(link.enableLinkView, true);
  assert.ok(link.getLinkPSAppView.path.endsWith('/PSModuleQuickCfgView.json'));
  assert.equal(gridView.getPSAppViewRefs.find(row => row.name === 'EDITDATA').realOpenMode, 'DRAWER_RIGHT');
  const field = walk(form).filter(row => row.detailType === 'FORMITEM' && row.codeName === 'psmodulename');
  assert.equal(field.length, 1);
  assert.equal(field[0].getPSEditor.editorType, 'TEXTBOX');
  assert.equal(field[0].getPSEditor.maxLength, 200);
  assert.equal(field[0].enableCond, 3);
  assert.equal(field[0].allowEmpty, false);
  assert.ok(!field[0].readOnly && !field[0].disabled);
  const actions = controls(editor).find(row => row.name === 'toolbar').getPSDEToolbarItems;
  assert.equal(actions.filter(row => row.getPSUIAction?.codeName === 'SaveAndExit').length, 1);
  assert.equal(actions.find(row => row.getPSUIAction?.codeName === 'SaveAndExit')
    .getPSUIAction.predefinedType, 'EDITVIEW_SAVEANDEXITACTION');
  assert.equal(actions.filter(row => row.getPSUIAction?.codeName === 'Exit').length, 1);
  const methods = Object.fromEntries(['Get', 'Update', 'FetchCurSys'].map(name => {
    const method = entity.getAllPSAppDEMethods.find(row => row.codeName === name);
    assert.ok(method);
    return [name, { method: method.requestMethod, actionMode: method.actionMode,
      path: method.requestPath ?? null }];
  }));
  assert.equal(methods.Get.method, 'GET');
  assert.equal(methods.Update.method, 'PUT');
  assert.equal(methods.FetchCurSys.method, 'POST');
  const api = source('PSSYSSERVICEAPIS/ModelAPI.json').getPSDEServiceAPIs
    .find(row => row.codeName2.toLowerCase() === 'psmodules');
  assert.ok(api);
  for (const [name, method, permission] of [['Get', 'GET', 'READ'], ['Update', 'PUT', 'UPDATE'],
    ['FetchCurSys', 'POST', 'READ']]) {
    const published = api.getPSDEServiceAPIMethods.find(row => (row.codeName ?? row.name) === name);
    assert.equal(published?.requestMethod, method);
    assert.equal(published?.dataAccessAction, permission);
    if (name !== 'FetchCurSys') {
      assert.equal(published.needResourceKey, true);
      assert.equal(published.noServiceCodeName, true);
    }
  }
  return { entry: { control: 'appmenu', item: 'sysinfo', view: system.codeName },
    overview: { control: 'drbar', item: 'info', view: dashboard.codeName },
    grid: { view: gridView.codeName, control: 'grid', field: 'psmodulename' },
    editor: { view: editor.codeName, control: 'form', formCodeName: form.codeName,
      field: field[0].codeName, saveAction: 'SaveAndExit' }, methods };
}

export function moduleWritePath(root) {
  assert.match(root.rootId, /^[A-Za-z0-9_-]+$/);
  assert.match(root.sentinelId, /^[A-Za-z0-9_-]+$/);
  return `${prefix}/psdevslnsys/${root.rootId}/psmodules/${root.sentinelId}`;
}

export function validateModuleWritePayload(body, intent) {
  assert.ok(intent && intent.armed === true && intent.phase === 'ui-save');
  assert.ok(body && typeof body === 'object' && !Array.isArray(body));
  assert.ok(intent.beforeForm && typeof intent.beforeForm === 'object');
  assert.equal(body.psmodulename, intent.desiredName);
  assert.ok(intent.desiredName && intent.desiredName.length <= 200);
  assert.equal(intent.beforeForm.psmodulename, intent.originalName);
  for (const [key, value] of Object.entries(body)) {
    if (key === 'psmodulename') continue;
    if (key === 'srfmajortext') assert.ok([intent.originalName, intent.desiredName].includes(value));
    else {
      assert.ok(Object.hasOwn(intent.beforeForm, key), `Unexpected UI payload key: ${key}`);
      assert.ok(isDeepStrictEqual(value, intent.beforeForm[key]), `Unreviewed UI field change: ${key}`);
    }
  }
  assert.equal(intent.beforeForm.psmoduleid ?? intent.beforeForm.srfkey, intent.root.sentinelId);
  assert.equal(intent.beforeForm.pssystemid, intent.root.logicalSystemId);
  return true;
}

export function moduleBrowserRequestAllowed(request, { origin, readPolicy, intent }) {
  const url = new URL(request.url);
  if (url.origin !== origin) return false;
  if (request.method === 'PUT') {
    if (!intent?.armed || url.pathname !== moduleWritePath(intent.root) || url.search || url.hash) return false;
    try { return validateModuleWritePayload(JSON.parse(request.body), intent); } catch { return false; }
  }
  return readOnlyBrowserRequestAllowed({ method: request.method, path: url.pathname }, readPolicy);
}

export function markModuleUIDispatch({ intent, mutation, record }) {
  assert.ok(intent?.armed === true && intent.phase === 'ui-save');
  assert.equal(typeof record, 'function');
  mutation.changed = true;
  mutation.pendingDispatch = true;
  intent.dispatched = true;
  intent.armed = false;
  intent.writeRow.status = 'POSSIBLY-COMMITTED-SNAPSHOT-PENDING';
  try {
    const receipt = record('write-dispatch-intent', {
      contract: 'owned-module-ui-possible-commit-v1', possibleCommit: true,
      physicalStateVerified: false, path: moduleWritePath(intent.root),
      originalName: intent.originalName, desiredName: intent.desiredName,
      writeIntent: intent.journal,
    });
    assert.ok(receipt && typeof receipt.path === 'string' && shaPattern.test(receipt.sha256) &&
      typeof receipt.then !== 'function', 'Dispatch evidence must be synchronously durable');
    intent.writeRow.dispatchIntent = receipt;
  } catch (error) {
    mutation.unsafeDelta = true;
    mutation.failureKind = 'dispatch-journal-failed';
    intent.writeRow.status = 'UNVERIFIED-DISPATCH-RETAIN-EVIDENCE';
    throw error;
  }
}

export function settleModuleWriteSnapshot({ intent, mutation, before, snapshot, verify }) {
  let after;
  try { after = snapshot(); } catch (error) {
    if (intent.dispatched) {
      mutation.changed = true;
      mutation.pendingDispatch = true;
      mutation.unsafeDelta = true;
      mutation.failureKind ??= 'post-dispatch-snapshot-failed';
      intent.writeRow.status = 'UNVERIFIED-DISPATCH-RETAIN-EVIDENCE';
    }
    throw error;
  }
  if (!intent.dispatched) {
    try { assert.deepEqual(after, before, 'Blocked UI save must leave complete snapshots unchanged'); }
    catch (error) {
      mutation.changed = true;
      mutation.unsafeDelta = true;
      mutation.failureKind = 'unexpected-no-dispatch-delta';
      intent.writeRow.status = 'UNEXPECTED-PERSISTENT-DELTA-RETAIN-EVIDENCE';
      throw error;
    }
    return { after };
  }
  try {
    assert.equal(mutation.unsafeDelta, false, 'A prior uncertain dispatch cannot be adopted');
    const physicalDelta = verify(after);
    mutation.pendingDispatch = false;
    mutation.changed = intent.desiredName !== intent.root.sentinelName;
    intent.writeRow.status = 'NATIVE-UI-SAVE-PHYSICALLY-VERIFIED';
    return { after, physicalDelta };
  } catch (error) {
    mutation.changed = true;
    if (!mutation.unsafeDelta) mutation.pendingDispatch = false;
    mutation.unsafeDelta = true;
    mutation.failureKind ??= 'unexpected-persistent-delta';
    intent.writeRow.status = mutation.pendingDispatch
      ? 'UNVERIFIED-DISPATCH-RETAIN-EVIDENCE' : 'UNEXPECTED-PERSISTENT-DELTA-RETAIN-EVIDENCE';
    throw error;
  }
}

export function moduleMutationRecoveryAllowed(mutation) {
  return mutation?.changed === true && mutation.pendingDispatch === false && mutation.unsafeDelta === false;
}

export async function closeModuleBrowserEvidence({
  context, browser, pending = new Set(), errors, drainTimeoutMs = 5_000,
}) {
  assert.ok(Array.isArray(errors) && pending instanceof Set);
  assert.ok(Number.isSafeInteger(drainTimeoutMs) && drainTimeoutMs > 0 && drainTimeoutMs <= 30_000);
  const shutdown = { contextClosed: false, browserClosed: false, evidenceDrained: false };
  for (const [name, resource] of [['context', context], ['browser', browser]]) {
    if (!resource) continue;
    try { await resource.close(); shutdown[`${name}Closed`] = true; }
    catch (error) { errors.push({ type: `${name}-close`, message: clean(error?.message ?? error) }); }
  }
  const turn = () => new Promise(done => setImmediate(done));
  let timer;
  let draining = true;
  try {
    await Promise.race([
      (async () => {
        for (;;) {
          const tasks = [...pending];
          const results = await Promise.allSettled(tasks);
          for (const task of tasks) pending.delete(task);
          if (!draining) return;
          for (const result of results) {
            if (result.status === 'rejected') errors.push({
              type: 'pending-browser-evidence', message: clean(result.reason?.message ?? result.reason),
            });
          }
          await turn();
          if (!draining) return;
          if (pending.size) continue;
          await turn();
          if (!pending.size) return;
        }
      })(),
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error('Browser evidence did not drain before its deadline')), drainTimeoutMs);
      }),
    ]);
    shutdown.evidenceDrained = true;
  } catch (error) { errors.push({ type: 'browser-evidence-drain', message: clean(error.message) }); }
  finally { draining = false; clearTimeout(timer); }
  return shutdown;
}

export function moduleBoundedAcceptance(report, { roundtripComplete, shutdown }) {
  const blockers = [];
  if (roundtripComplete !== true || report.physicalRoundtripVerified !== true) blockers.push('physical-roundtrip-incomplete');
  for (const key of ['contextClosed', 'browserClosed', 'evidenceDrained']) {
    if (shutdown?.[key] !== true) blockers.push(key);
  }
  if (!Array.isArray(report.errors) || report.errors.length) blockers.push('report-errors');
  if (!Array.isArray(report.blockedRequests) || report.blockedRequests.length) blockers.push('blocked-requests');
  if (!Array.isArray(report.sessions) || !report.sessions.length ||
      report.sessions.some(row => !Array.isArray(row.errors) || row.errors.length)) blockers.push('session-errors');
  return { passed: blockers.length === 0, blockers, nativeAcceptance: false, acceptedForProduction: false };
}

export function verifyModulePhysicalUpdate({ before, after, root, actor, originalName, desiredName }) {
  assert.equal(before.encoding, 'every-physical-column-null-or-hex-cast-binary-v1');
  assert.equal(after.encoding, before.encoding);
  assert.deepEqual(after.inventory, before.inventory);
  assert.deepEqual(after.tables.map(row => [row.database, row.table]), before.tables.map(row => [row.database, row.table]));
  const oldModules = tableOf(before, root.database, 't_srfpsmodule');
  const newModules = tableOf(after, root.database, 't_srfpsmodule');
  const matches = row => decode(row).psmoduleid === root.sentinelId;
  assert.equal(oldModules.rows.filter(matches).length, 1);
  assert.equal(newModules.rows.filter(matches).length, 1);
  assert.deepEqual(newModules.rows.filter(row => !matches(row)), oldModules.rows.filter(row => !matches(row)),
    'No sibling/default module changes are allowed');
  const oldModule = oldModules.rows.find(matches);
  const newModule = newModules.rows.find(matches);
  const oldValue = decode(oldModule);
  const newValue = decode(newModule);
  assert.equal(oldValue.psmodulename, originalName);
  assert.equal(newValue.psmodulename, desiredName);
  assert.equal(newValue.pssystemid, root.logicalSystemId);
  assert.equal(newValue.modtag, root.sentinelTag);
  sameExcept(oldModule, newModule, ['psmodulename', 'updatedate', 'updateman']);
  const audit = value => {
    assert.equal(value.updateman, actor.personId, 'Audit identity must be the normal manifest editor');
    assert.match(value.updatedate ?? '', /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?:\.\d+)?$/);
  };
  audit(newValue);
  if (oldValue.updatedate !== null) assert.ok(newValue.updatedate >= oldValue.updatedate);
  const systemBefore = tableOf(before, root.database, 't_srfpssystem');
  const systemAfter = tableOf(after, root.database, 't_srfpssystem');
  assert.equal(systemBefore.rows.length, 1);
  assert.equal(systemAfter.rows.length, 1);
  assert.equal(decode(systemBefore.rows[0]).pssystemid, root.logicalSystemId);
  sameExcept(systemBefore.rows[0], systemAfter.rows[0], ['modelver']);
  const previousVersion = Number(decode(systemBefore.rows[0]).modelver);
  const version = Number(decode(systemAfter.rows[0]).modelver);
  assert.ok(Number.isSafeInteger(previousVersion) && Number.isSafeInteger(version));
  assert.equal(version, previousVersion + 1, 'Exactly one native system model-version increment per Save');
  const oldLogs = tableOf(before, root.database, 't_srfpssysmodellog');
  const newLogs = tableOf(after, root.database, 't_srfpssysmodellog');
  const isModuleLog = row => {
    const value = decode(row);
    return value.pssystemid === root.logicalSystemId && value.pssysmodellogname === 'PSMODULE';
  };
  assert.deepEqual(newLogs.rows.filter(row => !isModuleLog(row)), oldLogs.rows.filter(row => !isModuleLog(row)));
  const oldLog = oldLogs.rows.filter(isModuleLog);
  const newLog = newLogs.rows.filter(isModuleLog);
  assert.ok(oldLog.length <= 1);
  assert.equal(newLog.length, 1);
  if (oldLog.length) sameExcept(oldLog[0], newLog[0], ['updatedate', 'updateman']);
  const logged = decode(newLog[0]);
  assert.ok(logged.pssysmodellogid);
  assert.equal(logged.pssystemname, '(N/A)');
  audit(logged);
  if (!oldLog.length) {
    assert.equal(logged.createman, actor.personId);
    assert.equal(logged.createdate, logged.updatedate);
    const known = ['pssysmodellogid', 'pssysmodellogname', 'pssystemid', 'pssystemname',
      'createdate', 'createman', 'updatedate', 'updateman'];
    for (const [key, value] of Object.entries(logged)) {
      if (!known.includes(key)) assert.equal(value, null, 'New native audit row must not introduce arbitrary values');
    }
  }
  for (const table of before.tables) {
    if (table.database === root.database &&
      ['t_srfpsmodule', 't_srfpssystem', 't_srfpssysmodellog'].includes(table.table.toLowerCase())) continue;
    assert.deepEqual(tableOf(after, table.database, table.table.toLowerCase()), table,
      'Foreign root and every unrelated physical table must remain byte-identical');
  }
  return { modelVersion: { before: previousVersion, after: version, delta: 1 },
    moduleLogId: logged.pssysmodellogid, restoredBusinessName: desiredName === root.sentinelName,
    auditAndVersionIntentionallyRetained: true };
}

// Reads only public view/control state. All navigation and saves use real DOM input.
export function publicModuleUI({ viewName, mode }) {
  const visible = element => Boolean(element?.getClientRects().length &&
    getComputedStyle(element).visibility !== 'hidden' && getComputedStyle(element).display !== 'none');
  const lifecycle = state => Object.fromEntries(
    ['isCreated', 'isMounted', 'isLoading', 'isDestroyed', 'hasError']
      .map(key => [key, typeof state?.[key] === 'boolean' ? state[key] : null]));
  const disabled = element => element.matches(':disabled,[aria-disabled="true"],.is-disabled');
  const selectorFor = (element, root) => {
    const parts = [];
    for (let node = element; node && node !== root; node = node.parentElement) {
      parts.unshift(`${node.tagName.toLowerCase()}:nth-child(${
        [...node.parentElement.children].indexOf(node) + 1})`);
    }
    return `#${CSS.escape(root.id)} > ${parts.join(' > ')}`;
  };
  const domEvidence = element => {
    const clone = element.cloneNode(true);
    for (const node of [clone, ...clone.querySelectorAll('*')]) {
      for (const attribute of [...node.attributes]) {
        if (!['class', 'role', 'title', 'index', 'aria-disabled', 'disabled'].includes(attribute.name)) {
          node.removeAttribute(attribute.name);
        }
      }
    }
    return { tag: element.tagName, role: element.getAttribute('role'), index: element.getAttribute('index'),
      title: element.getAttribute('title'), text: element.textContent.trim().slice(0, 160),
      visible: visible(element), disabled: disabled(element), outerHTML: clone.outerHTML.slice(0, 1200) };
  };
  const found = [...document.querySelectorAll('.ibiz-view')].filter(visible).map(element => ({
    element, view: window.ibiz?.util?.viewStack?.getView?.(element.id),
  })).filter(row => row.view?.model?.codeName?.toLowerCase() === viewName.toLowerCase());
  if (found.length !== 1) return { ready: false, viewName, mode, count: found.length,
    views: found.slice(0, 8).map(row => ({ id: row.element.id, controllerId: row.view.id,
      codeName: row.view.model.codeName, lifecycle: lifecycle(row.view.state) })) };
  const { element, view } = found[0];
  const state = view.state;
  const selector = `#${CSS.escape(element.id)}`;
  const result = { ready: view.id === element.id && state?.isCreated === true && state?.isMounted === true &&
    state?.isLoading === false && state?.isDestroyed === false && state?.hasError === false,
  selector, viewName: view.model.codeName, mode, controllerId: view.id, domId: element.id, lifecycle: lifecycle(state),
  appId: view.model.appId ?? view.context?.srfappid,
  rootId: view.context?.psdevslnsys,
  capabilities: {
    deployedPlmTodoCounter: typeof window.Environment?.enableNativePlmTodoCounter === 'boolean'
      ? window.Environment.enableNativePlmTodoCounter : null,
    runtimePlmTodoCounter: typeof window.ibiz?.env?.enableNativePlmTodoCounter === 'boolean'
      ? window.ibiz.env.enableNativePlmTodoCounter : null,
    todoCounterStatus: state?.myTodoCountStatus ?? null,
    todoCounterUndefined: state?.myTodoCount === undefined,
  } };
  const describeControl = (control, name) => {
    const declarations = [...(view.model.controls ?? []), ...(view.model.viewLayoutPanel?.controls ?? [])]
      .filter(row => row.name === name);
    return { present: Boolean(control), declarationCount: declarations.length, ownerMatches: control?.view === view,
      modelMatches: declarations.length === 1 && control?.model?.name === name &&
        declarations[0].id === control.model.id && declarations[0].codeName === control.model.codeName,
      modelId: control?.model?.id ?? null, modelName: control?.model?.name ?? null,
      modelCodeName: control?.model?.codeName ?? null, entityId: control?.model?.appDataEntityId ?? null,
      lifecycle: lifecycle(control?.state), isLoaded: control?.state?.isLoaded ?? null,
      isCalculatedPermission: control?.state?.isCalculatedPermission ?? null };
  };
  const ownWrappers = className => [...element.querySelectorAll(`.${className}`)]
    .filter(node => node.closest('.ibiz-view') === element);
  if (mode === 'menu') {
    const menu = view.getController?.('appmenu');
    const declarations = [...(view.model.controls ?? []), ...(view.model.viewLayoutPanel?.controls ?? [])]
      .filter(row => row.name === 'appmenu');
    const models = menu?.model?.appMenuItems ?? [];
    const items = models.filter(row => row.id === 'sysinfo');
    const item = items.length === 1 ? items[0] : null;
    const itemState = menu?.state?.menuItemsState?.sysinfo;
    const func = item?.appFuncId && window.ibiz?.hub?.getApp?.(result.appId)?.getAppFunc?.(item.appFuncId);
    const ownerMatches = menu?.view === view;
    const modelMatches = declarations.length === 1 && menu?.model?.name === 'appmenu' &&
      declarations[0].id === menu.model.id && declarations[0].codeName === menu.model.codeName;
    const wrapperClass = typeof menu?.model?.codeName === 'string'
      ? `ibiz-control-appmenu-${menu.model.codeName.toLowerCase()}` : null;
    const wrappers = wrapperClass ? [...element.querySelectorAll(
      `.ibiz-control-appmenu.${CSS.escape(wrapperClass)}`)]
      .filter(node => node.closest('.ibiz-view') === element) : [];
    const visibleWrappers = wrappers.filter(visible);
    const candidates = visibleWrappers.length === 1 ? [...visibleWrappers[0].querySelectorAll(
      '.ibiz-control-appmenu__item')].filter(node =>
      node.matches('button,[role="menuitem"]') &&
      node.closest('.ibiz-control-appmenu') === visibleWrappers[0]) : [];
    const indexed = candidates.filter(node => node.getAttribute('index') === item?.id);
    const caption = String(item?.caption ?? '').trim();
    const uniqueCaption = Boolean(caption && models.filter(row => String(row.caption ?? '').trim() === caption).length === 1);
    const byCaption = uniqueCaption ? candidates.filter(node =>
      !node.hasAttribute('index') && node.textContent.trim() === caption) : [];
    const matched = indexed.length ? indexed : byCaption;
    const visibleMatched = matched.filter(visible);
    const validTarget = func?.appFuncType === 'APPVIEW' &&
      func.appViewId?.toLowerCase() === 'modeldesign.pssystemindexview';
    const ready = result.ready && ownerMatches && modelMatches && items.length === 1 &&
      item.itemType === 'MENUITEM' && item.appFuncId?.toLowerCase() === 'sysinfo' &&
      !item.hidden && !item.disabled && itemState?.visible === true && itemState?.permitted === true &&
      itemState?.disabled !== true && validTarget && visibleMatched.length === 1 && !disabled(visibleMatched[0]);
    return { ...result, ready, target: visibleMatched.length === 1 ? selectorFor(visibleMatched[0], element) : null,
      itemId: item?.id, targetView: func?.appViewId,
      menu: { present: Boolean(menu), declarationCount: declarations.length, ownerMatches, modelMatches,
        modelId: menu?.model?.id ?? null, modelName: menu?.model?.name ?? null,
        modelCodeName: menu?.model?.codeName ?? null, lifecycle: lifecycle(menu?.state),
        itemCount: items.length, caption, appFuncId: item?.appFuncId ?? null,
        itemType: item?.itemType ?? null, hidden: item?.hidden ?? null, disabled: item?.disabled ?? null,
        itemState: { visible: itemState?.visible ?? null, permitted: itemState?.permitted ?? null,
          disabled: itemState?.disabled ?? null }, validTarget, wrapperClass,
        wrapperCount: wrappers.length, visibleWrapperCount: visibleWrappers.length,
        candidateCount: candidates.length, visibleCandidateCount: candidates.filter(visible).length,
        indexedCount: indexed.length, uniqueModelCaption: uniqueCaption, captionMatchCount: byCaption.length,
        matchedBy: indexed.length ? 'index' : 'control-scoped-exact-model-caption',
        matchedCount: matched.length, visibleMatchedCount: visibleMatched.length,
        candidates: candidates.slice(0, 8).map(domEvidence) } };
  }
  if (mode === 'overview') {
    const drbar = view.getController?.('drbar');
    const control = describeControl(drbar, 'drbar');
    const flatten = rows => rows.flatMap(row => row.children?.length ? flatten(row.children) : [row]);
    const items = flatten(drbar?.state?.drBarItems ?? []);
    const states = items.filter(row => row.tag === 'info');
    const item = states.length === 1 ? states[0] : null;
    const models = drbar?.model?.dedrctrlItems ?? [];
    const declarations = models.filter(row => row.id === 'info');
    const model = declarations.length === 1 ? declarations[0] : null;
    const wrappers = ownWrappers('ibiz-control-drbar');
    const visibleWrappers = wrappers.filter(visible);
    const candidates = visibleWrappers.length === 1 ? [...visibleWrappers[0].querySelectorAll(
      '.ibiz-control-drbar__item')].filter(node =>
      node.matches('button,[role="menuitem"]') &&
      node.closest('.ibiz-control-drbar') === visibleWrappers[0]) : [];
    const indexed = candidates.filter(node => node.getAttribute('index') === 'info');
    const caption = String(item?.caption ?? '').trim();
    const captionMatchesModel = Boolean(caption && caption === String(model?.caption ?? '').trim());
    const uniqueCaption = captionMatchesModel &&
      models.filter(row => String(row.caption ?? '').trim() === caption).length === 1 &&
      items.filter(row => String(row.caption ?? '').trim() === caption).length === 1;
    const byCaption = uniqueCaption ? candidates.filter(node =>
      !node.hasAttribute('index') && node.textContent.trim() === caption) : [];
    const matched = indexed.length ? indexed : byCaption;
    const visibleMatched = matched.filter(visible);
    const validTarget = model?.appViewId?.toLowerCase() === 'modeldesign.pssystemdashboardview';
    const ready = result.ready && control.ownerMatches && control.modelMatches &&
      drbar?.state?.isCalculatedPermission === true && states.length === 1 && declarations.length === 1 &&
      item.visible === true && item.disabled !== true && validTarget &&
      visibleMatched.length === 1 && !disabled(visibleMatched[0]);
    return { ...result, ready, target: visibleMatched.length === 1 ? selectorFor(visibleMatched[0], element) : null,
      overview: { ...control, stateItemCount: states.length, modelItemCount: declarations.length,
        itemTag: item?.tag ?? null, caption, captionMatchesModel, validTarget, targetView: model?.appViewId ?? null,
        selectedItem: drbar?.state?.selectedItem ?? null, defaultItem: drbar?.state?.defaultItem ?? null,
        routeItem: drbar?.state?.srfnav ?? null, hideEditItem: drbar?.state?.hideEditItem ?? null,
        itemState: { visible: item?.visible ?? null, disabled: item?.disabled ?? null },
        wrapperCount: wrappers.length, visibleWrapperCount: visibleWrappers.length,
        candidateCount: candidates.length, visibleCandidateCount: candidates.filter(visible).length,
        indexedCount: indexed.length, uniqueModelCaption: uniqueCaption, captionMatchCount: byCaption.length,
        matchedBy: indexed.length ? 'index' : 'control-scoped-exact-model-caption',
        matchedCount: matched.length, visibleMatchedCount: visibleMatched.length,
        candidates: candidates.slice(0, 12).map(domEvidence) } };
  }
  if (mode === 'grid') {
    const grid = view.getController?.('grid');
    const control = describeControl(grid, 'grid');
    const wrappers = ownWrappers('ibiz-control-grid');
    const visibleWrappers = wrappers.filter(visible);
    const rows = visibleWrappers.flatMap(wrapper =>
      [...wrapper.querySelectorAll('.el-table__body-wrapper tr.el-table__row')]);
    return { ...result, ready: result.ready && control.ownerMatches && control.modelMatches &&
      grid?.state?.isLoaded === true && grid?.state?.isLoading === false && visibleWrappers.length === 1,
    grid: { ...control, itemCount: grid?.state?.items?.length ?? null,
      columns: (grid?.model?.degridColumns ?? []).slice(0, 30).map(column =>
        ({ id: column.id, codeName: column.codeName, dataItemName: column.dataItemName,
          enableLinkView: column.enableLinkView ?? null, linkView: column.linkAppViewId ?? null })),
      wrapperCount: wrappers.length, visibleWrapperCount: visibleWrappers.length,
      tableCount: visibleWrappers.reduce((count, wrapper) => count + wrapper.querySelectorAll('.el-table').length, 0),
      rowCount: rows.length, visibleRowCount: rows.filter(visible).length,
      alternativeRowCount: visibleWrappers.reduce((count, wrapper) =>
        count + wrapper.querySelectorAll('.el-table-v2__row,.vxe-body--row').length, 0),
      rows: rows.slice(0, 4).map(domEvidence) },
      items: (grid?.state?.items ?? []).map(item => ({ ...(item.getOrigin?.() ?? item) })) };
  }
  const form = view.getController?.('form');
  const toolbar = view.getController?.('toolbar');
  const formControl = describeControl(form, 'form');
  const toolbarControl = describeControl(toolbar, 'toolbar');
  const formWrappers = ownWrappers('ibiz-control-form');
  const toolbarWrappers = ownWrappers('ibiz-control-toolbar');
  const saves = toolbar?.model?.detoolbarItems?.filter(row =>
    row.uiactionId?.toLowerCase() === 'editview_saveandexitaction') ?? [];
  const save = saves.length === 1 ? saves[0] : null;
  const saveState = save && toolbar?.state?.buttonsState?.[save.id];
  const id = `${view.model.codeName}_${form?.model?.codeName}_psmodulename`;
  const fields = [...element.querySelectorAll(`#${CSS.escape(id)}`)];
  const inputs = fields.flatMap(field => [...field.querySelectorAll('input')]);
  const input = inputs.length === 1 ? inputs[0] : null;
  const titles = save ? [save.tooltip, save.caption].filter(Boolean) : [];
  const allButtons = toolbarWrappers.flatMap(wrapper => [...wrapper.querySelectorAll('button')]);
  const buttons = allButtons.filter(button => visible(button) && titles.includes(button.title));
  return { ...result, ready: result.ready && form?.state?.isLoaded === true && form?.state?.isLoading === false &&
      formControl.ownerMatches && formControl.modelMatches && toolbarControl.ownerMatches &&
      input !== null && saves.length === 1,
    form: { ...(form?.state?.data?.getOrigin?.() ?? form?.state?.data ?? {}) },
    formControl: { ...formControl, wrapperCount: formWrappers.length,
      visibleWrapperCount: formWrappers.filter(visible).length },
    toolbarControl: { ...toolbarControl, wrapperCount: toolbarWrappers.length,
      visibleWrapperCount: toolbarWrappers.filter(visible).length,
      actions: (toolbar?.model?.detoolbarItems ?? []).slice(0, 20).map(action =>
        ({ id: action.id, actionId: action.uiactionId ?? null, caption: action.caption ?? null,
          visible: toolbar?.state?.buttonsState?.[action.id]?.visible ?? null,
          disabled: toolbar?.state?.buttonsState?.[action.id]?.disabled ?? null,
          loading: toolbar?.state?.buttonsState?.[action.id]?.loading ?? null })),
      buttonCount: allButtons.length, visibleButtonCount: allButtons.filter(visible).length,
      buttons: allButtons.slice(0, 8).map(domEvidence) },
    inputDiagnostics: { derivedId: id, fieldCount: fields.length, inputCount: inputs.length,
      visibleInputCount: inputs.filter(visible).length, disabled: input?.disabled ?? null,
      readOnly: input?.readOnly ?? null, visible: input ? visible(input) : false,
      elements: inputs.slice(0, 3).map(domEvidence) },
    input: `${selector} #${CSS.escape(id)} input`, value: input?.value,
    editable: Boolean(input && !input.disabled && !input.readOnly),
    save: { modelId: save?.id, actionId: save?.uiactionId, visible: saveState?.visible === true,
      disabled: saveState?.disabled !== false, count: buttons.length, title: buttons[0]?.title } };
}

async function waitUI(page, viewName, mode) {
  let evidence;
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      evidence = await page.evaluate(publicModuleUI, { viewName, mode });
      if (evidence.ready) return evidence;
    } catch (error) {
      if (!/Execution context was destroyed|Cannot find context/.test(error.message)) throw error;
    }
    await page.waitForTimeout(100);
  }
  const error = new Error(`Native module UI not ready: ${viewName}/${mode}`);
  error.evidence = evidence;
  throw error;
}

async function trustedClick(locator) {
  assert.equal(await locator.count(), 1);
  const observer = await locator.evaluateHandle(element => {
    const evidence = { event: null };
    const listener = event => { evidence.event = { isTrusted: event.isTrusted, button: event.button }; };
    element.addEventListener('click', listener, { capture: true, once: true });
    evidence.remove = () => element.removeEventListener('click', listener, { capture: true });
    return evidence;
  });
  try {
    await locator.click();
    const event = await observer.evaluate(value => value.event);
    assert.deepEqual(event, { isTrusted: true, button: 0 });
    return event;
  } finally {
    await observer.evaluate(value => value.remove()).catch(() => {});
    await observer.dispose();
  }
}

export async function runOwnedModuleEditor(options = {}) {
  assert.equal(options.allowOwnedUIMutations, true, 'Explicit --allow-owned-ui-mutations is required');
  assert.match(options.runId ?? '', /^[a-f0-9]{12}$/);
  for (const name of ['launchSha256', 'stateSha256', 'deploymentSha256']) assert.match(options[name] ?? '', shaPattern);
  assert.ok(['zh-CN', 'en-US'].includes(options.locale));
  assert.ok(['desktop', 'mobile'].includes(options.viewport));
  const output = inside(join(workspace, '.artifacts/owned-module-editor-browser'), options.output);
  assert.equal(dirname(output), join(workspace, '.artifacts/owned-module-editor-browser'));
  assert.match(basename(output), /^[a-z0-9][a-z0-9-]{0,95}$/);
  assert.ok(!fs.existsSync(output), 'Private evidence must never be overwritten or adopted');
  const directories = new PinnedDirectories();
  const bound = [];
  let target;
  let runtime;
  let browser;
  let activeContext;
  let activePage;
  let activeEvidence;
  let session;
  let snapshot;
  let guard;
  let lastSnapshot;
  let intent = null;
  const mutation = { changed: false, unsafeDelta: false, pendingDispatch: false, failureKind: null };
  const pendingEvidence = new Set();
  let roundtripComplete = false;
  let recover;
  let sequence = 0;
  const report = {
    contract: 'owned-module-native-ui-save-restore-v1', runId: options.runId, status: 'FAILED',
    locale: options.locale, viewport: options.viewport, startedAt: new Date().toISOString(),
    nativeAcceptance: false, permissionAcceptance: false, acceptedForProduction: false,
    boundedEditorSaveAcceptance: false, freshSessionReadbackAcceptance: false,
    freshSessionReadbackObserved: false, browserEditorInteractionVerified: false,
    modelWritesRequested: true, uiMutationOptIn: true,
    restoredBusinessName: false, physicalRoundtripVerified: false,
    physicalSnapshotAcceptance: false, sqlWritesRequested: false,
    identityOrHeaderInjection: false, snapshots: [], sessions: [], writes: [], blockedRequests: [],
    mutationState: mutation,
    errors: [], cleanup: { status: 'NOT-NEEDED', automaticArbitraryRepairAllowed: false },
    pending: ['viewer/no-access/foreign-root write permission checks', 'remaining native model editors',
      'M01 developer-administrator Create flow', 'full application acceptance'],
  };
  const readFile = (value, expected, privateInput = false) => {
    const path = inside(workspace, value);
    const file = readPinnedFile(directories, directories.open(dirname(path)), basename(path));
    if (privateInput) {
      assert.equal(file.identity.uid, process.geteuid());
      assert.equal(file.identity.mode & 0o077, 0);
    }
    const binding = { path, sha256: hash(file.data), bytes: file.data.length };
    if (typeof expected === 'string') assert.equal(binding.sha256, expected);
    else if (expected) assert.deepEqual(binding, expected);
    bound.push({ ...binding, privateInput });
    return { ...file, ...binding };
  };
  const read = (...args) => readFile(...args).data;
  const readJSON = (...args) => JSON.parse(read(...args));
  const record = (name, value) => {
    const bytes = json(value);
    const filename = `${String(++sequence).padStart(4, '0')}-${name}.private.json`;
    const identity = directories.write(target, filename, bytes);
    const fd = fs.openSync(directories.entry(target, filename), fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW);
    try {
      assert.equal(fs.fstatSync(fd).ino, identity.ino);
      fs.fsyncSync(fd);
    } finally { fs.closeSync(fd); }
    fs.fsyncSync(target.descriptor);
    return { path: join(output, filename), bytes: Buffer.byteLength(bytes), sha256: hash(bytes) };
  };
  const captureFailureScreenshot = async purpose => {
    if (!target || !activePage || activePage.isClosed()) return;
    const name = `failure-session-${activeEvidence?.number ?? 0}-${purpose}-${options.locale}-${options.viewport}.png`;
    try {
      await activePage.screenshot({ path: join(output, name), fullPage: true });
      const evidence = { purpose, file: name, stage: activeEvidence?.currentStage ?? null };
      (report.failureScreenshots ??= []).push(evidence);
      if (activeEvidence) (activeEvidence.failureScreenshots ??= []).push(evidence);
    } catch (error) {
      report.errors.push({ type: 'failure-screenshot', message: clean(error.message) });
    }
  };
  try {
    target = directories.open(output, { create: true, exclusive: true });
    const launch = inside(join(workspace, '.artifacts/owned-native-modeldesign-launch'), options.launch);
    assert.equal(dirname(launch), join(workspace, '.artifacts/owned-native-modeldesign-launch'));
    const launchReport = readJSON(join(launch, 'report.json'), options.launchSha256);
    assert.equal(launchReport.contract, 'owned-native-modeldesign-launch-v1');
    assert.equal(launchReport.status, 'RUNNING-OWNED-FRONTEND-NOT-ACCEPTED');
    assert.deepEqual(launchReport.errors, []);
    const state = readJSON(join(launch, 'launch-state.private.json'), options.stateSha256, true);
    assert.equal(state.contract, 'owned-native-modeldesign-launch-state-v1');
    const input = readJSON(launchReport.input.path, launchReport.input);
    assert.equal(input.contract, 'native-model-design-owned-backend-launch-input-v1');
    assert.ok(input.frontend);
    assert.deepEqual(state.input, launchReport.input);
    assert.equal(input.ownedBackend.runId, options.runId);
    assert.equal(input.ownedBackend.deploymentInput.sha256, options.deploymentSha256);
    assert.equal(launchReport.deploymentInput.sha256, options.deploymentSha256);
    assert.equal(resolve(workspace, launchReport.deploymentInput.path), resolve(workspace, options.deployment));
    const specs = state.bridges.map(bridge => {
      assert.equal(bridge.specPath, join(launch, `${bridge.application.toLowerCase()}.bridge.private.json`));
      const spec = readJSON(bridge.specPath, bridge.specSha256, true);
      assert.equal(spec.contract, 'owned-modeldesign-loopback-bridge-v1');
      assert.equal(spec.application, bridge.application);
      assert.deepEqual(spec.input, launchReport.input);
      assert.equal(spec.launcherSha256, state.toolSha256);
      assert.equal(resolve(workspace, spec.runtime.deploymentPath), resolve(workspace, options.deployment));
      return { bridge, spec };
    });
    runtime = loadModuleLaunchRuntime({ runId: options.runId, deploymentPath: options.deployment,
      deploymentSha256: options.deploymentSha256, input, launchReport, specs,
      readFile: (path, { privateInput }) => readFile(path, undefined, privateInput) });
    const { actor, root } = moduleEditorTargets(runtime.manifest, options);
    report.actor = { loginname: actor.loginname, role: actor.role, rootId: actor.rootId, personId: actor.personId };
    report.root = { side: root.side, rootId: root.rootId, sentinelId: root.sentinelId, database: root.database };
    const contract = readModuleEditorContract({ read: path => readJSON(path) });
    report.sourceContract = contract;
    const schema = readNativeFiveDatasetContract({ workspace });
    const schemaSha256 = hash(json(schema));
    report.schemaContract = { sha256: schemaSha256, inputs: schema.inputs };
    const image = readJSON(resolve(workspace, runtime.deployment.imageReceipt.path), runtime.deployment.imageReceipt.sha256);
    const build = readJSON(image.packageReceipt.path, image.packageReceipt.sha256);
    assert.equal(build.status, 'passed-package-and-unit-only');
    for (const name of ['DataEntityRuntimeBase.java', 'PSModuleDERuntime.java']) {
      const source = `${sourceRuntime}${name}`;
      const bytes = read(join(workspace, 'ibiz-service-hub', source));
      assert.equal(hash(bytes), build.sourceInputs.before.entries.find(row => row.path === source)?.sha256,
        'Physical side-effect policy must be bound to the actual backend package source');
      assert.equal(hash(read(join(build.worktree, source))), hash(bytes));
    }
    assert.equal(state.toolSha256, hash(read(join(workspace, 'scripts/launch-owned-native-modeldesign.mjs'))));
    for (const path of [
      fileURLToPath(import.meta.url),
      join(workspace, 'scripts/probe-owned-editor-registry-http.mjs'),
      join(workspace, 'scripts/native-five-dataset-contract.mjs'),
      join(workspace, 'scripts/run-owned-a01-root-http.mjs'),
      join(workspace, 'modelingweb/app/tests/native-modeldesign.browser.mjs'),
      join(workspace, 'modelingweb/app/tests/owned-five-dataset.browser.mjs'),
    ]) read(path);
    guard = (full = false) => {
      for (const binding of bound) {
        const file = readPinnedFile(directories, directories.open(dirname(binding.path)), basename(binding.path));
        assert.equal(hash(file.data), binding.sha256, 'Owned browser/source binding drift');
        if (binding.privateInput) {
          assert.equal(file.identity.uid, process.geteuid());
          assert.equal(file.identity.mode & 0o077, 0);
        }
      }
      for (const { bridge, spec } of specs) {
        verifyBridgeProcess(bridge.identity, bridge.specPath, bridge.specSha256);
        verifyOwnedBridgeRuntime({ workspace, directories, input, runtime: spec.runtime,
          frontendPins: spec.frontendPins, fullMountedHash: full });
      }
    };
    guard(true);
    const sql = statement => {
      assertA01ReadOnlySQL(statement);
      guard();
      const result = spawnSync('docker', ['exec', '-i', runtime.resources.mysqlId, 'sh', '-c',
        'test -n "$MYSQL_ROOT_PASSWORD" && MYSQL_PWD="$MYSQL_ROOT_PASSWORD" exec mysql -h127.0.0.1 --protocol=TCP -uroot --default-character-set=utf8mb4 --batch --raw --skip-column-names'],
      { input: statement, encoding: 'utf8', timeout: 60_000, maxBuffer: 64 * 1024 * 1024 });
      record('readonly-sql', { statementSha256: hash(statement), exitCode: result.status, signal: result.signal,
        stdoutSha256: hash(result.stdout ?? ''), stderrSha256: hash(result.stderr ?? '') });
      assert.ok(result.status === 0 && !result.error && !result.signal, 'Owned complete physical snapshot failed');
      guard();
      const rows = result.stdout.trim().split('\n').filter(Boolean);
      assert.ok(rows.length <= 100_000);
      return rows.map(row => JSON.parse(row));
    };
    const inventorySQL = editorPhysicalInventorySQL(runtime.manifest);
    const inventory = sql(inventorySQL);
    const targets = validateEditorPhysicalInventory(runtime.manifest, schema, inventory);
    const snapshotSQL = editorPhysicalSnapshotSQL(targets);
    snapshot = purpose => {
      assert.deepEqual(sql(inventorySQL), inventory, 'Physical model schema drift');
      const value = normalizeEditorPhysicalSnapshot(inventory, targets, sql(snapshotSQL));
      report.snapshots.push({ purpose, binding: record('snapshot', { purpose, snapshot: value }) });
      return value;
    };
    const initial = snapshot('before-normal-ui');
    const baseline = tableOf(initial, root.database, 't_srfpsmodule').rows.map(decode)
      .filter(row => row.psmoduleid === root.sentinelId);
    assert.equal(baseline.length, 1);
    assert.equal(baseline[0].psmodulename, root.sentinelName);
    assert.equal(baseline[0].modtag, root.sentinelTag);
    assert.equal(baseline[0].pssystemid, root.logicalSystemId);
    const app = input.applications.find(row => row.application === 'ModelDesign');
    const entry = new URL(app.entry);
    assert.equal(entry.protocol, 'http:');
    assert.equal(entry.hostname, '127.0.0.1');
    assert.equal(entry.username + entry.password + entry.search, '');
    const origin = entry.origin;
    const api = readJSON(join(workspace, modelRoot, 'PSSYSSERVICEAPIS/ModelAPI.json'));
    const readPolicy = {
      rootIds: [root.rootId],
      readRecordKeys: new Set([root.sentinelId, root.logicalSystemId]),
      readFetchPaths: new Set(api.getPSDEServiceAPIs.flatMap(entity =>
        (entity.getPSDEServiceAPIMethods ?? []).filter(method => method.methodType === 'FETCH' &&
          method.dataAccessAction === 'READ' && method.requestMethod === 'POST')
          .map(method => `${entity.codeName2.toLowerCase()}/${method.codeName.toLowerCase()}`))),
      readCollections: nativeReadCollections(api),
    };
    const require = createRequire(join(workspace, 'ibiz-app-hub/package.json'));
    browser = await launchChromium(require('playwright').chromium, { args: ['--no-sandbox'] });
    const open = async expectedName => {
      guard();
      await activeContext?.close();
      activeContext = await browser.newContext({ locale: options.locale, serviceWorkers: 'block',
        viewport: options.viewport === 'desktop' ? { width: 1440, height: 900 } : { width: 390, height: 844 } });
      await configureNativeBrowserLanguage(activeContext, options.locale);
      const page = await activeContext.newPage();
      activePage = page;
      page.setDefaultTimeout(25_000);
      const evidence = { number: report.sessions.length + 1, expectedName, freshContext: true, navigation: [],
        errors: [], requests: [], readiness: {}, currentStage: 'login', status: 'FAILED' };
      activeEvidence = evidence;
      report.sessions.push(evidence);
      page.on('pageerror', error => evidence.errors.push({ type: 'pageerror', message: clean(error.message) }));
      page.on('console', message => {
        if (message.type() === 'error') evidence.errors.push({ type: 'console-error', message: clean(message.text()) });
      });
      page.on('requestfailed', request => evidence.errors.push({
        type: 'requestfailed', method: request.method(),
        path: clean(new URL(request.url()).pathname),
        failure: clean(request.failure()?.errorText ?? 'unknown-request-failure'),
      }));
      const pending = [];
      let appdata;
      page.on('response', response => {
        const url = new URL(response.url());
        const request = response.request();
        evidence.requests.push({ method: request.method(), path: clean(url.pathname), status: response.status() });
        if (response.status() >= 400) evidence.errors.push({ type: 'http-error', method: request.method(),
          path: clean(url.pathname), status: response.status() });
        if (url.origin === origin && url.pathname === `${prefix}/appdata` && response.status() === 200) {
          const work = response.json().then(data => { appdata = { status: 200, error: null, data }; })
            .catch(() => evidence.errors.push({ type: 'invalid-appdata-json' }));
          pending.push(work);
          pendingEvidence.add(work);
          work.then(() => pendingEvidence.delete(work), () => pendingEvidence.delete(work));
        }
      });
      await activeContext.route('**/*', route => {
        const request = route.request();
        const spec = { url: request.url(), method: request.method(), body: request.postData() };
        if (!moduleBrowserRequestAllowed(spec, { origin, readPolicy, intent })) {
          report.blockedRequests.push({ method: spec.method, path: clean(new URL(spec.url).pathname) });
          return route.abort('blockedbyclient');
        }
        if (spec.method === 'PUT') {
          try { markModuleUIDispatch({ intent, mutation, record }); }
          catch (error) {
            report.errors.push({ type: 'dispatch-journal', message: clean(error.message) });
            return route.abort('blockedbyclient');
          }
        }
        return route.continue();
      });
      entry.hash = `/psdevslnsys=${root.rootId}/modelingindex/-`;
      await page.goto(entry.href, { waitUntil: 'domcontentloaded' });
      await page.locator('input[type="password"]').first().waitFor();
      await page.locator('input[type="text"]').first().fill(actor.loginname);
      await page.locator('input[type="password"]').first().fill(runtime.credentials.users[actor.loginname]);
      evidence.login = await captureNativeLogin(page, { entry: app.entry, applicationId: appId },
        () => submitNativeLogin(page, options.locale));
      await waitForNativeIndexReady(page, { application: 'ModelDesign', applicationId: appId,
        indexPath: 'PSSYSAPPS/ModelDesign/PSAPPINDEXVIEWS/ModelingIndex.json' });
      const deadline = Date.now() + 10_000;
      while (!appdata && Date.now() < deadline) { await Promise.all(pending); await page.waitForTimeout(100); }
      assert.ok(appdata);
      verifyModelingAppData(appdata, actor, { system: 'ibizmodeling', organization: `${actor.centerId}_org` });
      evidence.currentStage = 'main-appmenu-readiness';
      const menu = await waitUI(page, 'ModelingIndex', 'menu');
      evidence.readiness.menu = menu;
      assert.equal(menu.rootId, root.rootId);
      assert.equal(menu.appId, appId);
      // Dismiss the real console drawer using its normal keyboard close path.
      if (await page.locator('.ibiz-drawer.open').count()) {
        await page.keyboard.press('Escape');
        evidence.consoleDismissal = 'trusted-keyboard-Escape';
      }
      const listPath = `${prefix}/psdevslnsys/${root.rootId}/psmodules/fetchcursys`;
      const listResponse = page.waitForResponse(response => new URL(response.url()).pathname === listPath);
      listResponse.catch(() => {});
      evidence.navigation.push({ stage: 'main-appmenu-sysinfo', click: await trustedClick(page.locator(menu.target)) });
      evidence.currentStage = 'overview-readiness';
      const overview = await waitUI(page, contract.entry.view, 'overview');
      evidence.readiness.overview = overview;
      assert.equal(overview.rootId, root.rootId);
      assert.equal(overview.appId, appId);
      evidence.navigation.push({ stage: 'drbar-info', click: await trustedClick(page.locator(overview.target)) });
      evidence.currentStage = 'module-list-response';
      const list = await listResponse;
      const listRequest = list.request();
      const headers = await listRequest.allHeaders();
      const observedRequest = { url: listRequest.url(), method: listRequest.method(),
        body: listRequest.postData(), contentType: headers['content-type'],
        headers: { authorizationPresent: Boolean(headers.authorization), srfsystemid: headers.srfsystemid,
          srforgid: headers.srforgid } };
      const items = await list.json();
      evidence.moduleListObservation = record('module-list-observation', {
        request: observedRequest, response: { status: list.status(), data: items },
      });
      evidence.listRequest = observedDatasetRequest(observedRequest, { origin, root,
        organization: `${actor.centerId}_org`, nativeModuleRootBinding: true,
        dataset: { entity: 'PSModule', fetchPath: listPath, query: 'CurSys',
          methods: { FetchCurSys: { method: 'POST' } } } });
      assert.equal(list.status(), 200);
      assert.ok(Array.isArray(items));
      assert.equal(items.length, 1, 'Only the own physical sentinel may be returned');
      assert.equal(items.filter(row => (row.psmoduleid ?? row.srfkey) === root.sentinelId &&
        row.psmodulename === expectedName).length, 1);
      assert.equal(items[0].pssystemid, root.logicalSystemId);
      assert.equal(items[0].pssystemname, root.sentinelSystemName);
      assert.equal(items[0].modtag, root.sentinelTag);
      evidence.currentStage = 'module-grid-readiness';
      const grid = await waitUI(page, contract.grid.view, 'grid');
      evidence.readiness.grid = grid;
      assert.equal(grid.rootId, root.rootId);
      assert.equal(grid.appId, appId);
      assert.equal(grid.items.filter(row => (row.psmoduleid ?? row.srfkey) === root.sentinelId &&
        row.psmodulename === expectedName).length, 1);
      const visibleRow = page.locator(`${grid.selector} .el-table__body-wrapper tr.el-table__row`)
        .filter({ has: page.getByText(expectedName, { exact: true }) });
      assert.equal(await visibleRow.count(), 1);
      const getting = page.waitForResponse(response => response.request().method() === 'GET' &&
        new URL(response.url()).pathname === moduleWritePath(root));
      getting.catch(() => {});
      evidence.navigation.push({ stage: 'module-name-link',
        click: await trustedClick(visibleRow.getByText(expectedName, { exact: true })) });
      evidence.currentStage = 'module-get-response';
      const get = await getting;
      assert.equal(get.status(), 200);
      const data = await get.json();
      assert.equal(data.psmoduleid, root.sentinelId);
      assert.equal(data.pssystemid, root.logicalSystemId);
      assert.equal(data.psmodulename, expectedName);
      evidence.currentStage = 'module-form-readiness';
      const editor = await waitUI(page, contract.editor.view, 'form');
      evidence.readiness.form = editor;
      assert.equal(editor.rootId, root.rootId);
      assert.equal(editor.appId, appId);
      assert.equal(editor.value, expectedName);
      assert.equal(editor.form.psmoduleid ?? editor.form.srfkey, root.sentinelId);
      assert.equal(editor.form.pssystemid, root.logicalSystemId);
      assert.ok(editor.editable && editor.save.visible && !editor.save.disabled && editor.save.count === 1,
        'Noneditable native UI is a blocker; no HTTP mutation fallback is permitted');
      evidence.editor = editor;
      evidence.get = { path: moduleWritePath(root), status: 200, bodySha256: hash(json(data)) };
      evidence.screenshot = `session-${evidence.number}-${options.locale}-${options.viewport}.png`;
      await page.screenshot({ path: join(output, evidence.screenshot), fullPage: true });
      evidence.status = 'OWNED-NATIVE-EDITOR-READ';
      evidence.currentStage = 'native-editor-read';
      return { page, editor, evidence };
    };
    const save = async (current, desiredName, purpose) => {
      current.evidence.currentStage = purpose;
      guard();
      const before = snapshot(`before-${purpose}`);
      assert.deepEqual(before, lastSnapshot ?? initial, 'Read-only UI navigation changed physical model data');
      const nextIntent = { phase: 'ui-save', armed: false, dispatched: false, root,
        originalName: current.editor.value, desiredName, beforeForm: current.editor.form };
      const journal = record('write-intent', { ...nextIntent, beforeSnapshotSha256: hash(json(before)),
        actor: report.actor, purpose });
      const row = { purpose, journal, status: 'INTENT-DURABLE-NOT-DISPATCHED' };
      report.writes.push(row);
      await current.page.locator(current.editor.input).fill(desiredName);
      assert.equal(await current.page.locator(current.editor.input).inputValue(), desiredName);
      intent = { ...nextIntent, armed: true, journal, writeRow: row };
      const receiving = current.page.waitForResponse(response => response.request().method() === 'PUT' &&
        new URL(response.url()).pathname === moduleWritePath(root));
      receiving.catch(() => {});
      try {
        const exactSave = current.page.locator(`${current.editor.selector} .ibiz-control-toolbar ` +
          `button[title=${JSON.stringify(current.editor.save.title)}]`);
        row.click = await trustedClick(exactSave);
        const response = await receiving;
        assert.ok(intent.dispatched, 'The UI must produce the gated native PUT');
        const request = response.request();
        assert.equal(request.frame(), current.page.mainFrame());
        const headers = await request.allHeaders();
        assert.ok(headers.authorization);
        assert.equal(headers.srforgid, `${actor.centerId}_org`);
        assert.equal(headers.srfsystemid, 'ibizmodeling');
        row.request = { method: 'PUT', path: moduleWritePath(root), bodySha256: hash(request.postData()),
          normalAuthentication: true, organization: headers.srforgid };
        assert.equal(response.status(), 200);
        const body = await response.json();
        assert.equal(body.psmoduleid, root.sentinelId);
        assert.equal(body.psmodulename, desiredName);
        row.response = { status: 200, sha256: hash(json(body)) };
      } finally {
        const completedIntent = intent;
        intent = null;
        const settled = settleModuleWriteSnapshot({
          intent: completedIntent, mutation, before,
          snapshot: () => snapshot(`after-${purpose}${completedIntent.dispatched ? '' : '-not-dispatched'}`),
          verify: after => verifyModulePhysicalUpdate({ before, after, root, actor,
            originalName: current.editor.value, desiredName }),
        });
        if (completedIntent.dispatched) {
          row.physicalDelta = settled.physicalDelta;
          lastSnapshot = settled.after;
        }
      }
    };
    recover = async () => {
      guard(true);
      const current = snapshot('recovery-before-new-session');
      assert.deepEqual(current, lastSnapshot, 'Unexpected data drift prohibits automatic name restoration');
      const module = tableOf(current, root.database, 't_srfpsmodule').rows.map(decode)
        .find(row => row.psmoduleid === root.sentinelId);
      assert.ok(module);
      const recoveryIntent = record('recovery-intent', { root: report.root, actor: report.actor,
        originalName: root.sentinelName, observedName: module.psmodulename,
        beforeSnapshotSha256: hash(json(current)), normalUIOnly: true });
      const currentSession = await open(module.psmodulename);
      if (module.psmodulename !== root.sentinelName) {
        await save(currentSession, root.sentinelName, 'recover-original-module-name');
      }
      await open(root.sentinelName);
      assert.deepEqual(snapshot('recovery-final-normal-ui-readback'), lastSnapshot);
      mutation.changed = false;
      report.restoredBusinessName = true;
      report.cleanup = { status: 'RESTORED-BUSINESS-NAME-VIA-NATIVE-UI-AFTER-FAILURE',
        recoveryIntent, auditAndVersionIntentionallyRetained: true, automaticArbitraryRepairAllowed: false };
    };
    session = await open(root.sentinelName);
    const desiredName = `Owned UI ${options.runId} ${root.side} ${randomBytes(6).toString('hex')}`;
    await save(session, desiredName, 'edit-module-name');
    session = await open(desiredName);
    report.freshSessionReadbackObserved = true;
    await save(session, root.sentinelName, 'restore-module-name');
    mutation.changed = false;
    session = await open(root.sentinelName);
    report.restoredBusinessName = true;
    const final = snapshot('final-restored-name');
    assert.deepEqual(final, lastSnapshot);
    guard(true);
    assert.equal(hash(json(readNativeFiveDatasetContract({ workspace }))), schemaSha256);
    report.physicalRoundtripVerified = true;
    report.cleanup = { status: 'RESTORED-BUSINESS-NAME-VIA-NATIVE-UI',
      auditAndVersionIntentionallyRetained: true, automaticArbitraryRepairAllowed: false };
    roundtripComplete = true;
  } catch (error) {
    report.errors.push({ message: clean(error.message), ...(error.evidence ? { evidence: error.evidence } : {}) });
    await captureFailureScreenshot('primary');
    if (moduleMutationRecoveryAllowed(mutation) && recover) {
      try { await recover(); } catch (recoveryError) {
        report.errors.push({ type: 'bounded-ui-recovery-failed', message: clean(recoveryError.message) });
        await captureFailureScreenshot('recovery');
      }
    }
    if (mutation.pendingDispatch) {
      report.cleanup = { status: 'UNVERIFIED-DISPATCH-RETAIN-FIXTURE', automaticArbitraryRepairAllowed: false,
        reason: mutation.failureKind ?? 'The native PUT may have committed but its physical result is unverified.' };
    } else if (mutation.unsafeDelta) {
      report.cleanup = { status: 'UNEXPECTED-DELTA-RETAIN-FIXTURE', automaticArbitraryRepairAllowed: false };
    } else if (mutation.changed && snapshot && guard) {
      report.cleanup = { status: 'REQUIRES-EXPLICIT-OWNED-UI-RECOVERY', automaticArbitraryRepairAllowed: false,
        reason: 'Save may have committed. Durable intent and full snapshots retained; no SQL or blind HTTP repair.' };
    }
    process.exitCode = 1;
  } finally {
    intent = null;
    report.browserShutdown = await closeModuleBrowserEvidence({
      context: activeContext, browser, pending: pendingEvidence, errors: report.errors,
    });
    report.browserAcceptanceGate = moduleBoundedAcceptance(report, {
      roundtripComplete, shutdown: report.browserShutdown,
    });
    if (report.browserAcceptanceGate.passed) {
      report.boundedEditorSaveAcceptance = true;
      report.freshSessionReadbackAcceptance = true;
      report.browserEditorInteractionVerified = true;
      report.physicalSnapshotAcceptance = true;
      report.status = 'PASSED-OWNED-MODULE-UI-ROUNDTRIP-NOT-FULL-ACCEPTANCE';
    } else process.exitCode = 1;
    report.finishedAt = new Date().toISOString();
    report.inputs = [...(runtime?.bindings ?? []), ...bound];
    if (target) directories.write(target, 'report.private.json', json(report));
    directories.close();
  }
  return { output: target ? output : undefined, status: report.status,
    boundedEditorSaveAcceptance: report.boundedEditorSaveAcceptance,
    restoredBusinessName: report.restoredBusinessName };
}

export async function main(argv = process.argv.slice(2)) {
  const { values } = parseArgs({ args: argv, options: {
    launch: { type: 'string' }, 'launch-sha256': { type: 'string' }, 'state-sha256': { type: 'string' },
    deployment: { type: 'string' }, 'deployment-sha256': { type: 'string' }, 'run-id': { type: 'string' },
    actor: { type: 'string' }, 'root-side': { type: 'string' }, locale: { type: 'string' },
    viewport: { type: 'string' }, output: { type: 'string' },
    'allow-owned-ui-mutations': { type: 'boolean' }, help: { type: 'boolean', short: 'h' },
  } });
  if (values.help) {
    console.log('Owned PSModule normal UI name Save/readback/restore only. Required: --launch PATH --launch-sha256 SHA ' +
      '--state-sha256 SHA --deployment PRIVATE_PATH --deployment-sha256 SHA --run-id ID --actor MANIFEST_EDITOR ' +
      '--root-side a|b --locale zh-CN|en-US --viewport desktop|mobile --output NEW_PRIVATE_PATH --allow-owned-ui-mutations');
    return;
  }
  console.log(JSON.stringify(await runOwnedModuleEditor({
    launch: values.launch, launchSha256: values['launch-sha256'], stateSha256: values['state-sha256'],
    deployment: values.deployment, deploymentSha256: values['deployment-sha256'], runId: values['run-id'],
    actor: values.actor, rootSide: values['root-side'], locale: values.locale, viewport: values.viewport,
    output: values.output, allowOwnedUIMutations: values['allow-owned-ui-mutations'],
  })));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(() => { console.error('Owned module editor refused; private input details suppressed'); process.exitCode = 1; });
}
