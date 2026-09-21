'use strict';

var expView_engine = require('./exp-view.engine.cjs');

"use strict";
class ListExpViewEngine extends expView_engine.ExpViewEngine {
  /**
   * 列表导航栏部件名称
   *
   * @author zk
   * @date 2023-05-30 06:05:21
   * @readonly
   * @type {string}
   * @memberof ListExpViewEngine
   */
  get expBarName() {
    return "listexpbar";
  }
}

exports.ListExpViewEngine = ListExpViewEngine;
