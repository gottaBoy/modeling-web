'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var appMenuPortlet = require('./app-menu-portlet/app-menu-portlet.cjs');
var menuPortlet = require('./menu-portlet.cjs');
var menuPortlet_provider = require('./menu-portlet.provider.cjs');

"use strict";
const IBizMenuPortlet = vue3Util.withInstall(menuPortlet.MenuPortlet, function(v) {
  v.component(menuPortlet.MenuPortlet.name, menuPortlet.MenuPortlet);
  v.component(appMenuPortlet.AppMenuPortletControl.name, appMenuPortlet.AppMenuPortletControl);
  runtime.registerPortletProvider("APPMENU", () => new menuPortlet_provider.MenuPortletProvider());
});

exports.MenuPortlet = menuPortlet.MenuPortlet;
exports.IBizMenuPortlet = IBizMenuPortlet;
exports.default = IBizMenuPortlet;
