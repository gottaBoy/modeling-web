import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const workspace = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const browserReportPath = join(workspace,
  '.artifacts/owned-modeling-bootstrap-browser/config6-native-probe-zh-20261112-r2/report.json');
const backendReportPath = join(workspace,
  '.artifacts/native-nonadmin-fixtures/25dd6a7232c7/backend-runtime-registry-backend-config-r6/model-route-probe/report.json');
const configPath = join(workspace,
  '.artifacts/native-nonadmin-fixtures/25dd6a7232c7/backend-runtime-registry-backend-config-r6/nacos-configs.private.json');
const serviceReceiptPath = join(workspace,
  '.artifacts/native-service-migration/central-query-20261109-r2/receipt.json');

function read(path) {
  const bytes = fs.readFileSync(path);
  return { bytes, value: JSON.parse(bytes) };
}

function ownedRouteCandidate(providerHost) {
  assert.match(providerHost, /^nf-[a-f0-9]{12}-backend-[a-z0-9][a-z0-9-]{0,48}-provider$/);
  return {
    id: 'ibizmodeling__central__psdevsln__member-read',
    uri: `http://${providerHost}:32002`,
    order: 99,
    predicates: [
      { name: 'Path', args: { _genkey_0: '/api/ibizmodeling__central/psdevslns/fetchcurdcslnuser' } },
      { name: 'Method', args: { _genkey_0: 'POST' } },
    ],
    filters: [
      { name: 'StripPrefix', args: { parts: '2' } },
      { name: 'PrefixPath', args: { prefix: '/ibizmodeling/modelapi' } },
    ],
    deployment: 'NOT-DEPLOYED-CANDIDATE-ONLY',
    targetPath: '/ibizmodeling/modelapi/psdevslns/fetchcurdcslnuser',
  };
}

export function diagnoseCentralRoute({
  browserReport = browserReportPath,
  backendReport = backendReportPath,
  config = configPath,
  serviceReceipt = serviceReceiptPath,
} = {}) {
  const browser = read(browserReport).value;
  const backend = read(backendReport).value;
  const nacos = read(config);
  const service = read(serviceReceipt);
  assert.equal(browser.contract, 'native-modeling-browser-prerequisites');
  assert.equal(backend.probe?.contract, 'owned-modeling-application-route-probe-v1');
  assert.equal(service.value.contract, 'native-central-published-query-candidate');
  const central = browser.applications.Central;
  const datasetFailure = central.errors.find(row =>
    row.authenticated === true && row.method === 'POST' &&
    row.path === '/api/ibizmodeling__central/psdevslns/fetchcurdcslnuser');
  assert.ok(datasetFailure, 'Current browser receipt must contain the authenticated Central 404');
  assert.equal(datasetFailure.status, 404);
  const docs = Array.isArray(nacos.value) ? nacos.value : [nacos.value];
  const appGateway = docs.find(row => row.dataId === 'appgateway-default');
  assert.ok(appGateway?.content);
  const gateway = JSON.parse(appGateway.content.replace(/^---\s*/, ''));
  assert.ok(Array.isArray(gateway.routes));
  const routes = gateway.routes;
  const centralMatches = routes.filter(route =>
    route.predicates?.some(predicate => Object.values(predicate.args ?? {})
      .some(path => typeof path === 'string' && path.startsWith('/api/ibizmodeling__central/psdevslns/'))));
  assert.equal(centralMatches.length, 0,
    'Config-r6 must not already contain the proposed exact Central route');
  const modelDesignRoute = routes.find(route => route.id === 'ibizmodeling__modeldesign__psdevslnsys');
  assert.ok(modelDesignRoute);
  assert.deepEqual(modelDesignRoute.predicates, [{
    name: 'Path', args: { _genkey_0: '/api/ibizmodeling__modeldesign/psdevslnsys/**' },
  }]);
  const provider = new URL(modelDesignRoute.uri);
  const candidate = ownedRouteCandidate(provider.hostname);
  assert.equal(candidate.uri, modelDesignRoute.uri);
  assert.deepEqual(candidate.filters, modelDesignRoute.filters);
  assert.equal(service.value.request.method, 'POST');
  assert.equal(service.value.request.path,
    '/api/ibizmodeling__central/psdevslns/fetchcurdcslnuser');
  assert.equal(service.value.request.backendPath, candidate.targetPath);
  assert.equal(backend.probe.canonicalRoute.id, 'ibizmodeling__modeldesign__psdevslnsys');
  assert.equal(backend.probe.canonicalRoute.predicates[0], 'Path=/ibizmodeling__modeldesign/psdevslnsys/**');
  return {
    contract: 'owned-central-route-diagnostic-v1',
    status: 'FAILED-ROUTE-NOT-PUBLISHED',
    operation: 'READ-DATASET-NOT-CREATE',
    nativeAcceptance: false, permissionAcceptance: false, acceptedForProduction: false,
    browser: {
      path: browserReport, sha256: hash(fs.readFileSync(browserReport)),
      authenticatedFailure: { method: datasetFailure.method, status: datasetFailure.status, path: datasetFailure.path },
    },
    backendProbe: {
      path: backendReport, sha256: hash(fs.readFileSync(backendReport)),
      canonicalRouteId: backend.probe.canonicalRoute.id,
      canonicalRoute: backend.probe.canonicalRoute,
    },
    gateway: {
      path: config, sha256: hash(nacos.bytes), dataId: appGateway.dataId,
      routeCount: routes.length,
      modelDesignRoutePresent: true,
      centralRoutePresent: false,
    },
    serviceCandidate: {
      path: serviceReceipt, sha256: hash(service.bytes),
      request: service.value.request,
      status: service.value.status,
      acceptedForProduction: service.value.acceptedForProduction,
    },
    routeCandidate: candidate,
    semantics: 'A precise owned candidate only; no gateway/Nacos/shared route was changed. The browser 404 is classified as missing route publication, not data or permission acceptance.',
    blocked: [
      'Candidate has not been published to owned gateway configuration.',
      'Full member-binding candidate must be verified and staged on the backend before routing; a view-only candidate is insufficient.',
      'Central dataset response, row isolation and Central browser navigation remain unaccepted.',
      'No HTTP retry through an alternate route or injected header was used.',
    ],
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const report = diagnoseCentralRoute();
  const output = join(workspace, '.artifacts/owned-modeling-bootstrap-browser',
    'config6-m01-route-20261112-r2', 'report.private.json');
  fs.mkdirSync(dirname(output), { recursive: true, mode: 0o700 });
  fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`, { flag: 'wx', mode: 0o600 });
  console.log(JSON.stringify({ output, status: report.status, route: report.routeCandidate }));
}
