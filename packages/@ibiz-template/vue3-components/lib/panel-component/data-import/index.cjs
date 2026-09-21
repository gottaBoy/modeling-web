'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var dataImportShell = require('./data-import-shell.cjs');
var dataImport_provider = require('./data-import.provider.cjs');

"use strict";
const IBizDataImport = vue3Util.withInstall(dataImportShell.DataImportShell, function(v) {
  v.component(dataImportShell.DataImportShell.name, dataImportShell.DataImportShell);
  runtime.registerPanelItemProvider(
    "RAWITEM_DATA_IMPORT",
    () => new dataImport_provider.DataImportProvider()
  );
});

exports.IBizDataImport = IBizDataImport;
exports.default = IBizDataImport;
