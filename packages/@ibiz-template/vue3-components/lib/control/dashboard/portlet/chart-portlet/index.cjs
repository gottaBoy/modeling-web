'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var chartPortlet = require('./chart-portlet.cjs');
var chartPortlet_provider = require('./chart-portlet.provider.cjs');

"use strict";
const IBizChartPortlet = vue3Util.withInstall(chartPortlet.ChartPortlet, function(v) {
  v.component(chartPortlet.ChartPortlet.name, chartPortlet.ChartPortlet);
  runtime.registerPortletProvider("CHART", () => new chartPortlet_provider.ChartPortletProvider());
});

exports.ChartPortlet = chartPortlet.ChartPortlet;
exports.IBizChartPortlet = IBizChartPortlet;
exports.default = IBizChartPortlet;
