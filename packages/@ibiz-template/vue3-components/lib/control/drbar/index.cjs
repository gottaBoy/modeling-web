'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var drbar = require('./drbar.cjs');
var drbar_provider = require('./drbar.provider.cjs');
var drbar_controller = require('./drbar.controller.cjs');

"use strict";
const IBizDRBarControl = vue3Util.withInstall(drbar.DRBarControl, function(v) {
  v.component(drbar.DRBarControl.name, drbar.DRBarControl);
  runtime.registerControlProvider(runtime.ControlType.DRBAR, () => new drbar_provider.DRBarProvider());
});

exports.DRBarController = drbar_controller.DRBarController;
exports.IBizDRBarControl = IBizDRBarControl;
exports.default = IBizDRBarControl;
