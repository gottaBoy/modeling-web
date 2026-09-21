'use strict';

var util = require('./util.cjs');
var lodashEs = require('lodash-es');

"use strict";

exports.checkDateRangeIncludes = util.checkDateRangeIncludes;
exports.closeIcon = util.closeIcon;
exports.createFollowElement = util.createFollowElement;
exports.definePropType = util.definePropType;
exports.epPropKey = util.epPropKey;
exports.fade = util.fade;
exports.followMouseMove = util.followMouseMove;
exports.getCurWeekDates = util.getCurWeekDates;
exports.handleBkColor = util.handleBkColor;
exports.handleEVentClick = util.handleEVentClick;
exports.handleEmit = util.handleEmit;
exports.handlePopClose = util.handlePopClose;
exports.handleProps = util.handleProps;
exports.handleTimeRange = util.handleTimeRange;
exports.isDateInCurWeek = util.isDateInCurWeek;
exports.isTimeGreaterThan = util.isTimeGreaterThan;
exports.isToday = util.isToday;
exports.isValidRange = util.isValidRange;
exports.openPopover = util.openPopover;
exports.rangeArr = util.rangeArr;
exports.removeFollowElement = util.removeFollowElement;
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
