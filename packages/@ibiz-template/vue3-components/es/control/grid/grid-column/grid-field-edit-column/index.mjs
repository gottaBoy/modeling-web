import { registerGridColumnProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { GridFieldEditColumn } from './grid-field-edit-column.mjs';
import { GridFieldEditColumnProvider } from './grid-field-edit-column.provider.mjs';
import { IBizGridEditItem } from './grid-edit-item/grid-edit-item.mjs';

"use strict";
const IBizGridFieldEditColumn = withInstall(
  GridFieldEditColumn,
  function(v) {
    v.component(GridFieldEditColumn.name, GridFieldEditColumn);
    v.component(IBizGridEditItem.name, IBizGridEditItem);
    registerGridColumnProvider(
      "DEFGRIDCOLUMN_EDIT",
      () => new GridFieldEditColumnProvider()
    );
  }
);

export { IBizGridFieldEditColumn, IBizGridFieldEditColumn as default };
