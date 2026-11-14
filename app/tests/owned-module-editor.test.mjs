import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  closeModuleBrowserEvidence, loadModuleLaunchRuntime, markModuleUIDispatch, moduleBoundedAcceptance,
  moduleBrowserRequestAllowed, moduleEditorTargets, moduleMutationRecoveryAllowed, moduleWritePath,
  publicModuleUI, readModuleEditorContract, runOwnedModuleEditor, settleModuleWriteSnapshot,
  validateModuleWritePayload, verifyModulePhysicalUpdate,
} from './owned-module-editor.browser.mjs';

const workspace = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const require = createRequire(join(workspace, 'ibiz-app-hub/package.json'));
const { Window } = require('happy-dom');
const root = { side: 'a', rootId: 'owned_root_a', database: 'owned_model_a',
  logicalSystemId: 'same_logical_system', sentinelId: 'owned_module_a',
  sentinelName: 'Owned module A', sentinelTag: 'owned_tag_a', centerId: 'same_center' };
const other = { ...root, side: 'b', rootId: 'owned_root_b', database: 'owned_model_b',
  sentinelName: 'Owned module B', sentinelTag: 'owned_tag_b' };
const actor = { loginname: 'owned_editor_a', personId: 'owned_person_a', role: 'editor',
  rootId: root.rootId, centerId: root.centerId };
const manifest = { roots: [root, other], users: [actor,
  { ...actor, loginname: 'owned_viewer_a', role: 'viewer' },
  { ...actor, loginname: 'owned_editor_b', rootId: other.rootId, personId: 'owned_person_b' }] };
const beforeForm = { psmoduleid: root.sentinelId, pssystemid: root.logicalSystemId,
  psmodulename: root.sentinelName, memo: null, defaultflag: 0, srfkey: root.sentinelId,
  srfmajortext: root.sentinelName, srfuf: '1' };
const intent = () => ({ armed: true, phase: 'ui-save', root, originalName: root.sentinelName,
  desiredName: 'Owned changed name', beforeForm: structuredClone(beforeForm) });
const payload = () => ({ ...beforeForm, psmodulename: 'Owned changed name' });
const origin = 'http://127.0.0.1:32459';
const readPolicy = { rootIds: [root.rootId], readCollections: new Set(['psmodules']),
  readFetchPaths: new Set(['psmodules/fetchcursys']),
  readRecordKeys: new Set([root.sentinelId, root.logicalSystemId]) };
const request = () => ({ url: `${origin}${moduleWritePath(root)}`, method: 'PUT',
  body: JSON.stringify(payload()) });
