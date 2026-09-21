'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var panel = require('./panel.cjs');
var panel_provider = require('./panel.provider.cjs');
require('../../../util/index.cjs');
var install = require('../../../util/install.cjs');

"use strict";
const IBizPanelControl = install.withInstall(panel.PanelControl, function(v) {
  v.component(panel.PanelControl.name, panel.PanelControl);
  runtime.registerControlProvider(runtime.ControlType.PANEL, () => new panel_provider.PanelProvider());
});

exports.IBizPanelControl = IBizPanelControl;
exports.default = IBizPanelControl;
