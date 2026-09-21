'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var appSwitch = require('./app-switch.cjs');
var appSwitch_provider = require('./app-switch.provider.cjs');

"use strict";
const IBizAppSwitch = vue3Util.withInstall(
  appSwitch.AppSwitch,
  function(v) {
    v.component(appSwitch.AppSwitch.name, appSwitch.AppSwitch);
    runtime.registerPanelItemProvider(
      "RAWITEM_APP_SWITCH",
      () => new appSwitch_provider.AppSwitchProvider()
    );
  }
);

exports.IBizAppSwitch = IBizAppSwitch;
exports.default = IBizAppSwitch;
