import { IDEFVRCondition } from './idefvrcondition';

/**
 *
 * 继承父接口类型值[GROUP]
 * @export
 * @interface IDEFVRGroupCondition
 */
export interface IDEFVRGroupCondition extends IDEFVRCondition {
  /**
   * 组合条件操作
   * @description 值模式 [组合条件操作] {AND：与(AND)、 OR：或(OR) }
   * @type {( string | 'AND' | 'OR')}
   * 来源  getCondOp
   */
  condOp?: string | 'AND' | 'OR';

  /**
   * 子条件集合
   *
   * @type {IDEFVRCondition[]}
   * 来源  getPSDEFVRConditions
   */
  conds?: IDEFVRCondition[];
}
