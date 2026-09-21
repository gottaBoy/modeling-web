import { ValueOP } from '../../../../../constant';

export type ITEMS_COND_OP = ValueOP.EXISTS | ValueOP.NOT_EXISTS;

export type ISearchCond =
  | ISearchCondGroup
  | ISearchCondField
  | ISearchCondItems
  | ISearchCondCustom;

/**
 * @description 分组条件
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
 * @description 搜索属性条件
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
 * @description 搜索EXIST或NOTEXIST条件
 * @export
 * @interface ISearchCondItems
 */
export interface ISearchCondItems {
  condtype: 'ITEMS';
  condop: ITEMS_COND_OP;
  fieldname: string;
  searchconds?: ISearchCond[];
}

/**
 * @description 搜索自定义条件
 * @export
 * @interface ISearchCondCustom
 */
export interface ISearchCondCustom {
  condtype: 'CUSTOM';
  customtype: 'PQL' | string;
  customcond: string;
}
