import assert from 'node:assert/strict';
import test from 'node:test';
import { ModelEditDocument, parseModel, sameModel } from '../enhancements/model-edit-document.ts';
import { modelEditText } from '../enhancements/model-edit-messages.ts';

test('model document accepts only actual finite JSON objects', () => {
  assert.deepEqual(parseModel('{"name":"entity","fields":[]}'), { name: 'entity', fields: [] });
  for (const text of ['', '{', 'null', '[]', 'true', '1', '"model"', '{"n":1e999}']) {
    assert.throws(() => parseModel(text));
  }
});

test('model equality ignores property order, not array order or value types', () => {
  assert.equal(sameModel({ a: 1, b: { c: true } }, { b: { c: true }, a: 1 }), true);
  assert.equal(sameModel({ a: [1, 2] }, { a: [2, 1] }), false);
  assert.equal(sameModel({ a: 1 }, { a: '1' }), false);
});

test('edit history supports undo, redo, branching and formatting without losing the baseline', () => {
  const draft = new ModelEditDocument();
  draft.reset({ a: 1 });
  const baseline = draft.value;
  assert.equal(draft.dirty, false);
  draft.setText('{"a":2}');
  draft.format();
  assert.equal(draft.dirty, true);
  draft.undo();
  assert.equal(draft.value, '{"a":2}');
  draft.undo();
  assert.equal(draft.value, baseline);
  assert.equal(draft.dirty, false);
  draft.redo();
  assert.equal(draft.value, '{"a":2}');
  draft.setText('{"a":3}');
  assert.equal(draft.canRedo, false);
  assert.equal(draft.matchesBaseline({ a: 1 }), true);
  assert.equal(draft.matchesBaseline({ a: 3 }), false);
});

test('history is bounded and reset discards prior undo and redo frames', () => {
  const draft = new ModelEditDocument();
  draft.reset({ n: 0 });
  for (let n = 1; n <= 100; n++) draft.setText(JSON.stringify({ n }));
  let undos = 0;
  while (draft.canUndo) { draft.undo(); undos++; }
  assert.equal(undos, 50);
  draft.reset({ n: 4 });
  assert.equal(draft.canUndo, false);
  assert.equal(draft.canRedo, false);
  assert.equal(draft.dirty, false);
});

test('structured changes escape JSON pointers and distinguish additions, removals and arrays', () => {
  const draft = new ModelEditDocument();
  draft.reset({ removed: true, 'a/b~c': { n: 1 }, items: [1, 2] });
  draft.setText('{"a/b~c":{"n":2},"items":[2,1],"new":null}');
  assert.deepEqual(draft.changes().entries.map(row => [row.path, row.kind]), [
    ['/removed', 'remove'], ['/a~1b~0c/n', 'replace'], ['/items', 'replace'], ['/new', 'add'],
  ]);
  assert.equal(draft.changes(2).truncated, true);
  assert.equal(draft.changes(2).entries.length, 2);
  for (const limit of [0, -1, 1.5, 1001]) assert.throws(() => draft.changes(limit));
});

test('prototype-named JSON keys remain ordinary data without prototype mutation', () => {
  const draft = new ModelEditDocument();
  draft.reset({});
  draft.setText('{"__proto__":{"owned":true},"constructor":"field"}');
  assert.deepEqual(draft.changes().entries.map(row => [row.path, row.kind]), [
    ['/__proto__', 'add'], ['/constructor', 'add'],
  ]);
  assert.equal({}.owned, undefined);
  assert.equal(Object.getPrototypeOf(parseModel(draft.value)), Object.prototype);
});

test('invalid draft cannot format or produce an accepted change list', () => {
  const draft = new ModelEditDocument();
  draft.reset({ a: 1 });
  draft.setText('{"a":');
  assert.throws(() => draft.format());
  assert.throws(() => draft.changes());
  assert.equal(draft.value, '{"a":');
  draft.undo();
  assert.equal(draft.dirty, false);
});

test('model edit status, actions and conflict messages have both native languages', () => {
  for (const key of ['back', 'close', 'save', 'saveClose', 'format', 'undo', 'redo',
    'changes', 'export', 'valid', 'invalid', 'conflict', 'unverified', 'discard']) {
    const zh = modelEditText('zh-CN', key);
    const en = modelEditText('en-US', key);
    assert.ok(zh.length && en.length);
    assert.notEqual(zh, en);
    assert.equal(modelEditText('en', key), en);
  }
});
