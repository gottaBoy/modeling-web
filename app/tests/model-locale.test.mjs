import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';
import { DSLHelper } from '@ibiz/rt-model-api';

const source = readFileSync(
  new URL('../src/locale/model-locale.ts', import.meta.url),
  'utf8',
);
const english = JSON.parse(
  readFileSync(new URL('../src/locale/en.json', import.meta.url)),
);
const reviewedCodeLists = JSON.parse(
  readFileSync(new URL('../src/locale/code-list-labels.json', import.meta.url)),
);
const exports = {};
vm.runInNewContext(
  ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  }).outputText,
  { exports, require: id => id.endsWith('/code-list-labels.json') ? reviewedCodeLists : english },
);
const plain = value => JSON.parse(JSON.stringify(value));
const modelRoot = new URL(
  '../../../vendor-upstream/ibizmodeling-standard/modelapi-core/src/main/resources/model/net/ibizsys/modeling/PSSYSAPPS/ModelDesign/',
  import.meta.url,
);
const readModel = path => JSON.parse(readFileSync(new URL(path, modelRoot)));
const walk = value =>
  value && typeof value === 'object'
    ? [value, ...Object.values(value).flatMap(walk)]
    : [];
const dsl = new DSLHelper();
const reviewedViews = [
  'PSSystemDashboardView',
  'PSDataEntityDashboardView',
  'PSSysAppOverViewDashboardView',
  'PSModuleQuickCfgView',
  'PSSystemDevTreeExpView',
];

function scopedCodeLists() {
  const ids = new Set(reviewedViews.flatMap(name => walk(
    dsl.appView(readModel(`PSAPPDEVIEWS/${name}.json`)),
  ).filter(item => typeof item.appCodeListId === 'string')
    .map(item => item.appCodeListId)));
  const definitions = readModel('PSSYSAPP.json').getAllPSAppCodeLists;
  return [...ids].map(id => {
    const suffix = id.split('.').at(-1);
    const matches = definitions.filter(item => item.codeName?.toLowerCase() === suffix);
    assert.equal(matches.length, 1, `${id} resolves to exactly one authoritative application code list`);
    return readModel(`PSAPPCODELISTS/${matches[0].codeName}.json`);
  });
}

test('reviewed code-list value/label pairs match authoritative metadata without admitting custom entries', () => {
  for (const [name, reviewed] of Object.entries(reviewedCodeLists)) {
    const model = readModel(`PSAPPCODELISTS/${name}.json`);
    assert.equal(model.codeListType, 'STATIC');
    assert.equal(model.codeName, name);
    assert.equal(model.emptyText, reviewed.emptyText);
    assert.deepEqual(Object.fromEntries(model.getPSCodeItems.map(item => [item.value, item.text])),
      reviewed.items);
    assert.ok(model.getPSCodeItems.every(item => !item.tooltip && !item.getPSCodeItems));
  }
});

test('the reviewed registry contains exactly static code lists referenced by the five owned view contracts', () => {
  const scoped = scopedCodeLists();
  const staticNames = scoped.filter(item => item.codeListType === 'STATIC').map(item => item.codeName);
  const dynamicNames = scoped.filter(item => item.codeListType === 'DYNAMIC').map(item => item.codeName);
  assert.deepEqual(
    Object.keys(reviewedCodeLists).sort(),
    staticNames.sort(),
    'No unreviewed list becomes translatable merely because its text matches a dictionary label',
  );
  assert.deepEqual(dynamicNames.sort(), ['Config__DEViewType', 'SysOperator']);
  for (const model of scoped.filter(item => item.codeListType === 'STATIC')) {
    for (const label of [model.emptyText, ...model.getPSCodeItems.map(item => item.text)]
      .filter(value => typeof value === 'string')) {
      const translated = english[label] ?? label;
      if (/[\u4e00-\u9fff]/.test(label)) {
        assert.ok(Object.hasOwn(english, label), `${model.codeName}: ${label} has a reviewed translation`);
      }
      assert.match(translated, /^[\x20-\x7e]+$/, `${model.codeName}: ${label} has readable English display text`);
    }
  }
});

function codeListServiceClass(runtime) {
  const path = new URL(
    '../../packages-latest/@ibiz-template/runtime/src/service/service/code-list/code-list.service.ts',
    import.meta.url,
  );
  const source = readFileSync(path, 'utf8');
  const parsed = ts.createSourceFile(path.pathname, source, ts.ScriptTarget.Latest, true);
  const declaration = parsed.statements.find(
    item => ts.isClassDeclaration(item) && item.name?.text === 'CodeListService',
  );
  assert.ok(declaration);
  const serviceExports = {};
  vm.runInNewContext(
    ts.transpileModule(
      `${declaration.getText(parsed)}\nexports.CodeListService = CodeListService;`,
      { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } },
    ).outputText,
    { exports: serviceExports, RuntimeError: Error, ibiz: runtime,
      isNumber: value => typeof value === 'number' },
  );
  return serviceExports.CodeListService;
}

