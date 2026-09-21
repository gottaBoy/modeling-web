'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var viewPanel = require('./view-panel.cjs');
var viewPanel_provider = require('./view-panel.provider.cjs');

"use strict";
const IBizViewPanelControl = vue3Util.withInstall(
  viewPanel.ViewPanelControl,
  function(v) {
    v.component(viewPanel.ViewPanelControl.name, viewPanel.ViewPanelControl);
    runtime.registerControlProvider(
      runtime.ControlType.VIEWPANEL,
      () => new viewPanel_provider.ViewPanelProvider()
    );
  }
);

exports.IBizViewPanelControl = IBizViewPanelControl;
exports.default = IBizViewPanelControl;
