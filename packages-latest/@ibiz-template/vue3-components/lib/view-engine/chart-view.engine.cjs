'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class ChartViewEngine extends runtime.MDViewEngine {
  /**
   * 多数据部件名称
   * @author lxm
   * @date 2023-06-07 09:17:19
   * @readonly
   * @type {string}
   */
  get xdataControlName() {
    return "chart";
  }
  get chart() {
    return this.view.getController("chart");
  }
  async onCreated() {
    await super.onCreated();
    if (!this.view.slotProps.chart) {
      this.view.slotProps.chart = {};
    }
  }
}

exports.ChartViewEngine = ChartViewEngine;
