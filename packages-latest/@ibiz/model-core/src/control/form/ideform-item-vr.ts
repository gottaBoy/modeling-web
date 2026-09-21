import { IDEFValueRule } from '../../dataentity/defield/valuerule/idefvalue-rule';
import { ISysValueRule } from '../../valuerule/isys-value-rule';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体表单项值规则模型对象接口
 * @export
 * @interface IDEFormItemVR
 */
export interface IDEFormItemVR extends IModelObject {
  /**
   * 检查模式
   * @description 值模式 [表单项值规则校验方式] {1：前台、 2：后台、 3：前后台 }
   * @type {( number | 1 | 2 | 3)}
   * 来源  getCheckMode
   */
  checkMode?: number | 1 | 2 | 3;

  /**
   * 属性值规则
   *
   * @type {IDEFValueRule}
   * 来源  getPSDEFValueRule
   */
  defvalueRule?: IDEFValueRule;

  /**
   * 表单项名称
   * @type {string}
   * 来源  getPSDEFormItemName
   */
  deformItemName?: string;

  /**
   * 系统值规则
   *
   * @type {ISysValueRule}
   * 来源  getPSSysValueRule
   */
  sysValueRule?: ISysValueRule;

  /**
   * 值规则类型
   * @description 值模式 [目标值规则类型] {DEFVALUERULE：实体值规则、 SYSVALUERULE：系统值规则 }
   * @type {( string | 'DEFVALUERULE' | 'SYSVALUERULE')}
   * 来源  getValueRuleType
   */
  valueRuleType?: string | 'DEFVALUERULE' | 'SYSVALUERULE';
}
