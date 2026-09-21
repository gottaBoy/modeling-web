'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var panelContainerGroup_state = require('./panel-container-group.state.cjs');
var panelContainerGroup_provider = require('./panel-container-group.provider.cjs');
var panelContainerGroup_controller = require('./panel-container-group.controller.cjs');
var panelContainerGroup = require('./panel-container-group.cjs');
require('../../util/index.cjs');
var install = require('../../util/install.cjs');

"use strict";
const IBizPanelContainerGroup = install.withInstall(
  panelContainerGroup.PanelContainerGroup,
  function(v) {
    v.component(panelContainerGroup.PanelContainerGroup.name, panelContainerGroup.PanelContainerGroup);
    runtime.registerPanelItemProvider(
      "CONTAINER_CONTAINER_GROUP",
      () => new panelContainerGroup_provider.PanelContainerGroupProvider()
    );
  }
);

exports.PanelContainerGroupState = panelContainerGroup_state.PanelContainerGroupState;
exports.PanelContainerGroupController = panelContainerGroup_controller.PanelContainerGroupController;
exports.IBizPanelContainerGroup = IBizPanelContainerGroup;
exports.default = IBizPanelContainerGroup;
