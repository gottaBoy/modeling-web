'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var panelViewHeader = require('./panel-view-header.cjs');
var panelViewHeader_provider = require('./panel-view-header.provider.cjs');

"use strict";
const IBizPanelViewHeader = vue3Util.withInstall(
  panelViewHeader.PanelViewHeader,
  function(v) {
    v.component(panelViewHeader.PanelViewHeader.name, panelViewHeader.PanelViewHeader);
    runtime.registerPanelItemProvider(
      "CONTAINER_ViewHeader",
      () => new panelViewHeader_provider.PanelViewHeaderProvider()
    );
  }
);

exports.IBizPanelViewHeader = IBizPanelViewHeader;
exports.default = IBizPanelViewHeader;
