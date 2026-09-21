'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var panelExpHeader = require('./panel-exp-header.cjs');
var panelExpHeader_provider = require('./panel-exp-header.provider.cjs');

"use strict";
const IBizPanelExpHeader = vue3Util.withInstall(
  panelExpHeader.PanelExpHeader,
  function(v) {
    v.component(panelExpHeader.PanelExpHeader.name, panelExpHeader.PanelExpHeader);
    runtime.registerPanelItemProvider(
      "CONTAINER_Exp_Header",
      () => new panelExpHeader_provider.PanelExpHeaderProvider()
    );
  }
);

exports.IBizPanelExpHeader = IBizPanelExpHeader;
exports.default = IBizPanelExpHeader;
