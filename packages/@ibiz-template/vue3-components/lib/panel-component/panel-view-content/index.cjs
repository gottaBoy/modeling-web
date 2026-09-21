'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var panelViewContent = require('./panel-view-content.cjs');
var panelViewContent_provider = require('./panel-view-content.provider.cjs');

"use strict";
const IBizPanelViewContent = vue3Util.withInstall(
  panelViewContent.PanelViewContent,
  function(v) {
    v.component(panelViewContent.PanelViewContent.name, panelViewContent.PanelViewContent);
    runtime.registerPanelItemProvider(
      "CONTAINER_VIEWCONTENT",
      () => new panelViewContent_provider.PanelViewContentProvider()
    );
  }
);

exports.IBizPanelViewContent = IBizPanelViewContent;
exports.default = IBizPanelViewContent;
