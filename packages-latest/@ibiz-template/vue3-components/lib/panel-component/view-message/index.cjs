'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var viewMessage = require('./view-message.cjs');
var viewMessage_provider = require('./view-message.provider.cjs');

"use strict";
const IBizViewMessage = vue3Util.withInstall(viewMessage.ViewMessage, function(v) {
  v.component(viewMessage.ViewMessage.name, viewMessage.ViewMessage);
  runtime.registerPanelItemProvider(
    "RAWITEM_VIEW_MESSAGE",
    () => new viewMessage_provider.ViewMessageProvider()
  );
});

exports.IBizViewMessage = IBizViewMessage;
exports.default = IBizViewMessage;
