import { IDEDQCondition } from './idedqcondition';

/**
 *
 * 继承父接口类型值[SINGLE]
 * @export
 * @interface IDEDQFieldCondition
 */
export interface IDEDQFieldCondition extends IDEDQCondition {
  /**
   * 条件操作
   * @type {string}
   * 来源  getCondOp
   */
  condOp?: string;

  /**
   * 条件值
   * @type {string}
   * 来源  getCondValue
   */
  condValue?: string;

  /**
   * 属性名称
   * @type {string}
   * 来源  getFieldName
   */
  fieldName?: string;

  /**
   * 变量类型
   * @type {string}
   * 来源  getPSVARTypeId
   */
  vartypeId?: string;

  /**
   * 值函数代码标识
   * @type {string}
   * 来源  getValueFunc
   */
  valueFunc?: string;

  /**
   * 值函数标记
   * @type {string}
   * 来源  getValueFuncTag
   */
  valueFuncTag?: string;

  /**
   * 值函数标记2
   * @type {string}
   * 来源  getValueFuncTag2
   */
  valueFuncTag2?: string;

  /**
   * 忽略空值
   * @type {boolean}
   * @default false
   * 来源  isIgnoreEmpty
   */
  ignoreEmpty?: boolean;

  /**
   * 忽略外部参数
   * @type {boolean}
   * @default false
   * 来源  isIgnoreOthers
   */
  ignoreOthers?: boolean;
}
