'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class ChartExpViewEngine extends runtime.ViewEngineBase {
  /**
   * 图表导航栏
   *
   * @readonly
   * @memberof ChartExpViewEngine
   */
  get chartExpBar() {
    return this.view.getController("chartexpbar");
  }
  async onCreated() {
    await super.onCreated();
    const { childNames } = this.view;
    childNames.push("chartexpbar");
    if (!this.view.slotProps.chartexpbar) {
      this.view.slotProps.chartexpbar = {};
    }
    this.view.slotProps.chartexpbar.srfnav = this.view.state.srfnav;
  }
}

exports.ChartExpViewEngine = ChartExpViewEngine;
