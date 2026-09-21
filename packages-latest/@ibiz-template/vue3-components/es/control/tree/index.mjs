import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { TreeControl } from './tree.mjs';
import { TreeProvider } from './tree.provider.mjs';

"use strict";
const IBizTreeControl = withInstall(TreeControl, function(v) {
  v.component(TreeControl.name, TreeControl);
  registerControlProvider(ControlType.TREEVIEW, () => new TreeProvider());
});

export { IBizTreeControl, IBizTreeControl as default };
