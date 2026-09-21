import { ValueOP } from '@ibiz-template/runtime';
/**
 * Schema属性接口
 *
 * @export
 * @interface ISchemaField
 */
export interface ISchemaField {
    /**
     * 类型
     * - 用于计算预置操作符和编辑器
     * @type {string}
     * @memberof ISchemaField
     */
    type: string;
    /**
     * 原类型
     *
     * @author tony001
     * @date 2024-07-16 15:07:30
     * @type {string}
     */
    originalType: string;
    /**
     * 属性标识
     *
     * @type {string}
     * @memberof ISchemaField
     */
    appDEFieldId: string;
    /**
     * 预置操作符
     *
     * @type {ValueOP[]}
     * @memberof ISchemaField
     */
    valueOPs: ValueOP[];
    /**
     * 标题
     *
     * @type {string}
     * @memberof ISchemaField
     */
    caption: string;
    /**
     * 代码表标识
     *
     * @type {string}
     * @memberof ISchemaField
     */
    appCodeListId?: string;
    /**
     * 应用实体标识
     *
     * @type {string}
     * @memberof ISchemaField
     */
    appDataEntityId?: string;
    /**
     * 应用实体完全标识
     *
     * @author zhanghengfeng
     * @date 2024-07-18 19:07:53
     * @type {string}
     */
    appDataEntityFullTag?: string;
}
