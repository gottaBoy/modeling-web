import { IDEUILogicNode } from './ideuilogic-node';

/**
 *
 * 继承父接口类型值[DEBUGPARAM]
 * @export
 * @interface IDEUIDebugParamLogic
 */
export interface IDEUIDebugParamLogic extends IDEUILogicNode {
  /**
   * 目标逻辑参数对象
   *
   * @type {string}
   * 来源  getDstPSDEUILogicParam
   */
  dstDEUILogicParamId?: string;
}
