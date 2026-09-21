'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var htmlPortlet = require('./html-portlet.cjs');
var htmlPortlet_provider = require('./html-portlet.provider.cjs');

"use strict";
const IBizHtmlPortlet = vue3Util.withInstall(htmlPortlet.HtmlPortlet, function(v) {
  v.component(htmlPortlet.HtmlPortlet.name, htmlPortlet.HtmlPortlet);
  runtime.registerPortletProvider("HTML", () => new htmlPortlet_provider.HtmlPortletProvider());
});

exports.HtmlPortlet = htmlPortlet.HtmlPortlet;
exports.IBizHtmlPortlet = IBizHtmlPortlet;
exports.default = IBizHtmlPortlet;
