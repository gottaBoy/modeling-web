import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { TreeGridControl } from './tree-grid.mjs';
import { TreeGridProvider } from './tree-grid.provider.mjs';

"use strict";
const IBizTreeGridControl = withInstall(
  TreeGridControl,
  function(v) {
    v.component(TreeGridControl.name, TreeGridControl);
    registerControlProvider(ControlType.TREEGRID, () => new TreeGridProvider());
  }
);

export { IBizTreeGridControl, IBizTreeGridControl as default };
