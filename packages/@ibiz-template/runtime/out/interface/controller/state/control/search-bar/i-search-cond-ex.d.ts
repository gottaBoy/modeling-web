import { ISearchCondCustom, ISearchCondField, ISearchCondGroup, ISearchCondItems } from './i-search-cond';
export type ISearchCondEx = ISearchCondExGroup | ISearchCondExField | ISearchCondExItems | ISearchCondExCustom;
/**
 * 分组条件(后台保存格式)
 * @author lxm
 * @date 2024-04-09 11:43:06
 * @export
 * @interface ISearchCondExGroup
 */
export interface ISearchCondExGroup extends ISearchCondGroup {
    /**
     * 隐藏条件
     * @author lxm
     * @date 2024-04-09 11:59:01
     * @type {boolean}
     */
    hidden?: boolean;
}
/**
 * 搜索属性条件（后台保存格式）
 * @author lxm
 * @date 2024-04-09 11:43:39
 * @export
 * @interface ISearchCondExField
 */
export interface ISearchCondExField extends ISearchCondField {
    /**
     * 隐藏条件
     * @author lxm
     * @date 2024-04-09 11:59:01
     * @type {boolean}
     */
    hidden?: boolean;
    /**
     * 值项的值
     * @author lxm
     * @date 2024-04-09 11:56:43
     * @type {unknown}
     */
    valueItem?: unknown;
}
/**
 * 搜索EXIST或NOTEXIST条件(后台保存格式)
 * @author lxm
 * @date 2024-04-09 11:43:39
 * @export
 * @interface ISearchCondExItems
 */
export interface ISearchCondExItems extends ISearchCondItems {
    /**
     * 隐藏条件
     * @author lxm
     * @date 2024-04-09 11:59:01
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
}
/**
 * 搜索自定义条件
 *
 * @author tony001
 * @date 2024-07-16 21:07:13
 * @export
 * @interface ISearchCondExCustom
 * @extends {ISearchCondCustom}
 */
export interface ISearchCondExCustom extends ISearchCondCustom {
    /**
     * 隐藏条件
     *
     * @author tony001
     * @date 2024-07-16 21:07:18
     * @type {boolean}
     */
    hidden?: boolean;
}
//# sourceMappingURL=i-search-cond-ex.d.ts.map