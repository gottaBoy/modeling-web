'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
require('../../util/index.cjs');
var panelCtrlPos = require('./panel-ctrl-pos.cjs');
var panelCtrlPos_provider = require('./panel-ctrl-pos.provider.cjs');
var panelCtrlPos_controller = require('./panel-ctrl-pos.controller.cjs');
var install = require('../../util/install.cjs');

"use strict";
const IBizPanelCtrlPos = install.withInstall(panelCtrlPos.PanelCtrlPos, function(v) {
  v.component(panelCtrlPos.PanelCtrlPos.name, panelCtrlPos.PanelCtrlPos);
  runtime.registerPanelItemProvider("CTRLPOS", () => new panelCtrlPos_provider.PanelCtrlPosProvider());
});

exports.PanelCtrlPosController = panelCtrlPos_controller.PanelCtrlPosController;
exports.IBizPanelCtrlPos = IBizPanelCtrlPos;
exports.default = IBizPanelCtrlPos;
