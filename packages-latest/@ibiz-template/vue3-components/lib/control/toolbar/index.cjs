'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var toolbar = require('./toolbar.cjs');
var exportExcel = require('./export-excel/export-excel.cjs');
var shortCutButton = require('./short-cut-button/short-cut-button.cjs');
var toolbar_provider = require('./toolbar.provider.cjs');

"use strict";
const IBizToolbarControl = vue3Util.withInstall(
  toolbar.ToolbarControl,
  function(v) {
    v.component(toolbar.ToolbarControl.name, toolbar.ToolbarControl);
    v.component(exportExcel.IBizExportExcel.name, exportExcel.IBizExportExcel);
    v.component(shortCutButton.IBizShortCutButton.name, shortCutButton.IBizShortCutButton);
    runtime.registerControlProvider(runtime.ControlType.TOOLBAR, () => new toolbar_provider.ToolbarProvider());
  }
);

exports.IBizToolbarControl = IBizToolbarControl;
exports.default = IBizToolbarControl;
