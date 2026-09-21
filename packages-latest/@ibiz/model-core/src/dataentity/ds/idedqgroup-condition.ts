import { IDEDQCondition } from './idedqcondition';

/**
 *
 * 继承父接口类型值[GROUP]
 * @export
 * @interface IDEDQGroupCondition
 */
export interface IDEDQGroupCondition extends IDEDQCondition {
  /**
   * 组合条件
   * @description 值模式 [组合条件操作] {AND：与(AND)、 OR：或(OR) }
   * @type {( string | 'AND' | 'OR')}
   * 来源  getCondOp
   */
  condOp?: string | 'AND' | 'OR';

  /**
   * 子条件集合
   *
   * @type {IDEDQCondition[]}
   * 来源  getPSDEDQConditions
   */
  dedqconditions?: IDEDQCondition[];

  /**
   * 逻辑取反
   * @type {boolean}
   * @default false
   * 来源  isNotMode
   */
  notMode?: boolean;
}
