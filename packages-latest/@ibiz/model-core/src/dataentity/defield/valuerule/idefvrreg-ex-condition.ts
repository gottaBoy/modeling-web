import { IDEFVRSingleCondition } from './idefvrsingle-condition';

/**
 *
 * 继承父接口类型值[REGEX]
 * @export
 * @interface IDEFVRRegExCondition
 */
export interface IDEFVRRegExCondition extends IDEFVRSingleCondition {
  /**
   * 正则式
   * @type {string}
   * 来源  getRegExCode
   */
  regExCode?: string;
}
