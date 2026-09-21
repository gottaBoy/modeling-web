'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var formButton = require('./form-button.cjs');
var formButton_provider = require('./form-button.provider.cjs');

"use strict";
const IBizFormButton = vue3Util.withInstall(formButton.FormButton, function(v) {
  v.component(formButton.FormButton.name, formButton.FormButton);
  runtime.registerFormDetailProvider("BUTTON", () => new formButton_provider.FormButtonProvider());
});

exports.IBizFormButton = IBizFormButton;
exports.default = IBizFormButton;
