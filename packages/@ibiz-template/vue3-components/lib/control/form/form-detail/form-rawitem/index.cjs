'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var formRawitem = require('./form-rawitem.cjs');
var formRawitem_provider = require('./form-rawitem.provider.cjs');

"use strict";
const IBizFormRawItem = vue3Util.withInstall(formRawitem.FormRawItem, function(v) {
  v.component(formRawitem.FormRawItem.name, formRawitem.FormRawItem);
  runtime.registerFormDetailProvider("RAWITEM", () => new formRawitem_provider.FormRawItemProvider());
});

exports.IBizFormRawItem = IBizFormRawItem;
exports.default = IBizFormRawItem;
