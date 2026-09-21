import dayjs from 'dayjs';

"use strict";
function calcCurWeek(date) {
  const weeks = [];
  const day = date.getDay();
  let monday;
  if (day === 0) {
    const tempval = date.getTime() - 6 * 24 * 60 * 60 * 1e3;
    monday = new Date(tempval);
  } else {
    const tempval = date.getTime() - (day - 1) * 24 * 60 * 60 * 1e3;
    monday = new Date(tempval);
  }
  const texts = [
    ibiz.i18n.t("control.calendar.calendarUser.weeks.monday"),
    ibiz.i18n.t("control.calendar.calendarUser.weeks.tuesday"),
    ibiz.i18n.t("control.calendar.calendarUser.weeks.wednesday"),
    ibiz.i18n.t("control.calendar.calendarUser.weeks.thursday"),
    ibiz.i18n.t("control.calendar.calendarUser.weeks.friday"),
    ibiz.i18n.t("control.calendar.calendarUser.weeks.saturday"),
    ibiz.i18n.t("control.calendar.calendarUser.weeks.sunday")
  ];
  for (let i = 0; i < 7; i++) {
    const time = i * 24 * 60 * 60 * 1e3;
    weeks.push({
      text: texts[i],
      date: dayjs(new Date(monday.getTime() + time)).format("MM/DD")
    });
  }
  return weeks;
}
function getDayTime() {
  const times = [];
  for (let i = 0; i < 24; i++) {
    times.push({
      time: i,
      text: "".concat(i, ":00")
    });
  }
  return times;
}
function calcCurtimeEvents(events, week, time) {
  const weekDayEvent = events.filter((event) => {
    return dayjs(new Date(event.beginTime)).format("MM/DD") === week.date;
  }) || [];
  if (!time) {
    return weekDayEvent;
  }
  return weekDayEvent.filter((event) => {
    const eventTime = new Date(event.beginTime).getHours();
    if (eventTime === time.time) {
      return true;
    }
    return false;
  });
}

export { calcCurWeek, calcCurtimeEvents, getDayTime };
