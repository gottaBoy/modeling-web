import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { basename, dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import {
  PinnedDirectories, readPinnedFile,
} from '../../../scripts/native-candidate-files.mjs';
import {
  verifyBridgeProcess, verifyOwnedBridgeRuntime,
} from '../../../scripts/launch-owned-native-modeldesign.mjs';
import { readNativeFiveDatasetContract } from '../../../scripts/native-five-dataset-contract.mjs';
import {
  validateEditorSeedReceipt, verifyEditorCreateEvidence,
} from '../../../scripts/probe-owned-editor-registry-http.mjs';
import { verifyNativeAiCodeRuntimeAssets } from '../../../scripts/prepare-native-ai-code-runtime-assets.mjs';
import { verifyNativeCentralServiceCandidate } from '../../../scripts/native-model-design-isolated-launch.mjs';
import { verifyModelingAppData } from '../../../scripts/run-owned-native-permission-http.mjs';
import { launchChromium } from '../../../scripts/browser-launch.mjs';
import {
  captureNativeLogin,
} from './native-model-contract.mjs';
import {
  configureNativeBrowserLanguage, submitNativeLogin, waitForNativeIndexReady,
} from './native-modeldesign.browser.mjs';

const workspace = fileURLToPath(new URL('../../../', import.meta.url)).replace(/\/$/, '');
const applicationId = 'ibizmodeling__modeldesign';
const shaPattern = /^[a-f0-9]{64}$/;
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const json = value => `${JSON.stringify(value, null, 2)}\n`;
const sourceTreePath = 'PSSYSAPPS/ModelDesign/PSAPPDEVIEWS/PSSystemMainSideBarTreeView.json';
const viewStem = entity => `${entity}CurSysGridView`;
const parameters = new Set(['page', 'size', 'sort', 'query', 'search', 'pssystemid']);

function inside(root, path) {
  const absolute = resolve(workspace, path);
  const child = relative(resolve(root), absolute);
  assert.ok(child && child !== '..' && !child.startsWith(`..${sep}`) && !child.startsWith(sep));
  assert.ok(!/[:,\r\n\0\\]/.test(absolute));
  return absolute;
}

export function observedDatasetRequest(request, {
  origin, dataset, root, organization, nativeModuleRootBinding = false,
}) {
  const url = new URL(request.url);
  assert.equal(url.origin, origin, 'Dataset must use the selected same-origin owned frontend');
  assert.equal(url.pathname, dataset.fetchPath.replace('$ROOT_ID', root.rootId));
  assert.equal(dataset.methods[`Fetch${dataset.query}`].method, 'POST');
  assert.ok(['POST', 'GET'].includes(request.method), 'Only published POST or observed GET alias is allowed');
  assert.equal(request.headers.authorizationPresent, true, 'Normal browser authentication is required');
  assert.equal(request.headers.srfsystemid, 'ibizmodeling');
  assert.equal(request.headers.srforgid, organization);
  const entries = [...url.searchParams.entries()];
  assert.equal(new Set(entries.map(([key]) => key)).size, entries.length, 'Duplicate query fields are ambiguous');
  const query = Object.fromEntries(entries);
  let body = null;
  if (request.method === 'GET') assert.ok(!request.body, 'A GET alias cannot contain a hidden body');
  else {
    assert.match(request.contentType ?? '', /^application\/json(?:;|$)/i);
    body = JSON.parse(request.body);
    assert.ok(body && typeof body === 'object' && !Array.isArray(body));
  }
  const effective = { ...query, ...(body ?? {}) };
  for (const key of Object.keys(effective)) {
    assert.ok(parameters.has(key) || /^n_[a-z0-9_]+_(?:eq|like|in|isnull)$/.test(key) ||
      /^srf[a-z0-9_]+$/.test(key), `Unreviewed dataset parameter: ${key}`);
    if (Object.hasOwn(query, key) && body && Object.hasOwn(body, key)) {
      assert.equal(String(body[key]), query[key], 'Query/body disagreement');
    }
  }
  assert.equal(typeof nativeModuleRootBinding, 'boolean');
  if (nativeModuleRootBinding) {
    assert.equal(dataset.entity, 'PSModule');
    assert.equal(dataset.query, 'CurSys');
    assert.equal(request.method, 'POST');
    assert.equal(url.pathname,
      `/api/${applicationId}/psdevslnsys/${root.rootId}/psmodules/fetchcursys`);
    for (const key of Object.keys(effective).filter(key => key.startsWith('n_pssystemid_'))) {
      assert.equal(key, 'n_pssystemid_eq', 'Unreviewed explicit system filter');
      assert.equal(effective[key], root.logicalSystemId, 'Explicit system filter must match the owned root');
    }
  }
  if (!nativeModuleRootBinding || Object.hasOwn(effective, 'pssystemid')) {
    assert.equal(effective.pssystemid, root.logicalSystemId, 'UI filter must bind the real logical system');
  }
  if (effective.page !== undefined) assert.ok(/^\d+$/.test(String(effective.page)));
  if (effective.size !== undefined) assert.ok(/^\d+$/.test(String(effective.size)) &&
    Number(effective.size) > 0 && Number(effective.size) <= 1000);
  return {
    publishedMethod: 'POST', observedMethod: request.method,
    getAliasObserved: request.method === 'GET', path: url.pathname, query, body,
    headers: request.headers,
    ...(nativeModuleRootBinding ? { systemFilterBinding: 'native-authorized-parent-root' } : {}),
  };
}

export function verifyBrowserSentinels(data, dataset, root, receipt) {
  assert.ok(Array.isArray(data) && data.length > 0, 'Empty HTTP 200 is not dataset acceptance');
  const records = receipt.records.filter(row => row.entity === dataset.entity && row.rootId === root.rootId);
  assert.equal(records.length, 1);
  assert.equal(data.length, records.length, 'Unexpected extra or foreign dataset rows');
  const record = records[0];
  assert.equal(data[0][dataset.keyField], record.key);
  assert.equal(data[0][dataset.nameField], record.name);
  assert.equal(data[0].pssystemid, record.logicalSystemId);
  assert.equal(data[0].usertag, record.userTag);
  if (dataset.returnProjection.some(row => row.field === 'pssystemname')) {
    assert.equal(data[0].pssystemname, record.systemName);
  }
  const bytes = JSON.stringify(data);
  for (const foreign of receipt.records.filter(row => row.rootId !== root.rootId)) {
    for (const field of ['key', 'name', 'userTag', 'systemName']) {
      assert.ok(!bytes.includes(foreign[field]), 'Foreign-root sentinel disclosure');
    }
  }
  return record;
}

export function nativeReadCollections(api) {
  return new Set(api.getPSDEServiceAPIs.filter(entity =>
    entity.getPSDEServiceAPIMethods?.some(method => (method.codeName ?? method.name) === 'Get' &&
      method.methodType === 'DEACTION' && method.requestMethod === 'GET' &&
      method.dataAccessAction === 'READ' && method.needResourceKey === true &&
      method.noServiceCodeName === true &&
      /\/PSDEACTIONS\/Get\.json$/.test(method.getPSDEAction?.path ?? '')))
    .map(entity => entity.codeName2.toLowerCase()));
}

export function readOnlyBrowserRequestAllowed({ method, path }, {
  rootIds, readFetchPaths, readCollections = new Set(), readRecordKeys = new Set(),
}) {
  const prefix = `/api/${applicationId}/`;
  const suffix = path.split('/').slice(-2).join('/');
  const fetch = readFetchPaths.has(suffix) &&
    (path === `${prefix}${suffix}` || rootIds.some(root => path === `${prefix}psdevslnsys/${root}/${suffix}`));
  if (['GET', 'HEAD'].includes(method)) {
    if (path === '/' || path.startsWith('/modeldesign/')) return true;
    if (!path.startsWith(prefix)) return false;
    const local = path.slice(prefix.length);
    if (/^(?:remotemodel|jsonschema|dictionaries|configs)\//.test(local) ||
        ['appdata', 'uaa/getbydcsystem/ibizmodeling', 'uaa/oauth/userinfo'].includes(local)) return true;
    if (/^uaa\/refresh_token\/[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(local)) return true;
    if (fetch) return true;
    const parts = local.split('/');
    // Named GET actions (for example GetDraft) are not keyed READ requests.
    const key = value => typeof value === 'string' && /^[A-Za-z0-9_-]+$/.test(value) &&
      readRecordKeys.has(value);
    return (parts.length === 2 && readCollections.has(parts[0]) && key(parts[1])) ||
      (parts.length === 4 && parts[0] === 'psdevslnsys' && rootIds.includes(parts[1]) &&
        readCollections.has(parts[2]) && key(parts[3]));
  }
  if (method !== 'POST') return false;
  if (path === `/api/${applicationId}/v7/login`) return true;
  if (path === `/api/${applicationId}/extension/internal_messages/fetch_cur_receiver`) return true;
  if (path === `/api/${applicationId}/work_items/count_my_todo`) return true;
  return fetch;
}

function publicViewEvidence({ codeName, group, actionEntity }) {
  const visible = element => Boolean(element?.getClientRects().length &&
    getComputedStyle(element).visibility !== 'hidden' && getComputedStyle(element).display !== 'none');
  const views = [...document.querySelectorAll('.ibiz-view')].filter(visible).map(element => ({
    element, controller: window.ibiz?.util?.viewStack?.getView?.(element.id),
  })).filter(row => row.controller?.model?.codeName?.toLowerCase() === codeName.toLowerCase());
  if (views.length !== 1) return { ready: false, matches: views.length };
  const { element, controller } = views[0];
  const state = controller.state;
  const ready = controller.id === element.id && state?.isCreated === true && state?.isMounted === true &&
    state?.isLoading === false && state?.isDestroyed === false && state?.hasError === false;
  const selector = `#${CSS.escape(element.id)}`;
  const result = { ready, selector, codeName: controller.model.codeName, id: controller.id,
    appId: controller.model.appId ?? controller.context?.srfappid,
    rootId: controller.context?.psdevslnsys, systemId: controller.context?.pssystemid };
  if (!group) {
    const grid = controller.getController?.('grid');
    result.grid = grid ? { name: grid.model.name, entityId: grid.model.appDataEntityId,
      loading: grid.state.isLoading, loaded: grid.state.isLoaded,
      items: (grid.state.items ?? []).map(item => ({ ...(item.getOrigin?.() ?? item) })) } : null;
    return result;
  }
  const tree = controller.getController?.('tree');
  if (!tree) return { ...result, ready: false, error: 'No public tree controller' };
  const node = tree.state.items?.filter(row => row._nodeId?.toLowerCase() === group.toLowerCase());
  if (node?.length !== 1) return { ...result, ready: false, error: 'Missing or ambiguous static tree group' };
  const model = tree.getNodeModel(node[0]._nodeId);
  const menu = model?.decontextMenu;
  const action = menu?.detoolbarItems?.filter(item =>
    item.uiactionId?.toLowerCase() === `opengridview@${actionEntity}`.toLowerCase());
  const nodes = [...element.querySelectorAll('.ibiz-control-treeview-node')]
    .filter(row => row.title === node[0]._text && visible(row));
  if (action?.length !== 1 || nodes.length !== 1) {
    return { ...result, ready: false, error: 'List entry is not uniquely rendered' };
  }
  const dom = nodes[0];
  const segments = [];
  for (let current = dom; current && current !== element; current = current.parentElement) {
    segments.unshift(`${current.tagName.toLowerCase()}:nth-child(${
      [...current.parentElement.children].indexOf(current) + 1})`);
  }
  return { ...result, tree: { loading: tree.state.isLoading, loaded: tree.state.isLoaded },
    node: { id: node[0]._id, modelId: node[0]._nodeId, text: node[0]._text,
      selector: `${selector} > ${segments.join(' > ')}` },
    action: { id: action[0].uiactionId, caption: action[0].caption,
      tooltip: action[0].tooltip ?? action[0].caption } };
}

async function waitPublicView(page, options) {
  const deadline = Date.now() + 25_000;
  let evidence;
  while (Date.now() < deadline) {
    try {
      evidence = await page.evaluate(publicViewEvidence, options);
      if (evidence.ready && (!evidence.tree || !evidence.tree.loading) &&
          (!evidence.grid || !evidence.grid.loading)) return evidence;
    } catch (error) {
      if (!/Execution context was destroyed|Cannot find context|document/.test(error.message)) throw error;
    }
    await page.waitForTimeout(100);
  }
  const error = new Error(`Native public controller/list entry did not become ready: ${options.codeName}`);
  error.evidence = evidence;
  throw error;
}

async function trustedClick(locator) {
  assert.equal(await locator.count(), 1, 'Native UI click target must be unique');
  const observed = await locator.evaluateHandle(element => {
    const evidence = { event: null };
    const listener = event => { evidence.event = { isTrusted: event.isTrusted, button: event.button }; };
    element.addEventListener('click', listener, { capture: true, once: true });
    evidence.remove = () => element.removeEventListener('click', listener, { capture: true });
    return evidence;
  });
  try {
    await locator.click();
    const event = await observed.evaluate(value => value.event);
    assert.deepEqual(event, { isTrusted: true, button: 0 }, 'Native list commands need a real browser click');
    return event;
  } finally {
    await observed.evaluate(value => value.remove()).catch(() => {});
    await observed.dispose();
  }
}

export async function runOwnedFiveDatasetBrowser(options) {
  assert.equal(options.runReadonlyBrowser, true, 'Explicit --run-readonly-browser opt-in is required');
  const allowPartial = options.allowPartial === true;
  assert.match(options.runId ?? '', /^[a-f0-9]{12}$/);
  for (const name of ['launchReportSha256', 'stateSha256', 'deploymentInputSha256', 'seedReceiptSha256']) {
    assert.match(options[name] ?? '', shaPattern, `Explicit ${name} is required`);
  }
  assert.ok(['a', 'b'].includes(options.rootSide));
  assert.ok(['zh-CN', 'en-US'].includes(options.locale));
  assert.ok(['desktop', 'mobile'].includes(options.viewport));
  const output = inside(join(workspace, '.artifacts/owned-five-dataset-browser'), options.output);
  assert.equal(dirname(output), join(workspace, '.artifacts/owned-five-dataset-browser'));
  assert.match(basename(output), /^[a-z0-9][a-z0-9-]{0,95}$/);
  assert.ok(!fs.existsSync(output), 'Existing browser evidence must not be overwritten');
  const directories = new PinnedDirectories();
  const files = [];
  const read = (path, expected, privateInput = false) => {
    path = inside(workspace, path);
    const file = readPinnedFile(directories, directories.open(dirname(path)), basename(path));
    if (privateInput) {
      assert.equal(file.identity.uid, process.geteuid());
      assert.equal(file.identity.mode & 0o077, 0);
    }
    const binding = { path, bytes: file.data.length, sha256: hash(file.data) };
    if (typeof expected === 'string') assert.equal(binding.sha256, expected);
    else if (expected) assert.deepEqual(binding, expected);
    files.push({ ...binding, privateInput });
    return JSON.parse(file.data);
  };
  let browser;
  let target;
  const report = {
    contract: 'owned-five-dataset-native-ui-editor-positive-v1', status: 'FAILED',
    runId: options.runId, locale: options.locale, viewport: options.viewport,
    nativeAcceptance: false, permissionAcceptance: false, acceptedForProduction: false,
    boundedEditorOwnRootNavigationPassed: false, modelWritesRequested: false,
    allFiveEditorOwnRootNavigationPassed: false,
    boundedPartialEditorOwnRootNavigationPassed: false,
    physicalSnapshotAcceptance: false, identityOrHeaderInjection: false,
    pending: ['viewer/no-access and foreign-root UI permission matrix', 'native editor write and fresh-session readback',
      'complete physical before/after snapshots', 'full application acceptance'],
    datasets: [], blockedRequests: [], diagnostics: [], backgroundFailures: [],
    backgroundFailureAcceptance: false, startedAt: new Date().toISOString(),
    sourceFiles: [
      fileURLToPath(import.meta.url),
      join(workspace, 'scripts/native-five-dataset-contract.mjs'),
      join(workspace, 'scripts/probe-owned-editor-registry-http.mjs'),
      join(workspace, 'scripts/launch-owned-native-modeldesign.mjs'),
      join(workspace, 'scripts/prepare-native-ai-code-runtime-assets.mjs'),
      join(workspace, 'scripts/native-model-design-isolated-launch.mjs'),
      join(workspace, 'modelingweb/app/tests/native-modeldesign.browser.mjs'),
      join(workspace, 'modelingweb/app/tests/native-model-contract.mjs'),
    ].map(path => ({ path, sha256: hash(fs.readFileSync(path)) })),
  };
  try {
    target = directories.open(output, { create: true, exclusive: true });
    const launch = inside(join(workspace, '.artifacts/owned-native-modeldesign-launch'), options.launch);
    assert.equal(dirname(launch), join(workspace, '.artifacts/owned-native-modeldesign-launch'));
    const launchReport = read(join(launch, 'report.json'), options.launchReportSha256);
    assert.equal(launchReport.contract, 'owned-native-modeldesign-launch-v1');
    assert.equal(launchReport.status, 'RUNNING-OWNED-FRONTEND-NOT-ACCEPTED');
    assert.deepEqual(launchReport.errors, []);
    const state = read(join(launch, 'launch-state.private.json'), options.stateSha256, true);
    assert.equal(state.contract, 'owned-native-modeldesign-launch-state-v1');
    const input = read(launchReport.input.path, launchReport.input);
    assert.equal(input.contract, 'native-model-design-owned-backend-launch-input-v1');
    assert.ok(input.frontend, 'An independently source-verified frontend distribution is required');
    assert.deepEqual(state.input, launchReport.input);
    assert.equal(input.ownedBackend.runId, options.runId);
    assert.equal(state.toolSha256, hash(fs.readFileSync(join(workspace, 'scripts/launch-owned-native-modeldesign.mjs'))));
    const deploymentPath = inside(join(workspace, '.artifacts/native-nonadmin-fixtures', options.runId),
      options.deploymentInput);
    const deployment = read(deploymentPath, options.deploymentInputSha256, true);
    assert.equal(deployment.runId, options.runId);
    assert.deepEqual(launchReport.deploymentInput, files.at(-1) &&
      { path: files.at(-1).path, bytes: files.at(-1).bytes, sha256: files.at(-1).sha256 });
    assert.equal(input.ownedBackend.deploymentInput.sha256, options.deploymentInputSha256);
    const manifest = read(input.ownedBackend.manifest.path, input.ownedBackend.manifest);
    assert.equal(manifest.runId, options.runId);
    const sourceImagesPath = resolve(workspace, deployment.imageReceipt.path);
    read(sourceImagesPath, deployment.imageReceipt.sha256);
    const credentials = read(join(dirname(input.ownedBackend.manifest.path), 'credentials.private.json'), undefined, true);
    const user = manifest.users.find(row => row.loginname === options.actor);
    const root = manifest.roots.find(row => row.side === options.rootSide);
    assert.ok(user && root, 'Select a manifest actor and root, never a fabricated identity');
    assert.ok(user.role === 'editor' && user.rootId === root.rootId,
      'This bounded script implements only ordinary editor own-root positive navigation');
    assert.equal(typeof credentials.users[user.loginname], 'string');
    report.actor = { loginname: user.loginname, personId: user.personId, role: user.role, rootId: user.rootId };
    report.root = { side: root.side, rootId: root.rootId, logicalSystemId: root.logicalSystemId };
    report.notExecutedActors = manifest.users.filter(row => row.loginname !== user.loginname)
      .map(row => ({ loginname: row.loginname, role: row.role, status: 'NOT-EXECUTED-NOT-ACCEPTED' }));
    const contract = readNativeFiveDatasetContract({ workspace });
    const fixtureRoot = join(workspace, '.artifacts/native-nonadmin-fixtures', options.runId);
    const seedPath = inside(fixtureRoot, options.seedReceipt);
    assert.ok(seedPath.endsWith('.private.json'), 'Native seed evidence must be owner-private');
    const seed = read(seedPath, options.seedReceiptSha256, true);
    const seedBindings = {
      deploymentInput: { path: deploymentPath, sha256: options.deploymentInputSha256 },
      sourceImages: { path: deployment.imageReceipt.path, sha256: deployment.imageReceipt.sha256 },
    };
    validateEditorSeedReceipt(manifest, contract, seed, seedBindings, { allowPartial });
    for (const record of seed.records) {
      verifyEditorCreateEvidence(manifest, contract, record,
        read(inside(fixtureRoot, record.createEvidence.path), record.createEvidence.sha256, true));
    }
    report.seed = { path: seedPath, sha256: options.seedReceiptSha256 };
    report.sourceContractSha256 = hash(json(contract));
    report.sourceContractInputs = contract.inputs;
    const assets = verifyNativeAiCodeRuntimeAssets({ workspace, assets: input.assets });
    assert.equal(assets.candidate, input.candidate);
    assert.deepEqual(assets.receipt.frontend, input.frontend);
    if (input.serviceCandidate) assert.deepEqual(verifyNativeCentralServiceCandidate({
      workspace, receiptPath: input.serviceCandidate.receipt.path,
    }), input.serviceCandidate);
    const app = input.applications.find(row => row.application === 'ModelDesign');
    const appUrl = new URL(app.entry);
    assert.equal(appUrl.hostname, '127.0.0.1');
    assert.equal(appUrl.protocol, 'http:');
    assert.equal(appUrl.username, '');
    assert.equal(appUrl.password, '');
    const specs = state.bridges.map(bridge => {
      assert.ok(['Central', 'ModelDesign'].includes(bridge.application));
      assert.equal(bridge.specPath, join(launch, `${bridge.application.toLowerCase()}.bridge.private.json`));
      const spec = read(bridge.specPath, bridge.specSha256, true);
      assert.equal(spec.contract, 'owned-modeldesign-loopback-bridge-v1');
      assert.equal(spec.application, bridge.application);
      assert.equal(spec.port, Number(new URL(input.applications.find(row => row.application === bridge.application).entry).port));
      assert.equal(bridge.port, spec.port);
      assert.deepEqual(spec.input, launchReport.input);
      assert.equal(spec.runtime.deploymentPath, deploymentPath);
      assert.equal(spec.launcherSha256, state.toolSha256);
      return { bridge, spec };
    });
    assert.deepEqual(specs.map(row => row.spec.application).sort(), ['Central', 'ModelDesign']);
    const guard = (full = false) => {
      for (const file of report.sourceFiles) {
        assert.equal(hash(fs.readFileSync(file.path)), file.sha256, 'Browser verifier source changed');
      }
      for (const file of files) {
        const current = readPinnedFile(directories, directories.open(dirname(file.path)), basename(file.path));
        assert.equal(hash(current.data), file.sha256, 'Browser bound input drift');
      }
      for (const { bridge, spec } of specs) {
        verifyBridgeProcess(bridge.identity, bridge.specPath, bridge.specSha256);
        verifyOwnedBridgeRuntime({
          workspace, directories, input, runtime: spec.runtime,
          frontendPins: spec.frontendPins, fullMountedHash: full,
        });
      }
    };
    guard(true);
    const nativeRoot = join(workspace, contract.sourceModelRoot);
    const treeModel = read(join(nativeRoot, sourceTreePath));
    const navigation = contract.datasets.filter(dataset =>
      !allowPartial || seed.records.some(record => record.entity === dataset.entity)).map(dataset => {
      const view = read(join(nativeRoot, `PSSYSAPPS/ModelDesign/PSAPPDEVIEWS/${viewStem(dataset.entity)}.json`));
      const entity = read(join(nativeRoot, `PSSYSAPPS/ModelDesign/PSAPPDATAENTITIES/${dataset.entity}.json`));
      const grid = [...(view.getPSControls ?? []), ...(view.getPSViewLayoutPanel?.getPSControls ?? [])]
        .find(row => row.controlType === 'GRID');
      assert.equal(grid.getFetchPSControlAction.getPSAppDEMethod.id, `Fetch${dataset.query}`);
      const method = entity.getAllPSAppDEMethods.find(row => row.codeName === `Fetch${dataset.query}`);
      assert.equal(method.requestMethod, 'POST');
      assert.equal(method.requestPath, `/fetch${dataset.query.toLowerCase()}`);
      const tree = treeModel.getPSViewLayoutPanel.getPSControls.find(row => row.controlType === 'TREEVIEW');
      const nodes = tree.getPSDETreeNodes.filter(row =>
        row.treeNodeType === 'STATIC' && row.getPSAppDataEntity?.path.endsWith(`/${dataset.entity}.json`) &&
        row.getPSDEContextMenu?.getPSDEToolbarItems.some(item => item.getPSUIAction?.codeName === 'OpenGridView'));
      assert.equal(nodes.length, 1);
      return { dataset, codeName: view.codeName, group: nodes[0].id };
    });
    const api = read(join(nativeRoot, 'PSSYSSERVICEAPIS/ModelAPI.json'));
    const readFetchPaths = new Set(api.getPSDEServiceAPIs.flatMap(entity =>
      (entity.getPSDEServiceAPIMethods ?? []).filter(method =>
        method.methodType === 'FETCH' && method.dataAccessAction === 'READ' && method.requestMethod === 'POST')
        .map(method => `${entity.codeName2.toLowerCase()}/${method.codeName.toLowerCase()}`)));
    const readCollections = nativeReadCollections(api);
    const readRecordKeys = new Set([
      ...manifest.roots.flatMap(row => [row.sentinelId, row.logicalSystemId]),
      ...seed.records.map(row => row.key),
    ]);
    const require = createRequire(join(workspace, 'ibiz-app-hub/package.json'));
    browser = await launchChromium(require('playwright').chromium, { args: ['--no-sandbox'] });
    const viewport = options.viewport === 'desktop' ? { width: 1440, height: 900 } : { width: 390, height: 844 };
    const context = await browser.newContext({ locale: options.locale, viewport, serviceWorkers: 'block' });
    await configureNativeBrowserLanguage(context, options.locale);
    await context.route('**/*', route => {
      const request = route.request();
      const url = new URL(request.url());
      if (url.origin !== appUrl.origin || !readOnlyBrowserRequestAllowed({
        method: request.method(), path: url.pathname,
      }, { rootIds: manifest.roots.map(row => row.rootId), readFetchPaths, readCollections, readRecordKeys })) {
        report.blockedRequests.push({ method: request.method(), origin: url.origin, path: url.pathname });
        return route.abort('blockedbyclient');
      }
      return route.continue();
    });
    const page = await context.newPage();
    page.setDefaultTimeout(20_000);
    page.on('pageerror', error => report.diagnostics.push({ type: 'pageerror', message: error.message }));
    page.on('console', message => {
      if (message.type() === 'error') report.backgroundFailures.push({
        type: 'console-error', message: message.text(), blockingForFullAcceptance: true,
      });
    });
    page.on('response', response => {
      if (response.status() >= 400) report.backgroundFailures.push({
        type: 'http-error', path: new URL(response.url()).pathname,
        status: response.status(), method: response.request().method(), blockingForFullAcceptance: true,
      });
    });
    page.on('websocket', socket => report.diagnostics.push({
      type: 'unexpected-websocket', path: new URL(socket.url()).pathname,
    }));
    let appdata;
    const pending = new Set();
    page.on('response', response => {
      const url = new URL(response.url());
      if (url.origin !== appUrl.origin || url.pathname !== `/api/${applicationId}/appdata` || response.status() !== 200) return;
      const work = response.json().then(data => {
        appdata = { status: 200, error: null, data };
      }).catch(() => { report.diagnostics.push({ type: 'appdata-json-error' }); });
      pending.add(work); work.finally(() => pending.delete(work));
    });
    const entry = new URL(app.entry);
    entry.hash = `/psdevslnsys=${root.rootId}/modelingindex/-`;
    await page.goto(entry.href, { waitUntil: 'domcontentloaded' });
    await page.locator('input[type="password"]').first().waitFor();
    await page.locator('input[type="text"]').first().fill(user.loginname);
    await page.locator('input[type="password"]').first().fill(credentials.users[user.loginname]);
    report.login = await captureNativeLogin(page, { entry: app.entry, applicationId },
      () => submitNativeLogin(page, options.locale));
    await waitForNativeIndexReady(page, {
      application: 'ModelDesign', applicationId,
      indexPath: 'PSSYSAPPS/ModelDesign/PSAPPINDEXVIEWS/ModelingIndex.json',
    });
    await Promise.all(pending);
    assert.ok(appdata, 'The normal UI must load real appdata');
    verifyModelingAppData(appdata, user, { system: 'ibizmodeling', organization: `${user.centerId}_org` });
    const menu = await page.evaluate(() => {
      const roots = [...document.querySelectorAll('.ibiz-view-appindexview')];
      for (const root of roots) {
        const view = window.ibiz?.util?.viewStack?.getView?.(root.id);
        for (const button of root.querySelectorAll('.ibiz-left-side-menu button,.ibiz-left-side-menu .el-menu-item')) {
          const index = button.getAttribute('index');
          const declarations = [...(view?.model?.controls ?? []), ...(view?.model?.viewLayoutPanel?.controls ?? [])];
          const model = declarations.find(row => row.name === 'leftsidemenu');
          const item = model?.appMenuItems?.find(row => row.id === index);
          const appId = view?.model?.appId ?? view?.context?.srfappid;
          const func = item?.appFuncId && window.ibiz.hub.getApp(appId).getAppFunc(item.appFuncId);
          if (func?.appViewId?.toLowerCase().endsWith('pssystemmainsidebartreeview')) {
            return { index, selector: `#${CSS.escape(root.id)} .ibiz-left-side-menu [index="${CSS.escape(index)}"]` };
          }
        }
      }
      return null;
    });
    assert.ok(menu, 'Native System sidebar menu must be present; no direct controller invocation fallback');
    report.systemMenuClick = await trustedClick(page.locator(menu.selector));
    for (const { dataset, codeName, group } of navigation) {
      guard();
      const row = { entity: dataset.entity, status: 'FAILED', publishedMethod: 'POST' };
      report.datasets.push(row);
      try {
        const system = await waitPublicView(page, { codeName: 'PSSystemMainSideBarTreeView',
          group, actionEntity: dataset.entity });
        assert.equal(system.appId, applicationId);
        assert.equal(system.rootId, root.rootId, 'Sidebar controller must belong to the selected owned root');
        const node = page.locator(system.node.selector);
        await node.hover();
        const trigger = node.locator('button').filter({ has: page.locator('ion-icon[name="ellipsis-vertical"]') });
        row.menuTriggerClick = await trustedClick(trigger);
        const list = page.locator('.ibiz-context-menu__popover:visible button')
          .filter({ hasText: system.action.caption });
        const expectedPath = dataset.fetchPath.replace('$ROOT_ID', root.rootId);
        const clickStartedAt = Date.now();
        const receiving = page.waitForResponse(response => {
          const url = new URL(response.url());
          return url.origin === appUrl.origin && url.pathname === expectedPath &&
            response.request().timing().startTime >= clickStartedAt;
        });
        receiving.catch(() => {});
        row.listEntry = { modelId: system.node.modelId, actionId: system.action.id,
          caption: system.action.caption, click: await trustedClick(list) };
        const response = await receiving;
        const request = response.request();
        assert.equal(request.frame(), page.mainFrame(), 'Dataset must originate in the actual native UI document');
        assert.equal(request.isNavigationRequest(), false);
        row.requestStartedAt = request.timing().startTime;
        row.listClickStartedAt = clickStartedAt;
        const headers = await request.allHeaders();
        row.request = observedDatasetRequest({
          url: request.url(), method: request.method(), body: request.postData(),
          contentType: headers['content-type'],
          headers: { authorizationPresent: Boolean(headers.authorization),
            srfsystemid: headers.srfsystemid ?? null, srforgid: headers.srforgid ?? null },
        }, { origin: appUrl.origin, dataset, root, organization: `${user.centerId}_org` });
        assert.equal(response.status(), 200);
        assert.match(response.headers()['content-type'] ?? '', /^application\/json(?:;|$)/i);
        const body = await response.body();
        assert.ok(body.length > 0 && body.length <= 2 * 1024 * 1024);
        const data = JSON.parse(body.toString('utf8'));
        const sentinel = verifyBrowserSentinels(data, dataset, root, seed);
        row.response = { status: 200, bytes: body.length, sha256: hash(body), rows: data };
        row.controller = await waitPublicView(page, { codeName });
        assert.equal(row.controller.appId, applicationId);
        assert.equal(row.controller.rootId, root.rootId, 'List controller must belong to the selected owned root');
        assert.ok(row.controller.grid && row.controller.grid.items.some(item =>
          item[dataset.keyField] === sentinel.key && item[dataset.nameField] === sentinel.name),
        'The native grid controller must contain the fetched owned sentinel');
        const grid = page.locator(`${row.controller.selector} .ibiz-control-grid`);
        const visibleRow = grid.locator('.el-table__body-wrapper tr.el-table__row')
          .filter({ hasText: sentinel.name });
        assert.equal(await visibleRow.count(), 1);
        assert.equal(await visibleRow.isVisible(), true);
        row.visibleSentinel = { key: sentinel.key, name: sentinel.name, text: await visibleRow.innerText() };
        row.screenshot = `${dataset.entity}-${options.locale}-${options.viewport}.png`;
        await page.screenshot({ path: join(output, row.screenshot), fullPage: true });
        row.status = 'PASSED-EDITOR-OWN-ROOT-UI';
      } catch (error) {
        row.error = { message: error.message, ...(error.evidence ? { evidence: error.evidence } : {}) };
        throw error;
      }
    }
    guard(true);
    assert.equal(hash(json(readNativeFiveDatasetContract({ workspace }))), report.sourceContractSha256,
      'Five-dataset source contract changed during browser execution');
    assert.deepEqual(report.blockedRequests, []);
    assert.deepEqual(report.diagnostics, []);
    const partial = seed.status === 'partial-native-create-seeds-app-config-blocked';
    assert.equal(navigation.length, partial ? 4 : 5);
    report.boundedEditorOwnRootNavigationPassed = !partial;
    report.allFiveEditorOwnRootNavigationPassed = !partial;
    report.boundedPartialEditorOwnRootNavigationPassed = partial;
    report.status = partial
      ? 'PASSED-EDITOR-OWN-ROOT-FOUR-DATASET-UI-APP-PARTIAL'
      : 'PASSED-EDITOR-OWN-ROOT-FIVE-DATASET-UI-NOT-FULL-ACCEPTANCE';
    await context.close();
  } catch (error) {
    report.error = error.message;
    process.exitCode = 1;
  } finally {
    await browser?.close();
    report.finishedAt = new Date().toISOString();
    report.inputs = files;
    if (target) directories.write(target, 'report.private.json', json(report));
    directories.close();
  }
  return { output: target ? output : undefined, status: report.status,
    boundedEditorOwnRootNavigationPassed: report.boundedEditorOwnRootNavigationPassed };
}

export async function main(argv = process.argv.slice(2)) {
  const { values } = parseArgs({ args: argv, options: {
    launch: { type: 'string' }, 'launch-report-sha256': { type: 'string' }, 'state-sha256': { type: 'string' },
    'deployment-input': { type: 'string' }, 'deployment-input-sha256': { type: 'string' },
    'seed-receipt': { type: 'string' }, 'seed-receipt-sha256': { type: 'string' },
    'run-id': { type: 'string' }, actor: { type: 'string' }, 'root-side': { type: 'string' },
    locale: { type: 'string' }, viewport: { type: 'string' }, output: { type: 'string' },
    'run-readonly-browser': { type: 'boolean' }, 'allow-partial': { type: 'boolean' },
    help: { type: 'boolean', short: 'h' },
  } });
  if (values.help) {
    console.log('Owned editor own-root five-dataset UI, read-only. Required: --launch PATH --launch-report-sha256 SHA ' +
      '--state-sha256 SHA --deployment-input PRIVATE_PATH --deployment-input-sha256 SHA ' +
      '--seed-receipt PRIVATE_PATH --seed-receipt-sha256 SHA --run-id ID --actor MANIFEST_LOGIN ' +
      '--root-side a|b --locale zh-CN|en-US --viewport desktop|mobile --output NEW_PATH --run-readonly-browser');
    return;
  }
  console.log(JSON.stringify(await runOwnedFiveDatasetBrowser({
    launch: values.launch, launchReportSha256: values['launch-report-sha256'], stateSha256: values['state-sha256'],
    deploymentInput: values['deployment-input'], deploymentInputSha256: values['deployment-input-sha256'],
    seedReceipt: values['seed-receipt'], seedReceiptSha256: values['seed-receipt-sha256'],
    runId: values['run-id'], actor: values.actor, rootSide: values['root-side'],
    locale: values.locale, viewport: values.viewport, output: values.output,
    runReadonlyBrowser: values['run-readonly-browser'], allowPartial: values['allow-partial'],
  })));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(() => {
    console.error('Owned five-dataset browser refused; private input details suppressed');
    process.exitCode = 1;
  });
}
