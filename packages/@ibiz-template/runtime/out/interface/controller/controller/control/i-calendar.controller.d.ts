import { IDECalendar } from '@ibiz/model-core';
import { ICalendarEvent } from '../../event';
import { ICalendarState } from '../../state';
import { IMDControlController } from './i-md-control.controller';
/**
 * 日历部件控制器
 * @author lxm
 * @date 2023-05-04 01:47:16
 * @export
 * @interface ICalendarController
 * @extends {IMDControlController}
 */
export interface ICalendarController extends IMDControlController<IDECalendar, ICalendarState, ICalendarEvent> {
    /**
     * 设置选中日期
     *
     * @author zk
     * @date 2023-08-08 11:08:24
     * @param {Date} date
     * @memberof ICalendarController
     */
    setSelectDate(date: Date): void;
}
//# sourceMappingURL=i-calendar.controller.d.ts.map