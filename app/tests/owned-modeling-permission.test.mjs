import assert from 'node:assert/strict';
import test from 'node:test';
import {
  permissionCases, permissionCaseTargets, postLoginUnauthorized, publicRootReady, runPermissionBrowser,
} from './owned-modeling-permission.browser.mjs';

const readyEvidence = () => ({
  matchingIndexCount: 1, visibleOverlays: [],
  index: {
    controllerId: 'native-index', domId: 'native-index',
    visible: true, viewType: 'APPINDEXVIEW',
    appId: 'ibizmodeling__modeldesign', context: { psdevslnsys: 'owned-root-a' },
    lifecycle: { isCreated: true, isMounted: true, isLoading: false, isDestroyed: false, hasError: false },
  },
});

test('post-login 401 classification requires both request and response after normal login', () => {
  const real = { status: 401, requestPhase: 'authenticated', responsePhase: 'authenticated' };
  for (const phase of ['before-login', 'login-submitted', 'unknown', undefined]) {
    assert.deepEqual(postLoginUnauthorized([{ ...real, requestPhase: phase }]), []);
    assert.deepEqual(postLoginUnauthorized([{ ...real, responsePhase: phase }]), []);
  }
  assert.deepEqual(postLoginUnauthorized([real]), [real]);
  assert.deepEqual(postLoginUnauthorized([{ ...real, status: 403 }]), []);
});

test('permission root readiness uses the actual runtime context, not a static model parameter', () => {
  const evidence = readyEvidence();
  evidence.index.modelParams = { psdevslnsys: 'other-root' };
  assert.equal(publicRootReady(evidence, 'owned-root-a'), true);
  assert.equal(publicRootReady(evidence, 'other-root'), false);
});

for (const [name, mutate] of [
  ['missing evidence', () => undefined],
  ['missing index', value => { delete value.index; return value; }],
  ['missing context', value => { delete value.index.context; return value; }],
  ['null root', value => { value.index.context.psdevslnsys = null; return value; }],
  ['foreign root', value => { value.index.context.psdevslnsys = 'other-root'; return value; }],
  ['static-only root', value => {
    value.index.modelParams = { psdevslnsys: 'owned-root-a' };
    delete value.index.context;
    return value;
  }],
  ['ambiguous index', value => { value.matchingIndexCount = 2; return value; }],
  ['visible loader', value => { value.visibleOverlays.push({ id: 'app-loading-x' }); return value; }],
  ['missing overlay evidence', value => { delete value.visibleOverlays; return value; }],
  ['hidden view', value => { value.index.visible = false; return value; }],
  ['wrong view type', value => { value.index.viewType = 'DEEDITVIEW'; return value; }],
  ['wrong controller', value => { value.index.controllerId = 'foreign-view'; return value; }],
  ['wrong application', value => { value.index.appId = 'ibizmodeling__central'; return value; }],
  ...Object.entries({ isCreated: false, isMounted: false, isLoading: true, isDestroyed: true, hasError: true })
    .map(([key, state]) => [`lifecycle ${key}`, value => { value.index.lifecycle[key] = state; return value; }]),
  ['missing lifecycle', value => { delete value.index.lifecycle; return value; }],
]) {
  test(`permission root readiness rejects ${name}`, () => {
    assert.equal(publicRootReady(mutate(readyEvidence()), 'owned-root-a'), false);
  });
}

function manifest(sameCenter) {
  const roots = ['a', 'b'].map(side => ({
    side, rootId: `owned-root-${side}`, centerId: `owned_center_${sameCenter ? 'a' : side}`,
  }));
  return {
    roots,
    users: roots.flatMap(root => ['editor', 'viewer', 'no-access'].map(role => ({
      loginname: `owned_${root.side}_${role}`, rootId: root.rootId, role, centerId: root.centerId,
    }))),
  };
}

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

for (const sameCenter of [true, false]) {
  test(`permission actors resolve by their own root in a ${sameCenter ? 'same-center' : 'two-center'} fixture`, () => {
    const fixture = manifest(sameCenter);
    for (const spec of permissionCases) {
      const { actor, root } = permissionCaseTargets(fixture, spec);
      assert.equal(actor.loginname, `owned_${spec.actorSide}_${spec.actorRole}`, spec.id);
      assert.equal(actor.rootId, `owned-root-${spec.actorSide}`, spec.id);
      assert.equal(root.rootId, `owned-root-${spec.rootSide}`, spec.id);
      assert.equal(actor.rootId === root.rootId &&
        ['editor', 'viewer'].includes(actor.role),
      spec.actorRole === 'viewer' && spec.actorSide === spec.rootSide, spec.id);
    }
  });
}

test('permission actor selection refuses missing roots, missing actors and ambiguous roles', () => {
  const spec = permissionCases[0];
  const noRoot = manifest(true);
  noRoot.roots = noRoot.roots.filter(root => root.side !== spec.actorSide);
  assert.throws(() => permissionCaseTargets(noRoot, spec), /roots must exist/);
  const noActor = manifest(true);
  noActor.users = noActor.users.filter(user => user.loginname !== 'owned_a_viewer');
  assert.throws(() => permissionCaseTargets(noActor, spec), /exactly one user/);
  const duplicate = manifest(true);
  duplicate.users.push({ ...duplicate.users.find(user => user.loginname === 'owned_a_viewer') });
  assert.throws(() => permissionCaseTargets(duplicate, spec), /exactly one user/);
});

test('permission browser cannot run without explicit read-only opt-in', async () => {
  await assert.rejects(runPermissionBrowser({}), /true/);
});

test('permission browser cannot run with unpinned launch/deployment inputs', async () => {
  await assert.rejects(runPermissionBrowser({ runReadonlyBrowser: true }), /match|undefined|string/i);
});
