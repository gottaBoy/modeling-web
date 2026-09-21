import { registerGridColumnProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import GridFieldEditColumn from './grid-field-edit-column';
import { GridFieldEditColumnProvider } from './grid-field-edit-column.provider';

import { IBizGridEditItem } from './grid-edit-item/grid-edit-item';

export const IBizGridFieldEditColumn = withInstall(
  GridFieldEditColumn,
  function (v: App) {
    v.component(GridFieldEditColumn.name, GridFieldEditColumn);
    v.component(IBizGridEditItem.name, IBizGridEditItem);
    registerGridColumnProvider(
      'DEFGRIDCOLUMN_EDIT',
      () => new GridFieldEditColumnProvider(),
    );
  },
);

export default IBizGridFieldEditColumn;
