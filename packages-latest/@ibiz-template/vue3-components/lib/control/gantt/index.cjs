'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var gantt = require('./gantt.cjs');
var gantt_provider = require('./gantt.provider.cjs');

"use strict";
const IBizGanttControl = vue3Util.withInstall(gantt.GanttControl, function(v) {
  v.component(gantt.GanttControl.name, gantt.GanttControl);
  runtime.registerControlProvider(runtime.ControlType.GANTT, () => new gantt_provider.GanttProvider());
});

exports.IBizGanttControl = IBizGanttControl;
exports.default = IBizGanttControl;
