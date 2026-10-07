import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';

import {
  copyRuntimeResources, validateRuntimeEvidence, verifyConsumedRuntime,
} from '../build.mjs';
import {
  dependencyFiles, planDependencyLock, stageDependencyLock, verifyDependencyLock,
} from '../dependency-lock.mjs';
import { candidateManifest, patchCandidateSources } from '../patches.mjs';
import {
  compileDeterministicCss, stylesheetOrder, writeDeterministicCss,
} from '../deterministic-css.mjs';
import {
  sourceFiles,
} from '../../../../scripts/harness-native-ai-code-source-deps.mjs';
import {
  verifyNativeModelDesignBuildReport,
} from '../../../../scripts/harness-native-model-design-build.mjs';
import {
  verifyRuntimeModelSourceBuild,
} from '../../../../scripts/harness-runtime-model-source-build.mjs';

const pluginRoot = fileURLToPath(new URL('..', import.meta.url));
const probeReport = '../../../../.artifacts/native-model-design-build/' +
  'build-c8c3e614-c829-40ae-8ee4-52ddb75b7f8e/report.json';
const runtimeReport = '../../../../.artifacts/runtime-model-source-build/' +
  'build-20261006-model-design-input-implementation-pins/report.json';
const runtime2Report = '../../../../.artifacts/runtime-model-source-build/' +
  'runtime-model-next-quality-request-id-20261006/report.json';
const staleControllerRuntime2Report = '../../../../.artifacts/runtime-model-source-build/' +
  'build-500537af-a2fb-4ca6-91ec-80760398c9c7/report.json';
const staleRuntime2Report = '../../../../.artifacts/runtime-model-source-build/' +
  'build-183d64ee-11ac-44fb-9453-0080e1e2f28a/report.json';
const unboundRuntimeReport = '../../../../.artifacts/runtime-model-source-build/' +
  'build-d29dd4cb-76ab-4764-8797-4d44263e6840/report.json';
const staleRuntimeReport = '../../../../.artifacts/runtime-model-source-build/' +
  'build-6e4b1af8-5564-4b55-83d2-8f61dcc745a1/report.json';
const failedRuntimeReport = '../../../../.artifacts/runtime-model-source-build/' +
  'build-96058c18-a2fd-4a20-8c62-5a3cbc401c5e/report.json';
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
let checkedProbe;

function verifiedProbe() {
  // These tests never mutate the baseline: verify its complete dependency
  // implementation inventory once, then share the same pinned evidence.
  return checkedProbe ??= verifyNativeModelDesignBuildReport({ sourceReport: absolute(probeReport) });
}

function absolute(relativePath) {
  return fileURLToPath(new URL(relativePath, import.meta.url));
}

function freshTemp() {
  return fs.mkdtempSync(join(pluginRoot, '.tmp-candidate-'));
}

function runtimeResources(probe) {
  return sourceFiles(probe.report.packageRoot, { names: ['public'] })
    .filter(file => file.path.startsWith('public/assets/json/runtime-model/'))
    .map(file => ({ ...file, path: basename(file.path) }));
}

test('pins all original source and applies exactly the 22 TS7053 fixes', () => {
  const probe = verifiedProbe();
  assert.equal(probe.report.typecheckDiagnostics.codes.TS7053, 22);
  const files = sourceFiles(probe.report.packageRoot, {
    names: ['src', 'public', 'package.json', 'tsconfig.json', 'ibiz.config.cjs', 'CHANGELOG.md'],
  });
  const before = files.map(file => [file.path, file.sha256]);
  const plan = patchCandidateSources(files);
  assert.equal(plan.patches.filter(patch => patch.diagnosticCode === 'TS7053').length, 7);
  assert.equal(plan.patches.length, 9);
  assert.deepEqual(plan.patches.filter(patch => patch.kind).map(patch => patch.kind).sort(), [
    'editor-owned-lifecycle-and-readonly', 'model-edit-readonly-and-save-lifecycle',
  ]);
  assert.equal(plan.indexDiagnosticsAddressed, 22);
  assert.deepEqual(files.map(file => [file.path, file.sha256]), before);
  const count = (needle, entries) => entries.reduce((total, file) =>
    total + file.data.toString('utf8').split(needle).length - 1, 0);
  assert.equal(count('@ts-ignore', plan.contents), count('@ts-ignore', files));
  assert.equal(count('as any', plan.contents), count('as any', files));
  const index = plan.contents.find(file => file.path === 'src/index.ts').data.toString('utf8');
  assert.match(index, /@ibiz-template-plugin\/runtime-model\/loader/);
});

