'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var filterPortlet = require('./filter-portlet.cjs');
var filterPortlet_provider = require('./filter-portlet.provider.cjs');
var filterPortletDesign = require('./filter-portlet-design/filter-portlet-design.cjs');

"use strict";
const IBizFilterPortlet = vue3Util.withInstall(filterPortlet.FilterPortlet, function(v) {
  v.component(filterPortlet.FilterPortlet.name, filterPortlet.FilterPortlet);
  v.component(filterPortletDesign.IBizFilterPortletDesign.name, filterPortletDesign.IBizFilterPortletDesign);
  runtime.registerPortletProvider("FILTER", () => new filterPortlet_provider.FilterPortletProvider());
});

exports.FilterPortlet = filterPortlet.FilterPortlet;
exports.IBizFilterPortlet = IBizFilterPortlet;
exports.default = IBizFilterPortlet;
