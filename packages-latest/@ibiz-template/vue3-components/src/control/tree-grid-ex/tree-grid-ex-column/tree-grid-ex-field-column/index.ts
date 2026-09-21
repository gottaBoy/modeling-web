import { registerTreeGridExColumnProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import TreeGridExFieldColumn from './tree-grid-ex-field-column';
import { TreeGridExFieldColumnProvider } from './tree-grid-ex-field-column.provider';

export const IBizTreeGridExFieldColumn = withInstall(
  TreeGridExFieldColumn,
  function (v: App) {
    v.component(TreeGridExFieldColumn.name, TreeGridExFieldColumn);
    registerTreeGridExColumnProvider(
      'DEFGRIDCOLUMN',
      () => new TreeGridExFieldColumnProvider(),
    );
  },
);

export default IBizTreeGridExFieldColumn;
