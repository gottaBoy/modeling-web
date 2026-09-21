'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var listPortlet = require('./list-portlet.cjs');
var listPortlet_provider = require('./list-portlet.provider.cjs');

"use strict";
const IBizListPortlet = vue3Util.withInstall(listPortlet.ListPortlet, function(v) {
  v.component(listPortlet.ListPortlet.name, listPortlet.ListPortlet);
  runtime.registerPortletProvider("LIST", () => new listPortlet_provider.ListPortletProvider());
});

exports.ListPortlet = listPortlet.ListPortlet;
exports.IBizListPortlet = IBizListPortlet;
exports.default = IBizListPortlet;