function modelEditFixture(t, { readonly = false, exec, getService } = {}) {
  const probe = verifiedProbe();
  const link = name => probe.report.dependencies.links.find(item => item.name === name).target;
  const ts = createRequire(join(link('typescript'), 'package.json'))(link('typescript'));
  const vue = createRequire(join(link('vue'), 'package.json'))(link('vue'));
  const source = patchCandidateSources(sourceFiles(probe.report.packageRoot, { names: ['src'] }))
    .contents.find(file => file.path === 'src/components/model-edit-view/model-edit-view.tsx');
  const compiled = ts.transpileModule(source.data.toString(), {
    fileName: source.path,
    compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.React, jsxFactory: 'fixtureH' },
  }).outputText;
  const unmounted = [];
  const calls = [];
  const errors = [];
  const dismissals = [];
  const service = {
    exec: async (...args) => {
      calls.push(args);
      return exec ? exec(...args) : { status: 200, data: { model: { name: 'existing' } } };
    },
  };
  const module = { exports: {} };
  runInNewContext(compiled, {
    exports: module.exports, module,
    fixtureH: (tag, props, ...children) => ({ tag, props, children }),
    require(name) {
      if (name === 'vue') return { ...vue, onUnmounted: callback => unmounted.push(callback) };
      if (name === '@ibiz-template/vue3-util') return { useNamespace: () => ({ b: value => value }) };
      if (name.endsWith('.scss')) return {};
      throw new Error(`Unexpected model-edit runtime dependency: ${name}`);
    },
    ibiz: {
      hub: {
        getAppDataEntity: async () => ({ id: 'test.entity', codeName: 'PSTest', keyAppDEFieldId: 'id' }),
        getApp: () => ({ deService: { getService: getService ?? (async () => service) } }),
      },
      message: { error: message => errors.push(message) },
      i18n: { t: value => value },
    },
  });
  const props = vue.reactive({
    readonly, codeName: 'PSTest', context: { srfappid: 'fixture-app', pstest: 'fixture-only-key' },
    params: {}, modal: { dismiss: value => dismissals.push(value) },
  });
  const scope = vue.effectScope();
  const state = scope.run(() => module.exports.default.setup(props));
  let unmountedOnce = false;
  const unmount = () => {
    if (unmountedOnce) return;
    unmountedOnce = true;
    unmounted.forEach(callback => callback());
    scope.stop();
  };
  t.after(unmount);
  const flush = async () => {
    for (let i = 0; i < 8; i++) await Promise.resolve();
    await vue.nextTick();
  };
  const render = () => module.exports.default.render.call(vue.proxyRefs({ ...props, ...state,
    get readonly() { return props.readonly; } }));
  return { props, state, calls, errors, dismissals, service, flush, unmount, render };
}

const deferred = () => {
  let resolve;
  let reject;
  const promise = new Promise((done, fail) => { resolve = done; reject = fail; });
  return { promise, resolve, reject };
};

test('MODEL_EDIT forwards its live readonly prop and blocks direct saves, not just toolbar buttons', async t => {
  const fixture = modelEditFixture(t, { readonly: true });
  await fixture.flush();
  const findEditor = node => node?.tag === 'iBizDesignCodeEditor' ? node :
    node?.children?.flat(Infinity).map(findEditor).find(Boolean);
  assert.equal(findEditor(fixture.render()).props.readonly, true);
  await fixture.state.save(true);
  assert.deepEqual(fixture.calls.map(call => call[0]), ['ExportModelV2']);
  assert.equal(fixture.dismissals.length, 0);
  fixture.props.readonly = false;
  assert.equal(findEditor(fixture.render()).props.readonly, false);
});

for (const failure of ['HTTP failure', 'rejected request']) {
  test(`MODEL_EDIT ${failure} cannot report isSave or dismiss as successful`, async t => {
    const fixture = modelEditFixture(t, {
      exec: async action => {
        if (action === 'ExportModelV2') return { status: 200, data: { model: {} } };
        if (failure === 'rejected request') throw new Error('fixture-save-failed');
        return { status: 500, data: { message: 'fixture-save-failed' } };
      },
    });
    await fixture.flush();
    await fixture.state.save(true);
    assert.equal(fixture.errors.length, 1);
    assert.equal(fixture.dismissals.length, 0);
    fixture.state.closeView();
    assert.equal(fixture.dismissals[0].params.isSave, false);
    assert.equal(fixture.state.loading.value, false);
  });
}

test('MODEL_EDIT reports successful save only after HTTP 200 and suppresses concurrent saves', async t => {
  const pending = deferred();
  const fixture = modelEditFixture(t, {
    exec: action => action === 'ExportModelV2'
      ? { status: 200, data: { model: {} } } : pending.promise,
  });
  await fixture.flush();
  const saving = fixture.state.save(true);
  await fixture.flush();
  await fixture.state.save(true);
  assert.equal(fixture.calls.filter(call => call[0] === 'ImportModelV2').length, 1);
  assert.equal(fixture.dismissals.length, 0);
  pending.resolve({ status: 200 });
  await saving;
  assert.equal(fixture.dismissals.length, 1);
  assert.equal(fixture.dismissals[0].params.isSave, true);
});

for (const transition of ['readonly', 'unmount']) {
  test(`MODEL_EDIT ${transition} during service lookup prevents a later mutation`, async t => {
    const lookup = deferred();
    let lookups = 0;
    const fixture = modelEditFixture(t, {
      getService: async () => ++lookups === 1 ? fixture.service : lookup.promise,
    });
    await fixture.flush();
    const saving = fixture.state.save(true);
    await fixture.flush();
    if (transition === 'readonly') fixture.props.readonly = true;
    else fixture.unmount();
    lookup.resolve(fixture.service);
    await saving;
    assert.deepEqual(fixture.calls.map(call => call[0]), ['ExportModelV2']);
    assert.equal(fixture.dismissals.length, 0);
  });
}

for (const rejected of [false, true]) {
  test(`MODEL_EDIT ignores ${rejected ? 'rejected' : 'successful'} load after unmount`, async t => {
    const pending = deferred();
    const fixture = modelEditFixture(t, { exec: () => pending.promise });
    await fixture.flush();
    fixture.unmount();
    if (rejected) pending.reject(new Error('late-fixture-load'));
    else pending.resolve({ status: 200, data: { model: { late: true } } });
    await fixture.flush();
    assert.equal(fixture.state.value.value, '');
    assert.equal(fixture.errors.length, 0);
    assert.equal(fixture.dismissals.length, 0);
  });
}

