/* eslint-disable prefer-destructuring */
/* eslint-disable no-template-curly-in-string */
import { SearchBarFilterController } from './search-bar-filter.controller';
import { parseSubFieldInfo } from './util';
/**
 * 搜索栏过滤项ITEMS控制器
 * @author lxm
 * @date 2023-10-12 05:49:19
 * @export
 * @class SearchBarFilterController
 * @implements {IEditorContainerController}
 */
export class SearchBarFilterSimpleItemsController extends SearchBarFilterController {
    constructor(filterModel, appDataEntity, context, params) {
        super(filterModel, appDataEntity, context, params);
        this.noEditor = false;
        // simple每个都是唯一的
        this.key = this.model.id;
        this.type = 'SIMPLE_ITEMS';
        const info = parseSubFieldInfo(filterModel.defsearchMode.codeName);
        this.subFieldName = info.field;
        this.subValueOP = info.op;
    }
    /**
     * 简单模式下添加节点逻辑
     * @author lxm
     * @date 2024-04-07 05:44:47
     * @param {IFilterNodeField} node
     * @return {*}  {void}
     */
    addSimpleFilterNode(node) {
        Object.assign(node, {
            simple: true,
            field: this.fieldName,
            nodeType: 'ITEMS',
            valueOP: this.valueOP,
            children: [
                {
                    nodeType: 'FIELD',
                    field: this.subFieldName,
                    valueOP: this.subValueOP,
                    value: null,
                },
            ],
        });
    }
}