const launchFixture = () => {
  const runId = 'abcdef123456';
  const fixture = join(workspace, '.artifacts/native-nonadmin-fixtures', runId);
  const deploymentPath = join(fixture, 'backend-runtime-unit', 'deployment-input.private.json');
  const imagePath = join(workspace, '.artifacts/owned-module-editor-unit-images', 'report.json');
  const hash = bytes => createHash('sha256').update(bytes).digest('hex');
  const files = new Map();
  const add = (path, value, privateInput) => {
    const data = Buffer.from(`${JSON.stringify(value)}\n`);
    const binding = { path, bytes: data.length, sha256: hash(data), privateInput };
    files.set(path, { data, identity: { uid: process.geteuid(), mode: privateInput ? 0o100600 : 0o100644 } });
    return binding;
  };
  const publicBinding = ({ privateInput, ...binding }) => binding;
  const image = add(imagePath, { contract: 'unit-image-receipt' }, false);
  const moduleManifest = { ...manifest, runId };
  const resources = { contract: 'run-owned-native-fixture-resources-v1', runId,
    mysqlId: '1'.repeat(64), networkId: '2'.repeat(64) };
  const deployment = { runId, imageReceipt: { path: imagePath, sha256: image.sha256 } };
  const manifestBinding = add(join(fixture, 'manifest.json'), moduleManifest, false);
  const resourcesBinding = add(join(fixture, 'owned-resources.json'), resources, true);
  const deploymentBinding = add(deploymentPath, deployment, true);
  const credentialsBinding = add(join(fixture, 'credentials.private.json'),
    { users: Object.fromEntries(manifest.users.map(user => [user.loginname, 'unit-private-not-real-password'])) }, true);
  const runtime = { manifestPath: manifestBinding.path, resourcesPath: resourcesBinding.path, deploymentPath,
    imageReceiptPath: imagePath, bindings: [manifestBinding, resourcesBinding, deploymentBinding, credentialsBinding, image] };
  const options = {
    runId, deploymentPath, deploymentSha256: deploymentBinding.sha256,
    input: { network: resources.networkId, ownedBackend: { runId, networkId: resources.networkId,
      manifest: publicBinding(manifestBinding), resources: publicBinding(resourcesBinding),
      deploymentInput: { sha256: deploymentBinding.sha256 }, imageReceipt: publicBinding(image) } },
    launchReport: { deploymentInput: publicBinding(deploymentBinding) },
    specs: ['Central', 'ModelDesign'].map(application => ({ spec: { application, runtime } })),
    readFile: path => {
      assert.ok(files.has(path), 'Only the controlled bound fixture files may be read');
      return files.get(path);
    },
  };
  return { options, files, fixture, runtime };
};
const publicDOM = () => {
  const dom = new Window({ url: origin });
  dom.HTMLElement.prototype.getClientRects = function getClientRects() {
    return this.closest('[hidden]') || this.style.display === 'none' ? [] : [{}];
  };
  return dom;
};
const inspectPublicDOM = (dom, viewName, mode) => {
  const globals = { window: dom, document: dom.document, CSS: dom.CSS, getComputedStyle: dom.getComputedStyle.bind(dom) };
  const before = new Map(Object.keys(globals).map(name => [name, Object.getOwnPropertyDescriptor(globalThis, name)]));
  for (const [name, value] of Object.entries(globals)) {
    Object.defineProperty(globalThis, name, { configurable: true, writable: true, value });
  }
  try { return publicModuleUI({ viewName, mode }); }
  finally {
    for (const [name, descriptor] of before) {
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else delete globalThis[name];
    }
  }
};
const inspectMenu = (mutate = () => {}) => {
  const dom = publicDOM();
  dom.document.body.innerHTML = '<div id="index-root" class="ibiz-view">' +
    '<div class="ibiz-control-appmenu ibiz-control-appmenu-modelingmenu">' +
    '<ul role="menubar"><li role="menuitem" class="el-menu-item ibiz-control-appmenu__item" title="System Overview">' +
    '<span class="ibiz-control-appmenu__caption">System Overview</span></li></ul></div></div>';
  const state = { isCreated: true, isMounted: true, isLoading: false, isDestroyed: false, hasError: false };
  const model = { id: 'modelingmenu', name: 'appmenu', codeName: 'ModelingMenu',
    appMenuItems: [{ id: 'sysinfo', itemType: 'MENUITEM', caption: 'System Overview', appFuncId: 'sysinfo' }] };
  const func = { appFuncType: 'APPVIEW', appViewId: 'modeldesign.pssystemindexview' };
  const view = { id: 'index-root', model: { codeName: 'ModelingIndex', appId: 'ibizmodeling__modeldesign', controls: [model] },
    context: { psdevslnsys: root.rootId }, state };
  const menu = { model, view, state: { ...state, menuItemsState: { sysinfo: { visible: true, permitted: true } } } };
  view.getController = name => name === 'appmenu' ? menu : null;
  dom.ibiz = { util: { viewStack: { getView: id => id === view.id ? view : null } },
    hub: { getApp: () => ({ getAppFunc: () => func }) } };
  const fixture = { dom, model, menu, view, func,
    item: dom.document.querySelector('[role="menuitem"]'),
    wrapper: dom.document.querySelector('.ibiz-control-appmenu') };
  mutate(fixture);
  return inspectPublicDOM(dom, 'ModelingIndex', 'menu');
};
const inspectRemainingMode = (mode, mutate = () => {}) => {
  const dom = publicDOM();
  const viewName = { overview: 'PSSystemIndexView', grid: 'PSModuleGridView9', form: 'PSModuleQuickCfgView' }[mode];
  const state = { isCreated: true, isMounted: true, isLoading: false, isDestroyed: false, hasError: false };
  const models = {
    drbar: { id: 'default', name: 'drbar', codeName: 'Default',
      dedrctrlItems: [{ id: 'info', caption: 'Overview', appViewId: 'modeldesign.pssystemdashboardview' }] },
    grid: { id: 'embedded', name: 'grid', codeName: 'Embedded', appDataEntityId: 'modeldesign.psmodule',
      degridColumns: [{ id: 'psmodulename', codeName: 'psmodulename', dataItemName: 'psmodulename', enableLinkView: true }] },
    form: { id: 'quickcfg', name: 'form', codeName: 'QuickCfg' },
    toolbar: { id: 'quickcfgtoolbar', name: 'toolbar', codeName: 'QuickCfgViewtoolbar',
      detoolbarItems: [{ id: 'save', uiactionId: 'editview_saveandexitaction', caption: 'Save And Close', tooltip: 'Save And Close' }] },
  };
  const controls = {};
  const view = { id: 'owned-view', model: { codeName: viewName, appId: 'ibizmodeling__modeldesign',
    controls: Object.values(models) }, context: { psdevslnsys: root.rootId }, state };
  for (const [name, model] of Object.entries(models)) controls[name] = { model, view, state: { ...state, isLoaded: true } };
  Object.assign(controls.drbar.state, { isCalculatedPermission: true, selectedItem: 'info', defaultItem: 'info',
    hideEditItem: true, drBarItems: [{ tag: 'info', caption: 'Overview', visible: true, disabled: false }] });
  controls.grid.state.items = [{ psmoduleid: root.sentinelId, psmodulename: root.sentinelName }];
  controls.form.state.data = { ...beforeForm };
  controls.toolbar.state.buttonsState = { save: { visible: true, disabled: false, loading: false } };
  view.getController = name => controls[name] ?? null;
  dom.ibiz = { util: { viewStack: { getView: id => id === view.id ? view : null } } };
  const content = {
    overview: '<div class="ibiz-control-drbar"><ul role="menubar">' +
      '<li role="menuitem" class="el-menu-item ibiz-control-drbar__item"><span>Overview</span></li></ul></div>',
    grid: '<div class="ibiz-control-grid"><div class="el-table"><div class="el-table__body-wrapper">' +
      '<table><tbody><tr class="el-table__row"><td>Owned module A</td></tr></tbody></table></div></div></div>',
    form: '<div class="ibiz-control-form"><div id="PSModuleQuickCfgView_QuickCfg_psmodulename">' +
      '<input type="text" value="Owned module A"></div></div><div class="ibiz-control-toolbar">' +
      '<button title="Save And Close"><span>Save And Close</span></button></div>',
  }[mode];
  dom.document.body.innerHTML = `<div id="owned-view" class="ibiz-view">${content}</div>`;
  const fixture = { dom, models, controls, view,
    item: dom.document.querySelector('[role="menuitem"]'),
    input: dom.document.querySelector('input'), button: dom.document.querySelector('button') };
  mutate(fixture);
  return inspectPublicDOM(dom, viewName, mode);
};
const encode = values => Object.fromEntries(Object.entries(values)
  .map(([key, value]) => [key.toUpperCase(), value === null ? null : Buffer.from(String(value)).toString('hex').toUpperCase()]));
const set = (row, field, value) => { row[field.toUpperCase()] = value === null
  ? null : Buffer.from(String(value)).toString('hex').toUpperCase(); };
const table = (database, name, rows) => ({ database, table: name, rows: rows.map(encode) });
const find = (snapshot, name, database = root.database) => snapshot.tables.find(row =>
  row.database === database && row.table === name);
const snapshot = () => ({
  encoding: 'every-physical-column-null-or-hex-cast-binary-v1', inventory: [{ database: root.database }],
  tables: [root, other].flatMap(value => [
    table(value.database, 't_srfpsmodule', [{ psmoduleid: value.sentinelId,
      psmodulename: value.sentinelName, pssystemid: value.logicalSystemId, modtag: value.sentinelTag,
      memo: null, defaultflag: 0, pssysmodelgroupid: null, createdate: null, createman: null,
      updatedate: null, updateman: null }]),
    table(value.database, 't_srfpssystem', [{ pssystemid: value.logicalSystemId, modelver: 17, dbversion: 3 }]),
    table(value.database, 't_srfpssysmodellog', []),
    table(value.database, 't_srfpssystask', [{ taskid: 'original-task', name: 'unchanged' }]),
  ]),
});
const changed = before => {
  const after = structuredClone(before);
  const module = find(after, 't_srfpsmodule').rows[0];
  set(module, 'psmodulename', 'Owned changed name');
  set(module, 'updatedate', '2026-11-14 13:00:00');
  set(module, 'updateman', actor.personId);
  set(find(after, 't_srfpssystem').rows[0], 'modelver', 18);
  find(after, 't_srfpssysmodellog').rows.push(encode({
    pssysmodellogid: 'native-log-id', pssysmodellogname: 'PSMODULE',
    pssystemid: root.logicalSystemId, pssystemname: '(N/A)', psdynainstid: null,
    createdate: '2026-11-14 13:00:00', createman: actor.personId,
    updatedate: '2026-11-14 13:00:00', updateman: actor.personId,
  }));
  return after;
};
const verify = (before, after, extra = {}) => verifyModulePhysicalUpdate({ before, after, root, actor,
  originalName: root.sentinelName, desiredName: 'Owned changed name', ...extra });