test('MODEL_EDIT does not dismiss or notify from an in-flight save after unmount', async t => {
  const pending = deferred();
  const fixture = modelEditFixture(t, {
    exec: action => action === 'ExportModelV2'
      ? { status: 200, data: { model: {} } } : pending.promise,
  });
  await fixture.flush();
  const saving = fixture.state.save(true);
  await fixture.flush();
  fixture.unmount();
  pending.resolve({ status: 200 });
  await saving;
  fixture.state.closeView();
  assert.equal(fixture.dismissals.length, 0);
  assert.equal(fixture.errors.length, 0);
});

function editorFixture(t, { delayedLoader = false } = {}) {
  const probe = verifiedProbe();
  const tsLink = probe.report.dependencies.links.find(item => item.name === 'typescript');
  const ts = createRequire(join(tsLink.target, 'package.json'))(tsLink.target);
  const vueLink = probe.report.dependencies.links.find(item => item.name === 'vue');
  const vue = createRequire(join(vueLink.target, 'package.json'))(vueLink.target);
  const files = sourceFiles(probe.report.packageRoot, { names: ['src'] });
  const source = patchCandidateSources(files).contents.find(file =>
    file.path === 'src/components/design-code-editor/design-code-editor.tsx');
  const compiled = ts.transpileModule(source.data.toString(), {
    fileName: source.path,
    compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.React },
  }).outputText;
  const mounted = [];
  const unmounted = [];
  const editors = [];
  const models = [];
  const resources = [];
  const pending = [];
  const events = [];
  const disposable = () => {
    const resource = { disposals: 0, dispose() { this.disposals += 1; } };
    resources.push(resource);
    return resource;
  };
  const model = () => {
    const resource = { disposals: 0, isDisposed() { return this.disposals > 0; },
      dispose() { this.disposals += 1; } };
    models.push(resource);
    return resource;
  };
  const monaco = {
    editor: {
      setTheme() {},
      getEditors: () => editors.filter(editor => editor.disposals === 0),
      create: (_element, options) => {
        const owned = model();
        const editor = {
          options: { ...options }, value: options.value ?? '', currentModel: owned,
          disposals: 0, listeners: [],
          getValue() { return this.value; },
          setValue(value) { this.value = value; this.listeners.forEach(listener => listener()); },
          updateOptions(value) { Object.assign(this.options, value); },
          getModel() { return this.currentModel; },
          layout() {},
          dispose() { this.disposals += 1; },
          onDidChangeModelContent(listener) {
            this.listeners.push(listener);
            const registration = disposable();
            registration.dispose = function () {
              this.disposals += 1;
              editor.listeners = editor.listeners.filter(item => item !== listener);
            };
            return registration;
          },
        };
        editors.push(editor);
        return editor;
      },
    },
    languages: {
      getLanguages: () => [], register() {}, setMonarchTokensProvider: disposable,
      registerCodeLensProvider: disposable, registerCompletionItemProvider: disposable,
    },
  };
  const loader = {
    configurations: [], calls: 0,
    config(value) { this.configurations.push(value); },
    init() {
      this.calls += 1;
      return delayedLoader
        ? new Promise((resolve, reject) => pending.push({ resolve, reject }))
        : Promise.resolve(monaco);
    },
  };
  const containerListeners = new Set();
  const container = {
    addEventListener: name => containerListeners.add(name),
    removeEventListener: name => containerListeners.delete(name),
  };
  const windowListeners = new Set();
  const observers = [];
  const UIStore = vue.reactive({ theme: 'light' });
  const module = { exports: {} };
  runInNewContext(compiled, {
    exports: module.exports, module, URL,
    require(name) {
      if (name === 'vue') return { ...vue,
        onMounted: callback => mounted.push(callback),
        onUnmounted: callback => unmounted.push(callback) };
      if (name === '@ibiz-template/vue3-util') return {
        useNamespace: () => ({}), useUIStore: () => ({ UIStore }),
      };
      if (name === '@monaco-editor/loader') return { default: loader };
      if (name === 'monaco-editor') return monaco;
      if (name === 'qx-util') return { createUUID: () => 'test-owned-editor' };
      if (name.endsWith('.scss')) return {};
      throw new Error(`Unexpected editor runtime dependency: ${name}`);
    },
    ibiz: { env: { pluginBaseUrl: './plugins', enableAI: true },
      i18n: { t: value => value } },
    document: { baseURI: 'http://127.0.0.1:32139/modeldesign/' },
    window: {
      addEventListener: name => windowListeners.add(name),
      removeEventListener: name => windowListeners.delete(name),
    },
    ResizeObserver: class {
      constructor() { this.disconnections = 0; observers.push(this); }
      observe() {}
      disconnect() { this.disconnections += 1; }
    },
  });
  const props = vue.reactive({
    modelValue: 'const first = 1;', language: 'typescript', readonly: false,
    minimap: true, expandSuggestDetails: false, enableCompletion: true,
    deACMode: { logicName: 'AI' }, openAIChat: async () => {},
  });
  const scope = vue.effectScope();
  const state = scope.run(() => module.exports.default.setup(props, {
    emit: (...args) => events.push(args),
  }));
  state.editorRef.value = {};
  state.containerRef.value = container;
  let unmountedOnce = false;
  const unmount = () => {
    if (unmountedOnce) return;
    unmountedOnce = true;
    // Vue clears DOM refs before onUnmounted callbacks.
    state.editorRef.value = undefined;
    state.containerRef.value = undefined;
    unmounted.forEach(callback => callback());
    scope.stop();
  };
  t.after(unmount);
  const flush = async () => {
    await vue.nextTick();
    await Promise.resolve();
    await vue.nextTick();
  };
  return { props, state, editors, models, resources, pending, loader, events,
    UIStore, containerListeners, windowListeners, observers, flush, unmount,
    mount: () => mounted.forEach(callback => callback()) };
}

