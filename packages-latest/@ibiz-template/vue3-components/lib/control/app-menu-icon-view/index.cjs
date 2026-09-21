'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var appMenuIconView_provider = require('./app-menu-icon-view.provider.cjs');
var appMenuIconView = require('./app-menu-icon-view.cjs');

"use strict";
const IBizAppMenuIconViewControl = vue3Util.withInstall(
  appMenuIconView.AppMenuIconViewControl,
  function(v) {
    v.component(appMenuIconView.AppMenuIconViewControl.name, appMenuIconView.AppMenuIconViewControl);
    runtime.registerControlProvider(
      "".concat(runtime.ControlType.APP_MENU, "_ICONVIEW"),
      () => new appMenuIconView_provider.AppMenuIconViewProvider()
    );
  }
);

exports.IBizAppMenuIconViewControl = IBizAppMenuIconViewControl;
exports.default = IBizAppMenuIconViewControl;
