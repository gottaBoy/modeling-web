'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var userAction = require('./user-action.cjs');
var userActionProvider = require('./user-action-provider.cjs');

"use strict";
const IBizUserAction = vue3Util.withInstall(userAction.UserAction, function(v) {
  v.component(userAction.UserAction.name, userAction.UserAction);
  runtime.registerPanelItemProvider("RAWITEM_SETTING", () => new userActionProvider.UserActionProvider());
  runtime.registerPanelItemProvider("RAWITEM_HELPER", () => new userActionProvider.UserActionProvider());
  runtime.registerPanelItemProvider("RAWITEM_CUSTOM", () => new userActionProvider.UserActionProvider());
});

exports.IBizUserAction = IBizUserAction;
exports.default = IBizUserAction;
