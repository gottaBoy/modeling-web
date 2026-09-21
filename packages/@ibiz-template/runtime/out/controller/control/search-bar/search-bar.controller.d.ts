import { IAppDataEntity, ISearchBar, ISearchBarFilter } from '@ibiz/model-core';
import { ISearchBarState, ISearchBarEvent, ISearchBarController, IBackendSearchBarGroup, IGridController, IFilterNode, IMobMDCtrlController } from '../../../interface';
import { ControlController } from '../../common';
import { SearchBarFilterController } from './search-bar-filter.controller';
import { SearchBarService } from './search-bar.service';
/**
 * 搜索栏控制器
 *
 * @author chitanda
 * @date 2022-07-24 15:07:07
 * @export
 * @class SearchBarController
 * @extends {ControlController}
 */
export declare class SearchBarController extends ControlController<ISearchBar, ISearchBarState, ISearchBarEvent> implements ISearchBarController {
    /**
     * 快速搜索占位符（根据属性计算出来的快速搜索占位符）
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-08-11 14:13:10
     */
    placeHolder: string;
    /**
     * 过滤项控制器集合
     * @author lxm
     * @date 2023-10-13 03:31:26
     * @type {SearchBarFilterController[]}
     */
    filterControllers: SearchBarFilterController[];
    /**
     * 搜索栏服务
     * @author lxm
     * @date 2023-05-15 11:03:34
     * @type {EditFormService}
     */
    service: SearchBarService;
    /**
     * 当前编辑的分组
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-20 18:06:37
     */
    currentEditGroup: IBackendSearchBarGroup | null;
    /**
     * 是否为后台分组
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-21 10:17:43
     */
    isBackendSearchGroup: boolean;
    /**
     * 是否有默认选中
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-21 10:17:43
     */
    hasDefaultSelect: boolean;
    /**
     * 启用自定义过滤项
     * @author lxm
     * @date 2023-12-29 04:15:34
     * @type {boolean}
     */
    get enableFilter(): boolean;
    /**
     * 最终使用的searchBarFilters
     * @author lxm
     * @date 2023-12-29 06:55:13
     * @type {ISearchBarFilter[]}
     */
    get searchBarFilters(): ISearchBarFilter[];
    /**
     * 是否启用根据实体的JSON Schema生成过滤项
     * @author lxm
     * @date 2024-01-05 10:10:37
     */
    addSchemaFilters: boolean;
    /**
     * jsonschema参数
     *
     * @author zhanghengfeng
     * @date 2024-07-05 15:07:47
     * @type {IParams}
     */
    jsonSchemaParams: IParams;
    /**
     * schema实体映射map
     *
     * @author zhanghengfeng
     * @date 2024-07-22 16:07:55
     */
    schemaEntityMap: Map<string, string | undefined>;
    /**
     * 表格控制器
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-22 13:50:16
     */
    get grid(): IGridController | undefined;
    /**
     * 移动端-多数据控制器
     *
     * @readonly
     * @type {(IListController | undefined)}
     * @memberof SearchBarController
     */
    get mdctrl(): IMobMDCtrlController | undefined;
    /**
     * 实体模型
     * @author lxm
     * @date 2023-10-13 02:49:59
     * @type {IAppDataEntity}
     */
    appDataEntity: IAppDataEntity;
    /**
     * 是否启用存储
     *
     * @author zhanghengfeng
     * @date 2024-05-29 20:05:47
     * @type {boolean}
     */
    enableStorage: boolean;
    /**
     * 生成存储key的函数
     *
     * @author zhanghengfeng
     * @date 2024-05-29 16:05:34
     */
    storageKeyFn?: () => string | undefined;
    /**
     * 设置生成存储key的函数
     *
     * @author zhanghengfeng
     * @date 2024-05-29 16:05:35
     * @param {(() => string | undefined)} fn
     */
    setStorageKeyFn(fn: () => string | undefined): void;
    protected initState(): void;
    protected onCreated(): Promise<void>;
    /**
     * 初始化schema实体映射map
     *
     * @author zhanghengfeng
     * @date 2024-07-22 16:07:14
     * @param {IData} json
     * @return {*}
     */
    initSchemaEntityMap(json: IData): Promise<void>;
    /**
     * 根据实体jsonschema初始化
     * @author lxm
     * @date 2023-12-29 04:21:31
     * @return {*}  {Promise<void>}
     */
    initByEntitySchema(): Promise<void>;
    /**
     * 计算快速搜索的占位
     * @author lxm
     * @date 2023-10-16 03:49:47
     * @protected
     * @return {*}  {void}
     */
    protected calcQuickSearchPlaceholder(): void;
    /**
     * 处理输入
     * @param {string} val
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-06-01 18:08:07
     */
    handleInput(val: string): void;
    /**
     * 处理搜索
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-06-01 18:08:18
     */
    onSearch(): void;
    /**
     * 找到过滤项控制器
     * @author lxm
     * @date 2024-02-04 11:29:31
     * @param {(string | null)} fieldName
     * @param {(string | null)} valueOP
     * @return {*}  {(SearchBarFilterController | undefined)}
     */
    findFilterController(fieldName: string | null, valueOP: string | null): SearchBarFilterController | undefined;
    /**
     * 获取搜索栏的过滤参数（包括快速搜索，快速分组和过滤器的参数）
     * @author lxm
     * @date 2023-10-16 03:54:07
     * @return {*}  {IParams}
     */
    getFilterParams(): IParams;
    /**
     * 重置过滤器
     * @author lxm
     * @date 2023-10-16 03:52:44
     */
    resetFilter(): void;
    /**
     * 初始化过滤项控制器
     * @author lxm
     * @date 2023-10-13 03:33:17
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected initSearchBarFilters(): Promise<void>;
    /**
     * 附加自定义条件
     *
     * @author zhanghengfeng
     * @date 2024-07-19 10:07:34
     * @param {IFilterNode[]} nodes
     * @return {*}  {void}
     */
    attachCustomCond(nodes: IFilterNode[]): void;
    /**
     * 计算过滤项参数
     * @author lxm
     * @date 2023-10-13 05:53:35
     * @return {*}  {IData}
     */
    calcFilters(): IData[] | undefined;
    /**
     * 初始化搜索栏分组项(获取后台分组清单并合并模型)
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-19 14:43:46
     */
    initSearBarGroups(firstInit?: boolean): Promise<void>;
    /**
     * 点击默认选中
     * @return {*}
     * @author: zhujiamin
     * @Date: 2024-01-24 11:12:43
     */
    setDefaultSelect(): void;
    /**
     * 处理保存
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-19 16:17:15
     */
    handleSave(): Promise<void>;
    /**
     * 处理点击后台分组
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-21 10:29:24
     */
    handleGroupClick(groupItem: IBackendSearchBarGroup): Promise<void>;
    /**
     * 初始化高级搜索
     * @author lxm
     * @date 2024-04-11 11:44:10
     * @protected
     */
    protected initAdvancedQuickSearch(): void;
    /**
     * 计算快速搜索占位符
     * @author lxm
     * @date 2024-04-11 05:36:52
     */
    calcQuickSearchPlaceHolder(): void;
}
//# sourceMappingURL=search-bar.controller.d.ts.map