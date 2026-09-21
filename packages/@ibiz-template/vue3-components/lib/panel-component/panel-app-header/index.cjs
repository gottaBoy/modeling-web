'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var panelAppHeader = require('./panel-app-header.cjs');
var panelAppHeader_provider = require('./panel-app-header.provider.cjs');

"use strict";
const IBizPanelAppHeader = vue3Util.withInstall(
  panelAppHeader.PanelAppHeader,
  function(v) {
    v.component(panelAppHeader.PanelAppHeader.name, panelAppHeader.PanelAppHeader);
    runtime.registerPanelItemProvider(
      "CONTAINER_AppHeader",
      () => new panelAppHeader_provider.PanelAppHeaderProvider()
    );
  }
);

exports.IBizPanelAppHeader = IBizPanelAppHeader;
exports.default = IBizPanelAppHeader;
