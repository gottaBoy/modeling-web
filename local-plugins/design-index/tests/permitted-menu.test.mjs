import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import { consoleDrawerOptions, permittedMenu } from '../src/model.ts';
import * as modelHelpers from '../src/model.ts';

function passingMenu() {
  const raw = {
    id: 'menuitem2',
    hidden: false,
    disabled: false,
  };
  return {
    appMenu: {
      appMenuItems: [raw],
    },
    state: {
      menuItemsState: {
        menuitem2: { visible: true, permitted: true },
      },
    },
    raw,
  };
}

test('permitted menu accepts the declared item through a reactive proxy', () => {
  const menu = passingMenu();
  const proxy = new Proxy(menu.raw, {});
  assert.equal(menu.raw === proxy, false);
  assert.equal(permittedMenu(menu, proxy), true);
  assert.equal(permittedMenu(menu, { ...menu.raw }), true);
});

test('permitted menu keeps the hidden, disabled and unpermitted checks', () => {
  for (const mutation of [
    item => { item.hidden = true; },
    item => { item.disabled = true; },
    item => { item.id = ''; },
  ]) {
    const menu = passingMenu();
    mutation(menu.raw);
    assert.equal(permittedMenu(menu, new Proxy(menu.raw, {})), false);
  }

  for (const state of [
    { visible: false, permitted: true },
    { visible: true, permitted: false },
    { visible: true, permitted: undefined },
    undefined,
  ]) {
    const menu = passingMenu();
    menu.state.menuItemsState.menuitem2 = state;
    assert.equal(permittedMenu(menu, menu.raw), false);
  }
});

test('permitted menu fails closed for missing or ambiguous declarations', () => {
  const missing = passingMenu();
  missing.appMenu.appMenuItems = [];
  assert.equal(permittedMenu(missing, missing.raw), false);

  const duplicate = passingMenu();
  duplicate.appMenu.appMenuItems = [duplicate.raw, { ...duplicate.raw }];
  assert.equal(permittedMenu(duplicate, duplicate.raw), false);
});

test('the exact native 21px footer fits host buttons without mutating source or custom layouts', () => {
  const footer = {
    predefinedType: 'CONTAINER_SCROLL_BOTTOM', height: 21, contentHeight: 21,
    layoutPos: { layout: 'BORDER', layoutPos: 'SOUTH', heightMode: 'PX', height: 21 },
    panelItems: [{ itemType: 'RAWITEM', rawItem: { predefinedType: 'BOTTOM_SIDE_MENU' } }],
  };
  const model = {
    viewType: 'APPINDEXVIEW', controls: modelHelpers.requiredControlNames.map(name => ({ name })),
    viewLayoutPanel: { rootPanelItems: [footer] },
  };
  const before = structuredClone(model);
  const result = modelHelpers.prepareIndexModel(model).viewLayoutPanel.rootPanelItems[0];
  assert.deepEqual([result.height, result.contentHeight, result.layoutPos.height], [50, 50, 50]);
  assert.deepEqual(model, before);
  for (const mutate of [
    item => { item.height = item.contentHeight = item.layoutPos.height = 60; },
    item => { item.layoutPos.heightMode = 'PERCENTAGE'; },
    item => { item.predefinedType = 'OTHER'; },
    item => { item.panelItems = []; },
  ]) {
    const custom = structuredClone(model);
    mutate(custom.viewLayoutPanel.rootPanelItems[0]);
    assert.deepEqual(modelHelpers.prepareIndexModel(custom), custom);
  }
  const ambiguous = structuredClone(model);
  ambiguous.viewLayoutPanel.rootPanelItems.push(structuredClone(footer));
  assert.deepEqual(modelHelpers.prepareIndexModel(ambiguous), ambiguous);
});

