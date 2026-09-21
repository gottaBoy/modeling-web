'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
require('../../util/index.cjs');
var panelField = require('./panel-field.cjs');
var panelField_provider = require('./panel-field.provider.cjs');
var panelField_controller = require('./panel-field.controller.cjs');
var install = require('../../util/install.cjs');

"use strict";
const IBizPanelField = install.withInstall(panelField.PanelField, function(v) {
  v.component(panelField.PanelField.name, panelField.PanelField);
  runtime.registerPanelItemProvider("FIELD", () => new panelField_provider.PanelFieldProvider());
});

exports.PanelFieldController = panelField_controller.PanelFieldController;
exports.IBizPanelField = IBizPanelField;
exports.default = IBizPanelField;
