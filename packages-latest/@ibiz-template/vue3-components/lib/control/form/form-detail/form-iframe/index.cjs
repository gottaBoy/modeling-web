'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var formIframe = require('./form-iframe.cjs');
var formIframe_provider = require('./form-iframe.provider.cjs');

"use strict";
const IBizFormIFrame = vue3Util.withInstall(formIframe.FormIFrame, function(v) {
  v.component(formIframe.FormIFrame.name, formIframe.FormIFrame);
  runtime.registerFormDetailProvider("IFRAME", () => new formIframe_provider.FormIFrameProvider());
});

exports.IBizFormIFrame = IBizFormIFrame;
exports.default = IBizFormIFrame;
