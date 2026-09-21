import { IDECalendar } from './idecalendar';
import { ISysCalendarItem } from './isys-calendar-item';

/**
 *
 * 系统日历部件模型对象接口
 * 继承父接口类型值[CALENDAR]
 * @export
 * @interface ISysCalendar
 */
export interface ISysCalendar extends IDECalendar {
  /**
   * 日历项集合
   *
   * @type {ISysCalendarItem[]}
   * 来源  getPSSysCalendarItems
   */
  sysCalendarItems?: ISysCalendarItem[];
}