test('native locale adapter translates only display metadata and never mutates source or user data', () => {
  const model = {
    caption: '实体导航',
    id: '实体',
    name: '实体',
    scriptCode: 'return "实体";',
    appDEFields: [{ id: 'name', logicName: '名称' }],
    appDELogics: [{ logicName: '名称' }],
    realTitle: '系统模块编辑视图',
    data: { caption: '名称', text: '是', children: [{ title: '系统' }] },
    userData: { text: '否' },
    editorParams: { placeholder: '名称' },
    controlParams: { title: '系统' },
    viewParamJO: { caption: '名称' },
    parentDataJO: { text: '是' },
    rawContent: '保存并关闭',
    value: '是',
    title: 'Customer-defined model title',
  };
  const translated = exports.localizeModel(model);
  assert.equal(translated.caption, 'Entity Navigation');
  assert.equal(translated.id, '实体');
  assert.equal(translated.name, '实体');
  assert.equal(translated.scriptCode, model.scriptCode);
  assert.equal(translated.appDEFields[0].logicName, 'Name');
  assert.equal(translated.appDELogics[0].logicName, '名称');
  assert.equal(translated.realTitle, 'System Module Editor');
  for (const key of [
    'data',
    'userData',
    'editorParams',
    'controlParams',
    'viewParamJO',
    'parentDataJO',
  ]) {
    assert.equal(
      translated[key],
      model[key],
      `${key} remains an opaque payload`,
    );
  }
  assert.equal(translated.rawContent, model.rawContent);
  assert.equal(translated.value, model.value);
  assert.equal(exports.translateModelLabel('保存并关闭'), 'Save and Close');
  assert.equal(exports.translateModelLabel('系统总览'), 'System Overview');
  assert.equal(model.caption, '实体导航');
  for (const key of ['constructor', '__proto__', 'toString']) {
    assert.equal(exports.translateModelLabel(key), key);
  }
});

test('registered model providers retain receiver, arguments, errors and non-modeling applications', async () => {
  let language = 'en';
  let registered;
  const layout = { caption: '取消' };
  const host = {
    env: { appId: 'ibizmodeling__modeldesign' },
    i18n: { getLang: () => language },
    hub: {
      registerModelLoaderProvider(provider) {
        registered = provider;
      },
      getApp() {
        return { codeList: undefined };
      },
    },
    util: {
      layoutPanel: { fill: model => ({ ...model, viewLayoutPanel: layout }) },
    },
  };
  exports.installModelLocale(host);
  const wrapped = host.hub.registerModelLoaderProvider;
  exports.installModelLocale(host);
  assert.equal(wrapped, host.hub.registerModelLoaderProvider);
  const provider = {
    sentinel: 'actual provider',
    async getAppView(...args) {
      assert.equal(this, provider);
      assert.equal(args[1], 'view');
      return { caption: '实体导航' };
    },
    async getAppDataEntity() {
      throw new Error('Permission denied');
    },
    async initApp() {
      assert.equal(this, provider);
      return this.sentinel;
    },
  };
  host.hub.registerModelLoaderProvider(provider);
  assert.equal(
    (await registered.getAppView('ibizmodeling__modeldesign', 'view')).caption,
    'Entity Navigation',
  );
  assert.equal(
    (await registered.getAppView('other__app', 'view')).caption,
    '实体导航',
  );
  assert.equal(await registered.initApp(), provider.sentinel);
  await assert.rejects(
    registered.getAppDataEntity('ibizmodeling__modeldesign'),
    /Permission denied/,
  );
  const filled = host.util.layoutPanel.fill({ appId: host.env.appId });
  assert.equal(filled.viewLayoutPanel.caption, 'Cancel');
  assert.equal(layout.caption, '取消');
  language = 'zh-CN';
  assert.equal(
    (await registered.getAppView('ibizmodeling__modeldesign', 'view')).caption,
    '实体导航',
  );
});

