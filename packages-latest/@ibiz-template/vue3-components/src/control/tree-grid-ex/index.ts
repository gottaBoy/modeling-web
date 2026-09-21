import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { TreeGridExControl } from './tree-grid-ex';
import { TreeGridExProvider } from './tree-grid-ex.provider';
import {
  IBizTreeGridExFieldColumn,
  IBizTreeGridExUAColumn,
  TreeGridExEditColumn,
} from './tree-grid-ex-column';

export const IBizTreeGridExControl = withInstall(
  TreeGridExControl,
  function (v: App) {
    v.component(TreeGridExControl.name, TreeGridExControl);
    v.component(TreeGridExEditColumn.name, TreeGridExEditColumn);
    registerControlProvider(
      ControlType.TREE_GRIDEX,
      () => new TreeGridExProvider(),
    );
    v.use(IBizTreeGridExFieldColumn);
    v.use(IBizTreeGridExUAColumn);
  },
);

export default IBizTreeGridExControl;
