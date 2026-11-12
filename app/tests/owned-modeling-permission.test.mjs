import assert from 'node:assert/strict';
import test from 'node:test';
import { permissionCases, runPermissionBrowser } from './owned-modeling-permission.browser.mjs';

test('permission matrix contains six deliberate read-only role/root cases', () => {
  assert.equal(permissionCases.length, 6);
  assert.deepEqual(permissionCases.map(row => row.id), [
    'viewer-own-a-zh-desktop', 'no-access-own-a-en-desktop',
    'viewer-own-b-zh-mobile', 'no-access-own-b-en-mobile',
    'editor-cross-a-to-b-zh-desktop', 'editor-cross-b-to-a-en-mobile',
  ]);
  assert.ok(permissionCases.every(row => row.status === undefined));
  assert.equal(permissionCases.filter(row => row.actorRole === 'no-access').length, 2);
  assert.equal(permissionCases.filter(row => row.actorSide !== row.rootSide).length, 2);
});

test('permission browser cannot run without explicit read-only opt-in', async () => {
  await assert.rejects(runPermissionBrowser({}), /true/);
});

test('permission browser cannot run with unpinned launch/deployment inputs', async () => {
  await assert.rejects(runPermissionBrowser({ runReadonlyBrowser: true }), /match|undefined|string/i);
});