test('only reviewed static code-list labels translate without changing dynamic data or unknown lists', async () => {
  let language = 'en';
  let registered;
  const item = {
    text: '是',
    value: '1',
    id: 'yes',
    data: { caption: '是' },
    tooltip: '名称',
    children: [
      { text: '否', value: '0', userData: { text: '否' } },
      { text: '是', value: 'custom', data: { text: '是' } },
      { text: '名称', value: '1' },
    ],
  };
  let metadata;
  const codeList = {
    setCodeList(model) {
      assert.equal(this, codeList);
      metadata = model;
    },
    getCodeList(tag) {
      assert.equal(this, codeList);
      return metadata;
    },
    async get() {
      assert.equal(this, codeList);
      return [item];
    },
    async getItem() {
      assert.equal(this, codeList);
      return item;
    },
  };
  const host = {
    env: { appId: 'ibizmodeling__modeldesign' },
    i18n: { getLang: () => language },
    hub: {
      registerModelLoaderProvider(provider) {
        registered = provider;
      },
      getApp() {
        return { codeList };
      },
    },
    util: { layoutPanel: { fill: model => model } },
  };
  exports.installModelLocale(host);
  const provider = {
    async initApp() {
      codeList.setCodeList({
        id: 'Config__YesNo',
        codeName: 'Config__YesNo',
        codeListType: 'STATIC',
        emptyText: '未定义',
        codeItems: [
          { text: '是', value: '1', id: 'yes', data: { caption: '是' } },
          { text: '是', value: 'custom' },
          { text: '名称', value: '0', tooltip: '否' },
        ],
      });
      return true;
    },
  };
  host.hub.registerModelLoaderProvider(provider);
  await registered.initApp('ibizmodeling__modeldesign');
  const get = codeList.get;
  await registered.initApp('ibizmodeling__modeldesign');
  assert.equal(codeList.get, get, 'Repeated init must not stack adapters');
  const translated = (await codeList.get('Config__YesNo', {}))[0];
  assert.equal(translated.text, 'Yes');
  assert.equal(translated.children[0].text, 'No');
  assert.equal(translated.children[1].text, '是', 'custom values are not display vocabulary');
  assert.equal(translated.children[2].text, '名称', 'custom labels on reviewed values are preserved');
  assert.equal(translated.tooltip, '名称', 'unreviewed tooltip remains user content');
  assert.equal(translated.value, item.value);
  assert.equal(translated.id, item.id);
  assert.equal(translated.data, item.data);
  assert.equal(translated.children[0].userData, item.children[0].userData);
  assert.equal((await codeList.getItem('Config__YesNo', '1', {})).text, 'Yes');
  const model = codeList.getCodeList('Config__YesNo');
  assert.equal(model.emptyText, 'Not Defined');
  assert.equal(model.codeItems[0].text, 'Yes');
  assert.equal(model.codeItems[0].value, '1');
  assert.equal(model.codeItems[0].data.caption, '是');
  assert.equal(model.codeItems[1].text, '是');
  assert.equal(model.codeItems[2].text, '名称');
  assert.equal(model.codeItems[2].tooltip, '否');
  language = 'zh-CN';
  assert.equal((await codeList.get('Config__YesNo', {}))[0], item);
  assert.equal(await codeList.getItem('Config__YesNo', '1', {}), item);
  assert.equal(codeList.getCodeList('Config__YesNo').emptyText, '未定义');
  language = 'EN_US';
  assert.equal((await codeList.get('Config__YesNo', {}))[0].text, 'Yes');
  metadata.codeListType = 'DYNAMIC';
  assert.equal((await codeList.get('Config__YesNo', {}))[0], item);
  assert.equal(await codeList.getItem('Config__YesNo', '1', {}), item);
  metadata.codeListType = 'STATIC';
  metadata.codeName = 'CustomUserList';
  assert.equal((await codeList.get('CustomUserList', {}))[0], item);
  assert.equal(await codeList.getItem('CustomUserList', '1', {}), item);
});

test('actual overview and module QuickCfg DSL localize all static display labels without source mutation', async () => {
  let language = 'en-US';
  let registered;
  const originals = new Map([
    [
      'overview',
      dsl.appView(readModel('PSAPPDEVIEWS/PSSystemDashboardView.json')),
    ],
    [
      'module',
      dsl.appView(readModel('PSAPPDEVIEWS/PSModuleQuickCfgView.json')),
    ],
  ]);
  const before = plain([...originals]);
  const host = {
    env: { appId: 'ibizmodeling__modeldesign' },
    i18n: { getLang: () => language },
    hub: {
      registerModelLoaderProvider(provider) {
        registered = provider;
      },
    },
    util: { layoutPanel: { fill: model => model } },
  };
  exports.installModelLocale(host);
  host.hub.registerModelLoaderProvider({
    async getAppView(appId, view) {
      return originals.get(view);
    },
    async loadAppView(appId, view) {
      return originals.get(view);
    },
  });
  for (const name of originals.keys()) {
    const localized = await registered.getAppView(host.env.appId, name);
    const untranslated = walk(localized).flatMap(item =>
      Object.entries(item).filter(
        ([key, value]) =>
          [
            'caption',
            'text',
            'title',
            'tooltip',
            'emptyText',
            'ruleInfo',
            'realTitle',
          ].includes(key) &&
          typeof value === 'string' &&
          /[\u4e00-\u9fff]/.test(value),
      ),
    );
    assert.deepEqual(
      untranslated,
      [],
      `${name} contains an untranslated static display label`,
    );
    assert.equal(localized.id, originals.get(name).id);
    assert.equal(localized.name, originals.get(name).name);
    assert.equal(
      localized.appDataEntityId,
      originals.get(name).appDataEntityId,
    );
    assert.deepEqual(
      plain(await registered.loadAppView(host.env.appId, name)),
      plain(localized),
    );
    language = 'zh-CN';
    assert.equal(
      await registered.getAppView(host.env.appId, name),
      originals.get(name),
    );
    language = 'en-US';
  }
  const module = await registered.getAppView(host.env.appId, 'module');
  const toolbar = module.controls.find(control => control.name === 'toolbar');
  assert.equal(
    toolbar.detoolbarItems.find(item =>
      item.uiactionId?.includes('saveandexit'),
    ).caption,
    'Save and Close',
  );
  assert.deepEqual(plain([...originals]), before);
});

