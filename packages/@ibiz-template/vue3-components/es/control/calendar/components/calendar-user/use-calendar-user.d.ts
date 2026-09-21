import { ICalendarItemData } from '@ibiz-template/runtime';
/**
 * 计算本周的时间
 *
 * @export
 * @param {Date} date
 * @return {*}  {IData[]}
 */
export declare function calcCurWeek(date: Date): IData[];
/**
 * 获取一天的所有小时时刻
 *
 * @export
 * @return {*}  {IData[]}
 */
export declare function getDayTime(): IData[];
export declare function calcCurtimeEvents(events: ICalendarItemData[], week: IData, time?: IData): ICalendarItemData[];
