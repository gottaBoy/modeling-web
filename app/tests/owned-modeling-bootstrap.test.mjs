import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createServer, get } from 'node:http';
import { createRequire } from 'node:module';
import test from 'node:test';
import { launchChromium } from '../../../scripts/browser-launch.mjs';
import { captureNativeLogin } from './native-model-contract.mjs';
import {
  browserReadMatrix, expectedBootstrapPreAuth401, runBootstrapBrowser, summarizeBootstrapCase,
  ownedBootstrapContextExpectation, verifyOwnedBootstrapIndexContext, verifyOwnedBootstrapProjection,
  createBootstrapEvidenceTracker, finishBootstrapContext, runBootstrapScopeAction,
  waitForBootstrapLoginReady, startEmbeddedWorkspaceWrapper, applicationFramePage,
  verifyEmbeddedWorkspaceEvidence, verifyEmbeddedWorkspaceUi, waitForEmbeddedDomStable,
  collectOwnedShellDom, verifyOwnedShellDom, verifyOwnedShellEvidence,
  retainBootstrapPageRoute,
} from './owned-modeling-bootstrap.browser.mjs';

const manifest = {
  roots: [{ side: 'a', rootId: 'owned_a' }, { side: 'b', rootId: 'owned_b' }],
  users: ['a', 'b'].flatMap(side => ['editor', 'viewer', 'no-access'].map(role => ({
    loginname: `owned_${side}_${role}`, role, rootId: `owned_${side}`,
  }))),
};
const origin = 'http://127.0.0.1:32459';
const appPrefix = '/api/ibizmodeling__modeldesign';
const validRow = () => ({
  stages: { login: { status: 200, tokenIssued: true, tokenPersisted: true },
    bootstrap: { status: 'PASS', naturallyAuthenticatedAppdata: true },
    home: { status: 'PASS' }, systemMenu: { status: 'CLICKED-NOT-YET-NAVIGATION-ACCEPTED' } },
  authenticationLifecycle: { loginSubmittedSequence: 10, loginVerifiedSequence: 20 },
  responses: [], blocked: [], errors: [], failedRequests: [],
});
const preAuth401 = () => ({
  origin, path: `${appPrefix}/appdata`, status: 401, method: 'GET', authorizationPresent: false,
  phaseAtRequest: 'pre-auth', phaseAtResponse: 'pre-auth', requestSequence: 2, responseSequence: 4,
});

test('M04 skeleton enumerates every actor, both roots, both native languages and both stable viewports', () => {
  const matrix = browserReadMatrix(manifest);
  assert.equal(matrix.length, 48);
  assert.equal(new Set(matrix.map(row =>
    [row.actor, row.rootId, row.locale, row.viewport].join('|'))).size, 48);
  assert.ok(matrix.every(row => row.status === 'NOT-EXECUTED-NOT-ACCEPTED'));
});

for (const role of ['editor', 'viewer', 'no-access']) {
  test(`M04 ${role} expectation does not infer cross-root read access`, () => {
    const matrix = browserReadMatrix(manifest).filter(row => row.role === role);
    assert.equal(matrix.length, 16);
    assert.equal(matrix.filter(row => row.expectedRead).length, role === 'no-access' ? 0 : 8);
    for (const row of matrix) {
      const actor = manifest.users.find(user => user.loginname === row.actor);
      assert.equal(row.expectedRead, actor.rootId === row.rootId && role !== 'no-access');
      assert.equal(row.status, 'NOT-EXECUTED-NOT-ACCEPTED');
    }
  });
}

test('creating the matrix does not mutate the owned manifest or promote any row', () => {
  const before = structuredClone(manifest);
  const matrix = browserReadMatrix(manifest);
  matrix[0].status = 'fixture-only';
  assert.deepEqual(manifest, before);
  assert.ok(browserReadMatrix(manifest).every(row => row.status === 'NOT-EXECUTED-NOT-ACCEPTED'));
});

test('bootstrap uses the shared native built-in Get policy instead of requiring codeName metadata', () => {
  const source = readFileSync(new URL('./owned-modeling-bootstrap.browser.mjs', import.meta.url), 'utf8');
  assert.match(source, /import \{ nativeReadCollections, readOnlyBrowserRequestAllowed \} from '\.\/owned-five-dataset\.browser\.mjs'/);
  assert.match(source, /readCollections: nativeReadCollections\(api\)/);
  assert.doesNotMatch(source, /method\.codeName === 'Get'/);
});

test('live execution cannot begin without its explicit read-only execution switch', async () => {
  await assert.rejects(runBootstrapBrowser({}), /true/);
});

test('live execution refuses an unpinned launch before browser or Docker access', async () => {
  await assert.rejects(runBootstrapBrowser({ runReadonlyBrowser: true }), /match|undefined|string/i);
});

test('a clean bootstrap row is diagnostic-only and does not become full application acceptance', () => {
  const row = validRow();
  const original = structuredClone(row);
  const result = summarizeBootstrapCase(row, { origin });
  assert.equal(result.status, 'BOOTSTRAP-AND-NATURAL-CLICK-OBSERVED-NOT-NATIVE-ACCEPTED');
  assert.equal(result.diagnosticOnly, true);
  assert.equal(result.nativeAcceptance, false);
  assert.equal(result.permissionAcceptance, false);
  assert.equal(result.fullApplicationAcceptance, false);
  assert.deepEqual(result.blockers, []);
  assert.deepEqual(row, original);
});

test('only a precise unauthenticated bootstrap 401 completed before login submission is classified expected', () => {
  const row = validRow();
  for (const path of [`${appPrefix}/appdata`, `${appPrefix}/uaa/getbydcsystem/ibizmodeling`]) {
    const response = { ...preAuth401(), path };
    assert.equal(expectedBootstrapPreAuth401(response, row.authenticationLifecycle, { origin }), true);
    const result = summarizeBootstrapCase({ ...row, responses: [response] }, { origin });
    assert.equal(result.blockers.length, 0);
    assert.deepEqual(result.expectedPreAuthResponses, [response]);
  }
});

for (const [name, mutate] of [
  ['authenticated request', response => { response.authorizationPresent = true; }],
  ['unknown headers', response => { response.authorizationPresent = null; }],
  ['request submitted during login', response => { response.phaseAtRequest = 'login-submitted'; }],
  ['response received during login', response => { response.phaseAtResponse = 'login-submitted'; }],
  ['response after authentication', response => { response.phaseAtResponse = 'authenticated'; }],
  ['late response sequence', response => { response.responseSequence = 11; }],
  ['missing request event', response => { response.requestSequence = null; }],
  ['inverted request/response sequence', response => { response.requestSequence = 5; }],
  ['arbitrary API path', response => { response.path = `${appPrefix}/psmodules/missing`; }],
  ['foreign origin', response => { response.origin = 'http://127.0.0.1:30250'; }],
  ['POST rather than native bootstrap GET', response => { response.method = 'POST'; }],
  ['pre-auth server failure', response => { response.status = 500; }],
]) test(`bootstrap cannot excuse ${name} as an expected initial 401`, () => {
  const row = validRow();
  const response = preAuth401();
  mutate(response);
  assert.equal(expectedBootstrapPreAuth401(response, row.authenticationLifecycle, { origin }), false);
  const result = summarizeBootstrapCase({ ...row, responses: [response] }, { origin });
  assert.equal(result.status, 'FAILED');
  assert.ok(result.blockers.some(item => item.type === 'unexpected-http-error'));
});

for (const status of [400, 401, 403, 404, 429, 500, 503]) {
  test(`post-login HTTP ${status} blocks bootstrap even after home and menu succeeded`, () => {
    const row = validRow();
    row.responses.push({ ...preAuth401(), status, phaseAtRequest: 'authenticated',
      phaseAtResponse: 'authenticated', authorizationPresent: true, requestSequence: 25, responseSequence: 30 });
    assert.equal(summarizeBootstrapCase(row, { origin }).status, 'FAILED');
  });
}

for (const [name, mutate] of [
  ['console error', row => { row.errors.push({ type: 'console', message: 'a runtime error' }); }],
  ['legacy text-whitelisted navigation message', row => {
    row.errors.push({ type: 'console', phase: 'pre-auth',
      message: 'Navigation aborted from "/" to "/psdevslnsys=owned_a/modelingindex/-" via a navigation guard.' });
  }],
  ['console text describing expected 401', row => {
    row.responses.push(preAuth401());
    row.errors.push({ type: 'console', phase: 'pre-auth',
      message: 'Failed to load resource: the server responded with a status of 401 (Unauthorized)' });
  }],
  ['page exception', row => { row.errors.push({ type: 'pageerror', message: 'unhandled promise' }); }],
  ['failed network request', row => { row.failedRequests.push({ failure: 'net::ERR_CONNECTION_REFUSED' }); }],
  ['request failure during teardown', row => { row.failedRequests.push({ phaseAtFailure: 'closing', failure: 'net::ERR_ABORTED' }); }],
  ['locally blocked request', row => { row.blocked.push({ method: 'PUT', path: '/unreviewed' }); }],
  ['invalid login evidence', row => { row.stages.login.tokenPersisted = false; }],
  ['missing login lifecycle', row => { row.authenticationLifecycle.loginVerifiedSequence = null; }],
  ['unverified appdata', row => { row.stages.bootstrap.naturallyAuthenticatedAppdata = false; }],
  ['home failure', row => { row.stages.home.status = 'FAIL'; }],
  ['missing natural menu click', row => { row.stages.systemMenu.status = 'FAIL'; }],
  ['runner exception', row => { row.error = 'did not complete'; }],
  ['malformed evidence array', row => { row.responses = {}; }],
  ['invalid response status', row => { row.responses.push({ status: 0 }); }],
]) test(`${name} cannot be promoted by a successful-looking home/menu`, () => {
  const row = validRow();
  mutate(row);
  const result = summarizeBootstrapCase(row, { origin });
  assert.equal(result.status, 'FAILED');
  assert.ok(result.blockers.length > 0);
  assert.equal(result.nativeAcceptance, false);
});

