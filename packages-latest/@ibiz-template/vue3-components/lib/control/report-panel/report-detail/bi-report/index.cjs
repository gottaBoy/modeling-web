'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var biReport = require('./bi-report.cjs');

"use strict";
const IBizBIReport = vue3Util.withInstall(biReport.BIReport, (v) => {
  v.component(biReport.BIReport.name, biReport.BIReport);
});

exports.IBizBIReport = IBizBIReport;
exports.default = IBizBIReport;
