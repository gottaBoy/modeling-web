import { IDEFVRSingleCondition } from './idefvrsingle-condition';

/**
 *
 * 继承父接口类型值[SIMPLE]
 * @export
 * @interface IDEFVRSimpleCondition
 */
export interface IDEFVRSimpleCondition extends IDEFVRSingleCondition {
  /**
   * 条件操作
   * @type {string}
   * 来源  getCondOp
   */
  condOp?: string;

  /**
   * 参数类型
   * @description 值模式 [实体属性值规则条件参数类型] {ENTITYFIELD：数据对象属性、 CURTIME：当前时间 }
   * @type {( string | 'ENTITYFIELD' | 'CURTIME')}
   * 来源  getParamType
   */
  paramType?: string | 'ENTITYFIELD' | 'CURTIME';

  /**
   * 参数值
   * @type {string}
   * 来源  getParamValue
   */
  paramValue?: string;
}
