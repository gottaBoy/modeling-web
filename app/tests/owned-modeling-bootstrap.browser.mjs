import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { PinnedDirectories, readPinnedFile } from '../../../scripts/native-candidate-files.mjs';
import { verifyBridgeProcess, verifyOwnedBridgeRuntime } from '../../../scripts/launch-owned-native-modeldesign.mjs';
import { verifyModelingAppData } from '../../../scripts/run-owned-native-permission-http.mjs';
import { launchChromium } from '../../../scripts/browser-launch.mjs';
import { captureNativeLogin } from './native-model-contract.mjs';
import {
  collectNativeIndexEvidence, configureNativeBrowserLanguage, submitNativeLogin, waitForNativeIndexReady,
} from './native-modeldesign.browser.mjs';
import { nativeReadCollections, readOnlyBrowserRequestAllowed } from './owned-five-dataset.browser.mjs';

const workspace = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const hash = value => createHash('sha256').update(value).digest('hex');
const json = value => `${JSON.stringify(value, null, 2)}\n`;
const appId = 'ibizmodeling__modeldesign';
const clean = value => String(value).replace(/(refresh_token\/)[^/"'\s?]+/gi, '$1[redacted]')
  .replace(/(Bearer\s+)[A-Za-z0-9_.-]+/gi, '$1[redacted]');
const pathInside = (root, value) => {
  const path = resolve(workspace, value);
  const child = relative(root, path);
  assert.ok(child && !child.startsWith('../') && !child.startsWith('/'));
  return path;
};

export function browserReadMatrix(manifest) {
  return manifest.users.flatMap(actor => manifest.roots.flatMap(root =>
    ['zh-CN', 'en-US'].flatMap(locale => ['desktop', 'mobile'].map(viewport => ({
      actor: actor.loginname, role: actor.role, rootId: root.rootId, locale, viewport,
      expectedRead: actor.rootId === root.rootId && ['editor', 'viewer'].includes(actor.role),
      status: 'NOT-EXECUTED-NOT-ACCEPTED',
    })))));
}

export function expectedBootstrapPreAuth401(response, lifecycle, { origin } = {}) {
  const paths = [`/api/${appId}/appdata`, `/api/${appId}/uaa/getbydcsystem/ibizmodeling`];
  return Boolean(typeof origin === 'string' && response?.origin === origin &&
    response.method === 'GET' && response.status === 401 && paths.includes(response.path) &&
    response.authorizationPresent === false && response.phaseAtRequest === 'pre-auth' &&
    response.phaseAtResponse === 'pre-auth' &&
    Number.isSafeInteger(response.requestSequence) && response.requestSequence > 0 &&
    Number.isSafeInteger(response.responseSequence) && response.responseSequence >= response.requestSequence &&
    Number.isSafeInteger(lifecycle?.loginSubmittedSequence) &&
    lifecycle.loginSubmittedSequence > response.responseSequence &&
    Number.isSafeInteger(lifecycle?.loginVerifiedSequence) &&
    lifecycle.loginVerifiedSequence > lifecycle.loginSubmittedSequence);
}

export function ownedBootstrapContextExpectation(actor, root) {
  assert.ok(actor && root && actor.rootId === root.rootId && actor.role === 'editor');
  const expected = { rootId: root.rootId, logicalSystemId: root.logicalSystemId,
    personId: actor.personId, centerId: actor.centerId,
    organizationId: `${actor.centerId}_org`, systemId: 'ibizmodeling' };
  validateOwnedBootstrapExpectation(expected);
  return expected;
}

function validateOwnedBootstrapExpectation(expected) {
  assert.deepEqual(Object.keys(expected ?? {}).sort(),
    ['centerId', 'logicalSystemId', 'organizationId', 'personId', 'rootId', 'systemId']);
  for (const value of Object.values(expected)) {
    assert.ok(typeof value === 'string' && value.length > 0 && value.length <= 256 && !/[\s\u0000-\u001f\u007f]/.test(value));
  }
  assert.equal(expected.organizationId, `${expected.centerId}_org`);
  assert.equal(expected.systemId, 'ibizmodeling');
}

const expectedAppdataContext = expected => ({
  srfsystemid: expected.systemId, srforgid: expected.organizationId,
  srfuserid: expected.personId, srfpersonid: expected.personId, srfdcid: expected.centerId,
});

export function verifyOwnedBootstrapProjection(appdata, {
  expected, origin, headers, observation, loginSubmittedSequence,
}) {
  validateOwnedBootstrapExpectation(expected);
  assert.equal(appdata.status, 200);
  assert.equal(appdata.error, null);
  const context = expectedAppdataContext(expected);
  for (const [key, value] of Object.entries(context)) assert.equal(appdata.data?.context?.[key], value);
  assert.deepEqual(headers, { srforgid: expected.organizationId,
    srfsystemid: expected.systemId, authorizationPresent: true });
  assert.match(origin ?? '', /^http:\/\/127\.0\.0\.1:\d+$/);
  assert.equal(observation?.origin, origin);
  assert.equal(observation.path, `/api/${appId}/appdata`);
  assert.equal(observation.method, 'GET');
  assert.equal(observation.status, 200);
  assert.equal(observation.authorizationPresent, true);
  assert.ok(['login-submitted', 'authenticated'].includes(observation.phaseAtRequest));
  assert.ok(['login-submitted', 'authenticated'].includes(observation.phaseAtResponse));
  assert.ok(Number.isSafeInteger(loginSubmittedSequence) && loginSubmittedSequence > 0);
  assert.ok(Number.isSafeInteger(observation.requestSequence) && observation.requestSequence > loginSubmittedSequence);
  assert.ok(Number.isSafeInteger(observation.responseSequence) &&
    observation.responseSequence >= observation.requestSequence);
  assert.match(observation.bodySha256 ?? '', /^[a-f0-9]{64}$/);
  const field = Object.getOwnPropertyDescriptor(appdata.data, 'srfmodelcontext');
  assert.ok(field && 'value' in field, 'Normal owned appdata requires a top-level model-context projection');
  const projection = field.value;
  assert.ok(projection && typeof projection === 'object' && !Array.isArray(projection));
  assert.deepEqual(Reflect.ownKeys(projection).sort(), ['psdevslnsys', 'pssystemid']);
  for (const [key, value] of [['psdevslnsys', expected.rootId], ['pssystemid', expected.logicalSystemId]]) {
    const descriptor = Object.getOwnPropertyDescriptor(projection, key);
    assert.ok(descriptor && 'value' in descriptor && typeof descriptor.value === 'string');
    assert.equal(descriptor.value, value);
  }
  return {
    source: 'normal-authenticated-ui-appdata', context,
    projection: { psdevslnsys: projection.psdevslnsys, pssystemid: projection.pssystemid },
    headers: { ...headers }, requestSequence: observation.requestSequence,
    responseSequence: observation.responseSequence, bodySha256: observation.bodySha256,
  };
}

export function verifyOwnedBootstrapIndexContext(evidence, expected) {
  validateOwnedBootstrapExpectation(expected);
  assert.equal(evidence?.matchingIndexCount, 1);
  const index = evidence.index;
  assert.ok(typeof index?.controllerId === 'string' && index.controllerId.length > 0 &&
    index.controllerId.length <= 256 && !/[\s\u0000-\u001f\u007f]/.test(index.controllerId));
  assert.equal(index.controllerId, index.domId);
  assert.equal(index.codeName?.toLowerCase(), 'modelingindex');
  assert.equal(index.viewType, 'APPINDEXVIEW');
  assert.equal(index.appId, appId);
  assert.equal(index.visible, true);
  assert.deepEqual(index.lifecycle, {
    isCreated: true, isMounted: true, isLoading: false, isDestroyed: false, hasError: false,
  });
  const context = { psdevslnsys: expected.rootId, pssystemid: expected.logicalSystemId,
    ...expectedAppdataContext(expected) };
  assert.deepEqual(index.context, context, 'The actual APPINDEX context must consume this actor/root/logical system');
  return { source: 'public-appindex-view-stack', matchingIndexCount: 1,
    domId: index.domId, controllerId: index.controllerId, codeName: index.codeName,
    viewType: index.viewType, appId: index.appId, visible: true,
    lifecycle: { ...index.lifecycle }, context };
}

function verifyOwnedBootstrapContextRow(row, { origin, expected }) {
  const evidence = row.ownedModelContext;
  assert.equal(evidence?.required, true);
  assert.deepEqual(evidence.expected, expected);
  assert.equal(evidence.appdata?.source, 'normal-authenticated-ui-appdata');
  const observed = row.responses.find(response =>
    response.requestSequence === evidence.appdata.requestSequence &&
    response.responseSequence === evidence.appdata.responseSequence &&
    response.bodySha256 === evidence.appdata.bodySha256);
  assert.ok(observed, 'Projection proof must bind the actually observed appdata response');
  const actor = { personId: expected.personId, centerId: expected.centerId };
  verifyModelingAppData({ status: 200, error: null, data: { context: evidence.appdata.context } },
    actor, { system: expected.systemId, organization: expected.organizationId });
  assert.deepEqual(verifyOwnedBootstrapProjection({
    status: observed.status, error: null, data: {
      context: evidence.appdata.context, srfmodelcontext: evidence.appdata.projection,
    },
  }, { expected, origin, headers: evidence.appdata.headers, observation: observed,
    loginSubmittedSequence: row.authenticationLifecycle.loginSubmittedSequence }), evidence.appdata);
  assert.equal(evidence.index?.source, 'public-appindex-view-stack');
  assert.deepEqual(verifyOwnedBootstrapIndexContext({
    matchingIndexCount: evidence.index.matchingIndexCount, index: evidence.index,
  }, expected), evidence.index);
  return true;
}

export function summarizeBootstrapCase(row, {
  origin, requireOwnedModelContext = false, expectedModelContext,
} = {}) {
  assert.equal(typeof requireOwnedModelContext, 'boolean');
  const blockers = [];
  const expectedPreAuthResponses = [];
  if (typeof origin !== 'string' || !/^http:\/\/127\.0\.0\.1:\d+$/.test(origin)) {
    blockers.push({ type: 'missing-bound-loopback-origin' });
  }
  for (const name of ['responses', 'blocked', 'errors', 'failedRequests']) {
    if (!Array.isArray(row?.[name])) blockers.push({ type: 'missing-evidence-array', name });
  }
  if (row?.error) blockers.push({ type: 'runner-error', message: row.error });
  const login = row?.stages?.login;
  const lifecycle = row?.authenticationLifecycle;
  if (!(login?.status === 200 && login.tokenIssued === true && login.tokenPersisted === true &&
      Number.isSafeInteger(lifecycle?.loginSubmittedSequence) && lifecycle.loginSubmittedSequence > 0 &&
      Number.isSafeInteger(lifecycle?.loginVerifiedSequence) &&
      lifecycle.loginVerifiedSequence > lifecycle.loginSubmittedSequence)) {
    blockers.push({ type: 'native-login-not-verified' });
  }
  if (row?.stages?.bootstrap?.status !== 'PASS' ||
      row.stages.bootstrap.naturallyAuthenticatedAppdata !== true) {
    blockers.push({ type: 'native-appdata-not-verified' });
  }
  if (row?.stages?.home?.status !== 'PASS') blockers.push({ type: 'native-home-not-ready' });
  if (row?.stages?.systemMenu?.status !== 'CLICKED-NOT-YET-NAVIGATION-ACCEPTED') {
    blockers.push({ type: 'natural-menu-click-not-observed' });
  }
  let ownedModelContextVerified = false;
  if (requireOwnedModelContext) {
    try {
      assert.ok(expectedModelContext);
      ownedModelContextVerified = verifyOwnedBootstrapContextRow(row, { origin, expected: expectedModelContext });
    } catch {
      blockers.push({ type: 'owned-model-context-not-verified' });
    }
  }
  for (const error of Array.isArray(row?.errors) ? row.errors : []) blockers.push({ type: 'browser-error', evidence: error });
  for (const failure of Array.isArray(row?.failedRequests) ? row.failedRequests : []) {
    blockers.push({ type: 'failed-network-request', evidence: failure });
  }
  for (const request of Array.isArray(row?.blocked) ? row.blocked : []) {
    blockers.push({ type: 'locally-blocked-request', evidence: request });
  }
  for (const response of Array.isArray(row?.responses) ? row.responses : []) {
    if (!Number.isInteger(response?.status) || response.status < 100 || response.status > 599) {
      blockers.push({ type: 'invalid-http-response-evidence', evidence: response });
    } else if (response.status >= 400) {
      if (expectedBootstrapPreAuth401(response, row.authenticationLifecycle, { origin })) {
        expectedPreAuthResponses.push(response);
      } else blockers.push({ type: 'unexpected-http-error', evidence: response });
    }
  }
  return {
    status: blockers.length === 0
      ? 'BOOTSTRAP-AND-NATURAL-CLICK-OBSERVED-NOT-NATIVE-ACCEPTED' : 'FAILED',
    diagnosticOnly: true, nativeAcceptance: false, permissionAcceptance: false,
    fullApplicationAcceptance: false, blockers, expectedPreAuthResponses,
    ownedModelContext: { required: requireOwnedModelContext, verified: ownedModelContextVerified,
      appdataProjectionVerified: ownedModelContextVerified,
      sameActorAndOrganizationVerified: ownedModelContextVerified,
      appindexRootAndLogicalSystemConsumed: ownedModelContextVerified },
  };
}

export async function runBootstrapBrowser(options) {
  assert.equal(options.runReadonlyBrowser, true);
  const requireOwnedModelContext = options.requireOwnedModelContext ?? false;
  assert.equal(typeof requireOwnedModelContext, 'boolean');
  for (const key of ['launchSha256', 'stateSha256', 'deploymentSha256']) assert.match(options[key] ?? '', /^[a-f0-9]{64}$/);
  assert.match(options.runId ?? '', /^[a-f0-9]{12}$/);
  const output = pathInside(join(workspace, '.artifacts/owned-modeling-bootstrap-browser'), options.output);
  assert.equal(dirname(output), join(workspace, '.artifacts/owned-modeling-bootstrap-browser'));
  assert.match(basename(output), /^[a-z0-9][a-z0-9-]{0,95}$/);
  const dirs = new PinnedDirectories();
  const bound = [];
  const read = (path, sha, privateInput = false) => {
    path = pathInside(workspace, path);
    const file = readPinnedFile(dirs, dirs.open(dirname(path)), basename(path));
    if (sha) assert.equal(hash(file.data), sha);
    if (privateInput) {
      assert.equal(file.identity.uid, process.geteuid());
      assert.equal(file.identity.mode & 0o077, 0);
    }
    bound.push({ path, bytes: file.data.length, sha256: hash(file.data) });
    return JSON.parse(file.data);
  };
  const directory = dirs.open(output, { create: true, exclusive: true });
  const report = {
    contract: 'owned-modeling-bootstrap-live-ui-v1', status: 'FAILED',
    nativeAcceptance: false, permissionAcceptance: false, editorSaveAcceptance: false,
    freshSessionReadbackAcceptance: false, modelWritesRequested: false,
    identityOrHeaderInjection: false, acceptedForProduction: false,
    requireOwnedModelContext, ownedModelContextVerified: false,
    startedAt: new Date().toISOString(), cases: [],
    source: { path: fileURLToPath(import.meta.url), sha256: hash(fs.readFileSync(fileURLToPath(import.meta.url))) },
  };
  let browser;
  try {
    const launch = pathInside(join(workspace, '.artifacts/owned-native-modeldesign-launch'), options.launch);
    assert.equal(dirname(launch), join(workspace, '.artifacts/owned-native-modeldesign-launch'));
    const launchReport = read(join(launch, 'report.json'), options.launchSha256);
    assert.equal(launchReport.status, 'RUNNING-OWNED-FRONTEND-NOT-ACCEPTED');
    const state = read(join(launch, 'launch-state.private.json'), options.stateSha256, true);
    const input = read(launchReport.input.path, launchReport.input.sha256);
    assert.deepEqual(state.input, launchReport.input);
    assert.equal(input.ownedBackend.runId, options.runId);
    const deploymentPath = pathInside(join(workspace, '.artifacts/native-nonadmin-fixtures', options.runId), options.deployment);
    const deployment = read(deploymentPath, options.deploymentSha256, true);
    assert.equal(deployment.runId, options.runId);
    assert.equal(input.ownedBackend.deploymentInput.sha256, options.deploymentSha256);
    assert.equal(launchReport.deploymentInput.path, deploymentPath);
    const manifest = read(input.ownedBackend.manifest.path, input.ownedBackend.manifest.sha256);
    const credentials = read(join(dirname(input.ownedBackend.manifest.path), 'credentials.private.json'), undefined, true);
    const actor = manifest.users.find(user => user.loginname === options.actor);
    const root = manifest.roots.find(value => value.side === options.rootSide);
    assert.ok(actor && root && actor.role === 'editor' && actor.rootId === root.rootId,
      'Only editor own-root probes are enabled; other matrix rows stay unexecuted');
    const expectedModelContext = requireOwnedModelContext ? ownedBootstrapContextExpectation(actor, root) : undefined;
    report.matrix = browserReadMatrix(manifest);
    report.runId = manifest.runId;
    report.actor = { loginname: actor.loginname, role: actor.role, rootId: actor.rootId };
    const specs = state.bridges.map(bridge => ({
      bridge, spec: read(bridge.specPath, bridge.specSha256, true),
    }));
    const guard = fullMountedHash => {
      for (const file of bound) {
        const current = readPinnedFile(dirs, dirs.open(dirname(file.path)), basename(file.path));
        assert.equal(hash(current.data), file.sha256);
      }
      for (const { bridge, spec } of specs) {
        assert.equal(spec.runtime.deploymentPath, deploymentPath);
        verifyBridgeProcess(bridge.identity, bridge.specPath, bridge.specSha256);
        verifyOwnedBridgeRuntime({ workspace, directories: dirs, input,
          runtime: spec.runtime, frontendPins: spec.frontendPins, fullMountedHash });
      }
    };
    guard(true);
    const app = input.applications.find(value => value.application === 'ModelDesign');
    const origin = new URL(app.entry).origin;
    const api = read(join(workspace,
      'vendor-upstream/ibizmodeling-standard/modelapi-core/src/main/resources/model/net/ibizsys/modeling/PSSYSSERVICEAPIS/ModelAPI.json'));
    const readPolicy = {
      rootIds: manifest.roots.map(value => value.rootId),
      readFetchPaths: new Set(api.getPSDEServiceAPIs.flatMap(entity =>
        (entity.getPSDEServiceAPIMethods ?? []).filter(method =>
          method.methodType === 'FETCH' && method.dataAccessAction === 'READ')
          .map(method => `${entity.codeName2.toLowerCase()}/${method.codeName.toLowerCase()}`))),
      readCollections: nativeReadCollections(api),
      readRecordKeys: new Set(manifest.roots.flatMap(row => [row.sentinelId, row.logicalSystemId])),
    };
    const require = createRequire(join(workspace, 'ibiz-app-hub/package.json'));
    browser = await launchChromium(require('playwright').chromium, { args: ['--no-sandbox'] });
    for (const locale of ['zh-CN', 'en-US']) for (const viewportName of ['desktop', 'mobile']) {
      guard(false);
      const row = { locale, viewport: viewportName, status: 'FAILED', stages: {},
        responses: [], blocked: [], errors: [], failedRequests: [], startedAt: new Date().toISOString(),
        authenticationLifecycle: { loginSubmittedSequence: null, loginVerifiedSequence: null },
        M03: { status: 'NOT-EXECUTED-NOT-ACCEPTED', reason: 'Requires successful native list/editor navigation and a complete config-r6 native seed receipt; no writes authorized by this probe' } };
      if (requireOwnedModelContext) row.ownedModelContext = {
        required: true, expected: expectedModelContext, appdata: null, index: null,
      };
      report.cases.push(row);
      const context = await browser.newContext({
        locale, serviceWorkers: 'block', viewport: viewportName === 'desktop'
          ? { width: 1440, height: 900 } : { width: 390, height: 844 },
      });
      const page = await context.newPage();
      page.setDefaultTimeout(20_000);
      await configureNativeBrowserLanguage(context, locale);
      const screenshot = async stage => {
        const name = `${locale}-${viewportName}-${stage}.png`;
        await page.screenshot({ path: join(output, name), fullPage: true });
        row[`${stage}Screenshot`] = name;
      };
      let phase = 'pre-auth';
      let eventSequence = 0;
      const requests = new WeakMap();
      let appdata;
      const pending = [];
      page.on('request', request => requests.set(request, { phase, sequence: ++eventSequence }));
      page.on('response', response => {
        const url = new URL(response.url());
        const request = response.request();
        const requested = requests.get(request);
        const observed = { origin: url.origin, path: clean(url.pathname), status: response.status(),
          method: request.method(), phaseAtRequest: requested?.phase ?? 'unobserved',
          phaseAtResponse: phase, requestSequence: requested?.sequence ?? null, responseSequence: ++eventSequence,
          authorizationPresent: null };
        row.responses.push(observed);
        pending.push((async () => {
          const headers = await request.allHeaders();
          observed.authorizationPresent = Boolean(headers.authorization);
          if (url.origin === origin && url.pathname === `/api/${appId}/appdata` && response.status() === 200) {
            let data;
            if (requireOwnedModelContext) {
              const body = await response.body();
              observed.bodySha256 = hash(body);
              data = JSON.parse(body.toString('utf8'));
            } else data = await response.json();
            appdata = { status: 200, error: null, data, observation: observed };
            row.appdataHeaders = { srforgid: headers.srforgid ?? null, srfsystemid: headers.srfsystemid ?? null,
              authorizationPresent: Boolean(headers.authorization) };
          }
        })().catch(error => row.errors.push({ type: 'response-evidence', path: clean(url.pathname),
          message: clean(error.message) })));
      });
      page.on('pageerror', error => row.errors.push({ type: 'pageerror', phase,
        sequence: ++eventSequence, message: clean(error.message) }));
      page.on('console', message => {
        if (message.type() === 'error') row.errors.push({ type: 'console', phase,
          sequence: ++eventSequence, message: clean(message.text()) });
      });
      page.on('requestfailed', request => {
        const requested = requests.get(request);
        row.failedRequests.push({ method: request.method(), path: clean(new URL(request.url()).pathname),
          phaseAtRequest: requested?.phase ?? 'unobserved', phaseAtFailure: phase,
          requestSequence: requested?.sequence ?? null, failureSequence: ++eventSequence,
          failure: clean(request.failure()?.errorText ?? 'unknown-request-failure') });
      });
      await context.route('**/*', route => {
        const request = route.request();
        const url = new URL(request.url());
        const method = request.method();
        const sessionRefresh = method === 'GET' &&
          new RegExp(`^/api/${appId}/uaa/refresh_token/[A-Za-z0-9-]+$`).test(url.pathname);
        const counterRead = method === 'POST' && url.pathname === `/api/${appId}/work_items/count_my_todo`;
        if (url.origin === origin && (sessionRefresh || counterRead ||
          readOnlyBrowserRequestAllowed({ method, path: url.pathname }, readPolicy))) {
          return route.continue();
        }
        row.blocked.push({ method, path: clean(url.pathname), origin: url.origin });
        return route.abort('blockedbyclient');
      });
      try {
        const entry = new URL(app.entry);
        entry.hash = `/psdevslnsys=${root.rootId}/modelingindex/-`;
        await page.goto(entry.href, { waitUntil: 'domcontentloaded' });
        await page.locator('input[type="password"]').first().waitFor();
        await screenshot('login');
        await page.locator('input[type="text"]').first().fill(actor.loginname);
        await page.locator('input[type="password"]').first().fill(credentials.users[actor.loginname]);
        row.stages.login = await captureNativeLogin(page, { entry: app.entry, applicationId: appId },
          () => {
            phase = 'login-submitted';
            row.authenticationLifecycle.loginSubmittedSequence = ++eventSequence;
            return submitNativeLogin(page, locale);
          });
        phase = 'authenticated';
        row.authenticationLifecycle.loginVerifiedSequence = ++eventSequence;
        const deadline = Date.now() + 30_000;
        while (!appdata && Date.now() < deadline) {
          await Promise.all(pending); await page.waitForTimeout(100);
        }
        assert.ok(appdata, 'Normal login did not produce authenticated appdata');
        verifyModelingAppData(appdata, actor, { system: 'ibizmodeling', organization: `${actor.centerId}_org` });
        assert.deepEqual(row.appdataHeaders, { srforgid: `${actor.centerId}_org`,
          srfsystemid: 'ibizmodeling', authorizationPresent: true });
        row.stages.bootstrap = { status: 'PASS', naturallyAuthenticatedAppdata: true };
        if (requireOwnedModelContext) row.ownedModelContext.appdata = verifyOwnedBootstrapProjection(appdata, {
          expected: expectedModelContext, origin, headers: row.appdataHeaders, observation: appdata.observation,
          loginSubmittedSequence: row.authenticationLifecycle.loginSubmittedSequence,
        });
        try {
          row.stages.home = { status: 'PASS', evidence: await waitForNativeIndexReady(page, {
            application: 'ModelDesign', applicationId: appId,
            indexPath: 'PSSYSAPPS/ModelDesign/PSAPPINDEXVIEWS/ModelingIndex.json',
          }) };
        } catch (error) { row.stages.home = { status: 'FAIL', error: clean(error.message), evidence: error.evidence }; }
        await screenshot('home');
        const index = await page.evaluate(collectNativeIndexEvidence, {
          application: 'ModelDesign', applicationId: appId,
          indexPath: 'PSSYSAPPS/ModelDesign/PSAPPINDEXVIEWS/ModelingIndex.json',
        });
        if (requireOwnedModelContext) row.ownedModelContext.index =
          verifyOwnedBootstrapIndexContext(index, expectedModelContext);
        const items = index.menus.filter(menu => menu.name === 'leftsidemenu').flatMap(menu => menu.items)
          .filter(item => item.target?.viewId?.toLowerCase().endsWith('pssystemmainsidebartreeview') &&
            item.visible === true && item.permitted === true && item.dom.length === 1 && !item.dom[0].disabled);
        assert.equal(items.length, 1, 'System menu must resolve uniquely from its actual model');
        const locator = page.locator(items[0].dom[0].selector);
        row.pointer = await locator.evaluate(element => {
          const rect = element.getBoundingClientRect();
          const hit = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
          return { rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
            hit: hit ? { tag: hit.tagName, className: hit.className, text: hit.textContent?.slice(0, 180) } : null,
            targetReceivesPointer: Boolean(hit && (hit === element || element.contains(hit))) };
        });
        row.openDrawers = await page.locator('.ibiz-drawer.open').count();
        if (!row.pointer.targetReceivesPointer && row.openDrawers > 0) {
          await page.keyboard.press('Escape');
          await page.waitForTimeout(200);
          row.normalDrawerDismissal = {
            operation: 'trusted-keyboard-Escape', before: row.openDrawers,
            after: await page.locator('.ibiz-drawer.open').count(),
          };
          await screenshot('after-escape');
        }
        try {
          await locator.click();
          row.stages.systemMenu = { status: 'CLICKED-NOT-YET-NAVIGATION-ACCEPTED' };
        } catch (error) {
          row.stages.systemMenu = { status: 'FAIL', error: clean(error.message) };
        }
        await screenshot('menu');
      } catch (error) {
        row.error = clean(error.message);
        await screenshot('failure').catch(() => {});
      } finally {
        await Promise.all(pending);
        phase = 'closing';
        await context.close();
        await Promise.all(pending);
        row.summary = summarizeBootstrapCase(row, { origin, requireOwnedModelContext, expectedModelContext });
        row.status = row.summary.status;
        row.finishedAt = new Date().toISOString();
        const matrix = report.matrix.find(value => value.actor === actor.loginname && value.rootId === root.rootId &&
          value.locale === locale && value.viewport === viewportName);
        matrix.status = row.status;
        dirs.write(directory, `${locale}-${viewportName}.private.json`, json(row));
        console.log(JSON.stringify({ locale, viewport: viewportName, status: row.status,
          bootstrap: row.stages.bootstrap?.status, menu: row.stages.systemMenu?.status, error: row.error }));
      }
    }
    guard(true);
    report.status = report.cases.every(row => row.status.startsWith('BOOTSTRAP'))
      ? 'OBSERVED-BOOTSTRAP-NATURAL-CLICK-NOT-FULL-ACCEPTANCE' : 'FAILED-LIVE-BROWSER-REMAINING-BLOCKERS';
    report.ownedModelContextVerified = requireOwnedModelContext && report.cases.length === 4 &&
      report.cases.every(row => row.summary?.ownedModelContext.verified === true);
  } catch (error) { report.error = clean(error.message); }
  finally {
    await browser?.close();
    report.finishedAt = new Date().toISOString();
    report.inputs = bound;
    dirs.write(directory, 'report.private.json', json(report));
    dirs.close();
  }
  console.log(JSON.stringify({ output, status: report.status, cases: report.cases.length }));
  if (!report.status.startsWith('OBSERVED')) process.exitCode = 1;
  return report;
}

export async function main(argv = process.argv.slice(2)) {
  const { values } = parseArgs({ args: argv, options: {
    launch: { type: 'string' }, 'launch-sha256': { type: 'string' }, 'state-sha256': { type: 'string' },
    deployment: { type: 'string' }, 'deployment-sha256': { type: 'string' },
    'run-id': { type: 'string' }, actor: { type: 'string' }, 'root-side': { type: 'string' },
    output: { type: 'string' }, 'run-readonly-browser': { type: 'boolean' },
    'require-owned-model-context': { type: 'boolean' },
  } });
  return runBootstrapBrowser({
    launch: values.launch, launchSha256: values['launch-sha256'], stateSha256: values['state-sha256'],
    deployment: values.deployment, deploymentSha256: values['deployment-sha256'],
    runId: values['run-id'], actor: values.actor, rootSide: values['root-side'],
    output: values.output, runReadonlyBrowser: values['run-readonly-browser'],
    requireOwnedModelContext: values['require-owned-model-context'],
  });
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(clean(error.message)); process.exitCode = 1; });
}
