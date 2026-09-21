'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var appMenu = require('./app-menu.cjs');
var appMenu_provider = require('./app-menu.provider.cjs');
var customMenuDesign = require('./custom-menu-design/custom-menu-design.cjs');

"use strict";
const IBizAppMenuControl = vue3Util.withInstall(
  appMenu.AppMenuControl,
  function(v) {
    v.component(customMenuDesign.MenuDesign.name, customMenuDesign.MenuDesign);
    v.component(appMenu.AppMenuControl.name, appMenu.AppMenuControl);
    runtime.registerControlProvider(runtime.ControlType.APP_MENU, () => new appMenu_provider.AppMenuProvider());
  }
);

exports.IBizAppMenuControl = IBizAppMenuControl;
exports.default = IBizAppMenuControl;
