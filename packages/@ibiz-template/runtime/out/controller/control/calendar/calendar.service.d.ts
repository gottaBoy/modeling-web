import { ISysCalendar } from '@ibiz/model-core';
import { ICalendarItemData } from '../../../interface';
import { MDControlService } from '../../../service';
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
     * 执行查询多条数据的方法
     *
     * @author zk
     * @date 2023-08-08 10:08:47
     * @param {IContext} context
     * @param {IParams} [params={}]
     * @return {*}  Promise<ICalendarItemData[]>
     * @memberof CalendarService
     */
    search(context: IContext, params?: IParams): Promise<ICalendarItemData[]>;
    /**
     * 设置日历项配置
     *
     * @author zk
     * @date 2023-08-08 06:08:14
     * @param {IData[]} items
     * @param {number} index
     * @return {*}  {ICalendarItemData[]}
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
     * 处理请求参数
     *
     * @private
     * @param {ISysCalendarItem} item
     * @param {IParams} params
     * @return {*}  {IParams}
     * @memberof CalendarService
     */
    private handleRequestParams;
}
//# sourceMappingURL=calendar.service.d.ts.map