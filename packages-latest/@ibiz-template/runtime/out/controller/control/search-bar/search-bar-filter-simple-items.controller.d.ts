import { IAppDataEntity, ISearchBarFilter } from '@ibiz/model-core';
import { SearchBarFilterController } from './search-bar-filter.controller';
import { IFilterNode } from '../../../interface';
/**
 * 搜索栏过滤项ITEMS控制器
 * @author lxm
 * @date 2023-10-12 05:49:19
 * @export
 * @class SearchBarFilterController
 * @implements {IEditorContainerController}
 */
export declare class SearchBarFilterSimpleItemsController extends SearchBarFilterController {
    /**
     * 过滤的属性名称(有实体属性的是属性codeName小写，没有就是项名称)
     * @author lxm
     * @date 2023-10-13 02:51:39
     * @type {string}
     */
    subFieldName: string;
    /**
     * 配置的属性搜索模式对应的值操作
     * @author lxm
     * @date 2023-10-13 03:22:10
     * @type {string}
     */
    subValueOP: string;
    constructor(filterModel: ISearchBarFilter, appDataEntity: IAppDataEntity, context: IContext, params: IParams);
    /**
     * 简单模式下添加节点逻辑
     * @author lxm
     * @date 2024-04-07 05:44:47
     * @param {IFilterNodeField} node
     * @return {*}  {void}
     */
    addSimpleFilterNode(node: IFilterNode): void;
}
//# sourceMappingURL=search-bar-filter-simple-items.controller.d.ts.map