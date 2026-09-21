'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var virtualizedTable = require('./virtualized-table.cjs');
var virtualizedTable_provider = require('./virtualized-table.provider.cjs');

"use strict";
const IBizVirtualizedTableControl = vue3Util.withInstall(
  virtualizedTable.VirtualizedTableControl,
  (v) => {
    v.component(virtualizedTable.VirtualizedTableControl.name, virtualizedTable.VirtualizedTableControl);
    runtime.registerControlProvider(
      "GRID_VIRTUALIZED_TABLE",
      () => new virtualizedTable_provider.VirtualizedTableProvider()
    );
  }
);

exports.IBizVirtualizedTableControl = IBizVirtualizedTableControl;
exports.default = IBizVirtualizedTableControl;
