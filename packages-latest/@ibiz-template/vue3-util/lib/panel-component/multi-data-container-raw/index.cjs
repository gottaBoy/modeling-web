'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
require('../../util/index.cjs');
var multiDataContainerRaw = require('./multi-data-container-raw.cjs');
var multiDataContainerRaw_provider = require('./multi-data-container-raw.provider.cjs');
var multiDataContainerRaw_state = require('./multi-data-container-raw.state.cjs');
var multiDataContainerRaw_controller = require('./multi-data-container-raw.controller.cjs');
var install = require('../../util/install.cjs');

"use strict";
const IBizMultiDataContainerRaw = install.withInstall(
  multiDataContainerRaw.MultiDataContainerRaw,
  function(v) {
    v.component(multiDataContainerRaw.MultiDataContainerRaw.name, multiDataContainerRaw.MultiDataContainerRaw);
    runtime.registerPanelItemProvider(
      "CONTAINER_CONTAINER_MULTIDATA_RAW",
      () => new multiDataContainerRaw_provider.MultiDataContainerRawProvider()
    );
  }
);

exports.MultiDataContainerRawState = multiDataContainerRaw_state.MultiDataContainerRawState;
exports.MultiDataContainerRawController = multiDataContainerRaw_controller.MultiDataContainerRawController;
exports.IBizMultiDataContainerRaw = IBizMultiDataContainerRaw;
exports.default = IBizMultiDataContainerRaw;