test('actual code-list service cache remains Chinese while the adapter follows language changes', async () => {
  const CodeListService = codeListServiceClass({
    env: { appId: 'different__app' }, i18n: { t: key => key },
  });
  let language = 'en';
  let registered;
  const codeList = new CodeListService({
    appId: 'ibizmodeling__modeldesign',
  });
  const original = dsl.appCodeList(
    readModel('PSAPPCODELISTS/AppStudio__CodeNameMode.json'),
  );
  const host = {
    env: { appId: 'ibizmodeling__modeldesign' },
    i18n: { getLang: () => language },
    hub: {
      registerModelLoaderProvider(provider) {
        registered = provider;
      },
      getApp: () => ({ codeList }),
    },
    util: { layoutPanel: { fill: model => model } },
  };
  exports.installModelLocale(host);
  host.hub.registerModelLoaderProvider({
    async initApp() {
      codeList.setCodeList(original);
      return true;
    },
  });
  await registered.initApp(host.env.appId);
  const englishItems = await codeList.get(original.id, {});
  assert.equal(englishItems[0].text, 'Lowercase (underscore-separated)');
  assert.equal(
    (await codeList.getItem(original.id, 'LOWER_CAMEL', {})).text,
    'Camel case (lower initial)',
  );
  assert.equal(englishItems[0].value, 'LOWER_UNDERSCORE');
  assert.equal(original.codeItems[0].text, '小写（下划线分隔）');
  language = 'zh-CN';
  const chineseItems = await codeList.get(original.id, {});
  assert.equal(chineseItems[0].text, '小写（下划线分隔）');
  assert.equal(chineseItems[0].value, 'LOWER_UNDERSCORE');
  assert.equal(codeList.getCodeList(original.id), original);
  assert.equal(
    (await codeList.getItem(original.id, 'LOWER_CAMEL', {})).text,
    '驼峰（首字母小写）',
  );
  await assert.rejects(
    codeList.get('missing', {}),
    /runtime.service.noFindCodeList/,
  );
});

test('main-app label checks do not introduce sub-app merges or change native cache behavior', async () => {
  const appId = 'ibizmodeling__modeldesign';
  for (const mergeBeforeRead of [false, true]) {
    let merges = 0;
    const CodeListService = codeListServiceClass({
      env: { appId }, i18n: { t: key => key },
      hub: { mergeSubAppCodeList(model) {
        merges++;
        model.codeItems.push({ codeName: 'sub', text: '否', value: '0' });
      } },
    });
    const codeList = new CodeListService({ appId });
    const original = {
      id: 'reviewed-id', codeName: 'Config__YesNo', codeListTag: 'reviewed-tag',
      codeListType: 'STATIC', codeItems: [{ codeName: 'yes', text: '是', value: '1' }],
    };
    let language = 'en-US';
    let registered;
    const provider = { async initApp() { codeList.setCodeList(original); return true; } };
    const host = {
      env: { appId }, i18n: { getLang: () => language },
      hub: {
        getApp: () => ({ codeList }),
        registerModelLoaderProvider(value) { registered = value; },
      },
      util: { layoutPanel: { fill: model => model } },
    };
    exports.installModelLocale(host);
    host.hub.registerModelLoaderProvider(provider);
    await registered.initApp(appId);
    assert.equal(merges, 0);
    if (mergeBeforeRead) {
      assert.equal(codeList.getCodeList(original.id).codeItems[1].text, 'No');
      assert.equal(merges, 1);
    }
    const items = await codeList.get(original.id, {});
    assert.deepEqual(Array.from(items, item => item.text),
      mergeBeforeRead ? ['Yes', 'No'] : ['Yes']);
    assert.equal(merges, mergeBeforeRead ? 1 : 0, 'get must not introduce a merge');
    assert.equal(original.codeItems.length, mergeBeforeRead ? 2 : 1);
    codeList.getCodeList(original.id);
    assert.equal(merges, 1, 'native getCodeList still performs exactly one merge');
    const cached = await codeList.get(original.id, {});
    assert.equal(cached.length, mergeBeforeRead ? 2 : 1, 'native cache timing is unchanged');
    language = 'zh-CN';
    assert.equal((await codeList.get(original.id, {}))[0].text, '是');
    assert.equal(codeList.getCodeList(original.id), original);
    language = 'en-US';
    assert.equal((await codeList.get(original.id, {}))[0].text, 'Yes');
    assert.equal(original.codeItems[0].text, '是');
  }
});

