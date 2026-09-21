'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var gridUaColumn = require('./grid-ua-column.cjs');
var gridUaColumn_provider = require('./grid-ua-column.provider.cjs');

"use strict";
const IBizGridUAColumn = vue3Util.withInstall(gridUaColumn.GridUAColumn, function(v) {
  v.component(gridUaColumn.GridUAColumn.name, gridUaColumn.GridUAColumn);
  runtime.registerGridColumnProvider("UAGRIDCOLUMN", () => new gridUaColumn_provider.GridUAColumnProvider());
});

exports.IBizGridUAColumn = IBizGridUAColumn;
exports.default = IBizGridUAColumn;
