'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
require('../../util/index.cjs');
var scrollContainerItem = require('./scroll-container-item/scroll-container-item.cjs');
var scrollContainerItem_provider = require('./scroll-container-item/scroll-container-item.provider.cjs');
var scrollContainer = require('./scroll-container/scroll-container.cjs');
var scrollContainer_provider = require('./scroll-container/scroll-container.provider.cjs');
require('./scroll-container/index.cjs');
require('./scroll-container-item/index.cjs');
var install = require('../../util/install.cjs');
var scrollContainer_controller = require('./scroll-container/scroll-container.controller.cjs');
var scrollContainerItem_controller = require('./scroll-container-item/scroll-container-item.controller.cjs');

"use strict";
const IBizScrollContainer = install.withInstall(
  scrollContainer.ScrollContainer,
  function(v) {
    v.component(scrollContainer.ScrollContainer.name, scrollContainer.ScrollContainer);
    v.component(scrollContainerItem.ScrollContainerItem.name, scrollContainerItem.ScrollContainerItem);
    runtime.registerPanelItemProvider(
      "CONTAINER_CONTAINER_SCROLL",
      () => new scrollContainer_provider.ScrollContainerProvider()
    );
    runtime.registerPanelItemProvider(
      "CONTAINER_CONTAINER_SCROLL_LEFT",
      () => new scrollContainerItem_provider.ScrollContainerItemProvider()
    );
    runtime.registerPanelItemProvider(
      "CONTAINER_CONTAINER_SCROLL_HEADER",
      () => new scrollContainerItem_provider.ScrollContainerItemProvider()
    );
    runtime.registerPanelItemProvider(
      "CONTAINER_CONTAINER_SCROLL_RIGHT",
      () => new scrollContainerItem_provider.ScrollContainerItemProvider()
    );
    runtime.registerPanelItemProvider(
      "CONTAINER_CONTAINER_SCROLL_BOTTOM",
      () => new scrollContainerItem_provider.ScrollContainerItemProvider()
    );
    runtime.registerPanelItemProvider(
      "CONTAINER_CONTAINER_SCROLL_MAIN",
      () => new scrollContainerItem_provider.ScrollContainerItemProvider()
    );
  }
);

exports.ScrollContainerItem = scrollContainerItem.ScrollContainerItem;
exports.ScrollContainer = scrollContainer.ScrollContainer;
exports.ScrollContainerController = scrollContainer_controller.ScrollContainerController;
exports.ScrollContainerItemController = scrollContainerItem_controller.ScrollContainerItemController;
exports.IBizScrollContainer = IBizScrollContainer;
exports.default = IBizScrollContainer;
