'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var formDruipart = require('./form-druipart.cjs');
var formDruipart_provider = require('./form-druipart.provider.cjs');

"use strict";
const IBizFormDRUIPart = vue3Util.withInstall(formDruipart.FormDRUIPart, function(v) {
  v.component(formDruipart.FormDRUIPart.name, formDruipart.FormDRUIPart);
  runtime.registerFormDetailProvider("DRUIPART", () => new formDruipart_provider.FormDRUIPartProvider());
});

exports.IBizFormDRUIPart = IBizFormDRUIPart;
exports.default = IBizFormDRUIPart;
