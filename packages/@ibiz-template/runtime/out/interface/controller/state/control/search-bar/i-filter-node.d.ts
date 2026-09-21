import { ValueOP } from '../../../../../constant';
import { ITEMS_COND_OP } from './i-search-cond';
export type IFilterNode = IFilterNodeGroup | IFilterNodeField | IFilterNodeItems | IFilterNodeCustom;
/**
 * 过滤节点（分组）
 * @author lxm
 * @date 2024-04-09 01:58:48
 * @export
 * @interface IFilterNodeGroup
 */
export interface IFilterNodeGroup {
    /**
     * 节点类型
     * @author lxm
     * @date 2024-04-09 02:04:31
     * @type {'GROUP'}
     */
    nodeType: 'GROUP';
    /**
     * 分组的逻辑类型
     * @author lxm
     * @date 2023-10-12 05:21:18
     * @type {('AND' | 'OR')}
     */
    logicType: 'AND' | 'OR';
    /**
     * 是否取反
     * @author lxm
     * @date 2024-04-09 01:56:40
     * @type {boolean}
     */
    notMode?: boolean;
    /**
     * 隐藏，不显示
     * @author lxm
     * @date 2024-02-01 02:51:40
     * @type {boolean}
     */
    hidden?: boolean;
    /**
     * 子节点数据集合
     * @author lxm
     * @date 2023-10-12 05:18:19
     * @type {IFilterTreeNode[]}
     */
    children: IFilterNode[];
}
/**
 * 过滤节点（属性）
 * @author lxm
 * @date 2024-04-09 01:59:00
 * @export
 * @interface IFilterNodeField
 */
export interface IFilterNodeField {
    /**
     * 节点类型
     * @author lxm
     * @date 2024-04-09 02:04:31
     * @type {'GROUP'}
     */
    nodeType: 'FIELD';
    /**
     * 实体属性名称
     * @author lxm
     * @date 2023-10-13 02:35:42
     * @type {string}
     */
    field: string | null;
    /**
     * 过滤项值
     * @author lxm
     * @date 2023-10-12 05:16:52
     * @type {unknown}
     */
    value: unknown | null;
    /**
     * 值操作类型
     * @author lxm
     * @date 2024-04-09 01:54:45
     * @type {ValueOP}
     */
    valueOP: ValueOP | null;
    /**
     * 禁用，禁止修改
     * @author lxm
     * @date 2024-02-01 02:51:40
     * @type {boolean}
     */
    disabled?: boolean;
    /**
     * 隐藏，不显示
     * @author lxm
     * @date 2024-02-01 02:51:40
     * @type {boolean}
     */
    hidden?: boolean;
    /**
     * 值项的值
     * @author lxm
     * @date 2024-02-04 06:40:17
     * @type {unknown}
     */
    valueItem?: unknown;
}
/**
 * 过滤节点(ITEMS)
 * @author lxm
 * @date 2024-04-09 01:59:12
 * @export
 * @interface IFilterNodeItems
 */
export interface IFilterNodeItems {
    /**
     * 节点类型
     * @author lxm
     * @date 2024-04-09 02:05:06
     * @type {'ITEMS'}
     */
    nodeType: 'ITEMS';
    /**
     * 实体属性名称
     * @author lxm
     * @date 2023-10-13 02:35:42
     * @type {string}
     */
    field: string | null;
    /**
     * 值操作类型
     * @author lxm
     * @date 2023-10-12 05:27:07
     * @type {string}
     */
    valueOP: ITEMS_COND_OP | null;
    /**
     * 隐藏，不显示
     * @author lxm
     * @date 2024-02-01 02:51:40
     * @type {boolean}
     */
    hidden?: boolean;
    /**
     * 是否是简单模式
     * @author lxm
     * @date 2024-02-01 02:51:40
     * @type {boolean}
     */
    simple?: boolean;
    /**
     * 子节点数据集合
     * @author lxm
     * @date 2023-10-12 05:18:19
     * @type {IFilterTreeNode[]}
     */
    children: IFilterNode[];
}
/**
 * 过滤节点（自定义）
 *
 * @author tony001
 * @date 2024-07-16 19:07:33
 * @export
 * @interface IFilterNodeCustom
 */
export interface IFilterNodeCustom {
    /**
     * 节点类型
     *
     * @author tony001
     * @date 2024-07-16 19:07:23
     * @type {'CUSTOM'}
     */
    nodeType: 'CUSTOM';
    /**
     * 自定义类型
     *
     * @author tony001
     * @date 2024-07-16 19:07:36
     * @type {('PQL' | string)}
     */
    customType: 'PQL' | string;
    /**
     * 自定义条件
     *
     * @author tony001
     * @date 2024-07-16 19:07:48
     * @type {string}
     */
    customCond: string;
    /**
     * 隐藏，不显示
     *
     * @author tony001
     * @date 2024-07-16 21:07:01
     * @type {boolean}
     */
    hidden?: boolean;
}
//# sourceMappingURL=i-filter-node.d.ts.map