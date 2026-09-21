import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { registerGridColumnProvider } from '@ibiz-template/runtime';
import AutoGridFieldEditColumn from './auto-grid-field-edit-column';
import { AutoGridFieldEditColumnProvider } from './auto-grid-field-edit-column.provider';

export const IBizDynamicGridFieldEditColumn = withInstall(
  AutoGridFieldEditColumn,
  function (v: App) {
    v.component(AutoGridFieldEditColumn.name!, AutoGridFieldEditColumn);
    registerGridColumnProvider(
      'AUTO_DEFGRIDCOLUMN_EDIT',
      () => new AutoGridFieldEditColumnProvider(),
    );
  },
);

export default IBizDynamicGridFieldEditColumn;
