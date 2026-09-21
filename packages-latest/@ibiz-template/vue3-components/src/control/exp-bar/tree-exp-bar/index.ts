import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { TreeExpBarControl } from './tree-exp-bar';
import { TreeExpBarProvider } from './tree-exp-bar.provider';

export const IBizTreeExpBarControl = withInstall(
  TreeExpBarControl,
  function (v: App) {
    v.component(TreeExpBarControl.name, TreeExpBarControl);
    registerControlProvider(
      ControlType.TREE_EXP_BAR,
      () => new TreeExpBarProvider(),
    );
  },
);

export default IBizTreeExpBarControl;
