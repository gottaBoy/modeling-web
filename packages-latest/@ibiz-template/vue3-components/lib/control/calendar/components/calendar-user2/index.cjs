'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var calendarUser2 = require('./calendar-user2.cjs');

"use strict";
const IBizCalendarUser2 = vue3Util.withInstall(calendarUser2.CalendarUser2, (v) => {
  v.component(calendarUser2.CalendarUser2.name, calendarUser2.CalendarUser2);
});

exports.IBizCalendarUser2 = IBizCalendarUser2;
exports.default = IBizCalendarUser2;
