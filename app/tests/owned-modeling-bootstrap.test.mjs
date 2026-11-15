import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  browserReadMatrix, expectedBootstrapPreAuth401, runBootstrapBrowser, summarizeBootstrapCase,
  ownedBootstrapContextExpectation, verifyOwnedBootstrapIndexContext, verifyOwnedBootstrapProjection,
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
  assert.match(source, /page\.on\('request', request => requests\.set/);
  assert.match(source, /page\.on\('requestfailed'/);
  assert.match(source, /authorizationPresent = Boolean\(headers\.authorization\)/);
  assert.match(source, /phaseAtRequest: requested\?\.phase \?\? 'unobserved'/);
  assert.match(source, /row\.summary = summarizeBootstrapCase\(row, \{ origin, requireOwnedModelContext, expectedModelContext \}\)/);
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
    assert.equal(result.status, 'BOOTSTRAP-AND-NATURAL-CLICK-OBSERVED-NOT-NATIVE-ACCEPTED');
    assert.deepEqual(result.ownedModelContext, {
      required: true, verified: true, appdataProjectionVerified: true,
      sameActorAndOrganizationVerified: true, appindexRootAndLogicalSystemConsumed: true,
    });
    assert.equal(row.stages.systemMenu.status, 'CLICKED-NOT-YET-NAVIGATION-ACCEPTED');
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
