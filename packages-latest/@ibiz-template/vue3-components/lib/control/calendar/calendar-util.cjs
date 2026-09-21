'use strict';

var dayjs = require('dayjs');

"use strict";
const getWeekRange = (date) => {
  const today = dayjs(date);
  const lastSunday = today.startOf("week");
  const thisSaturday = today.endOf("week");
  const daysArray = [];
  let currentDay = lastSunday;
  while (currentDay.isBefore(thisSaturday) || currentDay.isSame(thisSaturday, "day")) {
    daysArray.push(currentDay);
    currentDay = currentDay.add(1, "day");
  }
  return daysArray;
};
const isTimeBetween = (_argrs) => {
  const { date, beginTime, endTime, unit = "day" } = _argrs;
  return !!(beginTime && dayjs(date).isSame(beginTime, unit) || endTime && dayjs(date).isSame(endTime, unit) || beginTime && endTime && dayjs(date).isAfter(beginTime, unit) && dayjs(date).isBefore(endTime, unit));
};
function useCalendarLegend(ns) {
  const getVarValue = (varName) => {
    const root = document.documentElement;
    return getComputedStyle(root).getPropertyValue(varName);
  };
  const bgColors = [
    // 首个颜色用主题色
    getVarValue("".concat(ns.cssVarName("color-primary"))),
    "#2196F3",
    "#4CAF50",
    "#3F51B5",
    "#FF9800",
    "#673AB7",
    "#757575"
  ];
  const actBdrColors = bgColors.map(
    () => getVarValue("".concat(ns.cssVarName("color-black")))
  );
  const getBkColor = (_index) => {
    return bgColors[_index % bgColors.length] || bgColors[0];
  };
  const getActBdrColors = (_index) => {
    return actBdrColors[_index] || getVarValue("".concat(ns.cssVarName("color-primary")));
  };
  const getFontColor = () => {
    return getVarValue("".concat(ns.cssVarName("color-primary-text")));
  };
  return { getFontColor, getBkColor, getActBdrColors };
}

exports.getWeekRange = getWeekRange;
exports.isTimeBetween = isTimeBetween;
exports.useCalendarLegend = useCalendarLegend;
