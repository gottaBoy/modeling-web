'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var formPage = require('./form-page.cjs');
var formPage_item = require('./form-page-item/form-page.item.cjs');
var formPage_provider = require('./form-page.provider.cjs');

"use strict";
const IBizFormPage = vue3Util.withInstall(formPage.FormPage, function(v) {
  v.component(formPage.FormPage.name, formPage.FormPage);
  v.component(formPage_item.IBizFormPageItem.name, formPage_item.IBizFormPageItem);
  runtime.registerFormDetailProvider("FORMPAGE", () => new formPage_provider.FormPageProvider());
});

exports.IBizFormPageItem = formPage_item.IBizFormPageItem;
exports.IBizFormPage = IBizFormPage;
exports.default = IBizFormPage;
