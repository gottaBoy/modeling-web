'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var viewLayoutPanel = require('./view-layout-panel.cjs');
var viewLayoutPanel_provider = require('./view-layout-panel.provider.cjs');
require('../../../util/index.cjs');
var install = require('../../../util/install.cjs');

"use strict";
const IBizViewLayoutPanelControl = install.withInstall(
  viewLayoutPanel.ViewLayoutPanelControl,
  function(v) {
    v.component(viewLayoutPanel.ViewLayoutPanelControl.name, viewLayoutPanel.ViewLayoutPanelControl);
    runtime.registerControlProvider(
      runtime.ControlType.VIEW_LAYOUT_PANEL,
      () => new viewLayoutPanel_provider.ViewLayoutPanelProvider()
    );
  }
);

exports.IBizViewLayoutPanelControl = IBizViewLayoutPanelControl;
exports.default = IBizViewLayoutPanelControl;
