import {
  ISearchCondCustom,
  ISearchCondField,
  ISearchCondGroup,
  ISearchCondItems,
} from './i-search-cond';

export type ISearchCondEx =
  | ISearchCondExGroup
  | ISearchCondExField
  | ISearchCondExItems
  | ISearchCondExCustom;

/**
 * @description 分组条件(后台保存格式)
 * @export
 * @interface ISearchCondExGroup
 * @extends {ISearchCondGroup}
 */
export interface ISearchCondExGroup extends ISearchCondGroup {
  /**
   * @description 是否隐藏
   * @type {boolean}
   * @memberof ISearchCondExGroup
   */
  hidden?: boolean;
}

/**
 * @description 搜索属性条件（后台保存格式）
 * @export
 * @interface ISearchCondExField
 * @extends {ISearchCondField}
 */
export interface ISearchCondExField extends ISearchCondField {
  /**
   * @description 是否隐藏
   * @type {boolean}
   * @memberof ISearchCondExField
   */
  hidden?: boolean;

  /**
   * @description 值项的值
   * @type {unknown}
   * @memberof ISearchCondExField
   */
  valueItem?: unknown;
}

/**
 * @description 搜索EXIST或NOTEXIST条件(后台保存格式)
 * @export
 * @interface ISearchCondExItems
 * @extends {ISearchCondItems}
 */
export interface ISearchCondExItems extends ISearchCondItems {
  /**
   * @description 是否隐藏
   * @type {boolean}
   * @memberof ISearchCondExItems
   */
  hidden?: boolean;

  /**
   * @description 是否是简单模式
   * @type {boolean}
   * @memberof ISearchCondExItems
   */
  simple?: boolean;
}

/**
 * @description 搜索自定义条件
 * @export
 * @interface ISearchCondExCustom
 * @extends {ISearchCondCustom}
 */
export interface ISearchCondExCustom extends ISearchCondCustom {
  /**
   * @description 是否隐藏
   * @type {boolean}
   * @memberof ISearchCondExCustom
   */
  hidden?: boolean;
}