test('response classification cannot promote an unbound origin or unsuccessful authentication lifecycle', () => {
  const row = validRow();
  assert.equal(summarizeBootstrapCase(row).status, 'FAILED');
  assert.equal(expectedBootstrapPreAuth401(preAuth401(), { loginSubmittedSequence: 10,
    loginVerifiedSequence: 9 }, { origin }), false);
});

test('runner source captures request lifecycle, all HTTP responses and requestfailed before final summary', () => {
  const source = readFileSync(new URL('./owned-modeling-bootstrap.browser.mjs', import.meta.url), 'utf8');
  assert.match(source, /page\.on\('request', request => \{[\s\S]*?requests\.set/);
  assert.match(source, /page\.on\('requestfailed'/);
  assert.match(source, /authorizationPresent = Boolean\(headers\.authorization\)/);
  assert.match(source, /phaseAtRequest: requested\?\.phase \?\? 'unobserved'/);
  assert.match(source, /row\.summary = summarizeBootstrapCase\(row, \{\s*origin, requireOwnedModelContext, expectedModelContext, embeddedWorkspace,/);
  assert.match(source, /row\.status = row\.summary\.status/);
  assert.ok(source.indexOf('await context.close();') < source.indexOf('row.summary = summarizeBootstrapCase'));
  assert.doesNotMatch(source, /if \(url\.origin !== origin \|\| !url\.pathname\.startsWith/);
  assert.doesNotMatch(source, /expectedAuthenticationEvent|responded with a status of 401|Navigation aborted/);
});

const ownedActor = {
  loginname: 'owned_a_editor', role: 'editor', rootId: 'owned_a',
  personId: 'owned_a_person', centerId: 'owned_a_center',
};
const ownedRoot = { rootId: 'owned_a', logicalSystemId: 'owned_logical_a' };
const expectedContext = ownedBootstrapContextExpectation(ownedActor, ownedRoot);
const ownedContext = () => ({
  srfsystemid: 'ibizmodeling', srforgid: 'owned_a_center_org',
  srfuserid: 'owned_a_person', srfpersonid: 'owned_a_person', srfdcid: 'owned_a_center',
});
const ownProjection = () => ({ psdevslnsys: 'owned_a', pssystemid: 'owned_logical_a' });
const ownedResponse = () => ({
  origin, path: `${appPrefix}/appdata`, status: 200, method: 'GET', authorizationPresent: true,
  phaseAtRequest: 'login-submitted', phaseAtResponse: 'authenticated',
  requestSequence: 15, responseSequence: 22, bodySha256: 'a'.repeat(64),
});
const ownedIndex = () => ({
  matchingIndexCount: 1,
  index: {
    domId: 'native-owned-index', controllerId: 'native-owned-index', codeName: 'ModelingIndex',
    viewType: 'APPINDEXVIEW', appId: 'ibizmodeling__modeldesign', visible: true,
    lifecycle: { isCreated: true, isMounted: true, isLoading: false, isDestroyed: false, hasError: false },
    context: { psdevslnsys: 'owned_a', pssystemid: 'owned_logical_a', ...ownedContext() },
  },
});
function ownedRow() {
  const row = validRow();
  row.scope = 'MODELINGINDEX-BOOTSTRAP-ONLY';
  row.stages.systemMenu = { status: 'NOT-EXECUTED-APPINDEX-ONLY' };
  row.stages.navigation = { status: 'NOT-EXECUTED-APPINDEX-ONLY' };
  row.stages.preLoginNetworkQuiet = { status: 'PASS', networkQuietVerified: true };
  row.teardown = { networkQuietVerified: true, contextClosed: true, evidenceDrainVerified: true,
    routeGuardRetainedUntilClose: true, inflightRequestsAfterClose: 0 };
  const observation = ownedResponse();
  row.responses.push(observation);
  row.ownedModelContext = {
    required: true, expected: expectedContext,
    appdata: verifyOwnedBootstrapProjection({
      status: 200, error: null, data: { context: ownedContext(), srfmodelcontext: ownProjection() },
    }, { expected: expectedContext, origin, headers: {
      srforgid: 'owned_a_center_org', srfsystemid: 'ibizmodeling', authorizationPresent: true,
    }, observation, loginSubmittedSequence: row.authenticationLifecycle.loginSubmittedSequence }),
    index: verifyOwnedBootstrapIndexContext(ownedIndex(), expectedContext),
  };
  return row;
}
const ownedSummary = row => summarizeBootstrapCase(row, {
  origin, requireOwnedModelContext: true, expectedModelContext: expectedContext,
});

for (const locale of ['zh-CN', 'en-US']) for (const viewport of ['desktop', 'mobile']) {
  test(`${locale}/${viewport}: required bootstrap binds exact natural appdata projection and actual APPINDEX consumption, not deep navigation`, () => {
    const row = { ...ownedRow(), locale, viewport };
    const before = structuredClone(row);
    const result = ownedSummary(row);
    assert.equal(result.status, 'BOOTSTRAP-APPINDEX-ONLY-OBSERVED-NOT-NATIVE-ACCEPTED');
    assert.deepEqual(result.ownedModelContext, {
      required: true, verified: true, appdataProjectionVerified: true,
      sameActorAndOrganizationVerified: true, appindexRootAndLogicalSystemConsumed: true,
    });
    assert.equal(row.stages.systemMenu.status, 'NOT-EXECUTED-APPINDEX-ONLY');
    assert.equal(result.scope, 'MODELINGINDEX-BOOTSTRAP-ONLY');
    assert.equal(result.navigationAcceptance, false);
    assert.equal(result.nativeAcceptance, false);
    assert.equal(result.permissionAcceptance, false);
    assert.equal(result.fullApplicationAcceptance, false);
    assert.deepEqual(row, before);
  });
}

for (const [name, mutate] of [
  ['no projection proof', row => { delete row.ownedModelContext; }],
  ['missing projection', row => { delete row.ownedModelContext.appdata.projection; }],
  ['extra projection field', row => { row.ownedModelContext.appdata.projection.admin = true; }],
  ['foreign root', row => { row.ownedModelContext.appdata.projection.psdevslnsys = 'owned_b'; }],
  ['wrong logical system', row => { row.ownedModelContext.appdata.projection.pssystemid = 'other-system'; }],
  ['another actor', row => { row.ownedModelContext.appdata.context.srfuserid = 'another-person'; }],
  ['another person', row => { row.ownedModelContext.appdata.context.srfpersonid = 'another-person'; }],
  ['another center', row => { row.ownedModelContext.appdata.context.srfdcid = 'another-center'; }],
  ['another organization', row => { row.ownedModelContext.appdata.context.srforgid = 'another-org'; }],
  ['header org mismatch', row => { row.ownedModelContext.appdata.headers.srforgid = 'another-org'; }],
  ['unbound appdata response', row => { row.responses = []; }],
  ['body hash mismatch', row => { row.ownedModelContext.appdata.bodySha256 = 'b'.repeat(64); }],
  ['unauthenticated response', row => { row.responses[0].authorizationPresent = false; }],
  ['pre-auth request phase', row => { row.responses[0].phaseAtRequest = 'pre-auth'; }],
  ['pre-auth response phase', row => { row.responses[0].phaseAtResponse = 'pre-auth'; }],
  ['closing response phase', row => { row.responses[0].phaseAtResponse = 'closing'; }],
  ['pre-login response', row => { row.responses[0].requestSequence = 9; row.ownedModelContext.appdata.requestSequence = 9; }],
  ['not real APPINDEX proof', row => { row.ownedModelContext.index.source = 'static-view-model'; }],
  ['another view type', row => { row.ownedModelContext.index.viewType = 'DEEDITVIEW'; }],
  ['another index', row => { row.ownedModelContext.index.codeName = 'OtherIndex'; }],
  ['another app', row => { row.ownedModelContext.index.appId = 'ibizmodeling__central'; }],
  ['mismatched controller DOM', row => { row.ownedModelContext.index.controllerId = 'another-controller'; }],
  ['unbounded controller ID', row => {
    row.ownedModelContext.index.controllerId = 'x'.repeat(257);
    row.ownedModelContext.index.domId = row.ownedModelContext.index.controllerId;
  }],
  ['two indices', row => { row.ownedModelContext.index.matchingIndexCount = 2; }],
  ['missing consumed logical ID', row => { delete row.ownedModelContext.index.context.pssystemid; }],
  ['wrong consumed logical ID', row => { row.ownedModelContext.index.context.pssystemid = 'another-system'; }],
  ['wrong consumed root', row => { row.ownedModelContext.index.context.psdevslnsys = 'owned_b'; }],
  ['another consumed actor', row => { row.ownedModelContext.index.context.srfuserid = 'another-person'; }],
  ['another consumed organization', row => { row.ownedModelContext.index.context.srforgid = 'another-org'; }],
  ['destroyed controller', row => { row.ownedModelContext.index.lifecycle.isDestroyed = true; }],
]) {
  test(`required owned bootstrap refuses ${name}`, () => {
    const row = ownedRow();
    mutate(row);
    const result = ownedSummary(row);
    assert.equal(result.status, 'FAILED');
    assert.equal(result.ownedModelContext.verified, false);
    assert.ok(result.blockers.some(blocker => blocker.type === 'owned-model-context-not-verified'));
    assert.equal(result.nativeAcceptance, false);
  });
}

test('projection verification rejects accessors without reading their values and records no unrelated appdata', () => {
  let invoked = 0;
  const projection = ownProjection();
  Object.defineProperty(projection, 'pssystemid', { get() { invoked++; return 'owned_logical_a'; } });
  const response = { status: 200, error: null,
    data: { context: ownedContext(), srfmodelcontext: projection, secret: 'must-not-be-recorded' } };
  const options = { expected: expectedContext, origin, headers: {
    srforgid: 'owned_a_center_org', srfsystemid: 'ibizmodeling', authorizationPresent: true,
  }, observation: ownedResponse(), loginSubmittedSequence: 10 };
  assert.throws(() => verifyOwnedBootstrapProjection(response, options));
  assert.equal(invoked, 0);
  response.data.srfmodelcontext = ownProjection();
  const result = verifyOwnedBootstrapProjection(response, options);
  assert.equal(JSON.stringify(result).includes('must-not-be-recorded'), false);
  Object.defineProperty(response.data, 'srfmodelcontext', { get() { invoked++; return ownProjection(); } });
  assert.throws(() => verifyOwnedBootstrapProjection(response, options));
  assert.equal(invoked, 0);
});

test('default bootstrap remains diagnostic-compatible while malformed explicit context requirements fail closed', async () => {
  assert.equal(summarizeBootstrapCase(validRow(), { origin }).ownedModelContext.required, false);
  assert.equal(summarizeBootstrapCase(validRow(), { origin }).ownedModelContext.verified, false);
  assert.equal(summarizeBootstrapCase(ownedRow(), {
    origin, requireOwnedModelContext: true,
  }).status, 'FAILED');
  assert.throws(() => summarizeBootstrapCase(validRow(), { origin, requireOwnedModelContext: 'true' }));
  await assert.rejects(runBootstrapBrowser({
    runReadonlyBrowser: true, requireOwnedModelContext: 'true',
  }));
  assert.throws(() => ownedBootstrapContextExpectation({ ...ownedActor, role: 'viewer' }, ownedRoot));
  assert.throws(() => ownedBootstrapContextExpectation(ownedActor, { ...ownedRoot, rootId: 'owned_b' }));
  assert.throws(() => ownedBootstrapContextExpectation(ownedActor, { rootId: 'owned_a' }));
});

test('required context mode observes existing UI responses and public APPINDEX state without extra API or controller writes', () => {
  const source = readFileSync(new URL('./owned-modeling-bootstrap.browser.mjs', import.meta.url), 'utf8');
  assert.match(source, /'require-owned-model-context': \{ type: 'boolean' \}/);
  assert.match(source, /observed\.bodySha256 = hash\(body\)/);
  assert.match(source, /row\.ownedModelContext\.appdata = verifyOwnedBootstrapProjection/);
  assert.match(source, /verifyOwnedBootstrapIndexContext\(index, expectedModelContext\)/);
  assert.match(source, /report\.cases\.length === 4/);
  assert.doesNotMatch(source, /page\.request|context\.request|\bfetch\(|route\.fulfill|force:\s*true|addView|setView/);
});

function trackerFixture({ onWait = () => {} } = {}) {
  const row = ownedRow();
  let clock = 0;
  let phase = 'authenticated';
  let sequence = 30;
  const tracker = createBootstrapEvidenceTracker({
    row, now: () => clock, phase: () => phase, nextSequence: () => ++sequence,
    wait: async ms => { clock += Math.max(1, ms); await onWait(clock); },
  });
  return { row, tracker, now: () => clock, phase: () => phase, setPhase: value => { phase = value; } };
}
const deferred = () => {
  let resolve;
  let reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
};

test('drain follows work queued by a settling response instead of awaiting only an old Promise.all snapshot', async () => {
  const { tracker, row } = trackerFixture();
  const events = [];
  tracker.track('first', async () => {
    events.push('first');
    tracker.track('second', async () => {
      await Promise.resolve();
      tracker.track('third', async () => { events.push('third'); });
      events.push('second');
    });
  });
  assert.deepEqual(await tracker.drain(), { pendingTasks: 0, inflightRequests: 0 });
  assert.deepEqual(events, ['first', 'second', 'third']);
  assert.deepEqual(row.errors, []);
});

test('route continue rejection is evidence, not an unhandled rejection that interrupts later cells', async () => {
  const rows = [];
  for (const locale of ['zh-CN', 'en-US']) for (const viewport of ['desktop', 'mobile']) {
    const state = trackerFixture();
    state.row.locale = locale;
    state.row.viewport = viewport;
    await state.tracker.route({ request: () => ({}) }, async () => {
      throw new Error('route.continue: Route is already handled!');
    });
    await runBootstrapScopeAction({ row: state.row, requireOwnedModelContext: true,
      menuAction: () => assert.fail('APPINDEX-only mode must not initiate menu navigation') });
    state.row.teardown = await finishBootstrapContext({
      context: { close: async () => {} }, tracker: state.tracker, setPhase: state.setPhase,
    });
    state.row.summary = ownedSummary(state.row);
    rows.push(state.row);
  }
  assert.equal(rows.length, 4);
  assert.ok(rows.every(row => row.summary.status === 'FAILED'));
  assert.ok(rows.every(row => row.errors.some(error => error.type === 'route-handler'
    && error.message.includes('Route is already handled'))));
});

test('duplicate route delivery never invokes a second continue/abort and remains a failed observation', async () => {
  const { tracker, row } = trackerFixture();
  const request = {};
  const route = { request: () => request };
  let calls = 0;
  await Promise.all([
    tracker.route(route, async () => { calls++; }),
    tracker.route(route, async () => { calls++; }),
  ]);
  assert.equal(calls, 1);
  assert.ok(row.errors.some(error => error.type === 'route-handler' && error.message.includes('more than once')));
});

test('the retained page bridge only falls back and its failures remain tracked rejection evidence', async () => {
  const state = trackerFixture();
  let bridge;
  let fallbacks = 0;
  await retainBootstrapPageRoute({
    tracker: state.tracker,
    page: { async route(pattern, handler) { assert.equal(pattern, '**/*'); bridge = handler; } },
  });
  const request = { method: () => 'GET', url: () => `${origin}/private?token=must-not-be-recorded` };
  await bridge({
    request: () => request,
    fallback: async () => { fallbacks++; throw new Error('controlled fallback failure'); },
    continue: () => assert.fail('The page bridge cannot continue around the context policy'),
  });
  await state.tracker.drain();
  assert.equal(fallbacks, 1);
  assert.ok(state.row.errors.some(error => error.type === 'page-route-fallback' &&
    error.message === 'controlled fallback failure' && error.path === '/private'));
  assert.equal(JSON.stringify(state.row.errors).includes('must-not-be-recorded'), false);
  assert.equal(ownedSummary(state.row).status, 'FAILED');
});

test('normal network quiet waits for the response body and its finished request before context close', async () => {
  const body = deferred();
  const request = {};
  let release;
  const events = [];
  const state = trackerFixture({ onWait: async time => {
    if (time >= 100 && release) { release(); release = null; }
  } });
  state.tracker.requestStarted(request);
  state.tracker.track('response-evidence', async () => {
    await body.promise;
    events.push('body-finished');
    state.tracker.requestSettled(request);
  });
  release = () => body.resolve();
  const teardown = await finishBootstrapContext({
    tracker: state.tracker, setPhase: state.setPhase,
    context: { close: async () => {
      assert.ok(state.now() >= 600);
      assert.equal(state.phase(), 'closing');
      events.push('context-close');
    } },
  });
  assert.deepEqual(events, ['body-finished', 'context-close']);
  assert.equal(teardown.networkQuietVerified, true);
  assert.equal(teardown.evidenceDrainVerified, true);
  assert.equal(teardown.inflightRequestsAfterClose, 0);
  assert.deepEqual(state.row.errors, []);
});

test('tasks created during context close are also drained and their failures are retained before summarizing', async () => {
  const state = trackerFixture();
  const request = {};
  const events = [];
  const teardown = await finishBootstrapContext({
    tracker: state.tracker, setPhase: state.setPhase,
    context: { close: async () => {
      events.push('closing');
      state.tracker.requestStarted(request);
      state.tracker.track('response-evidence', async () => {
        await Promise.resolve();
        state.tracker.track('late-route', async () => {
          events.push('late-route');
          throw new Error('late route failed');
        });
        state.tracker.requestSettled(request);
        events.push('body-failed');
        throw new Error('response.body: Target page, context or browser has been closed');
      });
    } },
  });
  state.row.teardown = teardown;
  const summary = ownedSummary(state.row);
  assert.deepEqual(events, ['closing', 'body-failed', 'late-route']);
  assert.equal(teardown.evidenceDrainVerified, true);
  assert.ok(state.row.errors.some(error => error.type === 'response-evidence'));
  assert.ok(state.row.errors.some(error => error.type === 'late-route'));
  assert.equal(summary.status, 'FAILED');
});

test('quiet timeout is retained and close releases a pending response-body failure without claiming a pass', async () => {
  const state = trackerFixture();
  const body = deferred();
  const request = {};
  state.tracker.requestStarted(request);
  state.tracker.track('response-evidence', async () => { await body.promise; });
  const teardown = await finishBootstrapContext({
    tracker: state.tracker, setPhase: state.setPhase,
    context: { close: async () => {
      state.tracker.requestSettled(request);
      body.reject(new Error('response.body: Target closed'));
    } },
  });
  state.row.teardown = teardown;
  assert.equal(teardown.networkQuietVerified, false);
  assert.equal(teardown.contextClosed, true);
  assert.equal(teardown.evidenceDrainVerified, true);
  assert.ok(state.row.errors.some(error => error.type === 'network-quiet-before-close'));
  assert.ok(state.row.errors.some(error => error.type === 'response-evidence'));
  assert.equal(ownedSummary(state.row).status, 'FAILED');
});

test('context close errors remain explicit failures, not silently discarded cleanup exceptions', async () => {
  const state = trackerFixture();
  const teardown = await finishBootstrapContext({ tracker: state.tracker, setPhase: state.setPhase,
    context: { close: async () => { throw new Error('context close failed'); } } });
  state.row.teardown = teardown;
  assert.equal(teardown.contextClosed, false);
  assert.ok(state.row.errors.some(error => error.type === 'context-close'));
  assert.equal(ownedSummary(state.row).status, 'FAILED');
});

test('unfinished request diagnostics identify the exact request without query, headers or token material', async () => {
  const state = trackerFixture();
  const request = {
    method: () => 'POST',
    url: () => `${origin}${appPrefix}/v7/login?token=must-not-be-recorded`,
    resourceType: () => 'fetch', isNavigationRequest: () => false,
  };
  state.tracker.requestStarted(request);
  await state.tracker.route({ request: () => request }, async () => {
    throw new Error('route.continue: Route is already handled!');
  });
  const teardown = await finishBootstrapContext({
    tracker: state.tracker, setPhase: state.setPhase, context: { close: async () => {} },
  });
  assert.equal(teardown.unfinishedRequestsAfterClose.length, 1);
  const pending = teardown.unfinishedRequestsAfterClose[0];
  assert.equal(pending.requestId, 'request-1');
  assert.equal(pending.method, 'POST');
  assert.equal(pending.path, `${appPrefix}/v7/login`);
  assert.equal(pending.resourceType, 'fetch');
  const routed = state.row.errors.find(error => error.type === 'route-handler');
  assert.equal(routed.requestId, pending.requestId);
  assert.equal(routed.path, pending.path);
  assert.equal(state.row.errors.find(error => error.type === 'network-quiet-before-close')
    .unfinishedRequests[0].requestId, pending.requestId);
  assert.equal(JSON.stringify({ errors: state.row.errors, teardown }).includes('must-not-be-recorded'), false);
  assert.equal(teardown.networkQuietVerified, false);
  state.row.teardown = teardown;
  assert.equal(ownedSummary(state.row).status, 'FAILED');
});

test('APPINDEX-only action selection never clicks a menu; legacy diagnostic mode still executes it once', async () => {
  const row = ownedRow();
  let menuActions = 0;
  const menuAction = async () => {
    menuActions++;
    row.stages.systemMenu = { status: 'CLICKED-NOT-YET-NAVIGATION-ACCEPTED' };
  };
  await runBootstrapScopeAction({ row, requireOwnedModelContext: true, menuAction });
  assert.equal(menuActions, 0);
  assert.equal(row.stages.navigation.status, 'NOT-EXECUTED-APPINDEX-ONLY');
  assert.equal(ownedSummary(row).status, 'BOOTSTRAP-APPINDEX-ONLY-OBSERVED-NOT-NATIVE-ACCEPTED');
  await runBootstrapScopeAction({ row, requireOwnedModelContext: false, menuAction });
  assert.equal(menuActions, 1);
  assert.equal(summarizeBootstrapCase(row, { origin }).status,
    'BOOTSTRAP-AND-NATURAL-CLICK-OBSERVED-NOT-NATIVE-ACCEPTED');
  assert.equal(ownedSummary(row).status, 'FAILED', 'A menu click cannot masquerade as APPINDEX-only evidence');
});

test('APPINDEX-only mode still rejects existing HTTP 403 rather than deleting or excusing the navigation failure', () => {
  const row = ownedRow();
  row.responses.push({ origin, path: `${appPrefix}/psmodules/fetchcursys`, method: 'POST', status: 403,
    authorizationPresent: true, phaseAtRequest: 'authenticated', phaseAtResponse: 'authenticated' });
  const summary = ownedSummary(row);
  assert.equal(summary.status, 'FAILED');
  assert.ok(summary.blockers.some(blocker => blocker.type === 'unexpected-http-error'
    && blocker.evidence.status === 403));
  assert.equal(row.responses.at(-1).status, 403);
});

test('runner retains route policy until close and finalizes each row only after tracked evidence draining', () => {
  const source = readFileSync(new URL('./owned-modeling-bootstrap.browser.mjs', import.meta.url), 'utf8');
  assert.match(source, /const handleRoute = route => tracker\.route/);
  assert.match(source, /tracker\.track\('response-evidence'/);
  assert.match(source, /page\.on\('requestfinished', request => tracker\.requestSettled/);
  assert.match(source, /await tracker\.waitForQuiet\(\)/);
  assert.match(source, /await tracker\.drain\(\)/);
  assert.match(source, /row\.teardown = await finishBootstrapContext/);
  assert.match(source, /await runBootstrapScopeAction\(\{ row, requireOwnedModelContext, menuAction:/);
  assert.doesNotMatch(source, /unrouteAll|removeAllListeners|catch\(\(\) => \{\}\)|Promise\.all\(pending\)/);
});

async function orgBootstrapReloadFixture(t, { hang = false, embedded = false, holdReloadUntilUnroute = false } = {}) {
  const loginPath = `${appPrefix}/v7/login`;
  const appdataPath = `${appPrefix}/appdata`;
  const orgPath = `${appPrefix}/uaa/getbydcsystem/ibizmodeling`;
  const upstreamOrg = [];
  let loginRequests = 0;
  const server = createServer((request, response) => {
    if (request.url === loginPath) {
      loginRequests++;
      request.resume();
      response.writeHead(200, { 'content-type': 'application/json' });
      response.end(JSON.stringify({ token: 'controlled-login-token' }));
    } else if (request.url === appdataPath) {
      response.writeHead(200, { 'content-type': 'application/json' });
      response.end('{"context":{"controlledFixtureOnly":true}}');
    } else if (request.url === orgPath) {
      const observation = { status: null };
      upstreamOrg.push(observation);
      if (!hang) setTimeout(() => {
        response.writeHead(200, { 'content-type': 'application/json' });
        response.end('{"controlledFixtureOnly":true}');
        observation.status = 200;
      }, 500);
    } else if (request.url === '/favicon.ico') {
      response.writeHead(204); response.end();
    } else if (request.url === '/') {
      response.writeHead(200, { 'content-type': 'text/html' });
      response.end(`<!doctype html><html><body><script>
        window.ibiz = {};
        window.System = { import: async () => ({ getToken: () => localStorage.getItem('controlled-token') }) };
        const org = new XMLHttpRequest();
        org.open('GET', '${orgPath}');
        org.send();
        if (localStorage.getItem('controlled-token')) {
          document.body.innerHTML = '<main id="ready">Controlled index</main>';
          fetch('${appdataPath}');
        } else {
          document.body.innerHTML = '<button id="login">Login</button>';
          document.querySelector('#login').onclick = async () => {
            const response = await fetch('${loginPath}', { method: 'POST',
              headers: { 'content-type': 'application/json' }, body: '{"loginname":"controlled"}' });
            const data = await response.json();
            localStorage.setItem('controlled-token', data.token);
            location.reload();
          };
        }
      </script></body></html>`);
    } else {
      response.writeHead(404); response.end();
    }
  });
  await new Promise(done => server.listen(0, '127.0.0.1', done));
  t.after(() => new Promise(done => { server.closeAllConnections(); server.close(done); }));
  const require = createRequire(new URL('../../../ibiz-app-hub/package.json', import.meta.url));
  const browser = await launchChromium(require('playwright').chromium, { args: ['--no-sandbox'] });
  t.after(() => browser.close());
  const entry = `http://127.0.0.1:${server.address().port}/`;
  const context = await browser.newContext({ serviceWorkers: 'block' });
  t.after(() => context.close());
  const page = await context.newPage();
  const wrapper = embedded ? await startEmbeddedWorkspaceWrapper(entry) : null;
  if (wrapper) t.after(() => wrapper.close());
  const row = validRow();
  let phase = 'pre-auth';
  const tracker = createBootstrapEvidenceTracker({ row, phase: () => phase });
  const reloadRouteEntered = deferred();
  const releaseReloadRoute = deferred();
  t.after(() => releaseReloadRoute.resolve());
  let routedDocuments = 0;
  const unfinished = new Map();
  let serial = 0;
  const events = [];
  page.on('request', request => {
    const identity = { id: ++serial, method: request.method(), path: new URL(request.url()).pathname };
    unfinished.set(request, identity);
    events.push({ event: 'request', ...identity });
    tracker.requestStarted(request);
  });
  for (const event of ['requestfinished', 'requestfailed']) page.on(event, request => {
    events.push({ event, ...(unfinished.get(request) ?? { path: new URL(request.url()).pathname, unknown: true }) });
    unfinished.delete(request);
    tracker.requestSettled(request);
  });
  await context.route('**/*', route => tracker.route(route, async () => {
    const request = route.request();
    if (request.isNavigationRequest() && request.url() === entry) {
      routedDocuments++;
      if (holdReloadUntilUnroute && routedDocuments === 2) {
        reloadRouteEntered.resolve();
        await releaseReloadRoute.promise;
      }
    }
    await route.continue();
  }));
  await retainBootstrapPageRoute({ page, tracker });
  await page.goto(wrapper?.url ?? entry, { waitUntil: 'domcontentloaded' });
  const frame = wrapper
    ? await (await page.locator('#owned-modeldesign-workspace').elementHandle()).contentFrame() : null;
  const appPage = applicationFramePage(page, frame ?? page);
  if (holdReloadUntilUnroute) {
    const unroute = appPage.unroute;
    appPage.unroute = async (...args) => {
      const timeout = setTimeout(() => reloadRouteEntered.reject(new Error('Controlled reload route did not start')), 3000);
      try {
        await reloadRouteEntered.promise;
        await unroute(...args);
      } finally {
        clearTimeout(timeout);
        releaseReloadRoute.resolve();
      }
    };
  }
  await appPage.locator('#login').waitFor();
  return {
    row, tracker, unfinished, events, upstreamOrg, orgPath, loginRequests: () => loginRequests,
    routedDocuments: () => routedDocuments,
    async login({ waitBeforeSubmit = false, gateTracker = tracker } = {}) {
      if (waitBeforeSubmit) await waitForBootstrapLoginReady({ row, tracker: gateTracker });
      const login = await captureNativeLogin(appPage,
        { entry, applicationId: 'ibizmodeling__modeldesign', timeout: 3000 },
        async () => { phase = 'login-submitted'; await appPage.locator('#login').click(); });
      assert.equal(login.tokenPersisted, true);
      phase = 'authenticated';
      await appPage.locator('#ready').waitFor();
      await tracker.drain();
      return login;
    },
  };
}

test('controlled reload during the normal org GET reproduces its missing terminal event, never an invented successful quiet', async t => {
  const fixture = await orgBootstrapReloadFixture(t);
  await fixture.login();
  await assert.rejects(fixture.tracker.waitForQuiet({ quietForMs: 20, timeoutMs: 1500 }), error => {
    assert.equal(error.unfinishedRequests.length, 1);
    assert.equal(error.unfinishedRequests[0].path, fixture.orgPath);
    assert.equal(error.unfinishedRequests[0].resourceType, 'xhr');
    assert.equal(error.unfinishedRequests[0].method, 'GET');
    return true;
  });
  assert.equal(fixture.upstreamOrg.length, 2);
  assert.ok(fixture.upstreamOrg.every(observation => observation.status === 200),
    'Both real upstream GETs replied; the old document lost its terminal event');
  assert.equal(fixture.unfinished.size, 1);
});

test('prelogin network quiet preserves real captureNativeLogin, reload and both normally completed org GETs', async t => {
  const fixture = await orgBootstrapReloadFixture(t);
  await fixture.login({ waitBeforeSubmit: true });
  await fixture.tracker.waitForQuiet({ quietForMs: 20, timeoutMs: 2000 });
  assert.equal(fixture.row.stages.preLoginNetworkQuiet.status, 'PASS');
  assert.equal(fixture.row.stages.preLoginNetworkQuiet.networkQuietVerified, true);
  assert.equal(fixture.upstreamOrg.length, 2);
  assert.ok(fixture.upstreamOrg.every(observation => observation.status === 200));
  assert.equal(fixture.unfinished.size, 0);
  assert.equal(fixture.loginRequests(), 1);
  assert.deepEqual(fixture.row.errors, []);
});

test('iframe facade preserves real login routing, inner token readback and reload evidence', async t => {
  const fixture = await orgBootstrapReloadFixture(t, { embedded: true });
  const login = await fixture.login({ waitBeforeSubmit: true });
  assert.equal(login.tokenIssued, true);
  assert.equal(login.tokenPersisted, true);
  await fixture.tracker.waitForQuiet({ quietForMs: 20, timeoutMs: 2000 });
  assert.equal(fixture.loginRequests(), 1);
  assert.equal(fixture.routedDocuments(), 2, 'Exactly the initial and reloaded application documents hit the context guard');
  assert.equal(fixture.unfinished.size, 0);
  assert.deepEqual(fixture.row.errors, []);
});

test('the live runner retains its fallback bridge before navigation without replacing the context guard', () => {
  const source = readFileSync(new URL('./owned-modeling-bootstrap.browser.mjs', import.meta.url), 'utf8');
  const context = source.indexOf("await context.route('**/*', handleRoute)");
  const bridge = source.indexOf('await retainBootstrapPageRoute({ page, tracker })', context);
  const navigation = source.indexOf('await page.goto(', bridge);
  assert.ok(context > 0 && bridge > context && navigation > bridge);
  const body = source.slice(source.indexOf('export async function retainBootstrapPageRoute'),
    source.indexOf('export function collectOwnedShellDom'));
  assert.match(body, /tracker\.track\('page-route-fallback'/);
  assert.match(body, /route\.fallback\(\)/);
  assert.doesNotMatch(body, /\.continue\(|\.fulfill\(|\.abort\(|\.unroute|ignoreErrors/);
});

test('login route cleanup cannot auto-continue an iframe reload still owned by the context guard', async t => {
  const fixture = await orgBootstrapReloadFixture(t, { embedded: true, holdReloadUntilUnroute: true });
  const login = await fixture.login({ waitBeforeSubmit: true });
  assert.equal(login.tokenPersisted, true);
  await fixture.tracker.waitForQuiet({ quietForMs: 20, timeoutMs: 2000 });
  assert.equal(fixture.loginRequests(), 1);
  assert.equal(fixture.unfinished.size, 0);
  assert.deepEqual(fixture.row.errors, []);
});

test('a genuinely hanging org GET fails the prelogin quiet gate and never submits credentials', async t => {
  const fixture = await orgBootstrapReloadFixture(t, { hang: true });
  const gateTracker = { ...fixture.tracker,
    waitForQuiet: () => fixture.tracker.waitForQuiet({ quietForMs: 20, timeoutMs: 200 }) };
  await assert.rejects(fixture.login({ waitBeforeSubmit: true, gateTracker }), /did not become quiet/);
  assert.equal(fixture.row.stages.preLoginNetworkQuiet.status, 'FAIL');
  assert.equal(fixture.loginRequests(), 0);
  assert.equal(fixture.row.errors.some(error => error.type === 'network-quiet-before-login'
    && error.unfinishedRequests.some(request => request.path === fixture.orgPath)), true);
  assert.equal(fixture.upstreamOrg.length, 1);
  assert.equal(fixture.upstreamOrg[0].status, null);
});

test('the live submit path waits on the real quiet gate without excluding or force-settling org requests', () => {
  const source = readFileSync(new URL('./owned-modeling-bootstrap.browser.mjs', import.meta.url), 'utf8');
  const gate = source.indexOf('await waitForBootstrapLoginReady({ row, tracker });');
  const capture = source.indexOf('row.stages.login = await captureNativeLogin');
  assert.ok(gate > 0 && gate < capture);
  assert.match(source, /tracker\.error\('network-quiet-before-login', error\)/);
  assert.doesNotMatch(source, /requestSettled\(.*login|inflight\.clear\(|\.delete\(.*getbydcsystem/);
});

function embeddedEvidence() {
  const state = () => ({
    embedded: true, viewport: { width: 390, height: 844 }, scroll: { x: 0, y: 0 },
    workspace: { visible: true, receivesPointer: true },
    menu: { visible: true, insideViewport: true, receivesPointer: true },
    openConsoleDrawers: 0, visibleConsoleDrawers: 0, visibleDrawerOverlays: 0, horizontalOverflow: false,
  });
  return {
    status: 'PASS',
    wrapper: {
      kind: 'controlled-loopback-iframe-wrapper', wrapperOnly: true, nativePlmEmbedding: false,
      applicationModelOrResourcesChanged: false, tokenOrContextInjected: false,
      listenHost: '127.0.0.1', applicationOrigin: origin,
      applicationEntrySha256: 'a'.repeat(64), errors: [],
    },
    frame: { source: 'actual-owned-ModelDesign-entry', fullViewport: true, applicationOrigin: origin },
    initial: state(), afterClose: state(), openedConsoleDrawers: 1,
    openOperation: 'ordinary-bottom-console-menu-click',
    closeOperation: 'ordinary-drawer-close-button-click',
    closeButton: { insideViewport: true, receivesPointer: true, activeAncestorAnimations: 0 },
    menu: { id: 'terminal', target: { viewId: 'modeldesign.pssysdevbktasktabexpview' } },
  };
}
function embeddedRow() {
  const row = ownedRow();
  row.scope = 'MODELINGINDEX-EMBEDDED-WORKSPACE-ONLY';
  row.stages.workspace = embeddedEvidence();
  return row;
}
const embeddedSummary = row => summarizeBootstrapCase(row, {
  origin, requireOwnedModelContext: true, expectedModelContext: expectedContext, embeddedWorkspace: true,
});

test('embedded workspace has a separate bounded verdict and never claims actual PLM embedding or native CRUD', () => {
  const row = embeddedRow();
  const before = structuredClone(row);
  const result = embeddedSummary(row);
  assert.equal(result.status, 'BOOTSTRAP-EMBEDDED-WORKSPACE-OBSERVED-NOT-NATIVE-ACCEPTED');
  assert.equal(result.scope, 'MODELINGINDEX-EMBEDDED-WORKSPACE-ONLY');
  assert.deepEqual(result.embeddedWorkspace, {
    required: true, verified: true, wrapperOnly: true, nativePlmEmbedding: false,
  });
  for (const flag of ['nativeAcceptance', 'permissionAcceptance', 'navigationAcceptance', 'fullApplicationAcceptance']) {
    assert.equal(result[flag], false);
  }
  assert.deepEqual(row, before);
  assert.equal(ownedSummary(row).status, 'FAILED', 'Embedded evidence cannot replace the APPINDEX baseline');
  assert.equal(embeddedSummary(ownedRow()).status, 'FAILED', 'APPINDEX evidence cannot replace workspace evidence');
});

for (const [name, mutate] of [
  ['missing workspace', row => { delete row.stages.workspace; }],
  ['failed workspace', row => { row.stages.workspace.status = 'FAIL'; }],
  ['fake native embedding', row => { row.stages.workspace.wrapper.nativePlmEmbedding = true; }],
  ['application mutation', row => { row.stages.workspace.wrapper.applicationModelOrResourcesChanged = true; }],
  ['context injection', row => { row.stages.workspace.wrapper.tokenOrContextInjected = true; }],
  ['wrong wrapper host', row => { row.stages.workspace.wrapper.listenHost = '0.0.0.0'; }],
  ['unbound application', row => { row.stages.workspace.frame.applicationOrigin = 'http://127.0.0.1:30250'; }],
  ['server error', row => { row.stages.workspace.wrapper.errors.push('wrapper failed'); }],
  ['partial frame', row => { row.stages.workspace.frame.fullViewport = false; }],
  ['direct not embedded', row => { row.stages.workspace.initial.embedded = false; }],
  ['initial console obstruction', row => { row.stages.workspace.initial.openConsoleDrawers = 1; }],
  ['workspace covered', row => { row.stages.workspace.initial.workspace.receivesPointer = false; }],
  ['bottom menu outside viewport', row => { row.stages.workspace.initial.menu.insideViewport = false; }],
  ['menu covered', row => { row.stages.workspace.initial.menu.receivesPointer = false; }],
  ['initial scroll', row => { row.stages.workspace.initial.scroll.y = 100; }],
  ['initial horizontal overflow', row => { row.stages.workspace.initial.horizontalOverflow = true; }],
  ['synthetic opening', row => { row.stages.workspace.openOperation = 'controller-open'; }],
  ['no console opened', row => { row.stages.workspace.openedConsoleDrawers = 0; }],
  ['two consoles opened', row => { row.stages.workspace.openedConsoleDrawers = 2; }],
  ['close outside viewport', row => { row.stages.workspace.closeButton.insideViewport = false; }],
  ['close covered', row => { row.stages.workspace.closeButton.receivesPointer = false; }],
  ['close still entering', row => { row.stages.workspace.closeButton.activeAncestorAnimations = 1; }],
  ['synthetic close', row => { row.stages.workspace.closeOperation = 'controller-close'; }],
  ['wrong menu target', row => { row.stages.workspace.menu.target.viewId = 'another-view'; }],
  ['closed workspace missing', row => { row.stages.workspace.afterClose.workspace.visible = false; }],
  ['drawer remains open', row => { row.stages.workspace.afterClose.openConsoleDrawers = 1; }],
  ['drawer closing after open class removal', row => { row.stages.workspace.afterClose.visibleConsoleDrawers = 1; }],
  ['overlay exiting after drawer hidden', row => { row.stages.workspace.afterClose.visibleDrawerOverlays = 1; }],
  ['menu moved after close', row => { row.stages.workspace.afterClose.menu.insideViewport = false; }],
]) test(`embedded workspace fails closed for ${name}`, () => {
  const row = embeddedRow();
  mutate(row);
  const result = embeddedSummary(row);
  assert.equal(result.status, 'FAILED');
  assert.equal(result.embeddedWorkspace.verified, false);
  assert.ok(result.blockers.some(blocker => blocker.type === 'embedded-workspace-not-verified'));
});

test('embedded workspace keeps all native login, projection, network and teardown rejection gates', () => {
  for (const mutate of [
    row => { row.stages.login.tokenPersisted = false; },
    row => { delete row.ownedModelContext; },
    row => { row.errors.push({ type: 'console', message: 'actual application error' }); },
    row => { row.failedRequests.push({ failure: 'net::ERR_ABORTED' }); },
    row => { row.blocked.push({ method: 'PUT', path: '/unreviewed' }); },
    row => { row.teardown.networkQuietVerified = false; },
    row => { row.teardown.inflightRequestsAfterClose = 1; },
  ]) {
    const row = embeddedRow();
    mutate(row);
    assert.equal(embeddedSummary(row).status, 'FAILED');
  }
});

test('embedded flag requires explicit owned context and a real boolean before any launch', async () => {
  await assert.rejects(runBootstrapBrowser({ runReadonlyBrowser: true, embeddedWorkspace: true }),
    /explicit owned model-context/);
  await assert.rejects(runBootstrapBrowser({
    runReadonlyBrowser: true, requireOwnedModelContext: true, embeddedWorkspace: 'true',
  }));
  assert.throws(() => summarizeBootstrapCase(embeddedRow(), {
    origin, requireOwnedModelContext: true, embeddedWorkspace: 'true',
  }));
});

test('stable DOM polling cannot promote persistent obstruction and retains the last real observation', async () => {
  const obstruction = { workspace: { receivesPointer: false } };
  let frames = 0;
  const appPage = { evaluate: async () => { frames++; } };
  await assert.rejects(waitForEmbeddedDomStable({
    appPage, read: async () => obstruction, timeoutMs: 5,
    verify: observation => assert.equal(observation.workspace.receivesPointer, true),
  }), error => {
    assert.equal(error.evidence, obstruction);
    assert.match(error.message, /did not reach stable verified readiness/);
    return true;
  });
  assert.ok(frames > 0);
});

const readHttp = url => new Promise((done, reject) => {
  get(url, { agent: false }, response => {
    const chunks = [];
    response.on('data', chunk => chunks.push(chunk));
    response.on('end', () => done({ status: response.statusCode, headers: response.headers,
      body: Buffer.concat(chunks).toString('utf8') }));
  }).on('error', reject);
});

test('temporary wrapper serves only its simple exact-loopback iframe and always closes', async () => {
  const entry = `${origin}/ModelDesign/?literal=%22%3C#/-`;
  const wrapper = await startEmbeddedWorkspaceWrapper(entry);
  try {
    const response = await readHttp(wrapper.url);
    assert.equal(response.status, 200);
    assert.match(response.body, /<iframe id="owned-modeldesign-workspace"/);
    assert.match(response.body, /width:100%;height:100%/);
    assert.doesNotMatch(response.body, /<script|token|context|controller/i);
    assert.match(response.headers['content-security-policy'], /default-src 'none'/);
    assert.equal((await readHttp(`${wrapper.url}not-a-resource`)).status, 404);
    assert.equal(wrapper.evidence.nativePlmEmbedding, false);
    assert.equal(wrapper.evidence.closed, false);
  } finally { await wrapper.close(); }
  assert.equal(wrapper.evidence.closed, true);
  await assert.rejects(readHttp(wrapper.url), /ECONNREFUSED/);
  for (const entry of ['http://localhost:1234/', 'https://127.0.0.1:1234/', 'http://user:secret@127.0.0.1:1234/']) {
    await assert.rejects(startEmbeddedWorkspaceWrapper(entry));
  }
});

test('controlled CSS transitions wait for real close geometry and exiting drawer/overlay in all four cells', async t => {
  const server = createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(`<!doctype html><html><head><link rel="icon" href="data:,"><style>
      html,body{margin:0;height:100%;overflow:hidden}#controlled-index{height:100%;position:relative}
      #terminal{position:absolute;bottom:0;left:0;width:100px;height:44px}
      [hidden]{display:none!important}
      .el-overlay{position:absolute;inset:0;background:#0004;opacity:0;transition:opacity 320ms linear}
      .el-overlay.shown{opacity:1}
      .aibiz-console-drawer{position:absolute;bottom:0;width:100%;height:45%;background:white;transform:translateY(100%);transition:transform 180ms linear}
      .aibiz-console-drawer.open{transform:translateY(0)}.el-drawer__close-btn{position:absolute;top:8px;right:8px;width:40px;height:40px}
      </style></head><body><main id="controlled-index">Controlled workspace
      <button id="terminal">Console</button>
      </main><div class="el-overlay" hidden></div>
      <section class="aibiz-console-drawer" hidden><button class="el-drawer__close-btn">Close</button></section><script>
      const drawer=document.querySelector('.aibiz-console-drawer');
      const overlay=document.querySelector('.el-overlay');
      window.fixture={entered:0,exited:0,overlayExited:0,classGoneButDrawerVisible:false,overlayOutlivedDrawer:false};
      let closing=false;
      document.querySelector('#terminal').onclick=()=>{
        closing=false;drawer.hidden=false;overlay.hidden=false;
        drawer.getBoundingClientRect();overlay.getBoundingClientRect();
        requestAnimationFrame(()=>{drawer.classList.add('open');overlay.classList.add('shown');});
      };
      document.querySelector('.el-drawer__close-btn').onclick=()=>{
        closing=true;drawer.classList.remove('open');overlay.classList.remove('shown');
        window.fixture.classGoneButDrawerVisible=!drawer.classList.contains('open')&&drawer.getClientRects().length>0;
      };
      drawer.addEventListener('transitionend',event=>{
        if(event.propertyName!=='transform')return;
        if(closing){drawer.hidden=true;window.fixture.exited++;window.fixture.overlayOutlivedDrawer=!overlay.hidden;}
        else window.fixture.entered++;
      });
      overlay.addEventListener('transitionend',event=>{
        if(event.propertyName==='opacity'&&closing){overlay.hidden=true;window.fixture.overlayExited++;}
      });
      </script></body></html>`);
  });
  await new Promise(done => server.listen(0, '127.0.0.1', done));
  t.after(() => new Promise(done => { server.close(done); server.closeAllConnections(); }));
  const wrapper = await startEmbeddedWorkspaceWrapper(`http://127.0.0.1:${server.address().port}/`);
  t.after(() => wrapper.close());
  const require = createRequire(new URL('../../../ibiz-app-hub/package.json', import.meta.url));
  const browser = await launchChromium(require('playwright').chromium, { args: ['--no-sandbox'] });
  t.after(() => browser.close());
  for (const locale of ['zh-CN', 'en-US']) for (const viewport of [
    { width: 1440, height: 900 }, { width: 390, height: 844 },
  ]) {
    const context = await browser.newContext({ locale, viewport, serviceWorkers: 'block' });
    try {
      const page = await context.newPage();
      await page.goto(wrapper.url);
      const frame = await (await page.locator('#owned-modeldesign-workspace').elementHandle()).contentFrame();
      const appPage = applicationFramePage(page, frame);
      const stages = [];
      const evidence = await verifyEmbeddedWorkspaceUi({ page, appPage, wrapper,
        screenshot: async stage => { stages.push(stage); },
        index: { index: { domId: 'controlled-index' }, menus: [{ name: 'bottomsidemenu', items: [{
          id: 'terminal', caption: 'Console', visible: true, permitted: true,
          target: { viewId: 'modeldesign.pssysdevbktasktabexpview' }, dom: [{ selector: '#terminal', disabled: false }],
        }] }] },
      });
      assert.equal(verifyEmbeddedWorkspaceEvidence(evidence), true);
      assert.deepEqual(stages, ['embedded-initial', 'embedded-console-open', 'embedded-console-closed']);
      assert.deepEqual(evidence.initial.scroll, { x: 0, y: 0 });
      const transitions = await appPage.evaluate(() => window.fixture);
      assert.deepEqual(transitions, { entered: 1, exited: 1, overlayExited: 1,
        classGoneButDrawerVisible: true, overlayOutlivedDrawer: true });
      assert.equal(evidence.closeButton.activeAncestorAnimations, 0);
      assert.equal(evidence.afterClose.visibleConsoleDrawers, 0);
      assert.equal(evidence.afterClose.visibleDrawerOverlays, 0);
      assert.ok(evidence.initial.menu.ancestorLayouts.length > 0 &&
        evidence.initial.menu.ancestorLayouts.length <= 8);
      assert.equal(JSON.stringify(evidence.initial.menu.ancestorLayouts).includes('Controlled workspace'), false);
      if (locale === 'en-US' && viewport.width === 390) {
        const failedEvidence = {};
        await assert.rejects(verifyEmbeddedWorkspaceUi({ page, appPage, wrapper,
          screenshot: async stage => {
            if (stage === 'embedded-console-closed') failedEvidence.closeButton.insideViewport = false;
          }, evidence: failedEvidence,
          index: { index: { domId: 'controlled-index' }, menus: [{ name: 'bottomsidemenu', items: [{
            id: 'terminal', caption: 'Console', visible: true, permitted: true,
            target: { viewId: 'modeldesign.pssysdevbktasktabexpview' }, dom: [{ selector: '#terminal', disabled: false }],
          }] }] },
        }));
        assert.equal(failedEvidence.status, 'FAIL', 'A final evidence assertion must not leave a premature PASS');
      }
    } finally { await context.close(); }
  }
});

test('embedded runner preserves exact request guards and closes the wrapper after the browser', () => {
  const source = readFileSync(new URL('./owned-modeling-bootstrap.browser.mjs', import.meta.url), 'utf8');
  assert.match(source, /'embedded-workspace': \{ type: 'boolean' \}/);
  assert.match(source, /method === 'GET' && url\.href === wrapper\.url/);
  assert.match(source, /await captureNativeLogin\(appPage,/);
  assert.match(source, /await verifyEmbeddedWorkspaceUi/);
  assert.ok(source.indexOf('await browser?.close()') < source.indexOf('await wrapper?.close()'));
  assert.doesNotMatch(source, /force:\s*true|srcdoc|setContent\(|inflight\.clear\(|\.contentWindow\./);
});

function ownedShellEvidence() {
  const region = () => ({ count: 1, visible: true, insideRoot: true, insideViewport: true,
    receivesPointer: true, bounds: { x: 0, y: 0, width: 390, height: 844, right: 390, bottom: 844 } });
  const state = () => ({
    embedded: true, indexId: 'owned-index', viewport: { width: 390, height: 844 },
    documentScroll: { x: 0, y: 0 }, horizontalDocumentOverflow: false,
    root: region(), shell: region(), header: { ...region(), bounds: { bottom: 88 } },
    headerLeft: region(), headerRight: region(), left: region(), right: region(),
    main: { ...region(), bounds: { x: 0, y: 192, width: 390, height: 552, bottom: 744 } },
    footer: { ...region(), bounds: { y: 794 } },
    navigation: ['leftsidemenu', 'rightsidemenu'].map(side => ({ id: side, side, ...region() })),
  });
  return { status: 'PASS', scope: 'APPINDEX-SHELL-ONLY', navigationActionsExecuted: false,
    modelWritesRequested: false, requestPolicyChanged: false,
    initial: state(), afterHeaderTools: state(), afterConsoleClose: state(),
    headerTools: {
      search: { operation: 'ordinary-search-input-click-without-query', insideViewport: true,
        receivesPointer: true, focused: true, documentScroll: { x: 0, y: 0 } },
      account: { operation: 'ordinary-account-trigger-hover', insideViewport: true,
        receivesPointer: true, documentScroll: { x: 0, y: 0 }, menuVisible: true, menuInsideViewport: true,
        menuTriggerBound: true,
        closeOperation: 'ordinary-Escape-and-pointer-away', menuHiddenAfterClose: true },
    } };
}

test('owned-shell is an explicit embedded APPINDEX-only gate and never promotes native CRUD', async () => {
  const row = embeddedRow();
  row.stages.workspace.shell = ownedShellEvidence();
  const options = { origin, requireOwnedModelContext: true, expectedModelContext: expectedContext,
    embeddedWorkspace: true, ownedShell: true };
  const result = summarizeBootstrapCase(row, options);
  assert.ok(result.status.startsWith('BOOTSTRAP'));
  assert.deepEqual(result.ownedShell, { required: true, verified: true, scope: 'APPINDEX-SHELL-ONLY',
    navigationAcceptance: false, crudAcceptance: false });
  assert.equal(result.nativeAcceptance, false);
  assert.equal(result.fullApplicationAcceptance, false);
  for (const mutate of [
    value => { value.errors.push({ type: 'console', message: 'Native console failure' }); },
    value => { value.failedRequests.push({ failure: 'net::ERR_NETWORK_CHANGED' }); },
    value => { value.responses.push({ origin, method: 'GET', status: 403, path: '/native-denied' }); },
    value => { value.blocked.push({ origin, method: 'POST', path: '/new-api-not-allowed' }); },
    value => { value.ownedModelContext.index.context.psdevslnsys = 'another-root'; },
    value => { value.teardown.evidenceDrainVerified = false; },
  ]) {
    const failed = structuredClone(row);
    mutate(failed);
    assert.equal(summarizeBootstrapCase(failed, options).status, 'FAILED',
      'Shell geometry cannot override native projection, errors, requests or teardown failures');
  }
  delete row.stages.workspace.shell;
  assert.equal(summarizeBootstrapCase(row, options).status, 'FAILED');
  assert.equal(summarizeBootstrapCase(row, { ...options, embeddedWorkspace: false }).status, 'FAILED');
  await assert.rejects(runBootstrapBrowser({ runReadonlyBrowser: true, ownedShell: true }),
    /Owned shell mode requires explicit/);
  await assert.rejects(runBootstrapBrowser({
    runReadonlyBrowser: true, embeddedWorkspace: true, requireOwnedModelContext: true, ownedShell: 'true',
  }));
});

for (const [name, mutate] of [
  ['hidden header', proof => { proof.initial.header.visible = false; }],
  ['cropped main', proof => { proof.initial.main.bounds.width = 70; }],
  ['short main', proof => { proof.initial.main.bounds.height = 100; }],
  ['main outside frame', proof => { proof.initial.main.insideViewport = false; }],
  ['header overlap', proof => { proof.initial.main.bounds.y = 0; }],
  ['footer overlap', proof => { proof.initial.main.bounds.bottom = 830; }],
  ['covered navigation', proof => { proof.initial.navigation[0].receivesPointer = false; }],
  ['missing right navigation', proof => { proof.initial.navigation.pop(); }],
  ['document horizontally shifted', proof => { proof.afterHeaderTools.documentScroll.x = 20; }],
  ['unfocused search', proof => { proof.headerTools.search.focused = false; }],
  ['synthetic search', proof => { proof.headerTools.search.operation = 'controller-focus'; }],
  ['hidden account menu', proof => { proof.headerTools.account.menuVisible = false; }],
  ['unbound account menu', proof => { proof.headerTools.account.menuTriggerBound = false; }],
  ['account menu outside iframe', proof => { proof.headerTools.account.menuInsideViewport = false; }],
  ['account menu not dismissed', proof => { proof.headerTools.account.menuHiddenAfterClose = false; }],
  ['navigation action', proof => { proof.navigationActionsExecuted = true; }],
  ['extra request policy', proof => { proof.requestPolicyChanged = true; }],
  ['console close leaves main covered', proof => { proof.afterConsoleClose.main.receivesPointer = false; }],
]) test(`owned shell rejects ${name}`, () => {
  const proof = ownedShellEvidence();
  mutate(proof);
  assert.throws(() => verifyOwnedShellEvidence(proof));
});

test('owned shell geometry uses real iframe DOM, ordinary header tools and console actions in all four cells', async t => {
  const server = createServer((request, response) => {
    if (request.url !== '/') { response.writeHead(404); response.end(); return; }
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(`<!doctype html><html><head><link rel="icon" href="data:,"><style>
      *{box-sizing:border-box}html,body,#owned-index{margin:0;width:100%;height:100%;overflow:hidden}
      [hidden]{display:none!important}.aibiz-design-shell{height:100%;display:flex;flex-direction:column}
      .ibiz-scroll-container__header{height:88px;flex:none;display:flex;flex-direction:column}
      .ibiz-panel-container--app_header_left{height:32px;flex:none}
      .ibiz-panel-container--app_header_right{height:56px;overflow-x:auto;overflow-y:hidden}
      .header-tools{display:flex;align-items:center;justify-content:space-between;width:800px;height:40px}
      .ibiz-global-search input{width:240px;height:32px}
      .ibiz-user-info-info{width:90px;height:32px;border:1px solid}
      .ibiz-scroll-container-content{display:grid;grid-template-columns:200px minmax(0,1fr) 100px;flex:1;min-height:0}
      .ibiz-scroll-container-content__left,.ibiz-scroll-container-content__center,.ibiz-scroll-container-content__right{min-width:0;min-height:0;overflow:auto}
      .ibiz-left-side-menu{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;padding:4px}
      .ibiz-left-side-menu button{height:42px;min-width:0}
      .ibiz-right-side-menu button{height:42px;width:100%}
      .ibiz-scroll-container__footer{height:50px;flex:none}
      .ibiz-scroll-container__footer button{height:44px}
      .el-dropdown__popper{position:fixed;right:2px;top:76px;width:100px;height:40px;background:white;border:1px solid;z-index:5}
      .aibiz-console-drawer{position:fixed;bottom:0;width:100%;height:45%;background:#eee;z-index:6}
      .el-drawer__close-btn{position:absolute;right:8px;top:8px;width:32px;height:32px}
      @media(max-width:767px){.ibiz-scroll-container-content{grid-template-columns:minmax(0,1fr);grid-template-rows:104px minmax(0,1fr) 50px}}
      </style></head><body><div id="owned-index"><div class="aibiz-design-shell">
      <header class="ibiz-scroll-container__header"><div class="ibiz-panel-container--app_header_left">Actual-shaped header</div>
      <div class="ibiz-panel-container--app_header_right"><div class="header-tools"><div class="ibiz-global-search"><input></div><div class="ibiz-user-info-info" id="account-trigger" tabindex="0">Account</div></div></div></header>
      <div class="ibiz-scroll-container-content"><nav class="ibiz-scroll-container-content__left"><div class="ibiz-left-side-menu">
      <button id="nav-system">System</button><button id="nav-entity">Entity</button></div></nav>
      <main class="ibiz-scroll-container-content__center"><div style="height:1200px">Inner scrolling content</div></main>
      <aside class="ibiz-scroll-container-content__right"><div class="ibiz-right-side-menu"><button id="nav-plugin">Plugins</button></div></aside></div>
      <footer class="ibiz-scroll-container__footer"><button id="terminal">Console</button></footer>
      </div></div><div class="el-dropdown__popper" hidden><div role="menu" aria-labelledby="account-trigger">Logout</div></div>
      <section class="aibiz-console-drawer" hidden><button class="el-drawer__close-btn">Close</button></section>
      <script>const account=document.querySelector('.ibiz-user-info-info'),menu=document.querySelector('.el-dropdown__popper'),drawer=document.querySelector('.aibiz-console-drawer');
      window.fixture={navClicks:0,searchQueries:0};
      document.querySelectorAll('nav button,aside button').forEach(button=>button.onclick=()=>window.fixture.navClicks++);
      document.querySelector('input').oninput=()=>window.fixture.searchQueries++;
      account.onmouseenter=()=>menu.hidden=false;document.addEventListener('keydown',event=>{if(event.key==='Escape')menu.hidden=true});
      document.querySelector('#terminal').onclick=()=>{drawer.hidden=false;drawer.classList.add('open')};
      document.querySelector('.el-drawer__close-btn').onclick=()=>{drawer.hidden=true;drawer.classList.remove('open')};
      </script></body></html>`);
  });
  await new Promise(done => server.listen(0, '127.0.0.1', done));
  t.after(() => new Promise(done => { server.close(done); server.closeAllConnections(); }));
  const wrapper = await startEmbeddedWorkspaceWrapper(`http://127.0.0.1:${server.address().port}/`);
  t.after(() => wrapper.close());
  const require = createRequire(new URL('../../../ibiz-app-hub/package.json', import.meta.url));
  const browser = await launchChromium(require('playwright').chromium, { args: ['--no-sandbox'] });
  t.after(() => browser.close());
  const item = (id, target = null) => ({ id, visible: true, permitted: true, target,
    dom: [{ selector: `#${id}`, disabled: false }] });
  const index = { index: { domId: 'owned-index' }, menus: [
    { name: 'leftsidemenu', items: [item('nav-system'), item('nav-entity')] },
    { name: 'rightsidemenu', items: [item('nav-plugin')] },
    { name: 'bottomsidemenu', items: [item('terminal', { viewId: 'modeldesign.pssysdevbktasktabexpview' })] },
  ] };
  for (const locale of ['zh-CN', 'en-US']) for (const viewport of [
    { width: 1440, height: 900 }, { width: 390, height: 844 },
  ]) {
    const context = await browser.newContext({ locale, viewport, serviceWorkers: 'block' });
    try {
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      page.on('requestfailed', request => errors.push(request.failure()?.errorText));
      await page.goto(wrapper.url);
      const frame = await (await page.locator('#owned-modeldesign-workspace').elementHandle()).contentFrame();
      const appPage = applicationFramePage(page, frame);
      const evidence = await verifyEmbeddedWorkspaceUi({
        page, appPage, wrapper, index, ownedShell: true, screenshot: async () => {},
      });
      assert.equal(verifyEmbeddedWorkspaceEvidence(evidence, { ownedShell: true }), true);
      assert.equal(verifyOwnedShellDom(evidence.shell.initial), true);
      assert.equal(verifyOwnedShellEvidence(evidence.shell), true);
  assert.deepEqual(await appPage.evaluate(() => window.fixture), { navClicks: 0, searchQueries: 0 });
      assert.deepEqual(errors, []);
      assert.equal(evidence.shell.initial.horizontalDocumentOverflow, false,
        'Normal tall inner content and a horizontally scrollable header are not body overflow');
      if (viewport.width < 768) {
        assert.ok(evidence.shell.headerTools.account.scrollers.some(row => row.x > 0),
          'The actual account trigger is reached through its own horizontal header scroll');
      }
    } finally { await context.close(); }
  }
});

test('owned-shell source keeps APPINDEX-only actions and the existing exact API policy', () => {
  const source = readFileSync(new URL('./owned-modeling-bootstrap.browser.mjs', import.meta.url), 'utf8');
  assert.match(source, /'owned-shell': \{ type: 'boolean' \}/);
  assert.match(source, /ownedShell \|\| \(embeddedWorkspace && requireOwnedModelContext\)/);
  assert.match(source, /readOnlyBrowserRequestAllowed\(\{ method, path: url\.pathname \}, readPolicy\)/);
  assert.match(source, /counterRead \|\|/);
  assert.match(source, /await runBootstrapScopeAction\(\{ row, requireOwnedModelContext,/);
  const helper = source.slice(source.indexOf('export async function observeOwnedShellUi'),
    source.indexOf('export function collectEmbeddedWorkspaceDom'));
  assert.match(helper, /search\.click\(\)/);
  assert.match(helper, /account\.hover\(\)/);
  assert.match(helper, /scrollIntoViewIfNeeded\(\)/);
  assert.doesNotMatch(helper, /fetch\(|\.fill\(|\.dispatchEvent\(|force:|window\.ibiz|setContent|addStyleTag|controller/);
});
