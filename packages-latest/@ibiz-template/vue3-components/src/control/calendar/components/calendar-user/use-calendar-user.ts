import { ICalendarItemData } from '@ibiz-template/runtime';
import dayjs from 'dayjs';

/**
 * 计算本周的时间
 *
 * @export
 * @param {Date} date
 * @return {*}  {IData[]}
 */
export function calcCurWeek(date: Date): IData[] {
  const weeks: IData[] = [];
  const day = date.getDay();
  let monday;
  if (day === 0) {
    const tempval = date.getTime() - 6 * 24 * 60 * 60 * 1000;
    monday = new Date(tempval);
  } else {
    const tempval = date.getTime() - (day - 1) * 24 * 60 * 60 * 1000;
    monday = new Date(tempval);
  }
  const texts = [
    ibiz.i18n.t('control.calendar.calendarUser.weeks.monday'),
    ibiz.i18n.t('control.calendar.calendarUser.weeks.tuesday'),
    ibiz.i18n.t('control.calendar.calendarUser.weeks.wednesday'),
    ibiz.i18n.t('control.calendar.calendarUser.weeks.thursday'),
    ibiz.i18n.t('control.calendar.calendarUser.weeks.friday'),
    ibiz.i18n.t('control.calendar.calendarUser.weeks.saturday'),
    ibiz.i18n.t('control.calendar.calendarUser.weeks.sunday'),
  ];
  for (let i = 0; i < 7; i++) {
    const time = i * 24 * 60 * 60 * 1000;
    weeks.push({
      text: texts[i],
      date: dayjs(new Date(monday.getTime() + time)).format('MM/DD'),
    });
  }
  return weeks;
}

/**
 * 获取一天的所有小时时刻
 *
 * @export
 * @return {*}  {IData[]}
 */
export function getDayTime(): IData[] {
  const times: IData[] = [];
  for (let i = 0; i < 24; i++) {
    times.push({
      time: i,
      text: `${i}:00`,
    });
  }
  return times;
}

export function calcCurtimeEvents(
  events: ICalendarItemData[],
  week: IData,
  time?: IData,
): ICalendarItemData[] {
  const weekDayEvent =
    events.filter(event => {
      return dayjs(new Date(event.beginTime)).format('MM/DD') === week.date;
    }) || [];
  if (!time) {
    // 全天
    return weekDayEvent;
  }
  return weekDayEvent.filter(event => {
    const eventTime = new Date(event.beginTime).getHours();
    if (eventTime === time.time) {
      return true;
    }
    return false;
  });
}
