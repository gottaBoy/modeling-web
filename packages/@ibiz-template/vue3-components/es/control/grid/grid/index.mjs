import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import '../grid-column/index.mjs';
import { IBizRowEditPopover } from '../row-edit-popover/row-edit-popover.mjs';
import { GridControl } from './grid.mjs';
import { GridProvider } from './grid.provider.mjs';
export { useAppGridBase, useAppGridPagination, useGridDraggable, useGridHeaderStyle, useITableEvent } from './grid-control.util.mjs';
import { IBizGridFieldColumn } from '../grid-column/grid-field-column/index.mjs';
import { IBizGridUAColumn } from '../grid-column/grid-ua-column/index.mjs';
import { IBizGridFieldEditColumn } from '../grid-column/grid-field-edit-column/index.mjs';
import { IBizGridGroupColumn } from '../grid-column/grid-group-column/index.mjs';
import { IBizDynamicGridFieldEditColumn } from '../grid-column/auto-grid-field-edit-column/index.mjs';

"use strict";
const IBizGridControl = withInstall(GridControl, (v) => {
  v.component(GridControl.name, GridControl);
  v.component(IBizRowEditPopover.name, IBizRowEditPopover);
  v.use(IBizGridFieldColumn);
  v.use(IBizGridUAColumn);
  v.use(IBizGridFieldEditColumn);
  v.use(IBizGridGroupColumn);
  v.use(IBizDynamicGridFieldEditColumn);
  registerControlProvider(ControlType.GRID, () => new GridProvider());
});

export { IBizGridControl, IBizGridControl as default };
