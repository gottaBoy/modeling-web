'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var viewPortlet = require('./view-portlet.cjs');
var viewPortlet_provider = require('./view-portlet.provider.cjs');

"use strict";
const IBizViewPortlet = vue3Util.withInstall(viewPortlet.ViewPortlet, function(v) {
  v.component(viewPortlet.ViewPortlet.name, viewPortlet.ViewPortlet);
  runtime.registerPortletProvider("VIEW", () => new viewPortlet_provider.ViewPortletProvider());
});

exports.ViewPortlet = viewPortlet.ViewPortlet;
exports.IBizViewPortlet = IBizViewPortlet;
exports.default = IBizViewPortlet;
