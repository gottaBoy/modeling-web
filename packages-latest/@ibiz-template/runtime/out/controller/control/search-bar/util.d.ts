import { ISearchBarFilter } from '@ibiz/model-core';
export declare const ItemsValueOPs: string[];
/**
 * 是否是简单ITEMS模式
 * @author lxm
 * @date 2024-04-10 01:46:24
 * @export
 * @param {ISearchBarFilter} model
 * @return {*}  {boolean}
 */
export declare function isSimpleItems(model: ISearchBarFilter): boolean;
/**
 * 是否是隐藏的过滤项
 * @author lxm
 * @date 2024-04-10 01:47:43
 * @export
 * @param {ISearchBarFilter} model
 * @return {*}  {boolean}
 */
export declare function isHiddenFilter(model: ISearchBarFilter): boolean;
/**
 * 解析出子属性的字段名和操作符
 * @example
 * parseSubFieldInfo('N_ATTENTIONS_EXISTS__N_USER_ID_EQ') => { field: 'USER_ID', op: 'EQ' }
 * @author lxm
 * @date 2024-04-10 02:03:57
 * @export
 * @param {string} str
 * @return {*}  {{ field: string; op: string }}
 */
export declare function parseSubFieldInfo(str: string): {
    field: string;
    op: string;
};
//# sourceMappingURL=util.d.ts.map