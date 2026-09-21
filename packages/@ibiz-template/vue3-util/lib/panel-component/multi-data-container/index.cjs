'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
require('../../util/index.cjs');
var multiDataContainer = require('./multi-data-container.cjs');
var multiDataContainer_provider = require('./multi-data-container.provider.cjs');
var multiDataContainer_state = require('./multi-data-container.state.cjs');
var multiDataContainer_controller = require('./multi-data-container.controller.cjs');
var install = require('../../util/install.cjs');

"use strict";
const IBizMultiDataContainer = install.withInstall(
  multiDataContainer.MultiDataContainer,
  function(v) {
    v.component(multiDataContainer.MultiDataContainer.name, multiDataContainer.MultiDataContainer);
    runtime.registerPanelItemProvider(
      "CONTAINER_CONTAINER_MULTIDATA",
      () => new multiDataContainer_provider.MultiDataContainerProvider()
    );
  }
);

exports.MultiDataContainerState = multiDataContainer_state.MultiDataContainerState;
exports.MultiDataContainerController = multiDataContainer_controller.MultiDataContainerController;
exports.IBizMultiDataContainer = IBizMultiDataContainer;
exports.default = IBizMultiDataContainer;