test('responsive shell marker applies only to the recognized native layout and preserves source/custom policy', () => {
  const slot = (id, predefinedType, position, rawType, size = {}) => ({
    id, predefinedType, itemType: 'CONTAINER', ...size,
    layout: { layout: 'BORDER' },
    layoutPos: { layout: 'BORDER', layoutPos: position, ...size,
      ...(size.width ? { widthMode: 'PX' } : {}),
      ...(size.height ? { heightMode: 'PX' } : {}) },
    panelItems: [{ id: rawType === 'HEADER' ? 'app_header' : rawType,
      itemType: 'RAWITEM', rawItem: { predefinedType: rawType } }],
  });
  const container = {
    id: 'container_scroll1', predefinedType: 'CONTAINER_SCROLL', itemType: 'CONTAINER',
    layout: { layout: 'BORDER' }, panelItems: [
      slot('container_scroll_main', 'CONTAINER_SCROLL_MAIN', 'CENTER', 'NAV_POS_INDEX'),
      slot('container_scroll_left', 'CONTAINER_SCROLL_LEFT', 'WEST', 'LEFT_SIDE_MENU', { width: 320 }),
      {
        ...slot('container_scroll_header', 'CONTAINER_SCROLL_HEADER', 'NORTH', 'HEADER', { height: 40 }),
        panelItems: [{
          id: 'app_header', itemType: 'CONTAINER', layout: { layout: 'FLEX', dir: 'row' },
          panelItems: ['left', 'right'].map(side => ({
            id: `app_header_${side}`, itemType: 'CONTAINER',
            layout: { layout: 'FLEX', dir: 'row' }, layoutPos: { layout: 'FLEX', heightMode: 'FULL' },
          })),
        }],
      },
    ],
  };
  const model = {
    viewType: 'APPINDEXVIEW',
    controls: modelHelpers.requiredControlNames.map(name => ({ name, appMenuItems: [] })),
    viewLayoutPanel: { rootPanelItems: [container] },
  };
  const before = structuredClone(model);
  const prepared = modelHelpers.prepareIndexModel(model);
  assert.deepEqual(prepared.viewLayoutPanel.rootPanelItems[0].sysCss, { cssName: 'aibiz-design-shell' });
  delete prepared.viewLayoutPanel.rootPanelItems[0].sysCss;
  assert.deepEqual(prepared, model);
  assert.deepEqual(model, before);
  for (const mutate of [
    item => { item.sysCss = { cssName: 'user-layout' }; },
    item => { item.id = 'other-scroll'; },
    item => { item.panelItems[1].width = 240; },
    item => { item.panelItems[1].layoutPos.width = 240; },
    item => { item.panelItems[2].height = 60; },
    item => { item.panelItems[2].layoutPos.height = 60; },
    item => { item.panelItems[0].id = 'custom-center'; },
    item => { item.panelItems[2].panelItems[0].layout.dir = 'column'; },
    item => { item.panelItems[1].layoutPos.widthMode = 'PERCENTAGE'; },
    item => { item.panelItems[2].layoutPos.heightMode = 'FULL'; },
    item => { item.panelItems[0].layout.layout = 'FLEX'; },
    item => { item.panelItems[1].sysCss = { cssName: 'custom-left' }; },
    item => { item.panelItems[2].panelItems[0].sysCss = { cssName: 'custom-header' }; },
    item => { item.panelItems[2].panelItems[0].panelItems.reverse(); },
    item => { item.panelItems[2].panelItems[0].panelItems[0].layoutPos.heightMode = 'PX'; },
    item => { item.panelItems.push(slot('custom-right', 'CONTAINER_SCROLL_RIGHT', 'EAST', 'RIGHT_SIDE_MENU', { width: 240 })); },
    item => { item.panelItems.push(structuredClone(item.panelItems[2])); },
    item => { item.panelItems[0].panelItems = []; },
    ...['WEST', 'CENTER', 'NORTH', 'EAST', 'SOUTH'].map(position => item => {
      const duplicate = slot(`custom-${position}`, 'CUSTOM', position, 'CUSTOM');
      item.panelItems.push(duplicate);
      if (position === 'EAST' || position === 'SOUTH') item.panelItems.push(structuredClone(duplicate));
    }),
  ]) {
    const custom = structuredClone(model);
    mutate(custom.viewLayoutPanel.rootPanelItems[0]);
    assert.deepEqual(modelHelpers.prepareIndexModel(custom), custom);
  }
});

