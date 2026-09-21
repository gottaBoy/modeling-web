import { registerGridColumnProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { GridFieldColumn } from './grid-field-column.mjs';
import { GridFieldColumnProvider } from './grid-field-column.provider.mjs';

"use strict";
const IBizGridFieldColumn = withInstall(
  GridFieldColumn,
  function(v) {
    v.component(GridFieldColumn.name, GridFieldColumn);
    registerGridColumnProvider(
      "DEFGRIDCOLUMN",
      () => new GridFieldColumnProvider()
    );
    registerGridColumnProvider(
      "DEFTREEGRIDCOLUMN",
      () => new GridFieldColumnProvider()
    );
  }
);

export { IBizGridFieldColumn, IBizGridFieldColumn as default };
