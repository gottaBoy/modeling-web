'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var coopPos = require('./coop-pos.cjs');
var coopPos_provider = require('./coop-pos.provider.cjs');
var coopPos_state = require('./coop-pos.state.cjs');
var coopPos_controller = require('./coop-pos.controller.cjs');

"use strict";
const IBizCoopPos = vue3Util.withInstall(coopPos.CoopPos, function(v) {
  v.component(coopPos.CoopPos.name, coopPos.CoopPos);
  runtime.registerPanelItemProvider("RAWITEM_COOP_POS", () => new coopPos_provider.CoopPosProvider());
});

exports.CoopPosState = coopPos_state.CoopPosState;
exports.CoopPosController = coopPos_controller.CoopPosController;
exports.IBizCoopPos = IBizCoopPos;
exports.default = IBizCoopPos;
