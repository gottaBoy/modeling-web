'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var chartExpBar = require('./chart-exp-bar.cjs');
var chartExpBar_provider = require('./chart-exp-bar.provider.cjs');

"use strict";
const IBizChartExpBarControl = vue3Util.withInstall(
  chartExpBar.ChartExpBarControl,
  function(v) {
    v.component(chartExpBar.ChartExpBarControl.name, chartExpBar.ChartExpBarControl);
    runtime.registerControlProvider(
      runtime.ControlType.CHART_EXPBAR,
      () => new chartExpBar_provider.ChartExpBarProvider()
    );
  }
);

exports.IBizChartExpBarControl = IBizChartExpBarControl;
exports.default = IBizChartExpBarControl;
