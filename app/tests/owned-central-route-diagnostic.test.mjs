import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { diagnoseCentralRoute } from './owned-central-route-diagnostic.mjs';

function fixture(t, mutate = () => {}) {
  const root = fs.mkdtempSync(join(os.tmpdir(), 'central-diagnostic-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const request = {
    method: 'POST', path: '/api/ibizmodeling__central/psdevslns/fetchcurdcslnuser',
    backendPath: '/ibizmodeling/modelapi/psdevslns/fetchcurdcslnuser',
  };
  const rows = {
    browserReport: { contract: 'native-modeling-browser-prerequisites',
      applications: { Central: { errors: [{ ...request, authenticated: true, status: 404 }] } } },
    backendReport: { probe: { contract: 'owned-modeling-application-route-probe-v1',
      canonicalRoute: { id: 'ibizmodeling__modeldesign__psdevslnsys',
        predicates: ['Path=/ibizmodeling__modeldesign/psdevslnsys/**'] } } },
    config: [{ dataId: 'appgateway-default', content: JSON.stringify({ routes: [{
      id: 'ibizmodeling__modeldesign__psdevslnsys',
      uri: 'http://nf-123456789abc-backend-owned-provider:32002',
      predicates: [{ name: 'Path', args: { _genkey_0: '/api/ibizmodeling__modeldesign/psdevslnsys/**' } }],
      filters: [{ name: 'StripPrefix', args: { parts: '2' } },
        { name: 'PrefixPath', args: { prefix: '/ibizmodeling/modelapi' } }],
    }] }) }],
    serviceReceipt: { contract: 'native-central-published-query-candidate', request,
      status: 'prepared-not-accepted', acceptedForProduction: false },
  };
  mutate(rows);
  return Object.fromEntries(Object.entries(rows).map(([name, value]) => {
    const path = join(root, `${name}.json`);
    fs.writeFileSync(path, JSON.stringify(value));
    return [name, path];
  }));
}

test('config-r6 Central 404 is classified as absent route publication', t => {
  const report = diagnoseCentralRoute(fixture(t));
  assert.equal(report.status, 'FAILED-ROUTE-NOT-PUBLISHED');
  assert.equal(report.gateway.centralRoutePresent, false);
  assert.equal(report.gateway.modelDesignRoutePresent, true);
  assert.equal(report.routeCandidate.deployment, 'NOT-DEPLOYED-CANDIDATE-ONLY');
  assert.equal(report.routeCandidate.predicates[0].args._genkey_0,
    '/api/ibizmodeling__central/psdevslns/fetchcurdcslnuser');
  assert.deepEqual(report.routeCandidate.predicates[1], { name: 'Method', args: { _genkey_0: 'POST' } });
  assert.equal(report.operation, 'READ-DATASET-NOT-CREATE');
  assert.equal(report.routeCandidate.targetPath,
    '/ibizmodeling/modelapi/psdevslns/fetchcurdcslnuser');
  assert.equal(report.serviceCandidate.request.method, 'POST');
  assert.equal(report.serviceCandidate.request.path,
    '/api/ibizmodeling__central/psdevslns/fetchcurdcslnuser');
  assert.equal(report.serviceCandidate.request.backendPath,
    report.routeCandidate.targetPath);
  assert.equal(report.nativeAcceptance, false);
});

test('diagnostic candidate never claims data or permission acceptance from HTTP 404', t => {
  const report = diagnoseCentralRoute(fixture(t));
  assert.ok(report.blocked.some(item => /response|row isolation|unaccepted/i.test(item)));
  assert.equal(report.permissionAcceptance, false);
  assert.equal(report.acceptedForProduction, false);
});

test('an already-published Central route or non-404 response cannot reuse the historical diagnosis', t => {
  for (const mutate of [
    rows => { rows.browserReport.applications.Central.errors[0].status = 403; },
    rows => {
      const gateway = JSON.parse(rows.config[0].content);
      gateway.routes.push({ id: 'central', predicates: [{
        name: 'Path', args: { _genkey_0: '/api/ibizmodeling__central/psdevslns/fetchcurdcslnuser' },
      }] });
      rows.config[0].content = JSON.stringify(gateway);
    },
  ]) assert.throws(() => diagnoseCentralRoute(fixture(t, mutate)));
});
