import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const packageRoot = resolve(__dirname, '../../packages-latest/@ibiz-template/vue3-components/src/panel-component/app-extend-menu');

describe('native panel menu contracts', () => {
  it.each(['top', 'left', 'right', 'bottom'] as const)(
    'registers both native and historical %s-side menu keys',
    position => {
      const source = readFileSync(
        resolve(packageRoot, `${position}-side-menu/index.ts`),
        'utf8',
      );
      const nativeKey = `RAWITEM_${position.toUpperCase()}_SIDE_MENU`;
      const historicalKey = `RAWITEM_PREDEFINE_${position.toUpperCase()}_SIDE_MENU`;

      expect(source).toContain(`'${nativeKey}'`);
      expect(source).toContain(`'${historicalKey}'`);
    },
  );
});
