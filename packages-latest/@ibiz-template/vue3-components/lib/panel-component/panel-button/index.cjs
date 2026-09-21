'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var panelButton = require('./panel-button.cjs');
var panelButton_provider = require('./panel-button.provider.cjs');
var panelButton_controller = require('./panel-button.controller.cjs');

"use strict";
const IBizPanelButton = vue3Util.withInstall(panelButton.PanelButton, function(v) {
  v.component(panelButton.PanelButton.name, panelButton.PanelButton);
  runtime.registerPanelItemProvider("BUTTON", () => new panelButton_provider.PanelButtonProvider());
});

exports.PanelButtonController = panelButton_controller.PanelButtonController;
exports.IBizPanelButton = IBizPanelButton;
exports.default = IBizPanelButton;
