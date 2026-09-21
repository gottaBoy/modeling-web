'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var treeExpBar = require('./tree-exp-bar.cjs');
var treeExpBar_provider = require('./tree-exp-bar.provider.cjs');

"use strict";
const IBizTreeExpBarControl = vue3Util.withInstall(
  treeExpBar.TreeExpBarControl,
  function(v) {
    v.component(treeExpBar.TreeExpBarControl.name, treeExpBar.TreeExpBarControl);
    runtime.registerControlProvider(
      runtime.ControlType.TREE_EXP_BAR,
      () => new treeExpBar_provider.TreeExpBarProvider()
    );
  }
);

exports.IBizTreeExpBarControl = IBizTreeExpBarControl;
exports.default = IBizTreeExpBarControl;
