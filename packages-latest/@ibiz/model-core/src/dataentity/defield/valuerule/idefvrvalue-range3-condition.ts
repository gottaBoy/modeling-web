import { IDEFVRSingleCondition } from './idefvrsingle-condition';

/**
 *
 * 继承父接口类型值[VALUERANGE3]
 * @export
 * @interface IDEFVRValueRange3Condition
 */
export interface IDEFVRValueRange3Condition extends IDEFVRSingleCondition {
  /**
   * 值分隔符
   * @type {string}
   * 来源  getSeparator
   */
  separator?: string;

  /**
   * 值集合
   *
   * 来源 getValueRanges
   */
  valueRanges?: string[];
}
