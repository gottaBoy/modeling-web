import { withInstall } from '@ibiz-template/vue3-util';
import { GridColumnHeader } from './grid-column-header.mjs';

"use strict";
const IBizGridColumnHeader = withInstall(
  GridColumnHeader,
  function(v) {
    v.component(GridColumnHeader.name, GridColumnHeader);
  }
);

export { IBizGridColumnHeader, IBizGridColumnHeader as default };
