import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const exports = {};
vm.runInNewContext(ts.transpileModule(readFileSync(
  new URL('../src/locale/model-locale.ts', import.meta.url), 'utf8',
), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
}).outputText, {
  exports,
  require: id => JSON.parse(readFileSync(new URL(`../src/locale/${id.split('/').at(-1)}`, import.meta.url))),
});

function lists() {
  return [
    {
      codeName: 'Config__YesNo', codeListType: 'STATIC', emptyText: '未定义',
      codeItems: [
        { id: 'yes', value: '1', text: '是', data: { text: '是' } },
        { value: 'CUSTOM_OBJECT', text: '实体概览', tooltip: '实体概览' },
        { value: '0', text: '实体概览' },
      ],
    },
    {
      codeName: 'Config__YesNo', codeListType: 'DYNAMIC', emptyText: '未定义',
      codeItems: [{ value: '1', text: '是', userData: { text: '实体概览' } }],
    },
    {
      codeName: 'CustomUserList', codeListType: 'STATIC',
      codeItems: [{ value: 'CUSTOM_OBJECT', text: '实体概览' }],
    },
    {
      codeName: 'CustomUserList', codeListType: 'DYNAMIC',
      codeItems: [{ value: 'CUSTOM_OBJECT', text: '实体概览' }],
    },
    {
      codeName: '__proto__', codeListType: 'STATIC',
      codeItems: [{ value: '1', text: '是' }],
    },
  ];
}

test('model provider localization uses the same restricted static vocabulary as service reads', async () => {
  let language = 'en-US';
  let registered;
  const original = { caption: '实体概览', appCodeLists: lists() };
  const before = structuredClone(original);
  const provider = {
    async getApp() { assert.equal(this, provider); return original; },
    async translationModelToDsl() { assert.equal(this, provider); return original; },
  };
  const appId = 'ibizmodeling__modeldesign';
  const host = {
    env: { appId }, i18n: { getLang: () => language },
    hub: { registerModelLoaderProvider(value) { registered = value; } },
    util: { layoutPanel: { fill: value => value } },
  };
  exports.installModelLocale(host);
  host.hub.registerModelLoaderProvider(provider);
  for (const load of [
    () => registered.getApp(appId),
    () => registered.translationModelToDsl(original),
  ]) {
    const localized = await load();
    assert.equal(localized.caption, 'Entity Overview');
    const [reviewed, ...untouched] = localized.appCodeLists;
    assert.equal(reviewed.emptyText, 'Not Defined');
    assert.equal(reviewed.codeItems[0].text, 'Yes');
    assert.equal(reviewed.codeItems[0].value, '1');
    assert.equal(reviewed.codeItems[0].data, original.appCodeLists[0].codeItems[0].data);
    assert.equal(reviewed.codeItems[1].text, '实体概览');
    assert.equal(reviewed.codeItems[1].tooltip, '实体概览');
    assert.equal(reviewed.codeItems[2].text, '实体概览');
    assert.deepEqual(untouched, original.appCodeLists.slice(1));
    language = 'zh-CN';
    assert.equal(await load(), original);
    language = 'EN_gb';
    assert.equal((await load()).appCodeLists[0].codeItems[0].text, 'Yes');
  }
  assert.equal(await registered.getApp('other__app'), original);
  assert.deepEqual(original, before);
});

test('nested code-list metadata is guarded without changing unrelated view display text', () => {
  const [reviewed, dynamic, custom] = lists();
  const original = {
    caption: '实体概览',
    controls: [{ editor: { codeList: dynamic }, codeList: custom }],
    nested: [{ codeList: reviewed }],
  };
  const localized = exports.localizeModel(original);
  assert.equal(localized.caption, 'Entity Overview');
  assert.equal(localized.controls[0].editor.codeList, dynamic);
  assert.equal(localized.controls[0].codeList, custom);
  assert.equal(localized.nested[0].codeList.codeItems[0].text, 'Yes');
  assert.equal(reviewed.codeItems[0].text, '是');
});
