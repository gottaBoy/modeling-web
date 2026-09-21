'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var rawitemPortlet = require('./rawitem-portlet.cjs');
var rawitemPortlet_provider = require('./rawitem-portlet.provider.cjs');

"use strict";
const IBizRawItemPortlet = vue3Util.withInstall(
  rawitemPortlet.RawItemPortlet,
  function(v) {
    v.component(rawitemPortlet.RawItemPortlet.name, rawitemPortlet.RawItemPortlet);
    runtime.registerPortletProvider("RAWITEM", () => new rawitemPortlet_provider.RawItemPortletProvider());
  }
);

exports.RawItemPortlet = rawitemPortlet.RawItemPortlet;
exports.IBizRawItemPortlet = IBizRawItemPortlet;
exports.default = IBizRawItemPortlet;
