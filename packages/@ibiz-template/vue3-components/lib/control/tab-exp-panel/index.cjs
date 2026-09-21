'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var tabExpPanel = require('./tab-exp-panel.cjs');
var tabExpPanel_provider = require('./tab-exp-panel.provider.cjs');

"use strict";
const IBizTabExpPanelControl = vue3Util.withInstall(
  tabExpPanel.TabExpPanelControl,
  function(v) {
    v.component(tabExpPanel.TabExpPanelControl.name, tabExpPanel.TabExpPanelControl);
    runtime.registerControlProvider(
      runtime.ControlType.TAB_EXP_PANEL,
      () => new tabExpPanel_provider.TabExpPanelProvider()
    );
  }
);

exports.IBizTabExpPanelControl = IBizTabExpPanelControl;
exports.default = IBizTabExpPanelControl;
