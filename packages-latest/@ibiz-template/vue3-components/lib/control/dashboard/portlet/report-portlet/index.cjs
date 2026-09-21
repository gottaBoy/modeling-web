'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var reportPortlet = require('./report-portlet.cjs');
var reportPortlet_provider = require('./report-portlet.provider.cjs');

"use strict";
const IBizReportPortlet = vue3Util.withInstall(reportPortlet.ReportPortlet, function(v) {
  v.component(reportPortlet.ReportPortlet.name, reportPortlet.ReportPortlet);
  runtime.registerPortletProvider("REPORT", () => new reportPortlet_provider.ReportPortletProvider());
});

exports.ReportPortlet = reportPortlet.ReportPortlet;
exports.IBizReportPortlet = IBizReportPortlet;
exports.default = IBizReportPortlet;
