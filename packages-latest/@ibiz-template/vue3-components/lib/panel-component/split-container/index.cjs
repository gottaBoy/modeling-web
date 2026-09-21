'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var splitContainer = require('./split-container.cjs');
var splitContainer_provider = require('./split-container.provider.cjs');
var splitContainer_controller = require('./split-container.controller.cjs');

"use strict";
const IBizSplitContainer = vue3Util.withInstall(
  splitContainer.SplitContainer,
  function(v) {
    v.component(splitContainer.SplitContainer.name, splitContainer.SplitContainer);
    runtime.registerPanelItemProvider(
      "CONTAINER_CONTAINER_H_SPLIT",
      () => new splitContainer_provider.SplitContainerProvider()
    );
    runtime.registerPanelItemProvider(
      "CONTAINER_CONTAINER_V_SPLIT",
      () => new splitContainer_provider.SplitContainerProvider()
    );
  }
);

exports.SplitContainerController = splitContainer_controller.SplitContainerController;
exports.IBizSplitContainer = IBizSplitContainer;
exports.default = IBizSplitContainer;
