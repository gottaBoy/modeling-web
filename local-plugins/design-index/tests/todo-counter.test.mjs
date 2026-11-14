import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import { classifyTodoCounterError } from '../src/model.ts';
import * as modelHelpers from '../src/model.ts';

const require = createRequire(new URL('../../../app/package.json', import.meta.url));
const ts = require('typescript');
const source = readFileSync(new URL('../src/controller.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  fileName: 'controller.ts', reportDiagnostics: true,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
});
assert.equal(compiled.diagnostics.length, 0);
const tick = () => new Promise(done => setImmediate(done));

function fixture(environment = {}, window) {
  const requests = [];
  const errors = [];
  const warnings = [];
  let resolve;
  let reject;
  const response = new Promise((done, fail) => { resolve = done; reject = fail; });
  const runtime = {
    env: { appId: 'ModelDesign', ...environment },
    net: { post(url, params) { requests.push({ url, params }); return response; } },
    log: { error: error => errors.push(error), warn: error => warnings.push(error) },
  };
  class HostViewController {
    constructor(model, context, params, ctx) {
      Object.assign(this, { model, context, params, ctx });
      this.state = { presetClassList: [] };
      this.engines = [{}];
    }
    async onCreated() {}
    async onDestroyed() {}
  }
  const exports = {};
  runInNewContext(compiled.outputText, {
    exports, ibiz: runtime, window,
    require(id) {
      if (id === '@ibiz-template/runtime') return { ViewController: HostViewController };
      if (id === './model') return modelHelpers;
      throw new Error(`Unspecified source-test boundary ${id}`);
    },
  }, { filename: 'design-index-counter-source-test.js' });
  const controls = modelHelpers.requiredControlNames.map(name => ({ name, id: name, appMenuItems: [] }));
  const controller = new exports.DesignIndexController({
    viewType: 'APPINDEXVIEW', viewLayoutPanel: { controls, rootPanelItems: [] },
  }, {}, {}, { evt: { on() {}, off() {} } });
  return { controller, runtime, requests, errors, warnings, resolve, reject };
}

