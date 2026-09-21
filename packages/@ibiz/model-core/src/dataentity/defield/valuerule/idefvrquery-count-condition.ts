import { IDEFVRSingleCondition } from './idefvrsingle-condition';

/**
 *
 * 继承父接口类型值[QUERYCOUNT]
 * @export
 * @interface IDEFVRQueryCountCondition
 */
export interface IDEFVRQueryCountCondition extends IDEFVRSingleCondition {
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
   * 始终检查
   * @type {boolean}
   * 来源  isAlwaysCheck
   */
  alwaysCheck?: boolean;

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
