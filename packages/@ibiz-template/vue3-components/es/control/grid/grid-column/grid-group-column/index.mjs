import { registerGridColumnProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { GridGroupColumn } from './grid-group-column.mjs';
import { GridGroupColumnProvider } from './grid-group-column.provider.mjs';

"use strict";
const IBizGridGroupColumn = withInstall(GridGroupColumn, () => {
  registerGridColumnProvider(
    "GROUPGRIDCOLUMN",
    () => new GridGroupColumnProvider()
  );
});

export { IBizGridGroupColumn, IBizGridGroupColumn as default };
