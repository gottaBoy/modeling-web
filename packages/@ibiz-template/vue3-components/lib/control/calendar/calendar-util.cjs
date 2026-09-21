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

exports.getWeekRange = getWeekRange;
exports.isTimeBetween = isTimeBetween;