test('authoritative ModelingIndex DSL receives the mobile marker without changing stored metadata', async () => {
  const require = createRequire(new URL('../../../app/package.json', import.meta.url));
  const ts = require('typescript');
  const { DSLHelper } = await import(require.resolve('@ibiz/rt-model-api'));
  const source = JSON.parse(readFileSync(new URL(
    '../../../../vendor-upstream/ibizmodeling-standard/modelapi-core/src/main/resources/model/net/ibizsys/modeling/PSSYSAPPS/ModelDesign/PSAPPINDEXVIEWS/ModelingIndex.json',
    import.meta.url,
  ), 'utf8'));
  const original = JSON.stringify(source);
  const loaderSource = readFileSync(new URL(
    '../../../packages-latest/@ibiz-template/model-helper/src/model-util.ts', import.meta.url), 'utf8');
  const parsed = ts.createSourceFile('model-util.ts', loaderSource, ts.ScriptTarget.Latest, true);
  const loader = parsed.statements.find(item => ts.isClassDeclaration(item) && item.name?.text === 'ModelUtil');
  const fill = loader.members.find(item => item.name?.getText(parsed) === 'deepFillModel');
  assert.ok(fill);
  const exports = {};
  runInNewContext(ts.transpileModule(`class Loader {
    appId = 'ibizmodeling__modeldesign';
    ${fill.getText(parsed)}
  } exports.Loader = Loader;`, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, { exports, ModelTransformer: { getInstance: () => ({ transform: (_path, model) => model }) } });
  const model = new DSLHelper().appView(new exports.Loader().deepFillModel(structuredClone(source)));
  const before = JSON.stringify(model);
  const prepared = modelHelpers.prepareIndexModel(model);
  const shell = prepared.viewLayoutPanel.rootPanelItems.find(item => item.id === 'container_scroll1');
  assert.deepEqual(shell.sysCss, { cssName: 'aibiz-design-shell' });
  assert.equal(JSON.stringify(model), before);
  assert.equal(JSON.stringify(source), original);
  const header = model.viewLayoutPanel.rootPanelItems[0].panelItems
    .find(item => item.id === 'container_scroll_header').panelItems[0];
  assert.equal(header.panelItems[0].sysCss.appId, model.appId);
  const custom = structuredClone(model);
  custom.viewLayoutPanel.rootPanelItems[0].panelItems
    .find(item => item.id === 'container_scroll_header').panelItems[0].panelItems[0].sysCss.appId = 'foreign__app';
  assert.equal(modelHelpers.prepareIndexModel(custom).viewLayoutPanel.rootPanelItems[0].sysCss, undefined);
});

test('only the console bottom drawer receives bounded and normally closable defaults', () => {
  const appFunc = { appFuncType: 'APPVIEW', appViewId: 'modeldesign.PSSysDevBKTaskTabExpView' };
  const config = { id: appFunc.appViewId, openMode: 'DRAWER_BOTTOM' };
  assert.deepEqual(consoleDrawerOptions(appFunc, config, '控制台'), {
    height: 45, withHeader: true, showClose: true, title: '控制台', closeOnPressEscape: true,
    class: 'ibiz-drawer aibiz-console-drawer',
  });
  assert.deepEqual(consoleDrawerOptions(appFunc, {
    ...config, height: 60,
    modalOption: { withHeader: false, showClose: false, title: 'User title', closeOnPressEscape: false },
  }, 'Console'), {
    height: 60, withHeader: false, showClose: false, title: 'User title', closeOnPressEscape: false,
    class: 'ibiz-drawer aibiz-console-drawer',
  }, 'Explicit target-model sizing and modal settings remain authoritative');
  const custom = consoleDrawerOptions(appFunc, {
    ...config, height: 60, modalOption: { height: 70, class: 'user-drawer' },
  }, 'Console');
  assert.equal(custom.height, 70);
  assert.equal(custom.class, 'user-drawer');
  assert.equal(consoleDrawerOptions({ ...appFunc, appFuncType: 'JAVASCRIPT' }, config, 'Console'), undefined);
  assert.equal(consoleDrawerOptions(appFunc, { ...config, openMode: 'DRAWER_RIGHT' }, 'Console'), undefined);
  assert.equal(consoleDrawerOptions(appFunc, { ...config, id: 'unrelated' }, 'Console'), undefined);
  assert.equal(consoleDrawerOptions({ ...appFunc, appViewId: 'modeldesign.other' }, config, 'Console'), undefined);
});

function delayedConsoleFixture(phase, hostWindow) {
  const require = createRequire(new URL('../../../app/package.json', import.meta.url));
  const ts = require('typescript');
  const source = readFileSync(new URL('../src/controller.ts', import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, {
    fileName: 'controller.ts', reportDiagnostics: true,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  assert.equal(compiled.diagnostics.length, 0);
  let release;
  let entered;
  const gate = new Promise(done => { release = done; });
  const started = new Promise(done => { entered = done; });
  const records = { appReads: 0, viewReads: 0, dispatches: [], fallbackCalls: 0 };
  const app = { getAppFunc: () => ({
    appFuncType: 'APPVIEW', appViewId: 'modeldesign.pssysdevbktasktabexpview',
  }) };
  const config = { id: 'modeldesign.pssysdevbktasktabexpview', openMode: 'DRAWER_BOTTOM' };
  const runtime = {
    env: { appId: 'ibizmodeling__modeldesign' },
    hub: {
      async getApp() {
        records.appReads += 1;
        if (phase === 'app') { entered(); await gate; }
        return app;
      },
      config: { view: { async get() {
        records.viewReads += 1;
        if (phase === 'view') { entered(); await gate; }
        return config;
      } } },
    },
    commands: { async execute(...args) { records.dispatches.push(args); } },
  };
  class HostViewController {
    constructor(model, context, params, ctx) {
      Object.assign(this, { model, context, params, ctx });
    }
    async onDestroyed() {}
  }
  const host = { ViewController: HostViewController, AppFuncCommand: { TAG: 'ibiz.app-func.exec' } };
  const exports = {};
  runInNewContext(compiled.outputText, {
    exports, ibiz: runtime, window: hostWindow,
    require(id) {
      if (id === '@ibiz-template/runtime') return host;
      if (id === './model') return modelHelpers;
      throw new Error(`Unspecified source-test boundary ${id}`);
    },
  }, { filename: 'design-index-controller-source-test.js' });
  const context = { srfappid: 'ibizmodeling__modeldesign', clone() { return { ...this }; } };
  const controls = modelHelpers.requiredControlNames.map(name => ({
    name, id: name, appMenuItems: [],
  }));
  const controller = new exports.DesignIndexController({
    viewType: 'APPINDEXVIEW', viewLayoutPanel: { controls, rootPanelItems: [] },
  }, context, {}, {});
  const item = { id: 'terminal', appFuncId: 'console-function', caption: 'Console' };
  const menu = {
    context, params: {}, itemProviders: {},
    appMenu: { name: 'bottomsidemenu', appMenuItems: [item] },
    state: { menuItemsState: { terminal: { visible: true, permitted: true } } },
  };
  const click = () => controller.clickMenu(menu, item, {}, true, () => {
    records.fallbackCalls += 1;
  });
  return { controller, item, menu, records, click, started, release, config, app };
}

test('embedded console defers only automatic opening, preserving the model and authorized manual command', async () => {
  const fixture = delayedConsoleFixture('none', { self: {}, top: {} });
  fixture.item.openDefault = true;
  fixture.menu.handleClickMenuItem = fixture.click;
  fixture.controller.layoutPanel = { panelItems: {} };
  const before = structuredClone(fixture.menu.appMenu);
  assert.equal(await fixture.controller.openDefault(fixture.menu, fixture.item), 'deferred-embedded-console');
  assert.deepEqual(fixture.menu.appMenu, before);
  assert.deepEqual(fixture.records.dispatches, []);
  await fixture.click();
  assert.equal(fixture.records.dispatches.length, 1);
  assert.equal(fixture.records.dispatches[0][4].modalOption.showClose, true);
});

test('direct and windowless hosts preserve console defaults; unrelated targets are never deferred', async () => {
  const window = {};
  window.self = window.top = window;
  for (const hostWindow of [window, undefined]) {
    const fixture = delayedConsoleFixture('none', hostWindow);
    fixture.menu.handleClickMenuItem = fixture.click;
    fixture.controller.layoutPanel = { panelItems: {} };
    await fixture.controller.openDefault(fixture.menu, fixture.item);
    assert.equal(fixture.records.dispatches.length, 1);
  }
  for (const mutate of [
    fixture => { fixture.menu.appMenu.name = 'leftsidemenu'; },
    fixture => { fixture.item.id = 'other'; },
    fixture => { fixture.config.openMode = 'DRAWER_RIGHT'; },
    fixture => { fixture.app.getAppFunc = () => ({ appFuncType: 'APPVIEW', appViewId: 'modeldesign.other' }); },
  ]) {
    const fixture = delayedConsoleFixture('none', { self: {}, top: {} });
    mutate(fixture);
    fixture.menu.handleClickMenuItem = () => 'original-default';
    fixture.controller.layoutPanel = { panelItems: {} };
    assert.equal(await fixture.controller.openDefault(fixture.menu, fixture.item), 'original-default');
  }
});

test('source controller rechecks authorization after delayed app/config reads before any dispatch', async () => {
  for (const phase of ['app', 'view']) {
    for (const revoke of [
      fixture => { fixture.menu.state.menuItemsState.terminal.permitted = false; },
      fixture => { fixture.menu.state.menuItemsState.terminal.visible = false; },
      fixture => { fixture.item.disabled = true; },
      fixture => { fixture.item.hidden = true; },
    ]) {
      const fixture = delayedConsoleFixture(phase);
      const pending = fixture.click();
      await fixture.started;
      revoke(fixture);
      fixture.release();
      await assert.rejects(pending, /Index menu is hidden, disabled or not permitted/);
      assert.equal(fixture.records.dispatches.length, 0);
      assert.equal(fixture.records.fallbackCalls, 0);
      if (phase === 'app') assert.equal(fixture.records.viewReads, 0,
        'Revocation during app read prevents starting the view read');
    }
  }
});

test('source controller cannot dispatch after disposal during either lookup or queued revocation', async () => {
  for (const phase of ['app', 'view']) {
    const fixture = delayedConsoleFixture(phase);
    const pending = fixture.click();
    await fixture.started;
    await fixture.controller.onDestroyed();
    fixture.release();
    await assert.rejects(pending, /Design index is destroyed/);
    assert.equal(fixture.records.dispatches.length, 0);
    assert.equal(fixture.records.fallbackCalls, 0);
    if (phase === 'app') assert.equal(fixture.records.viewReads, 0);
  }
  const queued = delayedConsoleFixture('app');
  const pending = queued.click();
  queued.menu.state.menuItemsState.terminal.permitted = false;
  await assert.rejects(pending, /Index menu is hidden, disabled or not permitted/);
  assert.equal(queued.records.appReads, 0);
  assert.equal(queued.records.dispatches.length, 0);
});
