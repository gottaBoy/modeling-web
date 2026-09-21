'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var actionbarPortlet = require('./actionbar-portlet.cjs');
var actionbarPortlet_provider = require('./actionbar-portlet.provider.cjs');

"use strict";
const IBizActionBarPortlet = vue3Util.withInstall(
  actionbarPortlet.ActionBarPortlet,
  function(v) {
    v.component(actionbarPortlet.ActionBarPortlet.name, actionbarPortlet.ActionBarPortlet);
    runtime.registerPortletProvider("ACTIONBAR", () => new actionbarPortlet_provider.ActionBarPortletProvider());
  }
);

exports.ActionBarPortlet = actionbarPortlet.ActionBarPortlet;
exports.IBizActionBarPortlet = IBizActionBarPortlet;
exports.default = IBizActionBarPortlet;
