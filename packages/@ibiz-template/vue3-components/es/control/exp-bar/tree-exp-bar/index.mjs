import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { TreeExpBarControl } from './tree-exp-bar.mjs';
import { TreeExpBarProvider } from './tree-exp-bar.provider.mjs';

"use strict";
const IBizTreeExpBarControl = withInstall(
  TreeExpBarControl,
  function(v) {
    v.component(TreeExpBarControl.name, TreeExpBarControl);
    registerControlProvider(
      ControlType.TREE_EXP_BAR,
      () => new TreeExpBarProvider()
    );
  }
);

export { IBizTreeExpBarControl, IBizTreeExpBarControl as default };
