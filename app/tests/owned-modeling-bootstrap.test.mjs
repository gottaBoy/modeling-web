import assert from 'node:assert/strict';
import test from 'node:test';
import { browserReadMatrix, runBootstrapBrowser } from './owned-modeling-bootstrap.browser.mjs';

const manifest = {
  roots: [{ side: 'a', rootId: 'owned_a' }, { side: 'b', rootId: 'owned_b' }],
  users: ['a', 'b'].flatMap(side => ['editor', 'viewer', 'no-access'].map(role => ({
    loginname: `owned_${side}_${role}`, role, rootId: `owned_${side}`,
  }))),
};

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

test('live execution cannot begin without its explicit read-only execution switch', async () => {
  await assert.rejects(runBootstrapBrowser({}), /true/);
});

test('live execution refuses an unpinned launch before browser or Docker access', async () => {
  await assert.rejects(runBootstrapBrowser({ runReadonlyBrowser: true }), /match|undefined|string/i);
});
