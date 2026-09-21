import { withInstall } from '@ibiz-template/vue3-util';
import { registerGridColumnProvider } from '@ibiz-template/runtime';
import { GridFieldColumn } from './grid-field-column.mjs';
import { GridFieldColumnProvider } from './grid-field-column.provider.mjs';
import { AttachmentColumn } from './attachment-column/attachment-column.mjs';

"use strict";
const IBizGridFieldColumn = withInstall(
  GridFieldColumn,
  function(v) {
    v.component(GridFieldColumn.name, GridFieldColumn);
    v.component(AttachmentColumn.name, AttachmentColumn);
    registerGridColumnProvider(
      "DEFGRIDCOLUMN",
      () => new GridFieldColumnProvider()
    );
    registerGridColumnProvider(
      "DEFTREEGRIDCOLUMN",
      () => new GridFieldColumnProvider()
    );
  }
);

export { IBizGridFieldColumn, IBizGridFieldColumn as default };
