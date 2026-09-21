import { IDEFVRSingleCondition } from './idefvrsingle-condition';

/**
 *
 * 继承父接口类型值[VALUERANGE]
 * @export
 * @interface IDEFVRValueRangeCondition
 */
export interface IDEFVRValueRangeCondition extends IDEFVRSingleCondition {
  /**
   * 始终检查
   * @type {boolean}
   * 来源  isAlwaysCheck
   */
  alwaysCheck?: boolean;
}
