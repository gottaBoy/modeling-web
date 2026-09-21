import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { TreeGridExControl } from './tree-grid-ex.mjs';
import { TreeGridExProvider } from './tree-grid-ex.provider.mjs';
import './tree-grid-ex-column/index.mjs';
import { TreeGridExEditColumn } from './tree-grid-ex-column/tree-grid-ex-edit-column/tree-grid-ex-edit-column.mjs';
import { IBizTreeGridExFieldColumn } from './tree-grid-ex-column/tree-grid-ex-field-column/index.mjs';
import { IBizTreeGridExUAColumn } from './tree-grid-ex-column/tree-grid-ex-ua-column/index.mjs';

"use strict";
const IBizTreeGridExControl = withInstall(
  TreeGridExControl,
  function(v) {
    v.component(TreeGridExControl.name, TreeGridExControl);
    v.component(TreeGridExEditColumn.name, TreeGridExEditColumn);
    registerControlProvider(
      ControlType.TREE_GRIDEX,
      () => new TreeGridExProvider()
    );
    v.use(IBizTreeGridExFieldColumn);
    v.use(IBizTreeGridExUAColumn);
  }
);

export { IBizTreeGridExControl, IBizTreeGridExControl as default };
