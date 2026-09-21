import { registerGridColumnProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import GridUAColumn from './grid-ua-column';
import { GridUAColumnProvider } from './grid-ua-column.provider';

export const IBizGridUAColumn = withInstall(GridUAColumn, function (v: App) {
  v.component(GridUAColumn.name, GridUAColumn);
  registerGridColumnProvider('UAGRIDCOLUMN', () => new GridUAColumnProvider());
});

export default IBizGridUAColumn;
