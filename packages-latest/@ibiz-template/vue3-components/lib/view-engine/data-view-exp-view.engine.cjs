'use strict';

var expView_engine = require('./exp-view.engine.cjs');

"use strict";
class DataViewExpViewEngine extends expView_engine.ExpViewEngine {
  /**
   * 卡片导航视图导航栏部件名称
   *
   * @author zk
   * @date 2023-05-30 06:05:53
   * @readonly
   * @type {string}
   * @memberof DataViewExpViewEngine
   */
  get expBarName() {
    return "dataviewexpbar";
  }
}

exports.DataViewExpViewEngine = DataViewExpViewEngine;
