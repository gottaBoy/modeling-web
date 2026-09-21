import { IDEUILogicNode } from './ideuilogic-node';

/**
 *
 * 继承父接口类型值[RENEWPARAM]
 * @export
 * @interface IDEUIRenewParamLogic
 */
export interface IDEUIRenewParamLogic extends IDEUILogicNode {
  /**
   * 目标逻辑参数对象
   *
   * @type {string}
   * 来源  getDstPSDEUILogicParam
   */
  dstDEUILogicParamId?: string;
}
