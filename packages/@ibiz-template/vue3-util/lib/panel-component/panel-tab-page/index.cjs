'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var panelTabPage = require('./panel-tab-page.cjs');
var panelTabPage_provider = require('./panel-tab-page.provider.cjs');
require('../../util/index.cjs');
var install = require('../../util/install.cjs');

"use strict";
const IBizPanelTabPage = install.withInstall(panelTabPage.PanelTabPage, function(v) {
  v.component(panelTabPage.PanelTabPage.name, panelTabPage.PanelTabPage);
  runtime.registerPanelItemProvider("TABPAGE", () => new panelTabPage_provider.PanelTabPageProvider());
});

exports.IBizPanelTabPage = IBizPanelTabPage;
exports.default = IBizPanelTabPage;
