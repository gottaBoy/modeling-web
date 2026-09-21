import { IHttpResponse } from '@ibiz-template/core';
import { ISysCalendar } from '@ibiz/model-core';
import { ICalendarItemData } from '../../../interface';
import { MDControlService } from '../../../service/service/control/md-control.service';
/**
 * @description 更多数据项
 * @interface ILoadMoreItem
 */
export interface ILoadMoreItem {
    /**
     * @description 当前页
     * @type {number}
     * @memberof ILoadMoreItem
     */
    curPage: number;
    /**
     * @description 总页数
     * @type {number}
     * @memberof ILoadMoreItem
     */
    totalPage: number;
    /**
     * @description 日历项数据
     * @type {ICalendarItemData[]}
     * @memberof ILoadMoreItem
     */
    items: ICalendarItemData[];
}
/**
 * @description 日历查询配置
 * @export
 * @interface CalendarFetchOpts
 */
export interface CalendarFetchOpts {
    /**
     * @description 是否加载更多
     * - 时间轴类型日历默认启用
     * @type {boolean}
     * @memberof CalendarFetchOpts
     */
    isLoadMore?: boolean;
    /**
     * @description 排序属性
     * @type {('beginTime' | 'endTime')}
     * @memberof CalendarFetchOpts
     */
    sortField: 'beginTime' | 'endTime';
}
/**
 * 日历部件服务
 *
 * @author zk
 * @date 2023-08-08 10:08:54
 * @export
 * @class CalendarService
 * @extends {MDControlService<ISysCalendar>}
 */
export declare class CalendarService extends MDControlService<ISysCalendar> {
    /**
     * @description 加载更多信息数据
     * @type {{
     *     [modelId: string]: ILoadMoreItem;
     *   }}
     * @memberof CalendarService
     */
    loadMore: {
        [modelId: string]: ILoadMoreItem;
    };
    /**
     * @description 删除单条数据
     * @param {string} appDataEntityId 实体标识
     * @param {IContext} context 上下文
     * @param {IParams} [params={}] 视图参数
     * @param {string} [removeAppDEActionId='remove'] 删除实体行为标识
     * @returns {*}  {Promise<IHttpResponse>}
     * @memberof CalendarService
     */
    removeItem(appDataEntityId: string, context: IContext, params?: IParams, removeAppDEActionId?: string): Promise<IHttpResponse>;
    /**
     * 执行查询多条数据的方法
     *
     * @author zk
     * @date 2023-08-08 10:08:47
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  Promise<ICalendarItemData[]>
     * @memberof CalendarService
     */
    search(context: IContext, params: IParams, opts?: CalendarFetchOpts): Promise<ICalendarItemData[]>;
    /**
     * @description 设置日历项配置
     * @private
     * @param {IData[]} items
     * @param {number} index
     * @param {number} totalPage
     * @param {boolean} [isLoadMore=false]
     * @returns {*}  {ICalendarItemData[]}
     * @memberof CalendarService
     */
    private setCalendarConfigData;
    /**
     * 执行方法实体方法（通过实体id和方法名）
     *
     * @author zk
     * @date 2023-08-08 06:08:49
     * @param {string} methodName
     * @param {IContext} context
     * @param {IData} [data={}]
     * @param {IParams} [params={}]
     * @param {string} [appDataEntityId=this.model.appDataEntityId!]
     * @return {*}  {Promise<IHttpResponse>}
     * @memberof CalendarService
     */
    private exec2;
    /**
     * 获取查询条件参数
     *
     * @private
     * @param {ISysCalendarItem} item
     * @param {IParams} params
     * @return {*}  {IParams[]}
     * @memberof CalendarService
     */
    private getSearchConds;
    /**
     * @description 处理请求参数
     * @private
     * @param {ISysCalendarItem} item
     * @param {IParams} params
     * @param {CalendarFetchOpts} [opts]
     * @returns {*}  {IParams}
     * @memberof CalendarService
     */
    private handleRequestParams;
}
//# sourceMappingURL=calendar.service.d.ts.map