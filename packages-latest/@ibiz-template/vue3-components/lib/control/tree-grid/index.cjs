'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var treeGrid = require('./tree-grid.cjs');
var treeGrid_provider = require('./tree-grid.provider.cjs');

"use strict";
const IBizTreeGridControl = vue3Util.withInstall(
  treeGrid.TreeGridControl,
  function(v) {
    v.component(treeGrid.TreeGridControl.name, treeGrid.TreeGridControl);
    runtime.registerControlProvider(runtime.ControlType.TREEGRID, () => new treeGrid_provider.TreeGridProvider());
  }
);

exports.IBizTreeGridControl = IBizTreeGridControl;
exports.default = IBizTreeGridControl;
