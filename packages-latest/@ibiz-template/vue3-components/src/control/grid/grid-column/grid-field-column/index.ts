import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { registerGridColumnProvider } from '@ibiz-template/runtime';
import GridFieldColumn from './grid-field-column';
import { GridFieldColumnProvider } from './grid-field-column.provider';
import { AttachmentColumn } from './attachment-column/attachment-column';

export const IBizGridFieldColumn = withInstall(
  GridFieldColumn,
  function (v: App) {
    v.component(GridFieldColumn.name, GridFieldColumn);
    v.component(AttachmentColumn.name, AttachmentColumn);
    registerGridColumnProvider(
      'DEFGRIDCOLUMN',
      () => new GridFieldColumnProvider(),
    );
    registerGridColumnProvider(
      'DEFTREEGRIDCOLUMN',
      () => new GridFieldColumnProvider(),
    );
  },
);

export default IBizGridFieldColumn;