test('real patched setup synchronizes readonly without recreating its editor or model', async t => {
  const fixture = editorFixture(t);
  fixture.UIStore.theme = 'dark';
  await fixture.flush();
  fixture.mount();
  await fixture.flush();
  assert.equal(fixture.loader.configurations[0].paths.vs,
    'http://127.0.0.1:32139/modeldesign/plugins/monaco-editor@0.52.2/min/vs');
  const editor = fixture.editors[0];
  const owned = editor.getModel();
  fixture.props.readonly = true;
  await fixture.flush();
  assert.equal(editor.options.readOnly, true);
  fixture.props.readonly = false;
  fixture.props.modelValue = 'const second = 2;';
  await fixture.flush();
  assert.equal(editor.options.readOnly, false);
  assert.equal(editor.getValue(), fixture.props.modelValue);
  assert.equal(fixture.editors.length, 1);
  assert.equal(editor.getModel(), owned);
  fixture.unmount();
  assert.equal(editor.disposals, 1);
  assert.equal(owned.disposals, 1);
  assert.ok(fixture.resources.every(resource => resource.disposals === 1));
  assert.equal(fixture.containerListeners.size, 0);
  assert.equal(fixture.windowListeners.size, 0);
  assert.equal(fixture.observers[0].disconnections, 1);
});

test('language recreation releases only owned models and registrations', async t => {
  const fixture = editorFixture(t);
  fixture.mount();
  await fixture.flush();
  const external = { disposals: 0, dispose() { this.disposals += 1; } };
  fixture.editors[0].currentModel = external;
  fixture.state.currentLanguage.value = 'json';
  fixture.state.handleLanguageChange();
  await fixture.flush();
  assert.equal(fixture.editors.length, 2);
  assert.equal(fixture.editors[0].disposals, 1);
  assert.equal(fixture.models[0].disposals, 1);
  assert.equal(fixture.editors[1].options.language, 'json');
  fixture.unmount();
  assert.equal(external.disposals, 0);
  assert.ok(fixture.editors.every(editor => editor.disposals === 1));
  assert.ok(fixture.models.every(model => model.disposals === 1));
  assert.ok(fixture.resources.every(resource => resource.disposals === 1));
});

test('unmount before nextTick or loader resolution cannot create a late editor', async t => {
  const beforeTick = editorFixture(t, { delayedLoader: true });
  beforeTick.mount();
  beforeTick.unmount();
  await beforeTick.flush();
  assert.equal(beforeTick.loader.calls, 0);

  const pending = editorFixture(t, { delayedLoader: true });
  pending.mount();
  await pending.flush();
  assert.equal(pending.loader.calls, 1);
  pending.unmount();
  pending.pending[0].resolve({ editor: { create() {
    assert.fail('Unmounted editor must not be created');
  } } });
  await pending.flush();
  assert.equal(pending.editors.length, 0);
  assert.equal(pending.state.isLoading.value, false);
});

test('superseded loader callback cannot create an editor for a stale generation', async t => {
  const fixture = editorFixture(t, { delayedLoader: true });
  fixture.mount();
  await fixture.flush();
  fixture.state.handleLanguageChange();
  await fixture.flush();
  assert.equal(fixture.pending.length, 2);
  fixture.pending[0].resolve({ editor: { create() {
    assert.fail('Superseded loader result must not be used');
  } } });
  await fixture.flush();
  assert.equal(fixture.editors.length, 0);
  assert.equal(fixture.state.isLoading.value, true);
  fixture.pending[1].reject(new Error('Expected fixture loader failure'));
  await fixture.flush();
  assert.equal(fixture.state.isLoading.value, false);
});

