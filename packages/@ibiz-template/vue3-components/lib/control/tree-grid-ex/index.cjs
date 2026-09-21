'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var treeGridEx = require('./tree-grid-ex.cjs');
var treeGridEx_provider = require('./tree-grid-ex.provider.cjs');
require('./tree-grid-ex-column/index.cjs');
var treeGridExEditColumn = require('./tree-grid-ex-column/tree-grid-ex-edit-column/tree-grid-ex-edit-column.cjs');
var index = require('./tree-grid-ex-column/tree-grid-ex-field-column/index.cjs');
var index$1 = require('./tree-grid-ex-column/tree-grid-ex-ua-column/index.cjs');

"use strict";
const IBizTreeGridExControl = vue3Util.withInstall(
  treeGridEx.TreeGridExControl,
  function(v) {
    v.component(treeGridEx.TreeGridExControl.name, treeGridEx.TreeGridExControl);
    v.component(treeGridExEditColumn.TreeGridExEditColumn.name, treeGridExEditColumn.TreeGridExEditColumn);
    runtime.registerControlProvider(
      runtime.ControlType.TREE_GRIDEX,
      () => new treeGridEx_provider.TreeGridExProvider()
    );
    v.use(index.IBizTreeGridExFieldColumn);
    v.use(index$1.IBizTreeGridExUAColumn);
  }
);

exports.IBizTreeGridExControl = IBizTreeGridExControl;
exports.default = IBizTreeGridExControl;
