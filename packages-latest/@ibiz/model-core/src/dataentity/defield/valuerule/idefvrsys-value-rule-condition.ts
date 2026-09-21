import { IDEFVRSingleCondition } from './idefvrsingle-condition';
import { ISysValueRule } from '../../../valuerule/isys-value-rule';

/**
 *
 * 继承父接口类型值[SYSVALUERULE]
 * @export
 * @interface IDEFVRSysValueRuleCondition
 */
export interface IDEFVRSysValueRuleCondition extends IDEFVRSingleCondition {
  /**
   * 系统值规则对象
   *
   * @type {ISysValueRule}
   * 来源  getPSSysValueRule
   */
  sysValueRule?: ISysValueRule;
}
