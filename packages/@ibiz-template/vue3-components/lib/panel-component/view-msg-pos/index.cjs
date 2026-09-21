'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var viewMsgPos = require('./view-msg-pos.cjs');
var viewMsgPos_provider = require('./view-msg-pos.provider.cjs');
var viewMsgPos_controller = require('./view-msg-pos.controller.cjs');

"use strict";
const IBizViewMsgPos = vue3Util.withInstall(viewMsgPos.ViewMsgPos, function(v) {
  v.component(viewMsgPos.ViewMsgPos.name, viewMsgPos.ViewMsgPos);
  runtime.registerPanelItemProvider(
    "RAWITEM_VIEWMSG_POS",
    () => new viewMsgPos_provider.ViewMsgPosProvider()
  );
});

exports.ViewMsgPosController = viewMsgPos_controller.ViewMsgPosController;
exports.IBizViewMsgPos = IBizViewMsgPos;
exports.default = IBizViewMsgPos;
