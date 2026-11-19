import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(
  new URL(
    '../../packages-latest/@ibiz-template/vue3-util/src/panel-component/single-data-container/single-data-container.controller.ts',
    import.meta.url,
  ),
  'utf8',
);

test('active view data accepts a null record without hiding missing-state errors', () => {
  assert.match(
    source,
    /as\s*\n?\s*\|\s*IData\s*\n?\s*\|\s*null\s*\n?\s*\|\s*undefined/,
  );
  assert.match(
    source,
    /else if \(dataName === 'srfactiveviewdata' && originData === null\)/,
  );
  assert.match(source, /this\.setData\(\{\}\);/);
  assert.match(
    source,
    /else\s*\{\s*ibiz\.log\.error\(\s*ibiz\.i18n\.t\('vue3Util\.panelComponent\.viewStateAttribute'/s,
  );
});
