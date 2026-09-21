'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
require('../../util/index.cjs');
var panelContainerTabs = require('./panel-container-tabs.cjs');
var panelContainerTabs_provider = require('./panel-container-tabs.provider.cjs');
var install = require('../../util/install.cjs');

"use strict";
const IBizPanelContainerTabs = install.withInstall(
  panelContainerTabs.PanelContainerTabs,
  function(v) {
    v.component(panelContainerTabs.PanelContainerTabs.name, panelContainerTabs.PanelContainerTabs);
    runtime.registerPanelItemProvider(
      "CONTAINER_TABS",
      () => new panelContainerTabs_provider.PanelContainerTabsProvider()
    );
  }
);

exports.IBizPanelContainerTabs = IBizPanelContainerTabs;
exports.default = IBizPanelContainerTabs;
