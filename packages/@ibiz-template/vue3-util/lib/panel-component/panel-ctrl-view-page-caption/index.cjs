'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
require('../../util/index.cjs');
var panelCtrlViewPageCaption = require('./panel-ctrl-view-page-caption.cjs');
var panelCtrlViewPageCaption_provider = require('./panel-ctrl-view-page-caption.provider.cjs');
var install = require('../../util/install.cjs');

"use strict";
const IBizPanelCtrlViewPageCaption = install.withInstall(
  panelCtrlViewPageCaption.PanelCtrlViewPageCaption,
  function(v) {
    v.component(panelCtrlViewPageCaption.PanelCtrlViewPageCaption.name, panelCtrlViewPageCaption.PanelCtrlViewPageCaption);
    runtime.registerPanelItemProvider(
      "CTRLPOS_VIEW_PAGECAPTION",
      () => new panelCtrlViewPageCaption_provider.PanelCtrlViewPageProvider()
    );
  }
);

exports.IBizPanelCtrlViewPageCaption = IBizPanelCtrlViewPageCaption;
exports.default = IBizPanelCtrlViewPageCaption;
