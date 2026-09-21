'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var treeGridExUaColumn = require('./tree-grid-ex-ua-column.cjs');
var treeGridExUaColumn_provider = require('./tree-grid-ex-ua-column.provider.cjs');

"use strict";
const IBizTreeGridExUAColumn = vue3Util.withInstall(
  treeGridExUaColumn.TreeGridExUAColumn,
  function(v) {
    v.component(treeGridExUaColumn.TreeGridExUAColumn.name, treeGridExUaColumn.TreeGridExUAColumn);
    runtime.registerTreeGridExColumnProvider(
      "UAGRIDCOLUMN",
      () => new treeGridExUaColumn_provider.TreeGridExUAColumnProvider()
    );
  }
);

exports.IBizTreeGridExUAColumn = IBizTreeGridExUAColumn;
exports.default = IBizTreeGridExUAColumn;
