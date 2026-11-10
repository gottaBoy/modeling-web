import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { link, mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { buildLocalModelEdit, pluginRoot } from '../build.mjs';

const require = createRequire(new URL('../../../app/package.json', import.meta.url));
const vue = require('vue');
const ts = require('typescript');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const normalize = value => JSON.parse(JSON.stringify(value));
const deferred = () => {
  let resolve;
  let reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
};
const built = await buildLocalModelEdit({ writeOutputs: false });

function loadSystem({ host, loader = {}, runtime = {} } = {}) {
  const registrations = [];
  const peers = {
    vue, '@monaco-editor/loader': { default: loader },
    '@ibiz-template/runtime': {
      UIActionProviderBase: class {},
      SysUIActionTag: { SAVE: 'SAVE' },
      calcDeCodeNameById: () => 'item',
      convertNavData: (parameters = [], ...origins) => Object.fromEntries(parameters.flatMap(parameter => {
        if (parameter.rawValue) return [[parameter.key, parameter.value]];
        const origin = origins.find(value => Object.hasOwn(value, parameter.value));
        return origin ? [[parameter.key, origin[parameter.value]]] : [];
      })),
      formatMultiData: (parameters = [], data) => Object.fromEntries(parameters.filter(parameter =>
        !parameter.rawValue && Object.prototype.hasOwnProperty.call(data[0], parameter.value)
      ).map(parameter => [parameter.value, data.map(item => item[parameter.value]).join(',')])),
      registerUIActionProvider: (key, factory) => registrations.push({ key, factory }),
      ...runtime,
    },
  };
  let registration;
  const exports = {};
  const context = vm.createContext({
    URL, console, ibiz: host,
    System: { register: (dependencies, declare) => { registration = { dependencies, declare }; } },
  });
  vm.runInContext(built.artifacts.get('index.system.js'), context, { timeout: 5000 });
  assert.ok(registration);
  const module = registration.declare((name, value) => {
    if (typeof name === 'object') Object.assign(exports, name);
    else exports[name] = value;
    return value;
  });
  registration.dependencies.forEach((name, index) => {
    assert.ok(Object.hasOwn(peers, name), `Unresolved runtime peer: ${name}`);
    module.setters[index](peers[name]);
  });
  module.execute();
  return { exports, registrations };
}

function sessionFixture(options = {}) {
  const calls = [];
  const messages = [];
  const domain = {
    dataModification: false, changes: 0, completed: 0,
    dataChange() { this.dataModification = true; this.changes += 1; },
    dataChangeCompleted() { this.dataModification = false; this.completed += 1; },
  };
  const entity = { id: 'app.item', codeName: 'Item', keyAppDEFieldId: 'itemid' };
  const service = {
    async exec(...args) {
      calls.push(args);
      if (options.exec) return options.exec(...args);
      return args[0] === 'ExportModelV2'
        ? { status: 200, data: { model: { name: 'Original', controls: [] } } }
        : { status: 200 };
    },
  };
  const host = {
    env: { pluginBaseUrl: './plugins' },
    hub: {
      async getAppDataEntity(...args) {
        calls.push(['entity', ...args]);
        return Object.hasOwn(options, 'entity') ? options.entity : entity;
      },
      getApp(appId) {
        calls.push(['app', appId]);
        return { deService: { async getService(...args) {
          calls.push(['service', ...args]);
          return service;
        } } };
      },
    },
    uiDomainManager: { get: () => domain },
    message: { error: value => messages.push(value) },
    confirm: { warning: async () => true },
  };
  const context = { srfappid: 'app', item: 'key-1', srfsessionid: 'edit-session', srfmodelv2scope: 'scope' };
  const params = { version: 'fixture' };
  const { exports } = loadSystem({ host });
  const session = new exports.ModelEditSession(host, 'Item', context, params, options.readonly ?? false);
  return { session, host, context, params, domain, calls, messages, entity, exports };
}

test('independent identity, deterministic build, receipts and executable SystemJS registration', async () => {
  const manifest = JSON.parse(await readFile(new URL('../package.json', import.meta.url)));
  assert.equal(manifest.name, '@aibiz/model-edit');
  assert.equal(manifest.version, '0.1.0');
  assert.equal(manifest.system, 'dist/index.system.js');
  assert.deepEqual(manifest.aibiz.supportedPluginCodes, ['MODEL_EDIT']);
  assert.equal(Object.hasOwn(manifest, 'gitHead'), false);
  const again = await buildLocalModelEdit({ writeOutputs: false });
  assert.deepEqual(again.receipt, built.receipt);
  assert.deepEqual([...again.artifacts], [...built.artifacts]);
  assert.deepEqual([...built.artifacts.keys()], ['index.mjs', 'index.system.js', 'style.css']);
  assert.deepEqual(built.receipt.runtimeImports, ['@ibiz-template/runtime', '@monaco-editor/loader', 'vue']);
  assert.equal(built.receipt.sourceStatus, 'independent-local-implementation');
  for (const key of ['originalSourceRecovered', 'nativeCompatibilityVerified', 'acceptedForProduction']) {
    assert.equal(built.receipt[key], false);
  }
  assert.equal(built.receipt.upstreamReference.version, '0.0.3-alpha.122');
  assert.equal(built.receipt.upstreamReference.nativeRequestedVersion, '0.0.3-alpha.90');
  for (const input of built.receipt.inputs) {
    assert.equal(hash(await readFile(join(pluginRoot, input.path))), input.sha256);
  }
  for (const output of built.receipt.outputs) assert.equal(hash(built.artifacts.get(output.path)), output.sha256);
  assert.ok(!built.artifacts.get('index.mjs').includes('runtime-model'));
  const syntax = ts.createSourceFile('index.mjs', built.artifacts.get('index.mjs'), ts.ScriptTarget.ES2020, true);
  assert.deepEqual(syntax.parseDiagnostics, []);
  const { exports, registrations } = loadSystem();
  exports.default.install();
  assert.deepEqual(registrations.map(item => item.key), ['DEUIACTION_MODEL_EDIT']);
  assert.ok(registrations[0].factory() instanceof exports.ModelEditProvider);
});

test('real entity export/import signature, key, scope, navigation params and domain changes', async () => {
  const fixture = sessionFixture();
  const { session, context, params, calls, domain } = fixture;
  assert.equal(await session.load(), true);
  assert.equal(session.state.loaded, true);
  assert.deepEqual(normalize(calls.find(call => call[0] === 'ExportModelV2')), ['ExportModelV2', context, {}, params]);
  session.setValue('{"name":"Changed","controls":[]}');
  assert.equal(session.state.dirty, true);
  assert.equal(domain.dataModification, true);
  assert.equal(await session.save(), true);
  assert.deepEqual(normalize(calls.find(call => call[0] === 'ImportModelV2')), [
    'ImportModelV2', context, { itemid: 'key-1', srfmodelv2scope: 'scope', model: { name: 'Changed', controls: [] } }, params,
  ]);
  assert.equal(session.state.hasSaved, true);
  assert.equal(session.state.dirty, false);
  assert.equal(domain.dataModification, false);
  assert.equal(domain.changes, 1);
  assert.equal(domain.completed, 1);
});

test('failed imports preserve dirty state and never claim a save or expose server errors', async t => {
  for (const [name, response] of [
    ['non-200', async () => ({ status: 500, data: { message: 'secret-token' } })],
    ['rejection', async () => { throw new Error('secret-token'); }],
    ['missing-response', async () => undefined],
  ]) {
    await t.test(name, async () => {
      const { session, messages, domain } = sessionFixture({
        exec: method => method === 'ExportModelV2' ? { status: 200, data: { model: {} } } : response(),
      });
      assert.equal(await session.load(), true);
      session.setValue('{"new":true}');
      assert.equal(await session.save(), false);
      assert.equal(session.state.hasSaved, false);
      assert.equal(session.state.dirty, true);
      assert.equal(domain.dataModification, true);
      assert.equal(session.state.saving, false);
      assert.equal(JSON.stringify(messages).includes('secret-token'), false);
    });
  }
});

test('invalid JSON, arrays and primitives are rejected before import', async t => {
  for (const text of ['not json', '[]', 'null', 'false', '3', '"string"']) {
    await t.test(text, async () => {
      const { session, calls } = sessionFixture();
      await session.load();
      session.setValue(text);
      assert.equal(await session.save(), false);
      assert.equal(calls.filter(call => call[0] === 'ImportModelV2').length, 0);
      assert.equal(session.state.hasSaved, false);
    });
  }
});

test('readonly prevents programmatic edits and imports, including a dynamic change to readonly', async () => {
  const { session, calls } = sessionFixture({ readonly: true });
  await session.load();
  const value = session.state.value;
  session.setValue('{"readonly":"bypass"}');
  assert.equal(session.state.value, value);
  session.state.value = '{"attempt":"direct state mutation"}';
  assert.equal(await session.save(), false);
  session.readonly = false;
  session.setValue('{"editable":true}');
  session.readonly = true;
  assert.equal(await session.save(), false);
  assert.equal(calls.filter(call => call[0] === 'ImportModelV2').length, 0);
});

test('load rejects missing keys, incomplete entity metadata and failed/invalid exports', async t => {
  const cases = [
    ['missing-key', {}, context => { delete context.item; }],
    ['missing-app', {}, context => { delete context.srfappid; }],
    ['missing-entity-key-field', { entity: { id: 'app.item', codeName: 'Item' } }],
    ['failed-export', { exec: async () => ({ status: 401, data: { model: {} } }) }],
    ['array-export', { exec: async () => ({ status: 200, data: { model: [] } }) }],
    ['empty-export', { exec: async () => ({ status: 200, data: {} }) }],
    ['rejected-export', { exec: async () => { throw new Error('secret-export'); } }],
  ];
  for (const [name, options, mutate] of cases) {
    await t.test(name, async () => {
      const { session, context, calls, messages } = sessionFixture(options);
      mutate?.(context);
      assert.equal(await session.load(), false);
      assert.equal(session.state.loaded, false);
      assert.equal(session.state.loading, false);
      assert.equal(await session.save(), false);
      assert.equal(calls.filter(call => call[0] === 'ImportModelV2').length, 0);
      assert.equal(JSON.stringify(messages).includes('secret-export'), false);
    });
  }
});

test('busy saves serialize; disposed pending saves cannot update state or report success', async () => {
  const pending = deferred();
  const { session, calls, messages } = sessionFixture({
    exec: method => method === 'ExportModelV2' ? { status: 200, data: { model: {} } } : pending.promise,
  });
  await session.load();
  session.setValue('{"pending":true}');
  const save = session.save();
  assert.equal(session.state.saving, true);
  assert.equal(await session.save(), false);
  session.setValue('{"race":true}');
  assert.equal(session.state.value, '{"pending":true}');
  assert.equal(calls.filter(call => call[0] === 'ImportModelV2').length, 1);
  session.dispose();
  const snapshot = normalize(session.state);
  pending.resolve({ status: 200 });
  assert.equal(await save, false);
  assert.deepEqual(normalize(session.state), snapshot);
  assert.deepEqual(messages, []);
});

test('disposed pending loads and rejected imports have no post-unmount notifications', async t => {
  for (const method of ['ExportModelV2', 'ImportModelV2']) {
    await t.test(method, async () => {
      const pending = deferred();
      const { session, calls, messages } = sessionFixture({
        exec: name => name === method ? pending.promise : { status: 200, data: { model: {} } },
      });
      if (method === 'ImportModelV2') {
        await session.load();
        session.setValue('{"changed":true}');
      }
      const operation = method === 'ExportModelV2' ? session.load() : session.save();
      if (method === 'ExportModelV2') {
        while (!calls.some(call => call[0] === method)) await Promise.resolve();
      }
      session.dispose();
      const snapshot = normalize(session.state);
      pending.reject(new Error('secret-pending'));
      assert.equal(await operation, false);
      assert.deepEqual(normalize(session.state), snapshot);
      assert.deepEqual(messages, []);
    });
  }
});

function monacoFixture() {
  const log = [];
  let callback;
  const model = { value: '', getValue() { return this.value; }, setValue(value) {
    this.value = value; callback?.();
  }, dispose: () => log.push('model-dispose') };
  const editor = {
    updateOptions: options => log.push(['options', options]),
    onDidChangeModelContent: fn => { callback = fn; return { dispose: () => log.push('listener-dispose') }; },
    dispose: () => log.push('editor-dispose'),
  };
  const monaco = { editor: {
    createModel: (value, language) => { model.value = value; log.push(['model', language]); return model; },
    create: (element, options) => { log.push(['editor', options]); return editor; },
  } };
  const loader = { config: config => log.push(['config', config]), init: async () => monaco };
  const changed = [];
  const { exports } = loadSystem();
  const surface = new exports.MonacoSurface(loader, value => changed.push(value));
  return { surface, loader, monaco, model, log, changed, exports };
}

test('Monaco uses absolute same-origin asset paths under the actual application base', () => {
  const { exports } = loadSystem();
  assert.equal(exports.monacoBaseUrl('./plugins', 'http://localhost/app/model/index.html'),
    'http://localhost/app/model/plugins/monaco-editor@0.52.2/min/vs');
  assert.equal(exports.monacoBaseUrl('/plugins/', 'https://localhost/app/'),
    'https://localhost/plugins/monaco-editor@0.52.2/min/vs');
  for (const base of ['https://evil.invalid/plugins', '//evil.invalid/plugins', 'data:text/javascript,x',
    'javascript:alert(1)', 'https://user:pass@localhost/plugins', '/plugins?token=x', '/plugins#fragment']) {
    assert.throws(() => exports.monacoBaseUrl(base, 'https://localhost/app/'));
  }
});

test('Monaco owns its model/editor/listener and enforces readonly without global mutations', async () => {
  const { surface, model, log, changed } = monacoFixture();
  surface.update('{"loaded":true}', true);
  assert.equal(await surface.mount({}, 'http://localhost/plugins/vs'), true);
  assert.equal(model.value, '{"loaded":true}');
  model.setValue('{"blocked":true}');
  assert.deepEqual(changed, []);
  surface.update('{"editable":true}', false);
  model.setValue('{"user":true}');
  assert.equal(changed.at(-1), '{"user":true}');
  surface.dispose();
  surface.dispose();
  assert.deepEqual(log.filter(item => typeof item === 'string'), [
    'listener-dispose', 'editor-dispose', 'model-dispose',
  ]);
  model.setValue('{"unmounted":true}');
  assert.equal(changed.at(-1), '{"user":true}');
  assert.equal(await surface.mount({}, 'http://localhost/plugins/vs'), false);
});

test('pending Monaco loader and failed editor creation cleanly stop at unmount', async () => {
  const pending = deferred();
  const fixture = monacoFixture();
  fixture.loader.init = () => pending.promise;
  const mount = fixture.surface.mount({}, 'http://localhost/vs');
  fixture.surface.dispose();
  pending.resolve(fixture.monaco);
  assert.equal(await mount, false);
  assert.equal(fixture.log.filter(item => Array.isArray(item) && item[0] === 'model').length, 0);
  const failed = monacoFixture();
  failed.monaco.editor.create = () => { throw new Error('editor failed'); };
  await assert.rejects(failed.surface.mount({}, 'http://localhost/vs'), /editor failed/);
  assert.deepEqual(failed.log.filter(item => typeof item === 'string'), ['model-dispose']);
});

function providerFixture(options = {}) {
  const events = [];
  const messages = [];
  const sourceDomain = { dataModification: options.dirty ?? false };
  let vnode;
  let resolveDismiss;
  const domain = { id: 'new-domain' };
  const clone = {
    srfappid: 'app', item: 'context-key',
    destroy: () => events.push('context-destroy'),
  };
  const context = { srfappid: 'app', item: 'context-key', clone: () => clone };
  const host = {
    message: { error: value => messages.push(value) },
    hub: { getAppDataEntity: async () => {
      if (options.entityFailure) throw new Error('secret');
      return { id: 'app.item', codeName: 'Item' };
    } },
    uiDomainManager: {
      get: () => sourceDomain,
      create: () => { events.push('domain-create'); return domain; },
      destroy: id => events.push(['domain-destroy', id]),
    },
    overlay: { createDrawer: render => {
      events.push('drawer-create');
      vnode = render({});
      return {
        onWillDismiss: () => {
          events.push('subscribe');
          return new Promise(resolve => { resolveDismiss = resolve; });
        },
        present: async () => {
          events.push('present');
          if (options.presentFailure) throw new Error('secret');
          resolveDismiss(options.result ?? { ok: false });
        },
        dismiss: async () => { events.push('dismiss'); resolveDismiss?.({ ok: false }); },
      };
    } },
  };
  const { exports } = loadSystem({ host });
  const args = {
    context, params: { query: 'navigation' }, data: options.data ?? [{ srfkey: 'selected-key' }],
    view: {
      context: { srfsessionid: 'source-domain' },
      model: { appId: 'app', appDataEntityId: 'app.item', caption: 'Entity' },
      call: async () => {
        events.push('source-save');
        if (options.saveThrows) throw new Error('secret-save');
        if (options.clearDirty !== false) sourceDomain.dataModification = false;
        return Object.hasOwn(options, 'saveResult') ? options.saveResult : null;
      },
    },
  };
  const action = {
    actionTarget: options.target ?? 'SINGLEKEY',
    navigateContexts: [{ key: 'srfmodelv2scope', value: 'fixture-scope', rawValue: true }],
    navigateParams: [{ key: 'query', value: 'query', rawValue: false }],
    uiactionParamJO: { readonly: options.readonly ?? false },
  };
  return { provider: new exports.ModelEditProvider(), action, args, events, messages, get vnode() { return vnode; } };
}

test('provider uses navigation, its own component, fresh domain, early dismissal subscription and successful refresh', async () => {
  const fixture = providerFixture({ dirty: true, result: { ok: true, params: { isSave: true } } });
  const result = await fixture.provider.execAction(fixture.action, fixture.args);
  assert.deepEqual(normalize(result), { refresh: true, refreshMode: 1, closeView: false });
  assert.equal(fixture.vnode.type.name, 'AibizModelEditView');
  assert.equal(fixture.vnode.props.context.item, 'selected-key');
  assert.equal(fixture.vnode.props.context.srfsessionid, 'new-domain');
  assert.equal(fixture.vnode.props.context.srfmodelv2scope, 'fixture-scope');
  assert.deepEqual(normalize(fixture.vnode.props.params), { query: 'navigation' });
  assert.ok(fixture.events.indexOf('subscribe') < fixture.events.indexOf('present'));
  assert.deepEqual(fixture.events.slice(-2), [['domain-destroy', 'new-domain'], 'context-destroy']);
  assert.deepEqual(fixture.messages, []);
});

test('provider preserves base params and lets configured navigation params override them', async () => {
  const withoutNavigation = providerFixture();
  delete withoutNavigation.action.navigateParams;
  await withoutNavigation.provider.execAction(withoutNavigation.action, withoutNavigation.args);
  assert.deepEqual(normalize(withoutNavigation.vnode.props.params), { query: 'navigation' });

  const withOverride = providerFixture();
  withOverride.action.navigateParams = [{ key: 'query', value: 'configured', rawValue: true }];
  await withOverride.provider.execAction(withOverride.action, withOverride.args);
  assert.deepEqual(normalize(withOverride.vnode.props.params), { query: 'configured' });
});

test('provider never refreshes on cancel or false/absent/nonboolean save evidence', async t => {
  for (const result of [
    { ok: false, params: { isSave: true } }, { ok: true }, { ok: true, params: { isSave: false } },
    { ok: 'true', params: { isSave: true } }, { ok: true, params: { isSave: 'true' } },
  ]) {
    await t.test(JSON.stringify(result), async () => {
      const fixture = providerFixture({ result });
      const actionResult = await fixture.provider.execAction(fixture.action, fixture.args);
      assert.equal(actionResult.refresh, false);
      assert.equal(actionResult.closeView, false);
      assert.equal(fixture.events.at(-1), 'context-destroy');
    });
  }
});

test('source save gate rejects failed/unhandled saves and persistent dirty state; readonly skips it', async t => {
  for (const [name, options] of [
    ['false', { saveResult: false }], ['undefined', { saveResult: undefined }],
    ['exception', { saveThrows: true }], ['still-dirty', { saveResult: null, clearDirty: false }],
  ]) {
    await t.test(name, async () => {
      const fixture = providerFixture({ dirty: true, ...options });
      const result = await fixture.provider.execAction(fixture.action, fixture.args);
      assert.equal(result.cancel, true);
      assert.equal(fixture.events.includes('drawer-create'), false);
    });
  }
  const readonly = providerFixture({ dirty: true, readonly: 'true' });
  await readonly.provider.execAction(readonly.action, readonly.args);
  assert.equal(readonly.events.includes('source-save'), false);
  assert.equal(readonly.vnode.props.readonly, true);
});

test('multiple model selection rejects; empty MULTI selection does not crash navigation formatting', async () => {
  const multiple = providerFixture({ target: 'MULTIKEY', data: [{ srfkey: '1' }, { srfkey: '2' }] });
  assert.equal((await multiple.provider.execAction(multiple.action, multiple.args)).cancel, true);
  assert.equal(multiple.events.includes('drawer-create'), false);
  const empty = providerFixture({ target: 'MULTIKEY', data: [] });
  assert.equal((await empty.provider.execAction(empty.action, empty.args)).refresh, false);
  assert.equal(empty.vnode.props.context.item, 'context-key');
});

test('provider cleans domain/context when presentation or metadata fails, sanitizes errors', async t => {
  for (const [name, options] of [['present', { presentFailure: true }], ['entity', { entityFailure: true }]]) {
    await t.test(name, async () => {
      const fixture = providerFixture(options);
      assert.equal((await fixture.provider.execAction(fixture.action, fixture.args)).cancel, true);
      assert.equal(fixture.events.at(-1), 'context-destroy');
      if (options.presentFailure) {
        assert.ok(fixture.events.includes('dismiss'));
        assert.ok(fixture.events.some(value => Array.isArray(value) && value[0] === 'domain-destroy'));
      }
      assert.equal(JSON.stringify(fixture.messages).includes('secret'), false);
    });
  }
});

async function isolatedOutput(t) {
  await mkdir(join(pluginRoot, '.tmp'), { recursive: true });
  const directory = await mkdtemp(join(pluginRoot, '.tmp/output-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return directory;
}

test('build legitimately overwrites its own complete output group', async t => {
  const outputDir = await isolatedOutput(t);
  await buildLocalModelEdit({ outputDir });
  assert.deepEqual((await readdir(outputDir)).sort(),
    ['build-receipt.json', 'index.mjs', 'index.system.js', 'style.css']);
  await writeFile(join(outputDir, 'index.mjs'), 'previous output');
  await buildLocalModelEdit({ outputDir });
  assert.equal(await readFile(join(outputDir, 'index.mjs'), 'utf8'), built.artifacts.get('index.mjs'));
});

test('unsafe outputs reject before touching any previous artifact', async t => {
  for (const kind of ['symlink-file', 'hardlink-file', 'extra-file', 'symlink-ancestor']) {
    await t.test(kind, async subtest => {
      const base = await isolatedOutput(subtest);
      const outputDir = join(base, 'dist');
      await mkdir(outputDir);
      await writeFile(join(outputDir, 'index.mjs'), 'KEEP');
      const target = join(base, 'outside');
      await writeFile(target, 'OUTSIDE');
      if (kind === 'symlink-file') await symlink(target, join(outputDir, 'style.css'));
      if (kind === 'hardlink-file') await link(target, join(outputDir, 'style.css'));
      if (kind === 'extra-file') await writeFile(join(outputDir, 'extra.txt'), 'UNRELATED');
      let path = outputDir;
      if (kind === 'symlink-ancestor') {
        path = join(base, 'linked');
        await symlink(outputDir, path);
      }
      const before = (await readdir(outputDir)).sort();
      await assert.rejects(buildLocalModelEdit({ outputDir: path }), /symlink|single-link|Unexpected/);
      assert.equal(await readFile(join(outputDir, 'index.mjs'), 'utf8'), 'KEEP');
      assert.equal(await readFile(target, 'utf8'), 'OUTSIDE');
      assert.deepEqual((await readdir(outputDir)).sort(), before);
    });
  }
  await assert.rejects(buildLocalModelEdit({ outputDir: join(pluginRoot, 'src') }), /inside this package/);
  await assert.rejects(buildLocalModelEdit({ outputDir: join(pluginRoot, '..') }), /inside this package/);
});
