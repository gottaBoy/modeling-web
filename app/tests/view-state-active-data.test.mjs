import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const sources = [
  ['candidate',
    '../../packages-latest/@ibiz-template/vue3-util/src/panel-component/single-data-container/single-data-container.controller.ts',
  ],
  ['hub',
    '../../../ibiz-app-hub/packages/vue3-util/src/panel-component/single-data-container/single-data-container.controller.ts',
  ],
];

function fixture(path, state, name = 'srfactiveviewdata') {
  const source = readFileSync(new URL(path, import.meta.url), 'utf8');
  const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true);
  const controller = ast.statements.find(node =>
    ts.isClassDeclaration(node) && node.name?.text === 'SingleDataContainerController');
  const method = controller?.members.find(node => node.name?.getText(ast) === 'bindViewData');
  assert.ok(method && ts.isMethodDeclaration(method), 'execute the actual controller method');
  const result = ts.transpileModule(
    `class Binding { ${method.getText(ast)} }\nmodule.exports = Binding;`,
    { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS } },
  );
  const errors = [];
  const data = [];
  const listeners = [];
  const sandbox = {
    module: { exports: {} },
    ibiz: {
      log: { error: message => errors.push(message) },
      i18n: { t: (key, params) => `${key}:${params.dataName}` },
    },
  };
  vm.runInNewContext(result.outputText, sandbox);
  const binding = new sandbox.module.exports();
  binding.setData = value => data.push(value);
  binding.bindViewData({
    state,
    evt: { on: (event, callback) => {
      assert.equal(event, 'onDataChange');
      listeners.push(callback);
    } },
  }, name);
  return { errors, data, listeners, change: () => listeners.forEach(listener => listener()) };
}

for (const [variant, path] of sources) {
  test(`${variant}: null active record clears the panel before and after loading`, () => {
    const state = { srfactiveviewdata: null };
    const binding = fixture(path, state);
    assert.equal(binding.data.length, 1);
    assert.deepEqual(Object.keys(binding.data[0]), []);
    assert.deepEqual(binding.errors, []);
    assert.equal(binding.listeners.length, 1);
    const record = { id: 'owned-record', name: 'record' };
    state.srfactiveviewdata = record;
    binding.change();
    assert.equal(binding.data.at(-1), record);
    state.srfactiveviewdata = null;
    binding.change();
    assert.equal(binding.data.length, 3);
    assert.deepEqual(Object.keys(binding.data.at(-1)), []);
    assert.deepEqual(binding.errors, []);
  });

  for (const invalid of [undefined, false, 0, '']) {
    test(`${variant}: ${String(invalid)} active data remains an error`, () => {
      const binding = fixture(path, { srfactiveviewdata: invalid });
      assert.deepEqual(binding.data, []);
      assert.deepEqual(binding.errors,
        ['vue3Util.panelComponent.viewStateAttribute:srfactiveviewdata']);
    });
  }

  test(`${variant}: missing or inherited active data cannot create a successful binding`, () => {
    for (const state of [{}, Object.create({ srfactiveviewdata: null })]) {
      const binding = fixture(path, state);
      assert.deepEqual(binding.data, []);
      assert.deepEqual(binding.errors, ['vue3Util.panelComponent.sessionView:srfactiveviewdata']);
      assert.equal(binding.listeners.length, 0);
    }
  });

  test(`${variant}: null unrelated view variable is not reinterpreted as an empty record`, () => {
    const binding = fixture(path, { other: null }, 'other');
    assert.deepEqual(binding.data, []);
    assert.deepEqual(binding.errors, ['vue3Util.panelComponent.viewStateAttribute:other']);
  });

  test(`${variant}: later invalid data is still logged after a successful record`, () => {
    const record = { id: 'owned-record' };
    const state = { srfactiveviewdata: record };
    const binding = fixture(path, state);
    state.srfactiveviewdata = undefined;
    binding.change();
    assert.equal(binding.data.length, 1);
    assert.equal(binding.data[0], record);
    assert.deepEqual(binding.errors,
      ['vue3Util.panelComponent.viewStateAttribute:srfactiveviewdata']);
  });
}
