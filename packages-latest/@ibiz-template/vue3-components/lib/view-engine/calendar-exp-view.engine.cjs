'use strict';

var expView_engine = require('./exp-view.engine.cjs');

"use strict";
class CalendarExpViewEngine extends expView_engine.ExpViewEngine {
  /**
   * @description 导航栏部件名称
   * @readonly
   * @type {string}
   * @memberof CalendarExpViewEngine
   */
  get expBarName() {
    return "calendarexpbar";
  }
}

exports.CalendarExpViewEngine = CalendarExpViewEngine;
