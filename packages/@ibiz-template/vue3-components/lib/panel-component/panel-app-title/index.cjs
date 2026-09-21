'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var panelAppTitle = require('./panel-app-title.cjs');
var panelAppTitle_provider = require('./panel-app-title.provider.cjs');
var panelAppTitle_controller = require('./panel-app-title.controller.cjs');

"use strict";
const IBizPanelAppTitle = vue3Util.withInstall(panelAppTitle.PanelAppTitle, function(v) {
  v.component(panelAppTitle.PanelAppTitle.name, panelAppTitle.PanelAppTitle);
  runtime.registerPanelItemProvider(
    "RAWITEM_APP_APPTITLE",
    () => new panelAppTitle_provider.PanelAppTitleProvider()
  );
  runtime.registerPanelItemProvider(
    "CTRLPOS_APP_APPTITLE",
    () => new panelAppTitle_provider.PanelAppTitleProvider()
  );
});

exports.PanelAppTitleController = panelAppTitle_controller.PanelAppTitleController;
exports.IBizPanelAppTitle = IBizPanelAppTitle;
exports.default = IBizPanelAppTitle;
