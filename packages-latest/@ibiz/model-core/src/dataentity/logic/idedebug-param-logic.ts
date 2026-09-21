import { IDELogicNode } from './idelogic-node';

/**
 *
 * 继承父接口类型值[DEBUGPARAM]
 * @export
 * @interface IDEDebugParamLogic
 */
export interface IDEDebugParamLogic extends IDELogicNode {
  /**
   * 目标逻辑参数对象
   *
   * @type {string}
   * 来源  getDstPSDELogicParam
   */
  dstDELogicParamId?: string;
}
