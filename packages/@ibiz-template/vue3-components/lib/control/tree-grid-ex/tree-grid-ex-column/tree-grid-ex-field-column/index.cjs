'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var treeGridExFieldColumn = require('./tree-grid-ex-field-column.cjs');
var treeGridExFieldColumn_provider = require('./tree-grid-ex-field-column.provider.cjs');

"use strict";
const IBizTreeGridExFieldColumn = vue3Util.withInstall(
  treeGridExFieldColumn.TreeGridExFieldColumn,
  function(v) {
    v.component(treeGridExFieldColumn.TreeGridExFieldColumn.name, treeGridExFieldColumn.TreeGridExFieldColumn);
    runtime.registerTreeGridExColumnProvider(
      "DEFGRIDCOLUMN",
      () => new treeGridExFieldColumn_provider.TreeGridExFieldColumnProvider()
    );
  }
);

exports.IBizTreeGridExFieldColumn = IBizTreeGridExFieldColumn;
exports.default = IBizTreeGridExFieldColumn;
