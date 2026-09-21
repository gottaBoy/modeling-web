import { registerTreeGridExColumnProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import TreeGridExUAColumn from './tree-grid-ex-ua-column';
import { TreeGridExUAColumnProvider } from './tree-grid-ex-ua-column.provider';

export const IBizTreeGridExUAColumn = withInstall(
  TreeGridExUAColumn,
  function (v: App) {
    v.component(TreeGridExUAColumn.name, TreeGridExUAColumn);
    registerTreeGridExColumnProvider(
      'UAGRIDCOLUMN',
      () => new TreeGridExUAColumnProvider(),
    );
  },
);

export default IBizTreeGridExUAColumn;
