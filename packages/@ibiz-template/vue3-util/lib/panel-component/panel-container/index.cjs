'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
require('../../util/index.cjs');
var panelContainer = require('./panel-container.cjs');
var panelContainer_provider = require('./panel-container.provider.cjs');
var panelContainer_state = require('./panel-container.state.cjs');
var panelContainer_controller = require('./panel-container.controller.cjs');
var install = require('../../util/install.cjs');

"use strict";
const IBizPanelContainer = install.withInstall(
  panelContainer.PanelContainer,
  function(v) {
    v.component(panelContainer.PanelContainer.name, panelContainer.PanelContainer);
    runtime.registerPanelItemProvider("CONTAINER", () => new panelContainer_provider.PanelContainerProvider());
    runtime.registerPanelItemProvider(
      "CONTAINER_DEFAULT",
      () => new panelContainer_provider.PanelContainerProvider()
    );
  }
);

exports.PanelContainerState = panelContainer_state.PanelContainerState;
exports.PanelContainerController = panelContainer_controller.PanelContainerController;
exports.IBizPanelContainer = IBizPanelContainer;
exports.default = IBizPanelContainer;
