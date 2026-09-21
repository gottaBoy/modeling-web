'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var meditViewPanel = require('./medit-view-panel.cjs');
var meditViewPanel_provider = require('./medit-view-panel.provider.cjs');

"use strict";
const IBizMEditViewPanelControl = vue3Util.withInstall(
  meditViewPanel.MEditViewPanelControl,
  function(v) {
    v.component(meditViewPanel.MEditViewPanelControl.name, meditViewPanel.MEditViewPanelControl);
    runtime.registerControlProvider(
      runtime.ControlType.MULTI_EDIT_VIEWPANEL,
      () => new meditViewPanel_provider.MEditViewPanelProvider()
    );
  }
);

exports.IBizMEditViewPanelControl = IBizMEditViewPanelControl;
exports.default = IBizMEditViewPanelControl;
