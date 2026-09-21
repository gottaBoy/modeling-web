import { IDBPortletPart, IDEDQCondition } from '@ibiz/model-core';
import { IDashboardController, ISearchCondEx } from '../../../interface';
/**
 * 过滤器条件转化为查询条件
 *
 * @author tony001
 * @date 2024-07-28 13:07:37
 * @export
 * @param {IDEDQCondition[]} filterDEDQConditions
 * @return {*}  {ISearchCondEx[]}
 */
export declare function filterDEDQConditions2SearchConds(filterDEDQConditions: IDEDQCondition[]): ISearchCondEx[];
/**
 * 生成缓存key
 *
 * @author tony001
 * @date 2024-07-28 13:07:15
 * @export
 * @param {IContext} context
 * @param {IDashboardController} dashboard
 * @param {string} key
 * @return {*}  {string}
 */
export declare function generateCacheKy(context: IContext, dashboard: IDashboardController, key: string): string;
/**
 * 获取过滤器搜索参数
 *
 * @author tony001
 * @date 2024-07-28 13:07:26
 * @export
 * @param {(IData | undefined)} searchConds
 * @param {(IDEDQCondition[] | undefined)} filterDEDQConditions
 * @return {*}  {(ISearchCondEx | undefined)}
 */
export declare function getFilterSearchConds(searchConds: IData | undefined, filterDEDQConditions: IDEDQCondition[] | undefined): ISearchCondEx | undefined;
/**
 * 通过id获取指定门户部件模型,先从传入模型中找，找不到从应用中找
 *
 * @author tony001
 * @date 2024-08-01 16:08:14
 * @export
 * @param {string} id
 * @param {IContext} context
 * @param {(IData[] | undefined)} models
 * @return {*}  {(IModel | undefined)}
 */
export declare function getPortletModelByID(id: string, context: IContext, models: IData[] | undefined): IModel | undefined;
/**
 * 通过过滤器门户部件标识过滤生效门户部件
 *
 * @author tony001
 * @date 2024-08-01 11:08:36
 * @export
 * @param {string} id
 * @param {IContext} context
 * @param {IDBPortletPart[]} items
 * @param {boolean} [biMode=false]
 * @return {*}  {IDBPortletPart[]}
 */
export declare function filterPortletByID(id: string, context: IContext, items: IDBPortletPart[], biMode?: boolean): IDBPortletPart[];
/**
 * 基于scope和scopedata过滤门户部件
 *
 * @author tony001
 * @date 2024-08-01 14:08:14
 * @export
 * @param {IData} config
 * @param {string[]} items
 * @return {*}  {string[]}
 */
export declare function filterPortletByConfig(config: IData, items: string[]): string[];
//# sourceMappingURL=dashboard.util.d.ts.map