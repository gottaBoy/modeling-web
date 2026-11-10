import assert from 'node:assert/strict';
import test from 'node:test';
import { classifyTodoCounterError } from '../src/model.ts';

test('todo counter contract distinguishes missing optional PLM service from real failures', () => {
  assert.equal(classifyTodoCounterError({ status: 404 }), 'unavailable');
  assert.equal(classifyTodoCounterError({ status: 405 }), 'unavailable');
  for (const status of [
    0, 200, 400, 401, 403, 408, 422, 500, 502, 503, 504,
    '404', '405', ' 404 ', '0405', null, false, true, undefined, NaN, Infinity,
    new Number(404), { valueOf: () => 405 },
  ]) {
    assert.equal(classifyTodoCounterError(status === undefined ? {} : { status }), 'error');
  }
  for (const error of [null, undefined, '404', 404, new Error('network down'),
    { response: { status: 404 } }]) {
    assert.equal(classifyTodoCounterError(error), 'error');
  }
});
