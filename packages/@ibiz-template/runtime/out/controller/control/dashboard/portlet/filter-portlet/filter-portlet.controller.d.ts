import { IDBFilterPortletPart } from '@ibiz/model-core';
import { PortletPartController } from '../portlet-part/portlet-part.controller';
import { FilterPortletState } from './portlet-part.state';
import { ISearchCondEx } from '../../../../../interface';
export declare class FilterPortletController extends PortletPartController<IDBFilterPortletPart> {
    /**
     * 过滤器门户部件状态
     *
     * @type {FilterPortletState}
     * @memberof PortletPartController
     */
    state: FilterPortletState;
    /**
     * 过滤器配置
     *
     * @author tony001
     * @date 2024-07-26 21:07:13
     * @type {IData}
     */
    filterConfig: IData;
    /**
     * jsonSchema属性组
     *
     * @author tony001
     * @date 2024-07-26 21:07:22
     * @type {IData[]}
     */
    jsonSchemaFields: IData[];
    /**
     * 搜索条件
     *
     * @author tony001
     * @date 2024-07-26 21:07:35
     * @type {(ISearchCondEx | undefined)}
     */
    searchConds: ISearchCondEx | undefined;
    /**
     * 条件缓存key
     *
     * @author tony001
     * @date 2024-07-28 10:07:24
     * @protected
     * @type {string}
     */
    protected searchCondCacheKey: string;
    /**
     * 初始化
     *
     * @author tony001
     * @date 2024-07-26 21:07:31
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected onInit(): Promise<void>;
    /**
     * 获取搜索条件
     *
     * @author tony001
     * @date 2024-07-28 09:07:49
     * @return {*}  {(ISearchCondEx | undefined)}
     */
    getSearchConds(): ISearchCondEx | undefined;
    /**
     * 计算受影响的门户部件标识
     *
     * @author tony001
     * @date 2024-08-01 17:08:40
     * @protected
     * @return {*}  {string[]}
     */
    protected computeEffectivePortletIDs(): string[];
    /**
     * 重置过滤器
     *
     * @author tony001
     * @date 2024-07-26 22:07:10
     * @return {*}  {Promise<boolean>}
     */
    resetFilter(): Promise<boolean>;
    /**
     * 搜索
     *
     * @author tony001
     * @date 2024-07-26 22:07:14
     * @return {*}  {Promise<boolean>}
     */
    search(): Promise<boolean>;
    /**
     * 显示影响部件
     *
     * @author tony001
     * @date 2024-07-26 22:07:48
     * @return {*}  {Promise<void>}
     */
    showEffectiveCtrl(): Promise<void>;
}
//# sourceMappingURL=filter-portlet.controller.d.ts.map