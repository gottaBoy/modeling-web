import { ICalendarExpBar, ISysCalendarItem } from '@ibiz/model-core';
import { INavViewMsg, ICalendarItemData, ICalendarController, ICalendarExpBarState, ICalendarExpBarEvent, ICalendarExpBarController } from '../../../interface';
import { ExpBarControlController } from './exp-bar.controller';
/**
 * 日历导航栏控制器
 *
 * @export
 * @class CalendarExpBarController
 * @extends {ExpBarControlController<ICalendarExpBar, ICalendarExpBarState, ICalendarExpBarEvent>}
 * @implements {ICalendarExpBarController}
 */
export declare class CalendarExpBarController extends ExpBarControlController<ICalendarExpBar, ICalendarExpBarState, ICalendarExpBarEvent> implements ICalendarExpBarController {
    /**
     * 导航栏key名称 默认srfkey 多导航视图类 由子类重写
     *
     * @author zk
     * @date 2023-07-10 03:07:53
     * @memberof ExpBarControlController
     */
    navKeyName: 'navId';
    protected getCalendarItemModel(itemTypeName: string): ISysCalendarItem | undefined;
    get xDataController(): ICalendarController | undefined;
    navBySrfnav(): void;
    /**
     * @description 根据栈数据导航
     * - 特殊处理仅使用开始时间绘制的日历
     * @memberof CalendarExpBarController
     */
    navDataByStack(): void;
    /**
     *  获取导航视图
     *
     * @author zk
     * @date 2023-06-29 03:06:41
     * @param {IDETabViewPanel} tabViewPanel
     * @return {*}  {Promise<INavViewMsg>}
     * @memberof TabExpPanelController
     */
    getNavViewMsg(item: ICalendarItemData): INavViewMsg;
}
//# sourceMappingURL=calendar-exp-bar.controller.d.ts.map