test('all 396 authoritative object-type value/text pairs have explicit English display labels', () => {
  const authority = readModel('PSAPPCODELISTS/Config__PSObjType.json');
  const application = readModel('PSSYSAPP.json');
  const embedded = application.getAllPSAppCodeLists.filter(
    item => item.codeName === 'Config__PSObjType',
  );
  const reviewed = reviewedCodeLists.Config__PSObjType;
  assert.equal(authority.codeListType, 'STATIC');
  assert.equal(authority.getPSCodeItems.length, 396);
  assert.equal(new Set(authority.getPSCodeItems.map(item => item.value)).size, 396);
  assert.equal(new Set(authority.getPSCodeItems.map(item => item.text)).size, 396);
  assert.equal(embedded.length, 1);
  assert.deepEqual(embedded[0].getPSCodeItems, authority.getPSCodeItems);
  assert.deepEqual(
    reviewed.items,
    Object.fromEntries(authority.getPSCodeItems.map(item => [item.value, item.text])),
  );
  for (const item of authority.getPSCodeItems) {
    assert.ok(Object.hasOwn(english, item.text), `Missing exact English label for ${item.value}`);
    assert.match(english[item.text], /^[\x20-\x7e]+$/, `${item.value} must have a nonempty English label`);
    assert.notEqual(english[item.text], item.text);
  }
  assert.equal(reviewed.emptyText, authority.emptyText);
  assert.equal(english[reviewed.emptyText], 'Not Defined');
});

test('actual object-type service localizes every cached value and preserves source data through language switches', async () => {
  const appId = 'ibizmodeling__modeldesign';
  const CodeListService = codeListServiceClass({
    env: { appId: 'different__app' }, i18n: { t: key => key },
  });
  const original = dsl.appCodeList(readModel('PSAPPCODELISTS/Config__PSObjType.json'));
  const before = plain(original);
  const codeList = new CodeListService({ appId });
  let language = 'en-US';
  let registered;
  const host = {
    env: { appId }, i18n: { getLang: () => language },
    hub: {
      getApp: () => ({ codeList }),
      registerModelLoaderProvider(provider) { registered = provider; },
    },
    util: { layoutPanel: { fill: model => model } },
  };
  exports.installModelLocale(host);
  const provider = {
    async initApp(id) {
      assert.equal(this, provider);
      assert.equal(id, appId);
      codeList.setCodeList(original);
      return true;
    },
  };
  host.hub.registerModelLoaderProvider(provider);
  await registered.initApp(appId);
  const metadata = codeList.getCodeList(original.id);
  const translated = await codeList.get(original.id, {});
  assert.equal(metadata.emptyText, 'Not Defined');
  assert.equal(metadata.name, original.name);
  assert.equal(translated.length, 396);
  for (const [index, item] of original.codeItems.entries()) {
    assert.equal(translated[index].value, item.value);
    assert.equal(translated[index].id, item.codeName);
    assert.equal(translated[index].text, english[item.text], item.value);
    assert.equal(metadata.codeItems[index].text, english[item.text], item.value);
    assert.deepEqual(
      plain({ ...metadata.codeItems[index], text: item.text }),
      plain(item),
      `${item.value} changes no non-label metadata`,
    );
    const found = await codeList.getItem(original.id, item.value, {});
    assert.equal(found.text, english[item.text], item.value);
    assert.equal(found.value, item.value);
  }
  assert.equal(await codeList.getItem(original.id, 'UNKNOWN_OBJECT_TYPE', {}), undefined);
  await assert.rejects(codeList.get('unknown-code-list', {}), /runtime.service.noFindCodeList/);
  language = 'zh-CN';
  const chinese = await codeList.get(original.id, {});
  assert.equal(codeList.getCodeList(original.id), original);
  for (const [index, item] of original.codeItems.entries()) {
    assert.equal(chinese[index].text, item.text);
    assert.equal((await codeList.getItem(original.id, item.value, {})).text, item.text);
  }
  assert.equal(await codeList.get(original.id, {}), chinese, 'The native Chinese static cache is unchanged');
  language = 'EN_gb';
  assert.equal((await codeList.get(original.id, {}))[0].text, english[original.codeItems[0].text]);
  assert.deepEqual(plain(original), before, 'English rendering never mutates registered Chinese metadata');
});

