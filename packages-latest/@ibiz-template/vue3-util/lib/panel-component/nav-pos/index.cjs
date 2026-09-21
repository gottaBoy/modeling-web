'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
require('../../util/index.cjs');
var navPos = require('./nav-pos.cjs');
var navPos_provider = require('./nav-pos.provider.cjs');
var navPos_state = require('./nav-pos.state.cjs');
var navPos_controller = require('./nav-pos.controller.cjs');
var install = require('../../util/install.cjs');

"use strict";
const IBizNavPos = install.withInstall(navPos.NavPos, function(v) {
  v.component(navPos.NavPos.name, navPos.NavPos);
  runtime.registerPanelItemProvider("RAWITEM_NAV_POS", () => new navPos_provider.NavPosProvider());
});

exports.NavPosState = navPos_state.NavPosState;
exports.NavPosController = navPos_controller.NavPosController;
exports.IBizNavPos = IBizNavPos;
exports.default = IBizNavPos;
