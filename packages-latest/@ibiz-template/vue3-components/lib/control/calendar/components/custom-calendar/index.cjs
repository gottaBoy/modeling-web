'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var customCalendar = require('./custom-calendar.cjs');

"use strict";
const IBizCustomCalendar = vue3Util.withInstall(
  customCalendar.CustomCalendar,
  function(v) {
    v.component(customCalendar.CustomCalendar.name, customCalendar.CustomCalendar);
  }
);

exports.IBizCustomCalendar = IBizCustomCalendar;
exports.default = IBizCustomCalendar;