test('all scoped static code lists use actual native caches and preserve values through English/Chinese switches', async () => {
  const appId = 'ibizmodeling__modeldesign';
  const CodeListService = codeListServiceClass({
    env: { appId: 'different__app' }, i18n: { t: (key, fallback) => fallback ?? key },
  });
  const codeList = new CodeListService({ appId });
  const originals = scopedCodeLists().filter(item => item.codeListType === 'STATIC')
    .map(model => dsl.appCodeList(model));
  const before = plain(originals);
  let language = 'en';
  let registered;
  const host = {
    env: { appId }, i18n: { getLang: () => language },
    hub: {
      getApp: () => ({ codeList }),
      registerModelLoaderProvider(provider) { registered = provider; },
    },
    util: { layoutPanel: { fill: model => model } },
  };
  exports.installModelLocale(host);
  host.hub.registerModelLoaderProvider({
    async initApp(id) {
      assert.equal(id, appId);
      originals.forEach(model => codeList.setCodeList(model));
      return true;
    },
  });
  await registered.initApp(appId);
  const chineseCache = new Map();
  for (const original of originals) {
    const result = await codeList.get(original.id, {});
    const metadata = codeList.getCodeList(original.id);
    assert.equal(result.length, original.codeItems.length);
    assert.equal(metadata.emptyText, english[original.emptyText] ?? original.emptyText);
    assert.deepEqual(
      plain({ ...metadata, emptyText: original.emptyText, codeItems: original.codeItems }),
      plain({ ...original, emptyText: original.emptyText }),
      `${original.codeName} keeps non-label metadata including memo and numeric-value mode`,
    );
    for (const [index, item] of original.codeItems.entries()) {
      const expectedValue = original.codeItemValueNumber ? Number(item.value) : item.value;
      const expectedText = english[item.text] ?? item.text;
      assert.equal(result[index].text, expectedText, `${original.codeName}/${item.value}`);
      assert.equal(result[index].value, expectedValue, `${original.codeName}/${item.value} retains storage type`);
      assert.equal(metadata.codeItems[index].value, item.value);
      assert.deepEqual(
        plain({ ...metadata.codeItems[index], text: item.text }), plain(item),
        `${original.codeName}/${item.value} preserves codeName/id/color/memo/default metadata`,
      );
      assert.equal((await codeList.getItem(original.id, expectedValue, {})).text, expectedText);
    }
  }
  language = 'zh-CN';
  for (const original of originals) {
    const cached = await codeList.get(original.id, {});
    chineseCache.set(original.id, cached);
    assert.equal(codeList.getCodeList(original.id), original);
    for (const [index, item] of original.codeItems.entries()) {
      const value = original.codeItemValueNumber ? Number(item.value) : item.value;
      assert.equal(cached[index].text, item.text);
      assert.equal((await codeList.getItem(original.id, value, {})).text, item.text);
    }
  }
  language = 'EN_us';
  for (const original of originals) {
    const result = await codeList.get(original.id, {});
    assert.deepEqual(
      Array.from(result, item => item.text),
      original.codeItems.map(item => english[item.text] ?? item.text),
    );
  }
  language = 'zh-CN';
  for (const original of originals) {
    assert.equal(await codeList.get(original.id, {}), chineseCache.get(original.id));
  }
  assert.deepEqual(plain(originals), before, 'No registered list or native cache is translated in place');
});

test('object-type main-app merges retain custom values, changed labels and user payloads', async () => {
  const appId = 'ibizmodeling__modeldesign';
  let merges = 0;
  let codeList;
  const custom = [
    { codeName: 'custom-value', value: 'CUSTOM_OBJECT', text: '实体' },
    { codeName: 'custom-label', value: 'PSMODULE', text: '系统' },
    { codeName: 'custom-unknown', value: 'CUSTOM_OTHER', text: 'Customer Object' },
  ];
  const CodeListService = codeListServiceClass({
    env: { appId }, i18n: { t: key => key },
    hub: {
      mergeSubAppCodeList(model) {
        merges++;
        assert.equal(model.codeName, 'Config__PSObjType');
        model.codeItems.push(...custom);
      },
    },
  });
  codeList = new CodeListService({ appId });
  const original = dsl.appCodeList(readModel('PSAPPCODELISTS/Config__PSObjType.json'));
  Object.assign(original.codeItems[0], {
    data: undefined,
    userData: { text: '实体', caption: '系统', value: 'PSMODULE' },
    tooltip: '系统模块',
  });
  const before = plain(original);
  let language = 'en';
  let registered;
  const host = {
    env: { appId }, i18n: { getLang: () => language },
    hub: {
      getApp: () => ({ codeList }),
      registerModelLoaderProvider(provider) { registered = provider; },
    },
    util: { layoutPanel: { fill: model => model } },
  };
  exports.installModelLocale(host);
  host.hub.registerModelLoaderProvider({
    async initApp() { codeList.setCodeList(original); return true; },
  });
  await registered.initApp(appId);
  assert.equal(merges, 0, 'Installing localization must not merge source models');
  const metadata = codeList.getCodeList(original.id);
  assert.equal(merges, 1, 'Only the explicit native model read triggers the merge');
  const translated = await codeList.get(original.id, {});
  assert.equal(merges, 1);
  assert.equal(translated.length, 399);
  assert.deepEqual(Array.from(translated.slice(396), item => item.text), custom.map(item => item.text));
  assert.deepEqual(Array.from(metadata.codeItems.slice(396), item => item.text), custom.map(item => item.text));
  assert.equal(translated[0].userData, original.codeItems[0].userData);
  assert.equal(translated[0].tooltip, '系统模块', 'Unknown tooltip is not glossary data');
  assert.equal((await codeList.getItem(original.id, 'CUSTOM_OBJECT', {})).text, '实体');
  language = 'zh-CN';
  assert.equal((await codeList.get(original.id, {}))[0].text, before.codeItems[0].text);
  assert.equal(codeList.getCodeList(original.id), original);
  assert.equal(merges, 1);
  assert.deepEqual(plain(original.codeItems.slice(0, 396)), before.codeItems);
});

