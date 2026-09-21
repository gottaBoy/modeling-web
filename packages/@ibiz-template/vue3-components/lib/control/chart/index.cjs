'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var vue = require('vue');
var chart_provider = require('./chart.provider.cjs');

"use strict";
const IBizChartControl = {
  install(v) {
    v.component(
      "IBizChartControl",
      vue.defineAsyncComponent({
        loader: () => Promise.resolve().then(function () { return require('./chart.cjs'); }),
        loadingComponent: vue3Util.ControlLoadingPlaceholder,
        delay: 0
      })
    );
    runtime.registerControlProvider(runtime.ControlType.CHART, () => new chart_provider.ChartProvider());
  }
};

exports.IBizChartControl = IBizChartControl;
exports.default = IBizChartControl;
