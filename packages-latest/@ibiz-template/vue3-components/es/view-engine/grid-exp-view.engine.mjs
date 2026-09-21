import { ExpViewEngine } from './exp-view.engine.mjs';

"use strict";
class GridExpViewEngine extends ExpViewEngine {
  /**
   * 表格导航栏部件名称
   *
   * @author zk
   * @date 2023-05-30 06:05:21
   * @readonly
   * @type {string}
   * @memberof GridExpViewEngine
   */
  get expBarName() {
    return "gridexpbar";
  }
}

export { GridExpViewEngine };
