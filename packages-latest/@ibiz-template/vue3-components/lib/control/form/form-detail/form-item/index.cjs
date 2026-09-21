'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var formItem = require('./form-item.cjs');
var formItemContainer = require('./form-item-container/form-item-container.cjs');
var formItem_provider = require('./form-item.provider.cjs');
var index = require('./composite-form-item-ex/index.cjs');

"use strict";
const IBizFormItem = vue3Util.withInstall(formItem.FormItem, function(v) {
  v.component(formItem.FormItem.name, formItem.FormItem);
  v.component(formItemContainer.IBizFormItemContainer.name, formItemContainer.IBizFormItemContainer);
  runtime.registerFormDetailProvider("FORMITEM", () => new formItem_provider.FormItemProvider());
  v.use(index.default);
});

exports.IBizFormItemContainer = formItemContainer.IBizFormItemContainer;
exports.IBizFormItem = IBizFormItem;
exports.default = IBizFormItem;
