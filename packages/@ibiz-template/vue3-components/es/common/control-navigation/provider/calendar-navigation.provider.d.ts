import { CalendarController, ICalendarItemData, INavViewMsg } from '@ibiz-template/runtime';
import { ISysCalendar } from '@ibiz/model-core';
import { NavgationBaseProvider } from './navigation-base.provider';
/**
 * 日历导航适配器
 *
 * @export
 * @class CalendarNavigationProvider
 * @extends {NavgationBaseProvider}
 */
export declare class CalendarNavigationProvider extends NavgationBaseProvider {
    keyName: string;
    controller: CalendarController;
    model: ISysCalendar;
    onNavDataByStack(): void;
    getNavViewMsg(item: ICalendarItemData): INavViewMsg;
}
