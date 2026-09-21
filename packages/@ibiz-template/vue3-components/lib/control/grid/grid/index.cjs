'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
require('../grid-column/index.cjs');
var rowEditPopover = require('../row-edit-popover/row-edit-popover.cjs');
var grid = require('./grid.cjs');
var grid_provider = require('./grid.provider.cjs');
var gridControl_util = require('./grid-control.util.cjs');
var index = require('../grid-column/grid-field-column/index.cjs');
var index$1 = require('../grid-column/grid-ua-column/index.cjs');
var index$2 = require('../grid-column/grid-field-edit-column/index.cjs');
var index$3 = require('../grid-column/grid-group-column/index.cjs');
var index$4 = require('../grid-column/auto-grid-field-edit-column/index.cjs');

"use strict";
const IBizGridControl = vue3Util.withInstall(grid.GridControl, (v) => {
  v.component(grid.GridControl.name, grid.GridControl);
  v.component(rowEditPopover.IBizRowEditPopover.name, rowEditPopover.IBizRowEditPopover);
  v.use(index.IBizGridFieldColumn);
  v.use(index$1.IBizGridUAColumn);
  v.use(index$2.IBizGridFieldEditColumn);
  v.use(index$3.IBizGridGroupColumn);
  v.use(index$4.IBizDynamicGridFieldEditColumn);
  runtime.registerControlProvider(runtime.ControlType.GRID, () => new grid_provider.GridProvider());
});

exports.useAppGridBase = gridControl_util.useAppGridBase;
exports.useAppGridPagination = gridControl_util.useAppGridPagination;
exports.useGridDraggable = gridControl_util.useGridDraggable;
exports.useGridHeaderStyle = gridControl_util.useGridHeaderStyle;
exports.useITableEvent = gridControl_util.useITableEvent;
exports.IBizGridControl = IBizGridControl;
exports.default = IBizGridControl;
