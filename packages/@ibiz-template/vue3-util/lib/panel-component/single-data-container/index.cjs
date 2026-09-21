'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
require('../../util/index.cjs');
var singleDataContainer = require('./single-data-container.cjs');
var singleDataContainer_provider = require('./single-data-container.provider.cjs');
var singleDataContainer_state = require('./single-data-container.state.cjs');
var singleDataContainer_controller = require('./single-data-container.controller.cjs');
var install = require('../../util/install.cjs');

"use strict";
const IBizSingleDataContainer = install.withInstall(
  singleDataContainer.SingleDataContainer,
  function(v) {
    v.component(singleDataContainer.SingleDataContainer.name, singleDataContainer.SingleDataContainer);
    runtime.registerPanelItemProvider(
      "CONTAINER_CONTAINER_SINGLEDATA",
      () => new singleDataContainer_provider.SingleDataContainerProvider()
    );
  }
);

exports.SingleDataContainerState = singleDataContainer_state.SingleDataContainerState;
exports.SingleDataContainerController = singleDataContainer_controller.SingleDataContainerController;
exports.IBizSingleDataContainer = IBizSingleDataContainer;
exports.default = IBizSingleDataContainer;
