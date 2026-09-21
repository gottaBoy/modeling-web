import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { TreeControl } from './tree';
import { TreeProvider } from './tree.provider';

export const IBizTreeControl = withInstall(TreeControl, function (v: App) {
  v.component(TreeControl.name, TreeControl);
  registerControlProvider(ControlType.TREEVIEW, () => new TreeProvider());
});

export default IBizTreeControl;