function loadHostSource(path, runtime, boundaries = {}, globals = {}) {
  const result = ts.transpileModule(readFileSync(path, 'utf8'), {
    fileName: path.pathname, reportDiagnostics: true,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  assert.equal(result.diagnostics.length, 0);
  const exports = {};
  runInNewContext(result.outputText, {
    exports, ibiz: runtime, ...globals,
    require(id) {
      assert.ok(Object.hasOwn(boundaries, id), `Unspecified host-test dependency: ${id}`);
      return boundaries[id];
    },
  }, { filename: path.pathname });
  return exports;
}

const coreRoot = new URL('../../../packages-latest/@ibiz-template/core/src/', import.meta.url);
const hostEnums = {
  ...loadHostSource(new URL('interface/api/constant/login-mode/login-mode.ts', coreRoot)),
  ...loadHostSource(new URL('interface/api/constant/menu-permission-mode/menu-permission-mode.ts', coreRoot)),
};

async function attachedHostFixture(deploymentValue, runtimeValue) {
  const window = {
    Environment: {
      appId: 'ModelDesign', requireOrganizationContext: true,
      ...(deploymentValue === undefined ? {} : { enableNativePlmTodoCounter: deploymentValue }),
    },
    location: { search: '' },
  };
  const data = fixture({}, window);
  data.runtime.env = loadHostSource(new URL('environment/environment.ts', coreRoot),
    data.runtime, { '../interface': hostEnums }).Environment;
  data.runtime.log.setLevel = () => {};
  const host = loadHostSource(new URL(
    '../../../packages-latest/@ibiz-template/vue3-components/src/web-app/attach-environment-config.ts',
    import.meta.url,
  ), data.runtime, { qs: { default: require('qs') }, ramda: require('ramda') }, {
    window, document: { getElementById: () => null },
  });
  await host.attachEnvironmentConfig();
  assert.equal(data.runtime.env.requireOrganizationContext, true,
    'The real host must copy its declared deployment environment keys');
  assert.equal(Object.hasOwn(data.runtime.env, 'enableNativePlmTodoCounter'), false,
    'The real Core/host attach path drops this unknown optional key');
  if (runtimeValue !== undefined) data.runtime.env.enableNativePlmTodoCounter = runtimeValue;
  return data;
}

for (const [name, deployment, runtime, enabled] of [
  ['host false', false, undefined, false],
  ['host true', true, undefined, true],
  ['host absent', undefined, undefined, true],
  ['host string false', 'false', undefined, true],
  ['host false wins over runtime true', false, true, false],
  ['host true wins over runtime false', true, false, true],
  ['host absent falls back to runtime false', undefined, false, false],
  ['host string false falls back to runtime false', 'false', false, false],
]) {
  test(`real Core and host attach: ${name} controls the source counter without fabricated data`, async () => {
    const data = await attachedHostFixture(deployment, runtime);
    await data.controller.onCreated();
    assert.equal(data.requests.length, enabled ? 1 : 0);
    assert.equal(data.controller.state.myTodoCount, undefined);
    assert.equal(data.controller.state.myTodoCountStatus, enabled ? 'pending' : 'disabled');
    if (enabled) {
      data.resolve({ status: 200, data: { my_todo_count: 7 } });
      await tick();
      assert.equal(data.controller.state.myTodoCountStatus, 'ready');
      assert.equal(data.controller.state.myTodoCount, 7);
    }
    assert.equal(data.errors.length, 0);
    assert.equal(data.warnings.length, 0);
    await data.controller.onDestroyed();
  });
}

for (const [outcome, settle] of [
  ['success', data => data.resolve({ status: 200, data: { my_todo_count: 9 } })],
  ['failure', data => data.reject(Object.assign(new Error('HTTP 500'), { status: 500 }))],
]) {
  test(`real host-enabled late ${outcome} cannot change source counter state after disposal`, async () => {
    const data = await attachedHostFixture(true);
    await data.controller.onCreated();
    await data.controller.onDestroyed();
    const state = JSON.stringify(data.controller.state);
    settle(data);
    await tick();
    assert.equal(JSON.stringify(data.controller.state), state);
    assert.equal(data.requests.length, 1);
    assert.equal(data.controller.state.myTodoCount, undefined);
    assert.equal(data.errors.length, 0);
    assert.equal(data.warnings.length, 0);
  });
}

test('explicit false disables the optional PLM counter without a request or fabricated zero', async () => {
  const data = fixture({ enableNativePlmTodoCounter: false });
  await data.controller.onCreated();
  await tick();
  assert.equal(data.controller.state.myTodoCountStatus, 'disabled');
  assert.equal(data.controller.state.myTodoCount, undefined);
  assert.equal(data.requests.length, 0);
  assert.equal(data.errors.length, 0);
  assert.equal(data.warnings.length, 0);
  await data.controller.onDestroyed();
  assert.equal(data.requests.length, 0);
});

for (const [name, environment] of [
  ['absent shared default', {}], ['explicit true', { enableNativePlmTodoCounter: true }],
  ['string false is not boolean false', { enableNativePlmTodoCounter: 'false' }],
]) {
  test(`${name} retains the real counter request and pending-to-ready lifecycle`, async () => {
    const data = fixture(environment);
    await data.controller.onCreated();
    assert.equal(data.requests.length, 1);
    assert.equal(data.requests[0].url, '/work_items/count_my_todo');
    assert.equal(data.controller.state.myTodoCountStatus, 'pending');
    assert.equal(data.controller.state.myTodoCount, undefined);
    data.resolve({ status: 200, data: { my_todo_count: '7' } });
    await tick();
    assert.equal(data.controller.state.myTodoCountStatus, 'ready');
    assert.equal(data.controller.state.myTodoCount, 7);
    assert.equal(data.errors.length, 0);
    await data.controller.onDestroyed();
  });
}

for (const [name, environment] of [
  ['absent shared default', {}], ['explicit true', { enableNativePlmTodoCounter: true }],
]) {
  for (const [outcome, settle] of [
    ['success', data => data.resolve({ status: 200, data: { my_todo_count: 9 } })],
    ['missing optional service', data => data.reject(Object.assign(new Error('HTTP 404'), { status: 404 }))],
    ['server failure', data => data.reject(Object.assign(new Error('HTTP 500'), { status: 500 }))],
  ]) {
    test(`${name} late ${outcome} cannot publish state or logs after disposal`, async () => {
      const data = fixture(environment);
      await data.controller.onCreated();
      await data.controller.onDestroyed();
      const state = JSON.stringify(data.controller.state);
      settle(data);
      await tick();
      assert.equal(JSON.stringify(data.controller.state), state);
      assert.equal(data.controller.state.myTodoCount, undefined);
      assert.equal(data.errors.length, 0);
      assert.equal(data.warnings.length, 0);
      assert.equal(data.requests.length, 1);
    });
  }
}

test('todo counter contract distinguishes missing optional PLM service from real failures', () => {
  assert.equal(classifyTodoCounterError({ status: 404 }), 'unavailable');
  assert.equal(classifyTodoCounterError({ status: 405 }), 'unavailable');
  for (const status of [
    0, 200, 400, 401, 403, 408, 422, 500, 502, 503, 504,
    '404', '405', ' 404 ', '0405', null, false, true, undefined, NaN, Infinity,
    new Number(404), { valueOf: () => 405 },
  ]) {
    assert.equal(classifyTodoCounterError(status === undefined ? {} : { status }), 'error');
  }
  for (const error of [null, undefined, '404', 404, new Error('network down'),
    { response: { status: 404 } }]) {
    assert.equal(classifyTodoCounterError(error), 'error');
  }
});
