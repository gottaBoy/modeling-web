'use strict';

var expView_engine = require('./exp-view.engine.cjs');

"use strict";
class ChartExpViewEngine extends expView_engine.ExpViewEngine {
  /**
   * @description 导航栏部件名称
   * @readonly
   * @type {string}
   * @memberof ChartExpViewEngine
   */
  get expBarName() {
    return "chartexpbar";
  }
}

exports.ChartExpViewEngine = ChartExpViewEngine;
