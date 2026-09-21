'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
require('../../util/index.cjs');
var panelItemRender = require('./panel-item-render.cjs');
var panelItemRender_provider = require('./panel-item-render.provider.cjs');
var install = require('../../util/install.cjs');

"use strict";
const IBizPanelItemRender = install.withInstall(
  panelItemRender.PanelItemRender,
  function(v) {
    v.component(panelItemRender.PanelItemRender.name, panelItemRender.PanelItemRender);
    runtime.registerPanelItemProvider(
      "PREDEFINE_RENDER",
      () => new panelItemRender_provider.PanelItemRenderProvider()
    );
  }
);

exports.IBizPanelItemRender = IBizPanelItemRender;
exports.default = IBizPanelItemRender;
