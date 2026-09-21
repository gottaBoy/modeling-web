import { withInstall } from '@ibiz-template/vue3-util';
import { registerGridColumnProvider } from '@ibiz-template/runtime';
import { AutoGridFieldEditColumn } from './auto-grid-field-edit-column.mjs';
import { AutoGridFieldEditColumnProvider } from './auto-grid-field-edit-column.provider.mjs';

"use strict";
const IBizDynamicGridFieldEditColumn = withInstall(
  AutoGridFieldEditColumn,
  function(v) {
    v.component(AutoGridFieldEditColumn.name, AutoGridFieldEditColumn);
    registerGridColumnProvider(
      "AUTO_DEFGRIDCOLUMN_EDIT",
      () => new AutoGridFieldEditColumnProvider()
    );
  }
);

export { IBizDynamicGridFieldEditColumn, IBizDynamicGridFieldEditColumn as default };
