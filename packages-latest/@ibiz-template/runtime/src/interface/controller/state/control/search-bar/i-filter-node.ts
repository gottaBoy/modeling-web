import { ValueOP } from '../../../../../constant';
import { ITEMS_COND_OP } from './i-search-cond';

export type IFilterNode =
  | IFilterNodeGroup
  | IFilterNodeField
  | IFilterNodeItems
  | IFilterNodeCustom;

/**
 * @description 过滤节点（分组）
 * @export
 * @interface IFilterNodeGroup
 */
export interface IFilterNodeGroup {
  /**
   * @description 节点类型
   * @type {'GROUP'}
   * @memberof IFilterNodeGroup
   */
  nodeType: 'GROUP';

  /**
   * @description 分组的逻辑类型
   * @type {('AND' | 'OR')}
   * @memberof IFilterNodeGroup
   */
  logicType: 'AND' | 'OR';

  /**
   * @description 是否取反
   * @type {boolean}
   * @memberof IFilterNodeGroup
   */
  notMode?: boolean;

  /**
   * @description 是否隐藏
   * @type {boolean}
   * @memberof IFilterNodeGroup
   */
  hidden?: boolean;

  /**
   * @description 子节点数据集合
   * @type {IFilterNode[]}
   * @memberof IFilterNodeGroup
   */
  children: IFilterNode[];
}

/**
 * @description 过滤节点（属性）
 * @export
 * @interface IFilterNodeField
 */
export interface IFilterNodeField {
  /**
   * @description 节点类型
   * @type {'FIELD'}
   * @memberof IFilterNodeField
   */
  nodeType: 'FIELD';

  /**
   * @description 实体属性名称
   * @type {(string | null)}
   * @memberof IFilterNodeField
   */
  field: string | null;

  /**
   * @description 过滤项值
   * @type {(unknown | null)}
   * @memberof IFilterNodeField
   */
  value: unknown | null;

  /**
   * @description 值操作类型
   * @type {(ValueOP | null)}
   * @memberof IFilterNodeField
   */
  valueOP: ValueOP | null;

  /**
   * @description  是否禁用
   * @type {boolean}
   * @memberof IFilterNodeField
   */
  disabled?: boolean;

  /**
   * @description 是否隐藏
   * @type {boolean}
   * @memberof IFilterNodeField
   */
  hidden?: boolean;

  /**
   * @description 值项的值
   * @type {unknown}
   * @memberof IFilterNodeField
   */
  valueItem?: unknown;
}

/**
 * @description 过滤节点(ITEMS)
 * @export
 * @interface IFilterNodeItems
 */
export interface IFilterNodeItems {
  /**
   * @description 节点类型
   * @type {'ITEMS'}
   * @memberof IFilterNodeItems
   */
  nodeType: 'ITEMS';

  /**
   * @description 实体属性名称
   * @type {(string | null)}
   * @memberof IFilterNodeItems
   */
  field: string | null;

  /**
   * @description 值操作类型
   * @type {(ITEMS_COND_OP | null)}
   * @memberof IFilterNodeItems
   */
  valueOP: ITEMS_COND_OP | null;

  /**
   * @description 是否隐藏
   * @type {boolean}
   * @memberof IFilterNodeItems
   */
  hidden?: boolean;

  /**
   * @description 是否是简单模式
   * @type {boolean}
   * @memberof IFilterNodeItems
   */
  simple?: boolean;

  /**
   * @description 子节点数据集合
   * @type {IFilterNode[]}
   * @memberof IFilterNodeItems
   */
  children: IFilterNode[];
}

/**
 * @description 过滤节点（自定义）
 * @export
 * @interface IFilterNodeCustom
 */
export interface IFilterNodeCustom {
  /**
   * @description 节点类型
   * @type {'CUSTOM'}
   * @memberof IFilterNodeCustom
   */
  nodeType: 'CUSTOM';

  /**
   * @description 自定义类型
   * @type {('PQL' | string)}
   * @memberof IFilterNodeCustom
   */
  customType: 'PQL' | string;

  /**
   * @description 自定义条件
   * @type {string}
   * @memberof IFilterNodeCustom
   */
  customCond: string;

  /**
   * @description 隐藏
   * @type {boolean}
   * @memberof IFilterNodeCustom
   */
  hidden?: boolean;
}