test('source binds normal main appmenu, overview portlet, module link, textbox and native methods', () => {
  const contract = readModuleEditorContract();
  assert.deepEqual(contract.entry, { control: 'appmenu', item: 'sysinfo', view: 'PSSystemIndexView' });
  assert.equal(contract.overview.item, 'info');
  assert.equal(contract.grid.view, 'PSModuleGridView9');
  assert.equal(contract.editor.field, 'psmodulename');
  assert.equal(contract.editor.formCodeName, 'QuickCfg');
  assert.equal(contract.methods.Update.method, 'PUT');
  assert.equal(contract.methods.Get.method, 'GET');
  assert.equal(contract.methods.FetchCurSys.path, '/fetchcursys');
});

test('an uneditable authoritative name field fails source verification instead of choosing another field', () => {
  assert.throws(() => readModuleEditorContract({ read: path => {
    const model = JSON.parse(fs.readFileSync(path));
    if (path.endsWith('/PSFORMS/QuickCfg.json')) {
      const walk = value => {
        if (!value || typeof value !== 'object') return;
        if (value.detailType === 'FORMITEM' && value.codeName === 'psmodulename') value.enableCond = 0;
        Object.values(value).forEach(walk);
      };
      walk(model);
    }
    return model;
  } }));
});

test('the native Save button must resolve to the authoritative predefined SaveAndExit action', () => {
  assert.throws(() => readModuleEditorContract({ read: path => {
    const model = JSON.parse(fs.readFileSync(path));
    if (path.endsWith('/PSAPPDEVIEWS/PSModuleQuickCfgView.json')) {
      const toolbar = model.getPSControls.find(control => control.name === 'toolbar');
      toolbar.getPSDEToolbarItems[0].getPSUIAction.predefinedType = 'EDITVIEW_EXITACTION';
    }
    return model;
  } }));
});

test('same-center users are selected by actual actor/root binding, never by center suffix', () => {
  assert.deepEqual(moduleEditorTargets(manifest, { actor: actor.loginname, rootSide: 'a' }), { actor, root });
  assert.equal(moduleEditorTargets(manifest, { actor: 'owned_editor_b', rootSide: 'b' }).root.rootId, other.rootId);
});

for (const [name, options] of [
  ['viewer', { actor: 'owned_viewer_a', rootSide: 'a' }],
  ['foreign editor', { actor: actor.loginname, rootSide: 'b' }],
  ['unlisted identity', { actor: 'admin', rootSide: 'a' }],
  ['unlisted root', { actor: actor.loginname, rootSide: 'c' }],
]) test(`mutation target selection rejects ${name}`, () => assert.throws(() => moduleEditorTargets(manifest, options)));

test('a real name change preserves NULL memo and every other loaded form value', () => {
  assert.equal(validateModuleWritePayload(payload(), intent()), true);
  assert.equal(payload().memo, null);
});

for (const [name, mutate] of [
  ['NULL memo converted to empty string', row => { row.memo = ''; }],
  ['default module flag', row => { row.defaultflag = 1; }],
  ['unloaded hidden field', row => { row.pssysmodelgroupid = 'foreign-group'; }],
  ['wrong record key', row => { row.psmoduleid = 'unowned_record_key'; }],
  ['system reparenting', row => { row.pssystemid = 'foreign_system'; }],
  ['different name', row => { row.psmodulename = 'not-the-durable-intent'; }],
]) test(`request guard rejects ${name} before dispatch`, () => {
  const body = payload(); mutate(body);
  assert.throws(() => validateModuleWritePayload(body, intent()));
});

test('only the exact armed owned PUT is admitted, without authorizing other methods or roots', () => {
  assert.equal(moduleBrowserRequestAllowed(request(), { origin, readPolicy, intent: intent() }), true);
  assert.equal(moduleBrowserRequestAllowed(request(), { origin, readPolicy, intent: null }), false);
  assert.equal(moduleBrowserRequestAllowed(request(), { origin, readPolicy, intent: { ...intent(), armed: false } }), false);
  for (const row of [
    { ...request(), method: 'DELETE' }, { ...request(), method: 'PATCH' },
    { ...request(), url: `${origin}${moduleWritePath(other)}` },
    { ...request(), url: `${origin}${moduleWritePath(root)}?hidden=1` },
    { ...request(), url: `http://127.0.0.1:30250${moduleWritePath(root)}` },
    { ...request(), url: `${origin}${prefixForTest()}/psmodules` },
    { ...request(), body: '{"psmodulename":"not-bound"}' },
  ]) assert.equal(moduleBrowserRequestAllowed(row, { origin, readPolicy, intent: intent() }), false);
});

function prefixForTest() { return '/api/ibizmodeling__modeldesign'; }

test('read policy still allows native login and own-root Get while no write is armed', () => {
  for (const row of [
    { url: `${origin}${moduleWritePath(root)}`, method: 'GET' },
    { url: `${origin}${prefixForTest()}/v7/login`, method: 'POST' },
    { url: `${origin}/modeldesign/source-app/index.system.js`, method: 'GET' },
  ]) assert.equal(moduleBrowserRequestAllowed(row, { origin, readPolicy, intent: null }), true);
});

test('one native update accepts only name/audit, exactly +1 model version and the matching native log', () => {
  const before = snapshot();
  const result = verify(before, changed(before));
  assert.deepEqual(result.modelVersion, { before: 17, after: 18, delta: 1 });
  assert.equal(result.restoredBusinessName, false);
  assert.equal(result.auditAndVersionIntentionallyRetained, true);
});

