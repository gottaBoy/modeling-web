'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
require('../../util/index.cjs');
var gridContainer = require('./grid-container.cjs');
var gridContainer_provider = require('./grid-container.provider.cjs');
var gridContainer_state = require('./grid-container.state.cjs');
var gridContainer_controller = require('./grid-container.controller.cjs');
var install = require('../../util/install.cjs');

"use strict";
const IBizGridContainer = install.withInstall(gridContainer.GridContainer, function(v) {
  v.component(gridContainer.GridContainer.name, gridContainer.GridContainer);
  runtime.registerPanelItemProvider(
    "CONTAINER_CONTAINER_GRID",
    () => new gridContainer_provider.GridContainerProvider()
  );
});

exports.GridContainerState = gridContainer_state.GridContainerState;
exports.GridContainerController = gridContainer_controller.GridContainerController;
exports.IBizGridContainer = IBizGridContainer;
exports.default = IBizGridContainer;
