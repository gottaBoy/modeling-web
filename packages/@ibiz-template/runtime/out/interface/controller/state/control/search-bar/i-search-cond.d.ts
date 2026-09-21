import { ValueOP } from '../../../../../constant';
export type ITEMS_COND_OP = ValueOP.EXISTS | ValueOP.NOT_EXISTS;
export type ISearchCond = ISearchCondGroup | ISearchCondField | ISearchCondItems | ISearchCondCustom;
/**
 * 分组条件
 * @author lxm
 * @date 2024-04-09 11:43:06
 * @export
 * @interface ISearchCondGroup
 */
export interface ISearchCondGroup {
    condtype: 'GROUP';
    condop: 'AND' | 'OR';
    notmode?: boolean;
    searchconds?: ISearchCond[];
}
/**
 * 搜索属性条件
 * @author lxm
 * @date 2024-04-09 11:43:39
 * @export
 * @interface ISearchCondField
 */
export interface ISearchCondField {
    condtype: 'DEFIELD';
    condop: ValueOP;
    value: unknown;
    fieldname: string;
}
/**
 * 搜索EXIST或NOTEXIST条件
 * @author lxm
 * @date 2024-04-09 11:43:39
 * @export
 * @interface ISearchCondField
 */
export interface ISearchCondItems {
    condtype: 'ITEMS';
    condop: ITEMS_COND_OP;
    fieldname: string;
    searchconds?: ISearchCond[];
}
/**
 * 搜索自定义条件
 *
 * @author tony001
 * @date 2024-07-16 19:07:01
 * @export
 * @interface ISearchCondCustom
 */
export interface ISearchCondCustom {
    condtype: 'CUSTOM';
    customtype: 'PQL' | string;
    customcond: string;
}
//# sourceMappingURL=i-search-cond.d.ts.map