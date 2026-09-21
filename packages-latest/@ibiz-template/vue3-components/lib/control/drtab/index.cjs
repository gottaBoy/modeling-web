'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var drtab = require('./drtab.cjs');
var drtab_provider = require('./drtab.provider.cjs');
var drtab_controller = require('./drtab.controller.cjs');

"use strict";
const IBizDRTabControl = vue3Util.withInstall(drtab.DRTabControl, function(v) {
  v.component(drtab.DRTabControl.name, drtab.DRTabControl);
  runtime.registerControlProvider(runtime.ControlType.DRTAB, () => new drtab_provider.DRTabProvider());
});

exports.DRTabController = drtab_controller.DRTabController;
exports.IBizDRTabControl = IBizDRTabControl;
exports.default = IBizDRTabControl;
