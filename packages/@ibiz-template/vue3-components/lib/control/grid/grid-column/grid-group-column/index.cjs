'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var gridGroupColumn = require('./grid-group-column.cjs');
var gridGroupColumn_provider = require('./grid-group-column.provider.cjs');

"use strict";
const IBizGridGroupColumn = vue3Util.withInstall(gridGroupColumn.GridGroupColumn, () => {
  runtime.registerGridColumnProvider(
    "GROUPGRIDCOLUMN",
    () => new gridGroupColumn_provider.GridGroupColumnProvider()
  );
});

exports.IBizGridGroupColumn = IBizGridGroupColumn;
exports.default = IBizGridGroupColumn;
