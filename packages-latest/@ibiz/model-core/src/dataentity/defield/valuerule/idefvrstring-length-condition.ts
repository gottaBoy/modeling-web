import { IDEFVRSingleCondition } from './idefvrsingle-condition';

/**
 *
 * 继承父接口类型值[STRINGLENGTH]
 * @export
 * @interface IDEFVRStringLengthCondition
 */
export interface IDEFVRStringLengthCondition extends IDEFVRSingleCondition {
  /**
   * 最大值
   * @type {number}
   * 来源  getMaxValue
   */
  maxValue?: number;

  /**
   * 最小值
   * @type {number}
   * 来源  getMinValue
   */
  minValue?: number;

  /**
   * 含最大值
   * @type {boolean}
   * 来源  isIncludeMaxValue
   */
  includeMaxValue?: boolean;

  /**
   * 含最小值
   * @type {boolean}
   * 来源  isIncludeMinValue
   */
  includeMinValue?: boolean;
}
