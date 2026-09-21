'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var calendarWeek = require('./calendar-week.cjs');

"use strict";
const IBizCalendarWeek = vue3Util.withInstall(calendarWeek.CalendarWeek, function(v) {
  v.component(calendarWeek.CalendarWeek.name, calendarWeek.CalendarWeek);
});

exports.IBizCalendarWeek = IBizCalendarWeek;
exports.default = IBizCalendarWeek;
