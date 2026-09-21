'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var tree = require('./tree.cjs');
var tree_provider = require('./tree.provider.cjs');

"use strict";
const IBizTreeControl = vue3Util.withInstall(tree.TreeControl, function(v) {
  v.component(tree.TreeControl.name, tree.TreeControl);
  runtime.registerControlProvider(runtime.ControlType.TREEVIEW, () => new tree_provider.TreeProvider());
});

exports.IBizTreeControl = IBizTreeControl;
exports.default = IBizTreeControl;
