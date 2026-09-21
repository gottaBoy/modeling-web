'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var gridFieldEditColumn = require('./grid-field-edit-column.cjs');
var gridFieldEditColumn_provider = require('./grid-field-edit-column.provider.cjs');
var gridEditItem = require('./grid-edit-item/grid-edit-item.cjs');

"use strict";
const IBizGridFieldEditColumn = vue3Util.withInstall(
  gridFieldEditColumn.GridFieldEditColumn,
  function(v) {
    v.component(gridFieldEditColumn.GridFieldEditColumn.name, gridFieldEditColumn.GridFieldEditColumn);
    v.component(gridEditItem.IBizGridEditItem.name, gridEditItem.IBizGridEditItem);
    runtime.registerGridColumnProvider(
      "DEFGRIDCOLUMN_EDIT",
      () => new gridFieldEditColumn_provider.GridFieldEditColumnProvider()
    );
  }
);

exports.IBizGridFieldEditColumn = IBizGridFieldEditColumn;
exports.default = IBizGridFieldEditColumn;
