import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { TreeGridControl } from './tree-grid';
import { TreeGridProvider } from './tree-grid.provider';

export const IBizTreeGridControl = withInstall(
  TreeGridControl,
  function (v: App) {
    v.component(TreeGridControl.name, TreeGridControl);
    registerControlProvider(ControlType.TREEGRID, () => new TreeGridProvider());
  },
);

export default IBizTreeGridControl;