test('real activity portlets and change-log shells use English metadata without altering native field or route IDs', async () => {
  const appId = 'ibizmodeling__modeldesign';
  const activityViews = [
    'PSSystemDashboardView',
    'PSDataEntityDashboardView',
    'PSSysAppOverViewDashboardView',
  ];
  const logViews = [
    'PSSysModelChgLogCurSysGridView',
    'PSSysModelChgLogChgLogTimeLineView9',
    'PSSysModelChgLogChgLogTimeLineView_SYSPortlet',
    'PSSysModelChgLogChgLogTimeLineView_DEPortlet',
    'PSSysModelChgLogChgLogTimeLineView_AppPortlet',
    'PSSysModelChgLogCalendarView_AppPortlet',
  ];
  const originals = new Map([...activityViews, ...logViews].map(name => [
    name, dsl.appView(readModel(`PSAPPDEVIEWS/${name}.json`)),
  ]));
  const before = plain([...originals]);
  let language = 'en';
  let registered;
  const host = {
    env: { appId }, i18n: { getLang: () => language },
    hub: { registerModelLoaderProvider(provider) { registered = provider; } },
    util: { layoutPanel: { fill: model => model } },
  };
  exports.installModelLocale(host);
  host.hub.registerModelLoaderProvider({
    async getAppView(id, view) { assert.equal(id, appId); return originals.get(view); },
  });
  const displayKeys = new Set([
    'caption', 'text', 'title', 'tooltip', 'emptyText', 'excelCaption', 'realTitle',
    'placeHolder', 'placeholder', 'editorPlaceHolder', 'editItemCaption', 'lnname',
    'ruleInfo', 'nextCaption', 'prevCaption', 'finishCaption', 'cancelCaption',
  ]);
  const stripDisplay = value => {
    if (Array.isArray(value)) return value.map(stripDisplay);
    if (!value || typeof value !== 'object') return value;
    return Object.fromEntries(Object.entries(value)
      .filter(([key]) => !displayKeys.has(key))
      .map(([key, item]) => [key, stripDisplay(item)]));
  };
  for (const [name, original] of originals) {
    const localized = await registered.getAppView(appId, name);
    const scoped = activityViews.includes(name)
      ? walk(localized).filter(item => item.codeName?.startsWith('PSSysModelChgLog'))
      : [localized];
    assert.equal(scoped.length, 1, `${name} binds one actual activity or log view`);
    const untranslated = walk(scoped[0]).flatMap(item => Object.entries(item)
      .filter(([key, value]) => displayKeys.has(key) && typeof value === 'string' &&
        /[\u4e00-\u9fff]/.test(value)));
    assert.deepEqual(untranslated, [], `${name} contains untranslated activity/log display metadata`);
    assert.deepEqual(plain(stripDisplay(localized)), plain(stripDisplay(original)),
      `${name} keeps all code, permission, field, data-set and route identifiers`);
    language = 'zh-CN';
    assert.equal(await registered.getAppView(appId, name), original);
    language = 'en';
  }
  const grid = (await registered.getAppView(appId, logViews[0])).controls
    .find(control => control.controlType === 'GRID');
  assert.equal(grid.degridColumns.find(column => column.dataItemName === 'objtype').caption, 'Object Type');
  for (const name of activityViews) {
    const localized = await registered.getAppView(appId, name);
    const fields = walk(localized).filter(item => item.viewFieldName === 'objtype');
    assert.equal(fields.length, 1);
    assert.equal(fields[0].convertToCodeItemText, true);
    assert.equal(fields[0].editor.appCodeListId, 'modeldesign.config__psobjtype');
    assert.equal(fields[0].editor.editorType, 'SPAN');
  }
  assert.deepEqual(plain([...originals]), before);
});

