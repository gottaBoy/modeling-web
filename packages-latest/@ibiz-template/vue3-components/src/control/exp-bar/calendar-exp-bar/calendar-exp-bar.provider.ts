import { IControlProvider } from '@ibiz-template/runtime';

/**
 * 日历导航栏适配器
 *
 * @export
 * @class CalendarExpBarProvider
 * @implements {IControlProvider}
 */
export class CalendarExpBarProvider implements IControlProvider {
  component: string = 'IBizCalendarExpBarControl';
}
