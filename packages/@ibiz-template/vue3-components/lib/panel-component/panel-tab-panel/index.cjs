'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var panelTabPanel = require('./panel-tab-panel.cjs');
var panelTabPanel_provider = require('./panel-tab-panel.provider.cjs');

"use strict";
const IBizPanelTabPanel = vue3Util.withInstall(panelTabPanel.PanelTabPanel, function(v) {
  v.component(panelTabPanel.PanelTabPanel.name, panelTabPanel.PanelTabPanel);
  runtime.registerPanelItemProvider("TABPANEL", () => new panelTabPanel_provider.PanelTabPanelProvider());
});

exports.IBizPanelTabPanel = IBizPanelTabPanel;
exports.default = IBizPanelTabPanel;
