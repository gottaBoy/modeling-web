'use strict';

var util = require('./util.cjs');
var lodashEs = require('lodash-es');

"use strict";

exports.closeIcon = util.closeIcon;
exports.definePropType = util.definePropType;
exports.epPropKey = util.epPropKey;
exports.fade = util.fade;
exports.getCurWeekDates = util.getCurWeekDates;
exports.handleBkColor = util.handleBkColor;
exports.handleEVentClick = util.handleEVentClick;
exports.handlePopClose = util.handlePopClose;
exports.handleProps = util.handleProps;
exports.handleTimeRange = util.handleTimeRange;
exports.isDateInCurWeek = util.isDateInCurWeek;
exports.isTimeGreaterThan = util.isTimeGreaterThan;
exports.isToday = util.isToday;
exports.isValidRange = util.isValidRange;
exports.rangeArr = util.rangeArr;
Object.defineProperty(exports, "get", {
	enumerable: true,
	get: function () { return lodashEs.get; }
});
Object.defineProperty(exports, "isArray", {
	enumerable: true,
	get: function () { return lodashEs.isArray; }
});
Object.defineProperty(exports, "isDate", {
	enumerable: true,
	get: function () { return lodashEs.isDate; }
});
Object.defineProperty(exports, "isObject", {
	enumerable: true,
	get: function () { return lodashEs.isObject; }
});
Object.defineProperty(exports, "set", {
	enumerable: true,
	get: function () { return lodashEs.set; }
});
