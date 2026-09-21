'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var calendarExpBar = require('./calendar-exp-bar.cjs');
var calendarExpBar_provider = require('./calendar-exp-bar.provider.cjs');

"use strict";
const IBizCalendarExpBarControl = vue3Util.withInstall(
  calendarExpBar.CalendarExpBarControl,
  function(v) {
    v.component(calendarExpBar.CalendarExpBarControl.name, calendarExpBar.CalendarExpBarControl);
    runtime.registerControlProvider(
      runtime.ControlType.CALENDAR_EXPBAR,
      () => new calendarExpBar_provider.CalendarExpBarProvider()
    );
  }
);

exports.IBizCalendarExpBarControl = IBizCalendarExpBarControl;
exports.default = IBizCalendarExpBarControl;
