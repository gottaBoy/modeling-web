'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var biReportPanel = require('./bi-report-panel.cjs');

"use strict";
const IBizBIReportPanel = vue3Util.withInstall(biReportPanel.BIReportPanel, function(v) {
  v.component(biReportPanel.BIReportPanel.name, biReportPanel.BIReportPanel);
});

exports.IBizBIReportPanel = IBizBIReportPanel;
exports.default = IBizBIReportPanel;
