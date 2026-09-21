import { IDELogicNode } from './idelogic-node';

/**
 *
 * 继承父接口类型值[MERGEPARAM]
 * @export
 * @interface IDEMergeParamLogic
 */
export interface IDEMergeParamLogic extends IDELogicNode {
  /**
   * 目标逻辑参数对象
   *
   * @type {string}
   * 来源  getDstPSDELogicParam
   */
  dstDELogicParamId?: string;

  /**
   * 返回值绑定逻辑参数对象
   *
   * @type {string}
   * 来源  getRetPSDELogicParam
   */
  retDELogicParamId?: string;

  /**
   * 源逻辑参数对象
   *
   * @type {string}
   * 来源  getSrcPSDELogicParam
   */
  srcDELogicParamId?: string;
}
