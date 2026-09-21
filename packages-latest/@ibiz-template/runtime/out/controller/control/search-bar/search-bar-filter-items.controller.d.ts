import { IAppDataEntity, ISearchBarFilter } from '@ibiz/model-core';
import { SearchBarFilterController } from './search-bar-filter.controller';
type FieldInfo = {
    name: string;
    label: string;
    valueOPs: string[];
    fieldName: string;
};
/**
 * 搜索栏过滤项ITEMS控制器
 * @author lxm
 * @date 2023-10-12 05:49:19
 * @export
 * @class SearchBarFilterController
 * @implements {IEditorContainerController}
 */
export declare class SearchBarFilterItemsController extends SearchBarFilterController {
    protected filterModels: ISearchBarFilter[];
    /**
     * 关联实体的模型
     * @author lxm
     * @date 2024-03-14 03:30:45
     * @type {IAppDataEntity}
     */
    protected minorAppDE: IAppDataEntity;
    /**
     * 所有可以配置的子属性集合
     * @author lxm
     * @date 2024-03-14 04:20:10
     * @type {Array<FieldInfo>}
     */
    allFields: Array<FieldInfo>;
    /**
     * 子编辑项控制器
     * @author lxm
     * @date 2024-03-14 04:53:26
     * @protected
     * @type {Map<string, SearchBarFilterController>}
     */
    protected subFilterCMap: Map<string, SearchBarFilterController>;
    constructor(filterModels: ISearchBarFilter[], appDataEntity: IAppDataEntity, context: IContext, params: IParams);
    /**
     * 计算标识
     * @author lxm
     * @date 2024-03-14 05:06:14
     * @protected
     * @param {string} field
     * @param {string} op
     * @return {*}  {string}
     */
    protected calcKey(field: string, op: string): string;
    /**
     * 初始化子实体
     * @author lxm
     * @date 2024-03-14 04:43:04
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected initMinorAppDE(): Promise<void>;
    /**
     * 初始化子实体目标属性相关信息
     * @author lxm
     * @date 2024-03-14 04:42:32
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected initAllFields(): Promise<void>;
    init(): Promise<void>;
    /**
     * 获取子搜索栏控制器
     * @author lxm
     * @date 2024-03-15 02:51:02
     * @param {string} field
     * @param {string} op
     * @return {*}  {SearchBarFilterController}
     */
    getSubFilterController(field: string, op: string): SearchBarFilterController;
}
export {};
//# sourceMappingURL=search-bar-filter-items.controller.d.ts.map