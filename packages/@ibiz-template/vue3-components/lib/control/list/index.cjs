'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var list = require('./list.cjs');
var list_provider = require('./list.provider.cjs');

"use strict";
const IBizListControl = vue3Util.withInstall(list.ListControl, function(v) {
  v.component(list.ListControl.name, list.ListControl);
  runtime.registerControlProvider(runtime.ControlType.LIST, () => new list_provider.ListProvider());
});

exports.IBizListControl = IBizListControl;
exports.default = IBizListControl;
