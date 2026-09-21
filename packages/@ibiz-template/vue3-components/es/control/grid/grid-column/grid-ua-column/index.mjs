import { registerGridColumnProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { GridUAColumn } from './grid-ua-column.mjs';
import { GridUAColumnProvider } from './grid-ua-column.provider.mjs';

"use strict";
const IBizGridUAColumn = withInstall(GridUAColumn, function(v) {
  v.component(GridUAColumn.name, GridUAColumn);
  registerGridColumnProvider("UAGRIDCOLUMN", () => new GridUAColumnProvider());
});

export { IBizGridUAColumn, IBizGridUAColumn as default };
