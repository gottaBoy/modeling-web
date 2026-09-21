'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var formTabPage = require('./form-tab-page.cjs');
var formTabPage_provider = require('./form-tab-page.provider.cjs');

"use strict";
const IBizFormTabPage = vue3Util.withInstall(formTabPage.FormTabPage, function(v) {
  v.component(formTabPage.FormTabPage.name, formTabPage.FormTabPage);
  runtime.registerFormDetailProvider("TABPAGE", () => new formTabPage_provider.FormTabPageProvider());
});

exports.IBizFormTabPage = IBizFormTabPage;
exports.default = IBizFormTabPage;
