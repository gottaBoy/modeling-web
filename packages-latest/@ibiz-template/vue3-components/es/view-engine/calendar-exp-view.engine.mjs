import { ExpViewEngine } from './exp-view.engine.mjs';

"use strict";
class CalendarExpViewEngine extends ExpViewEngine {
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

export { CalendarExpViewEngine };
