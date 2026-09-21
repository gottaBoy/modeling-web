'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
require('../../util/index.cjs');
var panelContainerImage = require('./panel-container-image.cjs');
var panelContainerImage_provider = require('./panel-container-image.provider.cjs');
var panelContainerImage_state = require('./panel-container-image.state.cjs');
var panelContainerImage_controller = require('./panel-container-image.controller.cjs');
var install = require('../../util/install.cjs');

"use strict";
const IBizPanelContainerImage = install.withInstall(
  panelContainerImage.PanelContainerImage,
  function(v) {
    v.component(panelContainerImage.PanelContainerImage.name, panelContainerImage.PanelContainerImage);
    runtime.registerPanelItemProvider(
      "CONTAINER_CONTAINER_IMAGE",
      () => new panelContainerImage_provider.PanelContainerImageProvider()
    );
  }
);

exports.PanelContainerImageState = panelContainerImage_state.PanelContainerImageState;
exports.PanelContainerImageController = panelContainerImage_controller.PanelContainerImageController;
exports.IBizPanelContainerImage = IBizPanelContainerImage;
exports.default = IBizPanelContainerImage;