for (const [name, mutate] of [
  ['missing complete physical table', after => { after.tables.pop(); }],
  ['schema drift', after => { after.inventory.push({ column: 'new-column' }); }],
  ['NULL memo coercion', after => set(find(after, 't_srfpsmodule').rows[0], 'memo', '')],
  ['default module change', after => set(find(after, 't_srfpsmodule').rows[0], 'defaultflag', 1)],
  ['model group change', after => set(find(after, 't_srfpsmodule').rows[0], 'pssysmodelgroupid', 'other-group')],
  ['foreign-root change', after => set(find(after, 't_srfpsmodule', other.database).rows[0], 'psmodulename', 'leak')],
  ['task side effect', after => set(find(after, 't_srfpssystask').rows[0], 'name', 'unexpected')],
  ['DB version side effect', after => set(find(after, 't_srfpssystem').rows[0], 'dbversion', 4)],
  ['no model version increment', after => set(find(after, 't_srfpssystem').rows[0], 'modelver', 17)],
  ['double model version increment', after => set(find(after, 't_srfpssystem').rows[0], 'modelver', 19)],
  ['audit identity mismatch', after => set(find(after, 't_srfpsmodule').rows[0], 'updateman', 'admin')],
  ['missing native model log', after => { find(after, 't_srfpssysmodellog').rows = []; }],
  ['arbitrary audit value', after => set(find(after, 't_srfpssysmodellog').rows[0], 'psdynainstid', 'unexpected')],
  ['unrelated audit log', after => {
    find(after, 't_srfpssysmodellog').rows.push(encode({ pssysmodellogid: 'unrelated',
      pssysmodellogname: 'PSDATAENTITY', pssystemid: root.logicalSystemId }));
  }],
]) test(`complete snapshot verifier refuses ${name}`, () => {
  const before = snapshot();
  const after = changed(before); mutate(after);
  assert.throws(() => verify(before, after));
});

test('restoration retains native audit and increments version again; it never resets version with SQL', () => {
  const before = changed(snapshot());
  const after = structuredClone(before);
  const module = find(after, 't_srfpsmodule').rows[0];
  set(module, 'psmodulename', root.sentinelName);
  set(module, 'updatedate', '2026-11-14 13:01:00');
  set(find(after, 't_srfpssystem').rows[0], 'modelver', 19);
  set(find(after, 't_srfpssysmodellog').rows[0], 'updatedate', '2026-11-14 13:01:00');
  const result = verify(before, after, { originalName: 'Owned changed name', desiredName: root.sentinelName });
  assert.equal(result.restoredBusinessName, true);
  assert.deepEqual(result.modelVersion, { before: 18, after: 19, delta: 1 });
});

test('import and help do not execute browser/HTTP, and missing mutation opt-in fails first', async () => {
  await assert.rejects(runOwnedModuleEditor({}), /allow-owned-ui-mutations/);
  await assert.rejects(runOwnedModuleEditor({ allowOwnedUIMutations: true }), /match|undefined|string/i);
});

