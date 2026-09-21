import { ExpViewEngine } from './exp-view.engine.mjs';

"use strict";
class ChartExpViewEngine extends ExpViewEngine {
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

export { ChartExpViewEngine };
