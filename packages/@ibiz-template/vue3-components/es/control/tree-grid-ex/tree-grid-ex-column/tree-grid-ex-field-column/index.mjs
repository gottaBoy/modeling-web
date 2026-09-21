import { registerTreeGridExColumnProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { TreeGridExFieldColumn } from './tree-grid-ex-field-column.mjs';
import { TreeGridExFieldColumnProvider } from './tree-grid-ex-field-column.provider.mjs';

"use strict";
const IBizTreeGridExFieldColumn = withInstall(
  TreeGridExFieldColumn,
  function(v) {
    v.component(TreeGridExFieldColumn.name, TreeGridExFieldColumn);
    registerTreeGridExColumnProvider(
      "DEFGRIDCOLUMN",
      () => new TreeGridExFieldColumnProvider()
    );
  }
);

export { IBizTreeGridExFieldColumn, IBizTreeGridExFieldColumn as default };
