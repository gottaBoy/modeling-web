import { IApiCalendarGroup, IApiCalendarState, IApiCalendarItemData } from '../../../api';
import { IApiLegend } from '../../../api/state/control/i-api-calendar.state';
import { IMDControlState } from './i-md-control.state';
/**
 * @description 日历分组数据接口
 * @export
 * @interface ICalendarGroup
 * @extends {IApiCalendarGroup}
 */
export interface ICalendarGroup extends IApiCalendarGroup {
}
/**
 * @description 图例项数据接口
 * @export
 * @interface ILegend
 * @extends {IApiLegend}
 */
export interface ILegend extends IApiLegend {
}
/**
 * @description  日历部件状态接口
 * @export
 * @interface ICalendarState
 * @extends {IMDControlState}
 * @extends {IApiCalendarState}
 */
export interface ICalendarState extends IMDControlState, IApiCalendarState {
    /**
     * @description 日历项数据
     * @type {IApiCalendarItemData[]}
     * @memberof ICalendarState
     */
    items: ICalendarItemData[];
    /**
     * @description 日历分组数据
     * @type {ICalendarGroup[]}
     * @memberof ICalendarState
     */
    groups: ICalendarGroup[];
    /**
     * @description 是否弹框显示详情
     * @type {boolean}
     * @memberof ICalendarState
     */
    showDetail: boolean;
    /**
     * @description 图例项
     * @type {ILegend[]}
     * @memberof ICalendarState
     */
    legends: ILegend[];
}
/**
 * @description 日历项数据接口
 * @export
 * @interface ICalendarItemData
 */
export interface ICalendarItemData extends IApiCalendarItemData {
}
//# sourceMappingURL=i-calendar.state.d.ts.map