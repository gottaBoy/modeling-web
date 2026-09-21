'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var calendarDaily = require('./calendar-daily.cjs');

"use strict";
const IBizCalendarDaily = vue3Util.withInstall(calendarDaily.CalendarDaily, function(v) {
  v.component(calendarDaily.CalendarDaily.name, calendarDaily.CalendarDaily);
});

exports.IBizCalendarDaily = IBizCalendarDaily;
exports.default = IBizCalendarDaily;
