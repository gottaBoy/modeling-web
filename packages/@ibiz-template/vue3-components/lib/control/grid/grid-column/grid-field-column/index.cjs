'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var gridFieldColumn = require('./grid-field-column.cjs');
var gridFieldColumn_provider = require('./grid-field-column.provider.cjs');

"use strict";
const IBizGridFieldColumn = vue3Util.withInstall(
  gridFieldColumn.GridFieldColumn,
  function(v) {
    v.component(gridFieldColumn.GridFieldColumn.name, gridFieldColumn.GridFieldColumn);
    runtime.registerGridColumnProvider(
      "DEFGRIDCOLUMN",
      () => new gridFieldColumn_provider.GridFieldColumnProvider()
    );
    runtime.registerGridColumnProvider(
      "DEFTREEGRIDCOLUMN",
      () => new gridFieldColumn_provider.GridFieldColumnProvider()
    );
  }
);

exports.IBizGridFieldColumn = IBizGridFieldColumn;
exports.default = IBizGridFieldColumn;
