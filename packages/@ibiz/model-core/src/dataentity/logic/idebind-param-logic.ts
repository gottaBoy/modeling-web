import { IDELogicNode } from './idelogic-node';

/**
 *
 * 继承父接口类型值[BINDPARAM]
 * @export
 * @interface IDEBindParamLogic
 */
export interface IDEBindParamLogic extends IDELogicNode {
  /**
   * 目标逻辑参数对象
   *
   * @type {string}
   * 来源  getDstPSDELogicParam
   */
  dstDELogicParamId?: string;

  /**
   * 源属性名称
   * @type {string}
   * 来源  getSrcFieldName
   */
  srcFieldName?: string;

  /**
   * 源逻辑参数对象
   *
   * @type {string}
   * 来源  getSrcPSDELogicParam
   */
  srcDELogicParamId?: string;
}
