'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var calendarUser = require('./calendar-user.cjs');

"use strict";
const IBizCalendarUser = vue3Util.withInstall(calendarUser.CalendarUser, function(v) {
  v.component(calendarUser.CalendarUser.name, calendarUser.CalendarUser);
});

exports.IBizCalendarUser = IBizCalendarUser;
exports.default = IBizCalendarUser;
