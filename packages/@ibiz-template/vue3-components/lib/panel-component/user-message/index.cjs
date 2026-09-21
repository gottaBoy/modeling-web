'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
require('./async-action/index.cjs');
var userMessage = require('./user-message.cjs');
var userMessage_provider = require('./user-message.provider.cjs');
var index = require('./internal-message/index.cjs');
var asyncAction = require('./async-action/async-action/async-action.cjs');
var asyncAction_provider = require('./async-action/async-action/async-action.provider.cjs');

"use strict";
const IBizUserMessage = vue3Util.withInstall(userMessage.UserMessage, function(v) {
  v.component(userMessage.UserMessage.name, userMessage.UserMessage);
  v.component(asyncAction.AsyncAction.name, asyncAction.AsyncAction);
  runtime.registerAsyncActionProvider("DEIMPORTDATA2", () => new asyncAction_provider.AsyncActionProvider());
  runtime.registerAsyncActionProvider("DEFAULT", () => new asyncAction_provider.AsyncActionProvider());
  index.installInternalMessage(v);
  runtime.registerPanelItemProvider(
    "RAWITEM_USERMESSAGE",
    () => new userMessage_provider.UserMessageProvider()
  );
});

exports.IBizUserMessage = IBizUserMessage;
exports.default = IBizUserMessage;