test('runner source uses ordinary DOM Save and login, not controller actions or direct HTTP writes', () => {
  const text = fs.readFileSync(join(workspace, 'modelingweb/app/tests/owned-module-editor.browser.mjs'), 'utf8');
  assert.ok(text.includes("record('write-intent'"));
  assert.ok(text.indexOf("record('write-intent'") < text.indexOf('await current.page.locator(current.editor.input).fill'));
  assert.ok(text.includes('moduleBrowserRequestAllowed'));
  assert.ok(text.includes("phase: 'ui-save'"));
  assert.ok(text.includes("await open(root.sentinelName)"));
  assert.ok(text.includes("status: 'UNEXPECTED-DELTA-RETAIN-FIXTURE'"));
  for (const forbidden of [/page\.request\./, /context\.request\./, /fetch\(/, /force:\s*true/,
    /\.onItemClick\(/, /\.handleSelectChange\(/, /\.setExtraHTTPHeaders\(/, /\.setContent\(/]) {
    assert.ok(!forbidden.test(text), `Forbidden interaction shortcut: ${forbidden}`);
  }
});

test('runner consumes the strict shared native Get helper and treats failed networking as blocking evidence', () => {
  const text = fs.readFileSync(join(workspace, 'modelingweb/app/tests/owned-module-editor.browser.mjs'), 'utf8');
  assert.match(text, /nativeReadCollections, observedDatasetRequest, readOnlyBrowserRequestAllowed/);
  assert.match(text, /readCollections: nativeReadCollections\(api\)/);
  assert.match(text, /page\.on\('requestfailed', request => evidence\.errors\.push\(\{/);
  assert.match(text, /path: clean\(new URL\(request\.url\(\)\)\.pathname\)/);
  assert.match(text, /failure: clean\(request\.failure\(\)\?\.errorText \?\? 'unknown-request-failure'\)/);
  assert.match(text, /report\.sessions\.some\(row => !Array\.isArray\(row\.errors\) \|\| row\.errors\.length\)/);
});

test('M03 loads the exact launch-bound fixture without invoking a backend-only live inspector', () => {
  const { options } = launchFixture();
  const result = loadModuleLaunchRuntime(options);
  assert.equal(result.manifest.runId, options.runId);
  assert.equal(result.resources.mysqlId, '1'.repeat(64));
  assert.equal(result.deployment.runId, options.runId);
  assert.deepEqual(Object.keys(result.credentials.users).sort(), manifest.users.map(user => user.loginname).sort());
  assert.equal(result.bindings.length, 4);
  assert.equal(Object.hasOwn(result, 'guard'), false);
  assert.equal(Object.hasOwn(result, 'close'), false);
});

for (const [name, mutate] of [
  ['different runtime between bridges', state => {
    state.options.specs[1].spec.runtime = { ...state.runtime, manifestPath: '/different/manifest.json' };
  }],
  ['different run', state => { state.options.input.ownedBackend.runId = '000000000000'; }],
  ['manifest outside this fixture', state => { state.runtime.manifestPath = join(state.fixture, '..', 'manifest.json'); }],
  ['resources outside this fixture', state => { state.runtime.resourcesPath = join(state.fixture, 'other-resources.json'); }],
  ['different explicit deployment', state => {
    state.options.deploymentPath = join(state.fixture, 'backend-runtime-other', 'deployment-input.private.json');
  }],
  ['non-runtime deployment directory', state => {
    state.options.deploymentPath = join(state.fixture, 'unreviewed', 'deployment-input.private.json');
  }],
  ['deployment hash mismatch', state => { state.options.deploymentSha256 = '0'.repeat(64); }],
  ['manifest hash mismatch', state => { state.options.input.ownedBackend.manifest.sha256 = '0'.repeat(64); }],
  ['public credentials flag', state => {
    state.runtime.bindings.find(row => row.path.endsWith('/credentials.private.json')).privateInput = false;
  }],
  ['missing credentials binding', state => {
    state.runtime.bindings = state.runtime.bindings.filter(row => !row.path.endsWith('/credentials.private.json'));
  }],
  ['duplicate credentials binding', state => {
    state.runtime.bindings.push(state.runtime.bindings.find(row => row.path.endsWith('/credentials.private.json')));
  }],
  ['fixture byte drift', state => {
    state.files.get(join(state.fixture, 'manifest.json')).data = Buffer.from('{}\n');
  }],
  ['wrong private UID', state => {
    state.files.get(join(state.fixture, 'credentials.private.json')).identity.uid = process.geteuid() + 1;
  }],
  ['group-readable credentials', state => {
    state.files.get(join(state.fixture, 'credentials.private.json')).identity.mode = 0o100640;
  }],
  ['world-readable resources', state => {
    state.files.get(join(state.fixture, 'owned-resources.json')).identity.mode = 0o100604;
  }],
  ['image binding mismatch', state => { state.options.input.ownedBackend.imageReceipt.sha256 = '0'.repeat(64); }],
]) test(`M03 launch context fails closed for ${name}`, () => {
  const state = launchFixture();
  mutate(state);
  assert.throws(() => loadModuleLaunchRuntime(state.options));
});

test('M03 retains the exact full frontend/backend bridge guard instead of projecting or faking inspection locally', () => {
  const source = fs.readFileSync(join(workspace, 'modelingweb/app/tests/owned-module-editor.browser.mjs'), 'utf8');
  assert.doesNotMatch(source, /ownedNativeRuntimeContext|runtime\.guard\(|runtime\?\.close\(|validateDeployment\(/);
  assert.match(source, /runtime = loadModuleLaunchRuntime\(/);
  assert.match(source, /verifyOwnedBridgeRuntime\(\{ workspace, directories, input, runtime: spec\.runtime,/);
  assert.match(source, /frontendPins: spec\.frontendPins, fullMountedHash: full/);
  assert.match(source, /verifyBridgeProcess\(bridge\.identity, bridge\.specPath, bridge\.specSha256\)/);
  assert.ok(source.indexOf('guard(true);') < source.indexOf('const inventorySQL = editorPhysicalInventorySQL'));
  assert.match(source, /runtime\.resources\.mysqlId/);
  assert.match(source, /build\.sourceInputs\.before\.entries\.find/);
});

test('native main-menu DOM without an index attribute binds only its exact current model caption inside the owned control', () => {
  const result = inspectMenu();
  assert.equal(result.ready, true);
  assert.equal(result.itemId, 'sysinfo');
  assert.equal(result.rootId, root.rootId);
  assert.equal(result.targetView, 'modeldesign.pssystemindexview');
  assert.equal(result.menu.matchedBy, 'control-scoped-exact-model-caption');
  assert.equal(result.menu.indexedCount, 0);
  assert.equal(result.menu.captionMatchCount, 1);
  assert.equal(result.menu.visibleMatchedCount, 1);
  assert.equal(result.menu.itemState.permitted, true);
  assert.ok(result.target.startsWith('#index-root > '));
});

test('an actual index attribute remains the preferred exact item mapping', () => {
  const result = inspectMenu(({ item }) => item.setAttribute('index', 'sysinfo'));
  assert.equal(result.ready, true);
  assert.equal(result.menu.matchedBy, 'index');
  assert.equal(result.menu.indexedCount, 1);
});

for (const [name, mutate] of [
  ['duplicate visible DOM caption', fixture => fixture.item.parentElement.appendChild(fixture.item.cloneNode(true))],
  ['ambiguous current model caption', fixture => fixture.model.appMenuItems.push({
    id: 'another-menu', caption: 'System Overview', itemType: 'MENUITEM', appFuncId: 'another-func',
  })],
  ['different native index', fixture => fixture.item.setAttribute('index', 'another-menu')],
  ['caption only elsewhere on the page', fixture => fixture.dom.document.body.appendChild(fixture.item)],
  ['wrong menu control class', fixture => fixture.wrapper.classList.remove('ibiz-control-appmenu-modelingmenu')],
  ['not a native menu-item or button', fixture => {
    const replacement = fixture.dom.document.createElement('div');
    replacement.className = 'ibiz-control-appmenu__item';
    replacement.textContent = 'System Overview';
    fixture.item.replaceWith(replacement);
  }],
  ['hidden menu DOM', fixture => fixture.item.setAttribute('hidden', '')],
  ['disabled menu DOM', fixture => fixture.item.setAttribute('aria-disabled', 'true')],
  ['model hidden', fixture => { fixture.model.appMenuItems[0].hidden = true; }],
  ['model disabled', fixture => { fixture.model.appMenuItems[0].disabled = true; }],
  ['visible state denied', fixture => { fixture.menu.state.menuItemsState.sysinfo.visible = false; }],
  ['permission state denied', fixture => { fixture.menu.state.menuItemsState.sysinfo.permitted = false; }],
  ['permission state absent', fixture => { delete fixture.menu.state.menuItemsState.sysinfo.permitted; }],
  ['wrong AppFunc target', fixture => { fixture.func.appViewId = 'modeldesign.anotherview'; }],
  ['wrong AppFunc type', fixture => { fixture.func.appFuncType = 'JAVASCRIPT'; }],
  ['wrong AppFunc identity', fixture => { fixture.model.appMenuItems[0].appFuncId = 'another-func'; }],
  ['foreign controller owner', fixture => { fixture.menu.view = {}; }],
  ['view still loading', fixture => { fixture.view.state.isLoading = true; }],
]) test(`main-menu fallback fails closed for ${name}`, () => {
  const result = inspectMenu(mutate);
  assert.equal(result.ready, false);
  assert.equal(typeof result.menu.visibleMatchedCount, 'number');
  assert.ok(result.lifecycle);
});

test('readiness diagnostics retain source/control/match flags and bounded scrubbed candidate structure', () => {
  const result = inspectMenu(({ item, menu }) => {
    item.setAttribute('data-private', 'never-print-private-value');
    item.setAttribute('value', 'never-print-control-value');
    menu.state.menuItemsState.sysinfo.permitted = false;
  });
  assert.equal(result.ready, false);
  assert.equal(result.menu.ownerMatches, true);
  assert.equal(result.menu.modelMatches, true);
  assert.equal(result.menu.wrapperCount, 1);
  assert.equal(result.menu.visibleWrapperCount, 1);
  assert.equal(result.menu.visibleCandidateCount, 1);
  assert.equal(result.menu.itemState.permitted, false);
  assert.equal(result.menu.candidates[0].role, 'menuitem');
  assert.ok(result.menu.candidates[0].outerHTML.length <= 1200);
  assert.doesNotMatch(result.menu.candidates[0].outerHTML, /data-private|never-print|value=/);
});

test('overview resolves only the normal control-scoped item for the exact source info target without requiring a DOM index', () => {
  const result = inspectRemainingMode('overview');
  assert.equal(result.ready, true);
  assert.equal(result.overview.itemTag, 'info');
  assert.equal(result.overview.targetView, 'modeldesign.pssystemdashboardview');
  assert.equal(result.overview.isCalculatedPermission, true);
  assert.equal(result.overview.selectedItem, 'info');
  assert.equal(result.overview.defaultItem, 'info');
  assert.equal(result.overview.matchedBy, 'control-scoped-exact-model-caption');
  assert.equal(result.overview.visibleMatchedCount, 1);
  assert.ok(result.target.startsWith('#owned-view > '));
});

for (const [name, mutate] of [
  ['permission calculation pending', fixture => { fixture.controls.drbar.state.isCalculatedPermission = false; }],
  ['item invisible', fixture => { fixture.controls.drbar.state.drBarItems[0].visible = false; }],
  ['item disabled', fixture => { fixture.controls.drbar.state.drBarItems[0].disabled = true; }],
  ['DOM item disabled', fixture => fixture.item.setAttribute('aria-disabled', 'true')],
  ['DOM item hidden', fixture => fixture.item.setAttribute('hidden', '')],
  ['different DOM index', fixture => fixture.item.setAttribute('index', 'other')],
  ['caption outside the exact control', fixture => fixture.dom.document.body.appendChild(fixture.item)],
  ['ambiguous visible DOM caption', fixture => fixture.item.parentElement.appendChild(fixture.item.cloneNode(true))],
  ['ambiguous current model caption', fixture => fixture.models.drbar.dedrctrlItems.push({
    id: 'other', caption: 'Overview', appViewId: 'modeldesign.other',
  })],
  ['state caption disagrees with source model', fixture => { fixture.controls.drbar.state.drBarItems[0].caption = 'Other'; }],
  ['wrong dashboard target', fixture => { fixture.models.drbar.dedrctrlItems[0].appViewId = 'modeldesign.other'; }],
  ['foreign controller owner', fixture => { fixture.controls.drbar.view = {}; }],
]) test(`overview matching cannot bypass ${name}`, () => {
  const result = inspectRemainingMode('overview', mutate);
  assert.equal(result.ready, false);
  assert.equal(typeof result.overview.visibleMatchedCount, 'number');
  assert.ok(result.overview.lifecycle);
});

test('grid diagnostics expose controller readiness, physical row rendering and current source columns', () => {
  const result = inspectRemainingMode('grid');
  assert.equal(result.ready, true);
  assert.equal(result.grid.ownerMatches, true);
  assert.equal(result.grid.modelMatches, true);
  assert.equal(result.grid.isLoaded, true);
  assert.equal(result.grid.itemCount, 1);
  assert.equal(result.grid.visibleWrapperCount, 1);
  assert.equal(result.grid.visibleRowCount, 1);
  assert.equal(result.grid.columns[0].dataItemName, 'psmodulename');
  assert.equal(result.items[0].psmoduleid, root.sentinelId);
});

for (const [name, mutate] of [
  ['load pending', fixture => { fixture.controls.grid.state.isLoaded = false; }],
  ['loading active', fixture => { fixture.controls.grid.state.isLoading = true; }],
  ['missing controller', fixture => { delete fixture.controls.grid; }],
  ['hidden wrapper', fixture => fixture.dom.document.querySelector('.ibiz-control-grid').setAttribute('hidden', '')],
]) test(`grid timeout evidence distinguishes ${name}`, () => {
  const result = inspectRemainingMode('grid', mutate);
  assert.equal(result.ready, false);
  assert.equal(typeof result.grid.visibleWrapperCount, 'number');
  assert.ok(Object.hasOwn(result.grid, 'isLoaded'));
});

test('form diagnostics retain exact source field ID and action/button states without printing input attributes', () => {
  const result = inspectRemainingMode('form');
  assert.equal(result.ready, true);
  assert.equal(result.formControl.ownerMatches, true);
  assert.equal(result.inputDiagnostics.derivedId, 'PSModuleQuickCfgView_QuickCfg_psmodulename');
  assert.equal(result.inputDiagnostics.inputCount, 1);
  assert.equal(result.inputDiagnostics.visibleInputCount, 1);
  assert.equal(result.toolbarControl.actions[0].actionId, 'editview_saveandexitaction');
  assert.equal(result.save.visible, true);
  assert.equal(result.save.disabled, false);
  assert.equal(result.save.count, 1);
  assert.doesNotMatch(JSON.stringify(result.inputDiagnostics.elements), /value=|Owned module A/);
});

for (const [name, mutate] of [
  ['missing source field DOM', fixture => fixture.input.parentElement.remove()],
  ['duplicate exact field input', fixture => fixture.input.parentElement.appendChild(fixture.input.cloneNode(true))],
  ['form still loading', fixture => { fixture.controls.form.state.isLoading = true; }],
  ['form not loaded', fixture => { fixture.controls.form.state.isLoaded = false; }],
  ['toolbar absent', fixture => { delete fixture.controls.toolbar; }],
]) test(`form timeout evidence distinguishes ${name}`, () => {
  const result = inspectRemainingMode('form', mutate);
  assert.equal(result.ready, false);
  assert.equal(typeof result.inputDiagnostics.fieldCount, 'number');
  assert.ok(Array.isArray(result.toolbarControl.actions));
  assert.ok(result.formControl.lifecycle);
});

test('readonly form and hidden Save remain explicit blockers for the calling editor, not selector fallbacks', () => {
  const result = inspectRemainingMode('form', fixture => {
    fixture.input.readOnly = true;
    fixture.controls.toolbar.state.buttonsState.save.visible = false;
    fixture.button.setAttribute('hidden', '');
  });
  assert.equal(result.editable, false);
  assert.equal(result.inputDiagnostics.readOnly, true);
  assert.equal(result.save.visible, false);
  assert.equal(result.save.count, 0);
});

test('runner records successful mode readiness and captures a primary failure screenshot before closing', () => {
  const source = fs.readFileSync(join(workspace, 'modelingweb/app/tests/owned-module-editor.browser.mjs'), 'utf8');
  for (const mode of ['menu', 'overview', 'grid', 'form']) {
    assert.ok(source.includes(`evidence.readiness.${mode} =`));
  }
  assert.match(source, /await activePage\.screenshot\(\{ path: join\(output, name\), fullPage: true \}\)/);
  assert.ok(source.indexOf("await captureFailureScreenshot('primary')") <
    source.indexOf('report.browserShutdown = await closeModuleBrowserEvidence'));
  assert.match(source, /stage: 'drbar-info', click: await trustedClick\(page\.locator\(overview\.target\)\)/);
  assert.doesNotMatch(source, /\.handleSelectChange\(|\.onItemClick\(|force:\s*true/);
});

test('native list request and response are privately recorded before binding validation without credentials', () => {
  const source = fs.readFileSync(new URL('./owned-module-editor.browser.mjs', import.meta.url), 'utf8');
  const recorded = source.indexOf("record('module-list-observation'");
  const validated = source.indexOf('evidence.listRequest = observedDatasetRequest');
  assert.ok(recorded > 0 && validated > recorded);
  const observed = source.slice(source.indexOf('const observedRequest ='), recorded);
  assert.match(observed, /authorizationPresent: Boolean\(headers.authorization\)/);
  assert.doesNotMatch(observed, /authorization: headers|password|runtime\.credentials/);
  assert.match(source.slice(recorded, validated), /response: \{ status: list\.status\(\), data: items \}/);
  assert.match(source, /nativeModuleRootBinding: true/);
  for (const field of ['pssystemid', 'pssystemname', 'modtag']) {
    assert.ok(source.includes(`assert.equal(items[0].${field}, root.`));
  }
  assert.match(source, /assert\.equal\(items\.length, 1/);
});

test('verified physical restoration is reported before unrelated browser blockers without marking acceptance', () => {
  const source = fs.readFileSync(new URL('./owned-module-editor.browser.mjs', import.meta.url), 'utf8');
  const physical = source.indexOf('report.physicalRoundtripVerified = true');
  const cleanup = source.indexOf("report.cleanup = { status: 'RESTORED-BUSINESS-NAME-VIA-NATIVE-UI'");
  const closed = source.indexOf('report.browserShutdown = await closeModuleBrowserEvidence');
  const blockers = source.indexOf('report.browserAcceptanceGate = moduleBoundedAcceptance');
  const accepted = source.indexOf('report.boundedEditorSaveAcceptance = true');
  assert.ok(physical > 0 && cleanup > physical && closed > cleanup && blockers > closed && accepted > blockers);
});

const mutationFixture = () => ({
  mutation: { changed: false, pendingDispatch: false, unsafeDelta: false, failureKind: null },
  intent: { ...intent(), journal: { path: '/private/unit-intent', sha256: 'a'.repeat(64) },
    writeRow: { status: 'INTENT-DURABLE-NOT-DISPATCHED' } },
});
const dispatchReceipt = { path: '/private/unit-dispatch', sha256: 'b'.repeat(64) };
const browserGateReport = () => ({
  physicalRoundtripVerified: true, errors: [], blockedRequests: [], sessions: [{ errors: [] }],
});

test('possible commit is marked before a synchronous dispatch journal and before request continuation', () => {
  const state = mutationFixture();
  const records = [];
  markModuleUIDispatch({ ...state, record(name, value) {
    assert.equal(state.mutation.changed, true);
    assert.equal(state.mutation.pendingDispatch, true);
    assert.equal(state.intent.dispatched, true);
    assert.equal(state.intent.armed, false);
    assert.equal(state.intent.writeRow.status, 'POSSIBLY-COMMITTED-SNAPSHOT-PENDING');
    assert.equal(moduleMutationRecoveryAllowed(state.mutation), false);
    records.push({ name, value });
    return dispatchReceipt;
  } });
  assert.equal(records.length, 1);
  assert.equal(records[0].name, 'write-dispatch-intent');
  assert.equal(records[0].value.possibleCommit, true);
  assert.deepEqual(records[0].value.writeIntent, state.intent.journal);
  assert.equal(records[0].value.path, moduleWritePath(root));
  assert.equal(Object.hasOwn(records[0].value, 'beforeForm'), false);
  assert.deepEqual(state.intent.writeRow.dispatchIntent, dispatchReceipt);
});

for (const [name, record] of [
  ['recorder throws', () => { throw new Error('fsync failed'); }],
  ['recorder is asynchronous', () => Promise.resolve(dispatchReceipt)],
]) test(`dispatch ${name} retains uncertain write evidence and forbids recovery`, () => {
  const state = mutationFixture();
  assert.throws(() => markModuleUIDispatch({ ...state, record }));
  assert.equal(state.mutation.changed, true);
  assert.equal(state.mutation.pendingDispatch, true);
  assert.equal(state.mutation.unsafeDelta, true);
  assert.equal(state.mutation.failureKind, 'dispatch-journal-failed');
  assert.equal(moduleMutationRecoveryAllowed(state.mutation), false);
  assert.equal(state.intent.writeRow.status, 'UNVERIFIED-DISPATCH-RETAIN-EVIDENCE');
});

for (const cause of ['runtime guard drift', 'Docker inspection failed', 'SQL JSON could not be parsed']) {
  test(`first dispatched write with ${cause} cannot be reported cleanup-not-needed or automatically restored`, () => {
    const state = mutationFixture();
    markModuleUIDispatch({ ...state, record: () => dispatchReceipt });
    let verified = false;
    assert.throws(() => settleModuleWriteSnapshot({
      ...state, before: snapshot(), snapshot() { throw new Error(cause); },
      verify() { verified = true; },
    }), new RegExp(cause));
    assert.equal(verified, false);
    assert.equal(state.mutation.changed, true);
    assert.equal(state.mutation.pendingDispatch, true);
    assert.equal(state.mutation.unsafeDelta, true);
    assert.equal(state.mutation.failureKind, 'post-dispatch-snapshot-failed');
    assert.equal(state.intent.writeRow.status, 'UNVERIFIED-DISPATCH-RETAIN-EVIDENCE');
    assert.equal(moduleMutationRecoveryAllowed(state.mutation), false);
    assert.throws(() => settleModuleWriteSnapshot({
      ...state, before: {}, snapshot: () => ({}), verify: () => ({}),
    }), /prior uncertain dispatch/);
    assert.equal(state.mutation.pendingDispatch, true, 'A later snapshot must not silently adopt an uncertain first attempt');
  });
}

test('only a complete verified native delta clears the dispatch-pending boundary', () => {
  const state = mutationFixture();
  const before = snapshot();
  const after = changed(before);
  markModuleUIDispatch({ ...state, record: () => dispatchReceipt });
  const result = settleModuleWriteSnapshot({
    ...state, before, snapshot: () => after, verify: value => verify(before, value),
  });
  assert.deepEqual(result.after, after);
  assert.equal(result.physicalDelta.modelVersion.delta, 1);
  assert.equal(state.mutation.pendingDispatch, false);
  assert.equal(state.mutation.unsafeDelta, false);
  assert.equal(state.mutation.changed, true);
  assert.equal(moduleMutationRecoveryAllowed(state.mutation), true);
  assert.equal(state.intent.writeRow.status, 'NATIVE-UI-SAVE-PHYSICALLY-VERIFIED');
});

test('unexpected full-snapshot delta never authorizes a recovery write', () => {
  const state = mutationFixture();
  markModuleUIDispatch({ ...state, record: () => dispatchReceipt });
  assert.throws(() => settleModuleWriteSnapshot({
    ...state, before: {}, snapshot: () => ({ extraRow: true }),
    verify() { throw new Error('foreign row changed'); },
  }), /foreign row changed/);
  assert.equal(state.mutation.changed, true);
  assert.equal(state.mutation.unsafeDelta, true);
  assert.equal(moduleMutationRecoveryAllowed(state.mutation), false);
  assert.equal(state.intent.writeRow.status, 'UNEXPECTED-PERSISTENT-DELTA-RETAIN-EVIDENCE');
});

test('a never-dispatched attempt requires unchanged full snapshots and does not fabricate a native delta', () => {
  const state = mutationFixture();
  state.intent.dispatched = false;
  const before = snapshot();
  const result = settleModuleWriteSnapshot({
    ...state, before, snapshot: () => structuredClone(before),
    verify() { throw new Error('must not verify an undispatched native action'); },
  });
  assert.deepEqual(result.after, before);
  assert.equal(Object.hasOwn(result, 'physicalDelta'), false);
  assert.equal(state.mutation.changed, false);
  assert.equal(moduleMutationRecoveryAllowed(state.mutation), false);
});

test('clean browser closure and drained evidence are mandatory even after a verified physical roundtrip', async () => {
  const report = browserGateReport();
  assert.equal(moduleBoundedAcceptance(report, { roundtripComplete: true }).passed, false);
  const order = [];
  const pending = new Set([Promise.resolve()]);
  const shutdown = await closeModuleBrowserEvidence({
    context: { async close() { order.push('context'); } },
    browser: { async close() { order.push('browser'); } },
    pending, errors: report.errors,
  });
  assert.deepEqual(order, ['context', 'browser']);
  assert.deepEqual(shutdown, { contextClosed: true, browserClosed: true, evidenceDrained: true });
  assert.equal(pending.size, 0);
  const gate = moduleBoundedAcceptance(report, { roundtripComplete: true, shutdown });
  assert.equal(gate.passed, true);
  assert.equal(gate.nativeAcceptance, false);
  assert.equal(gate.acceptedForProduction, false);
  assert.equal(Object.hasOwn(report, 'boundedEditorSaveAcceptance'), false, 'The helper cannot promote flags before the caller closes');
});

for (const type of ['console-error', 'pageerror', 'requestfailed']) {
  test(`late ${type} queued during browser close blocks the final bounded pass`, async () => {
    const report = browserGateReport();
    const shutdown = await closeModuleBrowserEvidence({
      context: { async close() {} },
      browser: { async close() {
        setImmediate(() => report.sessions[0].errors.push({ type, message: 'late event' }));
      } },
      errors: report.errors,
    });
    assert.equal(shutdown.evidenceDrained, true);
    assert.equal(report.sessions[0].errors.length, 1);
    assert.equal(moduleBoundedAcceptance(report, { roundtripComplete: true, shutdown }).passed, false);
  });
}

test('asynchronous response parsing remains tracked through close and cannot arrive after a successful gate', async () => {
  const report = browserGateReport();
  const pending = new Set();
  const shutdown = await closeModuleBrowserEvidence({
    context: { async close() {
      pending.add(new Promise(resolve => setImmediate(() => {
        report.sessions[0].errors.push({ type: 'invalid-appdata-json' });
        resolve();
      })));
    } },
    browser: { async close() {} }, pending, errors: report.errors,
  });
  assert.equal(pending.size, 0);
  assert.equal(report.sessions[0].errors[0].type, 'invalid-appdata-json');
  assert.equal(moduleBoundedAcceptance(report, { roundtripComplete: true, shutdown }).passed, false);
});

for (const failing of ['context', 'browser']) {
  test(`${failing} close failure is retained and still attempts both shutdown steps`, async () => {
    const report = browserGateReport();
    const attempted = [];
    const resource = name => ({ async close() {
      attempted.push(name);
      if (name === failing) throw new Error(`${name} close failed`);
    } });
    const shutdown = await closeModuleBrowserEvidence({
      context: resource('context'), browser: resource('browser'), errors: report.errors,
    });
    assert.deepEqual(attempted, ['context', 'browser']);
    assert.equal(shutdown[`${failing}Closed`], false);
    assert.equal(report.errors[0].type, `${failing}-close`);
    assert.equal(moduleBoundedAcceptance(report, { roundtripComplete: true, shutdown }).passed, false);
  });
}

test('rejected pending evidence and an undrainable task both fail closed', async () => {
  for (const kind of ['rejected', 'never-settled']) {
    const report = browserGateReport();
    const task = kind === 'rejected' ? Promise.reject(new Error('response evidence failed')) : new Promise(() => {});
    const shutdown = await closeModuleBrowserEvidence({
      context: { async close() {} }, browser: { async close() {} },
      pending: new Set([task]), errors: report.errors, drainTimeoutMs: 10,
    });
    assert.ok(report.errors.length > 0);
    assert.equal(shutdown.evidenceDrained, kind === 'rejected');
    assert.equal(moduleBoundedAcceptance(report, { roundtripComplete: true, shutdown }).passed, false);
  }
});

test('dispatch marker precedes route continuation and final acceptance follows shutdown plus event draining', () => {
  const source = fs.readFileSync(new URL('./owned-module-editor.browser.mjs', import.meta.url), 'utf8');
  const route = source.slice(source.indexOf("await activeContext.route('**/*'"), source.indexOf('entry.hash ='));
  assert.ok(route.indexOf('markModuleUIDispatch') < route.indexOf('return route.continue()'));
  assert.match(source, /if \(mutation\.pendingDispatch\)[\s\S]+status: 'UNVERIFIED-DISPATCH-RETAIN-FIXTURE'/);
  assert.match(source, /if \(moduleMutationRecoveryAllowed\(mutation\) && recover\)/);
  assert.doesNotMatch(source, /await activeContext\?\.close\(\)\.catch|await browser\?\.close\(\)\.catch/);
  assert.ok(source.indexOf('report.browserShutdown = await closeModuleBrowserEvidence') <
    source.indexOf('report.boundedEditorSaveAcceptance = true'));
});
