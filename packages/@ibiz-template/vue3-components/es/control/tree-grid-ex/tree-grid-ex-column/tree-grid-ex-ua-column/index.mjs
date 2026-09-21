import { registerTreeGridExColumnProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { TreeGridExUAColumn } from './tree-grid-ex-ua-column.mjs';
import { TreeGridExUAColumnProvider } from './tree-grid-ex-ua-column.provider.mjs';

"use strict";
const IBizTreeGridExUAColumn = withInstall(
  TreeGridExUAColumn,
  function(v) {
    v.component(TreeGridExUAColumn.name, TreeGridExUAColumn);
    registerTreeGridExColumnProvider(
      "UAGRIDCOLUMN",
      () => new TreeGridExUAColumnProvider()
    );
  }
);

export { IBizTreeGridExUAColumn, IBizTreeGridExUAColumn as default };
