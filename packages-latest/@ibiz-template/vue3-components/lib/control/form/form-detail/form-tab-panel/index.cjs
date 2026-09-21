'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var formTabPanel = require('./form-tab-panel.cjs');
var formTabPanel_provider = require('./form-tab-panel.provider.cjs');

"use strict";
const IBizFormTabPanel = vue3Util.withInstall(formTabPanel.FormTabPanel, function(v) {
  v.component(formTabPanel.FormTabPanel.name, formTabPanel.FormTabPanel);
  runtime.registerFormDetailProvider("TABPANEL", () => new formTabPanel_provider.FormTabPanelProvider());
});

exports.IBizFormTabPanel = IBizFormTabPanel;
exports.default = IBizFormTabPanel;
