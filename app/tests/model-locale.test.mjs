import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../src/locale/model-locale.ts', import.meta.url), 'utf8');
const english = JSON.parse(readFileSync(new URL('../src/locale/en.json', import.meta.url)));
const exports = {};
vm.runInNewContext(ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
}).outputText, { exports, require: () => english });

test('native locale adapter translates only display metadata and never mutates source or user data', () => {
  const model = {
    caption: '实体导航', id: '实体', name: '实体', scriptCode: 'return "实体";',
    appDEFields: [{ id: 'name', logicName: '名称' }],
    appDELogics: [{ logicName: '名称' }],
    title: 'Customer-defined model title',
  };
  const translated = exports.localizeModel(model);
  assert.equal(translated.caption, 'Entity Navigation');
  assert.equal(translated.id, '实体');
  assert.equal(translated.name, '实体');
  assert.equal(translated.scriptCode, model.scriptCode);
  assert.equal(translated.appDEFields[0].logicName, 'Name');
  assert.equal(translated.appDELogics[0].logicName, '名称');
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
    hub: { registerModelLoaderProvider(provider) { registered = provider; } },
    util: { layoutPanel: { fill: model => ({ ...model, viewLayoutPanel: layout }) } },
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
    async getAppDataEntity() { throw new Error('Permission denied'); },
    initApp() { return this.sentinel; },
  };
  host.hub.registerModelLoaderProvider(provider);
  assert.equal((await registered.getAppView('ibizmodeling__modeldesign', 'view')).caption, 'Entity Navigation');
  assert.equal((await registered.getAppView('other__app', 'view')).caption, '实体导航');
  assert.equal(registered.initApp(), provider.sentinel);
  await assert.rejects(registered.getAppDataEntity('ibizmodeling__modeldesign'), /Permission denied/);
  const filled = host.util.layoutPanel.fill({ appId: host.env.appId });
  assert.equal(filled.viewLayoutPanel.caption, 'Cancel');
  assert.equal(layout.caption, '取消');
  language = 'zh-CN';
  assert.equal((await registered.getAppView('ibizmodeling__modeldesign', 'view')).caption, '实体导航');
});

test('embedding bootstrap reads only explicit supported language values before the application loads', () => {
  const bootstrap = readFileSync(new URL('../public/environments/embedded-language.js', import.meta.url), 'utf8');
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.ok(html.indexOf('/environments/embedded-language.js') < html.indexOf('/src/main.ts'));
  for (const language of ['en', 'zh-CN', 'invalid', 'EN_US', '']) {
    const stored = new Map();
    vm.runInNewContext(bootstrap, {
      URL, window: { location: { href: `http://fixture/modeldesign/?language=${language}#/untouched` } },
      localStorage: { setItem: (key, value) => stored.set(key, value) },
    });
    assert.equal(stored.get('language'), ['en', 'zh-CN'].includes(language) ? language : undefined);
  }
  assert.doesNotThrow(() => vm.runInNewContext(bootstrap, {
    URL, window: { location: { href: 'http://fixture/modeldesign/?language=en' } },
    localStorage: { setItem() { throw new Error('Storage denied'); } },
  }));
});
