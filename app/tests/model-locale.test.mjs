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