test('authoritative entity/application overviews and development tree localize complete static display metadata only', async () => {
  const appId = 'ibizmodeling__modeldesign';
  const displayKeys = new Set([
    'caption', 'text', 'title', 'tooltip', 'emptyText', 'placeHolder', 'placeholder',
    'editorPlaceHolder', 'excelCaption', 'editItemCaption', 'lnname', 'ruleInfo',
    'nextCaption', 'prevCaption', 'finishCaption', 'cancelCaption', 'realTitle',
  ]);
  const opaqueKeys = new Set([
    'data', 'userData', 'editorParams', 'controlParams', 'viewParamJO', 'parentDataJO',
  ]);
  const names = [
    'PSDataEntityDashboardView',
    'PSSysAppOverViewDashboardView',
    'PSSystemDevTreeExpView',
  ];
  const originals = new Map(names.map(name => [
    name, dsl.appView(readModel(`PSAPPDEVIEWS/${name}.json`)),
  ]));
  const before = plain([...originals]);
  let language = 'en-US';
  let registered;
  const host = {
    env: { appId }, i18n: { getLang: () => language },
    hub: { registerModelLoaderProvider(provider) { registered = provider; } },
    util: { layoutPanel: { fill: model => model } },
  };
  exports.installModelLocale(host);
  const provider = {
    async getAppView(id, view) {
      assert.equal(this, provider);
      assert.equal(id, appId);
      return originals.get(view);
    },
    async loadAppView(id, view) {
      assert.equal(this, provider);
      assert.equal(id, appId);
      return originals.get(view);
    },
  };
  host.hub.registerModelLoaderProvider(provider);
  const verify = (original, localized, path = '') => {
    if (Array.isArray(original)) {
      assert.equal(localized.length, original.length, path);
      original.forEach((item, index) => verify(item, localized[index], `${path}[${index}]`));
      return;
    }
    if (!original || typeof original !== 'object') {
      assert.equal(localized, original, path);
      return;
    }
    assert.deepEqual(Object.keys(localized), Object.keys(original), `${path} preserves model structure`);
    for (const [key, value] of Object.entries(original)) {
      const at = `${path}.${key}`;
      if (opaqueKeys.has(key)) {
        assert.equal(localized[key], value, `${at} is an opaque payload`);
      } else if (displayKeys.has(key) && typeof value === 'string') {
        assert.equal(localized[key], english[value] ?? value, at);
        assert.doesNotMatch(localized[key], /[\u4e00-\u9fff]/, `${at} has an explicit English static label`);
      } else if (value && typeof value === 'object') {
        verify(value, localized[key], at);
      } else {
        assert.equal(localized[key], value, `${at} is not a display key`);
      }
    }
  };
  for (const [name, original] of originals) {
    const localized = await registered.getAppView(appId, name);
    verify(original, localized, name);
    assert.deepEqual(
      plain(await registered.loadAppView(appId, name)),
      plain(localized),
      `${name} deep-link model loading follows the same display policy`,
    );
    language = 'zh-CN';
    assert.equal(await registered.getAppView(appId, name), original);
    assert.equal(await registered.loadAppView(appId, name), original);
    language = 'en-US';
  }
  const entity = await registered.getAppView(appId, names[0]);
  const application = await registered.getAppView(appId, names[1]);
  const tree = await registered.getAppView(appId, names[2]);
  assert.equal(entity.caption, 'Entity Overview');
  assert.equal(application.caption, 'Overview');
  const node = tree.controls[0].controls[0].detreeNodes
    .find(item => item.nodeType === 'PSSYSDBCHGLOGS');
  assert.equal(node.id, 'pssysdbchglogs');
  assert.equal(node.text, 'Model Change Log');
  assert.equal(node.navAppViewId, 'modeldesign.pssysmodelchglogcursysgridview');
  assert.deepEqual(plain([...originals]), before);
});

test('new overview vocabulary never rewrites opaque business bodies, scripts, IDs or non-field logic names', () => {
  const body = Object.freeze({
    caption: '实体概览', text: '应用模式', title: '系统发布历史',
    content: '测试数据\n用户正文😀e\u0301\'"\\', objtype: 'PSMODULE',
  });
  const model = {
    caption: '实体概览',
    realTitle: '系统开发导航视图',
    id: '实体概览',
    name: '应用模式',
    codeName: '测试数据',
    value: '数据库',
    appDELogics: [{ logicName: '实体概览', name: '应用模式', id: '数据库' }],
    controlLogics: [{ logicName: '系统发布历史', scriptCode: 'return "实体概览";' }],
    scriptCode: 'return "实体概览";',
    rawContent: '实体概览',
    htmlContent: '<p>实体概览</p>',
    content: '实体概览',
    data: body,
    userData: body,
    editorParams: body,
    controlParams: body,
    viewParamJO: body,
    parentDataJO: body,
    customUnknown: 'Customer-specific label',
  };
  const before = plain(model);
  const localized = exports.localizeModel(model);
  assert.equal(localized.caption, 'Entity Overview');
  assert.equal(localized.realTitle, 'System Development Navigation');
  for (const key of [
    'id', 'name', 'codeName', 'value', 'scriptCode', 'rawContent', 'htmlContent',
    'content', 'customUnknown',
  ]) assert.equal(localized[key], model[key], `${key} is not a display-metadata translation target`);
  for (const key of [
    'data', 'userData', 'editorParams', 'controlParams', 'viewParamJO', 'parentDataJO',
  ]) assert.equal(localized[key], body, `${key} preserves user payload identity`);
  assert.deepEqual(plain(localized.appDELogics), before.appDELogics);
  assert.deepEqual(plain(localized.controlLogics), before.controlLogics);
  assert.equal(exports.translateModelLabel('Unreviewed customer caption'), 'Unreviewed customer caption');
  assert.deepEqual(plain(model), before);
});

test('embedding bootstrap reads only explicit supported language values before the application loads', () => {
  const bootstrap = readFileSync(
    new URL('../public/environments/embedded-language.js', import.meta.url),
    'utf8',
  );
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.ok(
    html.indexOf('/environments/embedded-language.js') <
      html.indexOf('/src/main.ts'),
  );
  for (const language of ['en', 'zh-CN', 'invalid', 'EN_US', '']) {
    const stored = new Map();
    vm.runInNewContext(bootstrap, {
      URL,
      window: {
        location: {
          href: `http://fixture/modeldesign/?language=${language}#/untouched`,
        },
      },
      localStorage: { setItem: (key, value) => stored.set(key, value) },
    });
    assert.equal(
      stored.get('language'),
      ['en', 'zh-CN'].includes(language) ? language : undefined,
    );
  }
  assert.doesNotThrow(() =>
    vm.runInNewContext(bootstrap, {
      URL,
      window: { location: { href: 'http://fixture/modeldesign/?language=en' } },
      localStorage: {
        setItem() {
          throw new Error('Storage denied');
        },
      },
    }),
  );
});
