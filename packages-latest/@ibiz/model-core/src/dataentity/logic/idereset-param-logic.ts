import { IDELogicNode } from './idelogic-node';

/**
 *
 * 继承父接口类型值[RESETPARAM]
 * @export
 * @interface IDEResetParamLogic
 */
export interface IDEResetParamLogic extends IDELogicNode {
  /**
   * 目标逻辑参数对象
   *
   * @type {string}
   * 来源  getDstPSDELogicParam
   */
  dstDELogicParamId?: string;
}