test('copies all repaired JSON resources exactly to dist, es, and lib', () => {
  const probe = verifiedProbe();
  const resources = runtimeResources(probe);
  assert.equal(resources.length, 1414);
  assert.ok(resources.every(file => file.bytes === file.data.length && file.sha256 === hash(file.data)));
  const root = freshTemp();
  try {
    const copies = copyRuntimeResources(root, resources);
    assert.deepEqual(copies.map(copy => copy.files), [1414, 1414, 1414]);
    for (const output of ['dist', 'es', 'lib']) {
      const directory = join(root, output, 'assets/json/runtime-model');
      const names = fs.readdirSync(directory).sort();
      assert.equal(names.length, 1414);
      assert.equal(fs.readFileSync(join(directory, names[0])).length,
        resources.find(file => file.path === names[0]).data.length);
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('rejects resource metadata drift and symlink ancestors before any output write', () => {
  const probe = verifiedProbe();
  const resources = runtimeResources(probe);
  const root = freshTemp();
  try {
    const drifted = resources.map(file => ({ ...file }));
    drifted[0].sha256 = '0'.repeat(64);
    assert.throws(() => copyRuntimeResources(root, drifted), /hash drift/);
    assert.deepEqual(fs.readdirSync(root), []);

    fs.mkdirSync(join(root, 'dist'), { recursive: true });
    const outside = freshTemp();
    try {
      fs.symlinkSync(outside, join(root, 'es'), 'dir');
      assert.throws(() => copyRuntimeResources(root, resources), /Symlink directory rejected/);
      assert.equal(fs.existsSync(join(root, 'dist', 'assets')), false);
      assert.equal(fs.existsSync(join(root, 'lib')), false);
      assert.deepEqual(fs.readdirSync(outside), []);
    } finally {
      fs.rmSync(outside, { recursive: true, force: true });
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('accepts only the verified source-built runtime receipt', () => {
  const verified = verifyRuntimeModelSourceBuild({ sourceReport: absolute(runtimeReport) });
  assert.equal(validateRuntimeEvidence(verified).version, '0.2.2-local.1');
  assert.equal(verified.report.inputs.files.fingerprint,
    'c4c129fbbfb6621d96db408394d4afa33d7a7e75d954020e2642a6c7e1ab92f7');
  assert.throws(
    () => verifyRuntimeModelSourceBuild({ sourceReport: absolute(failedRuntimeReport) }),
    /source-build-complete-not-accepted|sourceBuildVerified|failed|typecheck|Missing loader/,
  );
});

test('binds runtime .2 version, source root and candidate manifest without relabeling .1', () => {
  const verified = verifyRuntimeModelSourceBuild({ sourceReport: absolute(runtime2Report) });
  const runtime = validateRuntimeEvidence(verified);
  assert.equal(runtime.version, '0.2.2-local.2');
  assert.equal(verified.report.packageRoot,
    fileURLToPath(new URL('../../runtime-model-next', import.meta.url)));
  assert.equal(runtime.sourceReportSha256,
    '9b38bb1b707038a0f309a12a9eadf4d55a82fd918de3b82780cb1eba847be363');
  assert.equal(verified.report.inputs.files.fingerprint,
    '95c7ffeb25a27fbe6d703a7d6fff7d581ef39c0152dc4e5024896cb5fa484887');
  const consumed = JSON.parse(fs.readFileSync(absolute(
    '../../../../.artifacts/native-model-design-local-candidate/' +
    'build-20261006-alpha122-runtime2-locked-v11-console-layout/report.json')));
  assert.equal(absolute(runtime2Report), consumed.runtime.reportPath);
  assert.equal(runtime.sourceReportSha256, consumed.runtime.reportSha256);
  assert.equal(verified.report.inputs.files.fingerprint, consumed.runtime.sourceFingerprint);
  const runtimeManifest = JSON.parse(fs.readFileSync(join(runtime.target, 'package.json')));
  assert.equal(runtimeManifest.aibiz.sourceKind, 'reconstructed-from-compiled-observation');
  assert.equal(runtimeManifest.aibiz.originalSourceRecovered, false);
  assert.equal(runtimeManifest.aibiz.nativeAccepted, false);
  assert.equal(runtimeManifest.aibiz.acceptedForProduction, false);
  const original = { name: '@ibiz-template-plugin/model-design', version: '0.0.3-alpha.122' };
  const manifest = candidateManifest(original, [runtime]);
  assert.equal(manifest.dependencies[runtime.name], runtime.version);
  assert.equal(manifest.aibiz.nativeCompatibilityVerified, false);
  assert.equal(manifest.aibiz.requestedReference, '@ibiz-template-plugin/model-design@0.0.3-alpha.90');
  for (const report of [
    { ...verified.report, candidateVersion: '0.2.2-local.1' },
    { ...verified.report, candidateVersion: '0.2.2-local.3' },
    { ...verified.report, packageRoot: fileURLToPath(new URL('../../runtime-model', import.meta.url)) },
  ]) assert.throws(() => validateRuntimeEvidence({ ...verified, report }),
    /Runtime version\/source-root mismatch|Unsupported runtime source version/);
  assert.throws(() => candidateManifest(original, []), /Exactly one source-built runtime/);
  assert.throws(() => candidateManifest(original, [{ ...runtime, role: 'published-bundle' }]),
    /verified-reconstructed-local-source-build/);
});

test('stylesheet cascade follows source imports including nested styles, not file or transform order', () => {
  const probe = verifiedProbe();
  const tsLink = probe.report.dependencies.links.find(item => item.name === 'typescript');
  const ts = createRequire(join(tsLink.target, 'package.json'))(tsLink.target);
  const file = (path, text) => {
    const data = Buffer.from(text);
    return { path, data, bytes: data.length, sha256: hash(data) };
  };
  const files = [
    file('src/index.ts', 'import "./z"; import "./a"; import "./z";'),
    file('src/z.ts', 'import "./nested"; import "./z.scss";'),
    file('src/nested.ts', 'import "./nested.scss"; import "./z";'),
    file('src/a.ts', 'import "./a.scss";'),
    file('src/a.scss', '.same { color: red; }'),
    file('src/z.scss', '.same { color: green; }'),
    file('src/nested.scss', '.same { color: blue; }'),
  ];
  const expected = ['src/nested.scss', 'src/z.scss', 'src/a.scss'];
  assert.deepEqual(stylesheetOrder(ts, files).map(item => item.path), expected);
  assert.deepEqual(stylesheetOrder(ts, [...files].reverse()).map(item => item.path), expected);
  assert.throws(() => stylesheetOrder(ts, files.concat(file('src/orphan.scss', '.orphan{}'))),
    /All declared stylesheets must be reachable/);
  assert.throws(() => stylesheetOrder(ts, files.filter(item => item.path !== 'src/nested.ts')),
    /Unresolved local style graph import/);
  assert.throws(() => stylesheetOrder(ts, [
    file('src/index.ts', 'import "../outside.scss";'), file('src/a.scss', '.a{}'),
  ]), /Style graph escaped/);
  const actual = sourceFiles(probe.report.packageRoot, { names: ['src'] });
  const ordered = stylesheetOrder(ts, actual);
  assert.equal(ordered.length, 13);
  assert.equal(ordered[0].path, 'src/components/model-clipboard/model-clipboard.scss');
});

test('real Sass compiles source cascade reproducibly and safely rejects output symlinks and bad inputs', t => {
  const root = freshTemp();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const baseline = absolute('../../../../.artifacts/native-model-design-local-candidate/' +
    'build-20261006-alpha122-runtime1-locked-v5/package');
  const put = (name, data) => {
    fs.mkdirSync(join(root, dirname(name)), { recursive: true });
    fs.writeFileSync(join(root, name), data);
  };
  put('package.json', '{"name":"style-fixture","private":true}');
  put('ibiz.config.cjs', 'const path = require("node:path"); module.exports = { theme: {' +
    'prefix: `@import "${path.resolve(__dirname, "node_modules/@ibiz-template/theme/style/global.scss")}";`}};');
  fs.symlinkSync(join(baseline, 'node_modules'), join(root, 'node_modules'), 'dir');
  put('src/index.ts', 'import "./z"; import "./a";');
  put('src/z.ts', 'import "./nested.scss"; import "./z.scss";');
  put('src/a.ts', 'import "./a.scss";');
  put('src/nested.scss', '.same { color: blue; }');
  put('src/z.scss', '.same { color: green; }');
  put('src/a.scss', '.same { color: red; }');
  put('dist/index.min.css', 'original-cli-output');
  const first = compileDeterministicCss(root);
  const second = compileDeterministicCss(root);
  assert.deepEqual(second.evidence, first.evidence);
  assert.deepEqual(second.css, first.css);
  assert.match(first.css.toString(), /\.same\{color:blue\}\.same\{color:green\}\.same\{color:red\}/);
  assert.equal(first.evidence.compiler.name, 'sass');
  assert.ok(first.warnings.length > 0, 'Compiler deprecation warnings must remain observable');
  assert.equal(writeDeterministicCss(root).output.sha256, first.evidence.output.sha256);
  assert.deepEqual(fs.readFileSync(join(root, 'dist/index.min.css')), first.css);

  put('src/a.scss', '@import "unbound.scss";');
  assert.throws(() => writeDeterministicCss(root), /Additional Sass imports/);
  assert.deepEqual(fs.readFileSync(join(root, 'dist/index.min.css')), first.css);
  put('src/a.scss', '.broken {');
  assert.throws(() => writeDeterministicCss(root), /expected "}"/);
  assert.deepEqual(fs.readFileSync(join(root, 'dist/index.min.css')), first.css);
  put('src/a.scss', '.same { color: red; }');

  put('untouched.css', 'unrelated-output');
  fs.unlinkSync(join(root, 'dist/index.min.css'));
  fs.symlinkSync(join(root, 'untouched.css'), join(root, 'dist/index.min.css'));
  assert.throws(() => writeDeterministicCss(root), /Symlink resource rejected/);
  assert.equal(fs.readFileSync(join(root, 'untouched.css'), 'utf8'), 'unrelated-output');
  fs.unlinkSync(join(root, 'dist/index.min.css'));
  fs.rmdirSync(join(root, 'dist'));
  fs.mkdirSync(join(root, 'outside'));
  fs.writeFileSync(join(root, 'outside/index.min.css'), 'untouched-ancestor');
  fs.symlinkSync(join(root, 'outside'), join(root, 'dist'), 'dir');
  assert.throws(() => writeDeterministicCss(root), /Symlink directory rejected/);
  assert.equal(fs.readFileSync(join(root, 'outside/index.min.css'), 'utf8'), 'untouched-ancestor');
});

test('rejects the previous runtime receipt after source configuration drift', () => {
  assert.throws(
    () => verifyRuntimeModelSourceBuild({ sourceReport: absolute(staleRuntimeReport) }),
    /Source input or dependency drift detected/,
  );
});

test('rejects an older runtime .2 receipt despite its identical version and success flags', () => {
  const previous = JSON.parse(fs.readFileSync(absolute(staleRuntime2Report)));
  const current = JSON.parse(fs.readFileSync(absolute(runtime2Report)));
  assert.equal(previous.candidateVersion, current.candidateVersion);
  for (const report of [previous, current]) {
    assert.equal(report.sourceBuildVerified, true);
    assert.equal(report.reproducibleBuildVerified, true);
    assert.equal(report.nativeAccepted, false);
  }
  assert.notEqual(previous.inputs.files.fingerprint, current.inputs.files.fingerprint);
  assert.throws(
    () => verifyRuntimeModelSourceBuild({ sourceReport: absolute(staleRuntime2Report) }),
    /Source input or dependency drift detected/,
  );
});

test('rejects the pre-fix controller runtime .2 receipt instead of accepting its unchanged version', () => {
  const previous = JSON.parse(fs.readFileSync(absolute(staleControllerRuntime2Report)));
  const current = JSON.parse(fs.readFileSync(absolute(runtime2Report)));
  assert.equal(previous.candidateVersion, current.candidateVersion);
  assert.equal(previous.sourceBuildVerified, true);
  assert.equal(previous.reproducibleBuildVerified, true);
  assert.equal(previous.nativeAccepted, false);
  const controller = report => report.inputs.files.entries.find(entry =>
    entry.path === 'src/core/model-runtime-controller.ts');
  assert.equal(controller(previous).sha256,
    'c45618ffa1b47d084b70a1b8a377002fe6bc3d87cfdc47b8cee03ce900490891');
  assert.equal(controller(current).sha256,
    '621f96041dc9ed2f447849be78ce1059031881aba91ea3ef541b58f249a3c51e');
  assert.throws(
    () => verifyRuntimeModelSourceBuild({ sourceReport: absolute(staleControllerRuntime2Report) }),
    /Source input or dependency drift detected/,
  );
});

test('rejects the otherwise matching runtime receipt without dependency implementation pins', () => {
  const original = JSON.parse(fs.readFileSync(absolute(unboundRuntimeReport)));
  const current = JSON.parse(fs.readFileSync(absolute(runtimeReport)));
  assert.deepEqual(original.inputs.files, current.inputs.files);
  assert.deepEqual(original.outputs, current.outputs);
  assert.ok(original.inputs.installed.every(dependency => !dependency.implementation));
  assert.ok(current.inputs.installed.every(dependency => dependency.implementation?.fingerprint));
  assert.throws(
    () => verifyRuntimeModelSourceBuild({ sourceReport: absolute(unboundRuntimeReport) }),
    /Source input or dependency drift detected/,
  );
});

test('compiled runtime observation cannot substitute for source-build evidence', () => {
  const verified = verifyRuntimeModelSourceBuild({ sourceReport: absolute(runtimeReport) });
  assert.throws(() => validateRuntimeEvidence({
    ...verified,
    report: { ...verified.report, contract: 'runtime-model-compiled-observation' },
  }), /runtime-model-reconstructed-source-build/);
  assert.throws(() => validateRuntimeEvidence({
    ...verified,
    report: { ...verified.report, sourceBuildVerified: false },
  }), /Source-built runtime-model is required/);
  assert.throws(() => validateRuntimeEvidence({
    ...verified,
    report: { ...verified.report, originalSourceRecovered: true },
  }), /true !== false/);
});

function lockFixture(t) {
  const root = freshTemp();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  function write(path, value) {
    fs.mkdirSync(join(root, path, '..'), { recursive: true });
    fs.writeFileSync(join(root, path), typeof value === 'string' ? value : JSON.stringify(value));
  }
  write('node_modules/example-tool/package.json', {
    name: 'example-tool', version: '1.0.0', dependencies: { 'example-child': '^1.0.0' },
    optionalDependencies: { 'absent-optional': '^1.0.0' },
  });
  write('node_modules/example-tool/bin/tool.js', '#!/usr/bin/env node\nconsole.log("fixture");\n');
  fs.chmodSync(join(root, 'node_modules/example-tool/bin/tool.js'), 0o700);
  write('node_modules/example-child/package.json', {
    name: 'example-child', version: '1.1.0', dependencies: { 'example-tool': '1.0.0' },
  });
  write('node_modules/example-child/index.js', 'export default 1;\n');
  const links = [{ name: 'example-tool', version: '1.0.0', role: 'fixture',
    target: join(root, 'node_modules/example-tool') }];
  const plan = () => planDependencyLock(links, { workspace: root });
  function stage(dependencies, name = 'candidate') {
    const packageRoot = join(root, name);
    fs.mkdirSync(packageRoot);
    stageDependencyLock(dependencies, packageRoot);
    return packageRoot;
  }
  return { root, links, write, plan, stage };
}

test('offline lock captures cyclic dependency graph, optional omissions, bytes and executable modes', t => {
  const f = lockFixture(t);
  const planned = f.plan();
  assert.equal(planned.lock.packageManagerInstallVerified, false);
  assert.equal(planned.lock.packages.length, 2);
  assert.deepEqual(planned.lock.packages.find(pkg => pkg.name === 'example-tool')
    .omitted.map(edge => edge.name), ['absent-optional']);
  assert.deepEqual(f.plan().lock, planned.lock, 'Planning must be reproducible');
  const first = f.stage(planned, 'first');
  const second = f.stage(planned, 'second');
  for (const root of [first, second]) {
    const summary = verifyDependencyLock(planned.lock, root);
    assert.equal(summary.sha256, planned.sha256);
    assert.equal(summary.packages, 2);
    assert.equal(summary.files, 4);
    const tool = fs.realpathSync(join(root, 'node_modules/example-tool'));
    assert.ok(tool.startsWith(join(root, '.dependencies')));
    assert.equal(Boolean(fs.statSync(join(tool, 'bin/tool.js')).mode & 0o111), true);
  }
});

test('offline lock rejects source implementation drift and missing required dependency', t => {
  const f = lockFixture(t);
  const before = f.plan();
  f.write('node_modules/example-child/index.js', 'export default 2;\n');
  assert.notEqual(f.plan().sha256, before.sha256);
  const root = join(f.root, 'candidate');
  fs.mkdirSync(root);
  assert.throws(() => stageDependencyLock(before, root), /Dependency input drift/);
  f.write('node_modules/example-child/package.json', {
    name: 'example-child', version: '1.1.0', dependencies: { 'missing-required': '1.0.0' },
  });
  assert.throws(f.plan, /Required dependency unavailable/);
});

test('offline lock never substitutes a published iBiz transitive dependency', t => {
  const f = lockFixture(t);
  f.write('node_modules/example-child/package.json', {
    name: 'example-child', version: '1.1.0', dependencies: { '@ibiz-template/core': '1.0.0' },
  });
  f.write('node_modules/@ibiz-template/core/package.json', {
    name: '@ibiz-template/core', version: '1.0.0',
  });
  f.write('node_modules/@ibiz-template/core/dist/index.js', 'export const fixture = true;\n');
  assert.throws(f.plan, /Published own dependency rejected/);
  const verifiedOwnTargets = [join(f.root, 'node_modules/@ibiz-template/core')];
  assert.equal(planDependencyLock(f.links, { workspace: f.root, verifiedOwnTargets })
    .lock.packages.length, 3);
});

test('offline lock rejects altered snapshot bytes, executable mode, extra files and package trees', t => {
  const f = lockFixture(t);
  const planned = f.plan();
  const childId = planned.lock.packages.find(pkg => pkg.name === 'example-child').id;
  for (const [index, mutate] of [
    root => fs.writeFileSync(join(root, '.dependencies', childId, 'index.js'), 'changed'),
    root => fs.chmodSync(join(root, 'node_modules/example-tool/bin/tool.js'), 0o600),
    root => fs.writeFileSync(join(root, '.dependencies', childId, 'extra.js'), 'extra'),
    root => fs.mkdirSync(join(root, '.dependencies', '0'.repeat(32))),
  ].entries()) {
    const root = f.stage(planned, `changed-${index}`);
    mutate(root);
    assert.throws(() => verifyDependencyLock(planned.lock, root),
      /Dependency snapshot drift|Unexpected dependency snapshot/);
  }
});

test('offline lock rejects lock-file tampering and dependency links escaping the snapshot', t => {
  const f = lockFixture(t);
  const planned = f.plan();
  const tampered = f.stage(planned, 'tampered');
  fs.writeFileSync(join(tampered, 'dependency-lock.json'), '{}');
  assert.throws(() => verifyDependencyLock(planned.lock, tampered), /Dependency lock drift/);
  const escaped = f.stage(planned, 'escaped');
  const link = join(escaped, 'node_modules/example-tool');
  fs.unlinkSync(link);
  fs.symlinkSync(f.links[0].target, link);
  assert.throws(() => verifyDependencyLock(planned.lock, escaped), /Dependency link drift/);
  const rootLink = f.stage(planned, 'root-link');
  fs.renameSync(join(rootLink, 'node_modules'), join(rootLink, 'old-modules'));
  fs.symlinkSync(join(rootLink, 'old-modules'), join(rootLink, 'node_modules'));
  assert.throws(() => verifyDependencyLock(planned.lock, rootLink), /Symlink directory rejected/);
});

test('offline lock rejects input symlinks but retains ordinary preserveModules output trees', t => {
  const f = lockFixture(t);
  f.write('node_modules/example-tool/es/node_modules/embedded/index.mjs', 'export default 0;\n');
  assert.ok(f.plan().lock.packages.find(pkg => pkg.name === 'example-tool').entries
    .some(file => file.path === 'es/node_modules/embedded/index.mjs'));
  fs.symlinkSync(join(f.root, 'node_modules/example-child/index.js'),
    join(f.root, 'node_modules/example-tool/linked.js'));
  assert.throws(f.plan, /Symlink dependency file rejected/);
});

test('consumed runtime binds all manifest, loader and dist bytes including declarations, not just JS', t => {
  const f = lockFixture(t);
  const runtimeRoot = join(f.root, 'source-runtime');
  f.write('source-runtime/package.json', {
    name: '@ibiz-template-plugin/runtime-model', version: '0.2.2-local.1',
    originalSourceRecovered: false, nativeAccepted: false,
  });
  for (const path of ['loader/index.js', 'loader/index.d.ts', 'dist/index.js', 'dist/types/index.d.ts']) {
    f.write(`source-runtime/${path}`, `// ${path}\n`);
  }
  const outputs = dependencyFiles(runtimeRoot).filter(file => file.path !== 'package.json')
    .map(({ path, bytes, sha256 }) => ({ path, bytes, sha256 }));
  const runtime = { reportSha256: 'a'.repeat(64), report: { buildRoot: runtimeRoot, outputs: { entries: outputs } } };
  const plan = planDependencyLock([{
    name: '@ibiz-template-plugin/runtime-model', version: '0.2.2-local.1', role: 'fixture', target: runtimeRoot,
  }], { workspace: f.root, verifiedOwnTargets: [runtimeRoot] });
  const root = f.stage(plan);
  const evidence = verifyConsumedRuntime(runtime, root, plan.lock);
  assert.equal(evidence.files, 5);
  assert.equal(evidence.sourceReportSha256, runtime.reportSha256);
  for (const path of ['package.json', 'loader/index.js', 'loader/index.d.ts', 'dist/types/index.d.ts']) {
    const file = join(root, 'node_modules/@ibiz-template-plugin/runtime-model', path);
    const original = fs.readFileSync(file);
    fs.writeFileSync(file, 'drift');
    assert.throws(() => verifyConsumedRuntime(runtime, root, plan.lock), /Consumed runtime bytes differ/);
    fs.writeFileSync(file, original);
  }
  const loader = join(root, 'node_modules/@ibiz-template-plugin/runtime-model/loader/index.js');
  const originalLoader = fs.readFileSync(loader);
  fs.unlinkSync(loader);
  assert.throws(() => verifyConsumedRuntime(runtime, root, plan.lock), /Consumed runtime bytes differ/);
  fs.writeFileSync(loader, originalLoader);
  for (const path of ['loader/unbound.js', 'dist/unbound.js']) {
    const file = join(root, 'node_modules/@ibiz-template-plugin/runtime-model', path);
    fs.writeFileSync(file, 'export const unbound = true;\n');
    assert.throws(() => verifyConsumedRuntime(runtime, root, plan.lock), /Consumed runtime bytes differ/);
    fs.unlinkSync(file);
  }
  assert.deepEqual(verifyConsumedRuntime(runtime, root, plan.lock), evidence);
});
