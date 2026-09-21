'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var calendar = require('./calendar.cjs');
var calendar_provider = require('./calendar.provider.cjs');
var index = require('./components/custom-calendar/index.cjs');

"use strict";
const IBizCalendarControl = vue3Util.withInstall(
  calendar.CalendarControl,
  function(v) {
    v.use(index.IBizCustomCalendar);
    v.component(calendar.CalendarControl.name, calendar.CalendarControl);
    runtime.registerControlProvider(runtime.ControlType.CALENDAR, () => new calendar_provider.CalendarProvider());
  }
);

exports.IBizCalendarControl = IBizCalendarControl;
exports.default = IBizCalendarControl;
