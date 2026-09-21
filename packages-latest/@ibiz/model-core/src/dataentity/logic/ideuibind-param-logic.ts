import { IDEUILogicNode } from './ideuilogic-node';

/**
 *
 * 继承父接口类型值[BINDPARAM]
 * @export
 * @interface IDEUIBindParamLogic
 */
export interface IDEUIBindParamLogic extends IDEUILogicNode {
  /**
   * 目标逻辑参数对象
   *
   * @type {string}
   * 来源  getDstPSDEUILogicParam
   */
  dstDEUILogicParamId?: string;

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
   * 来源  getSrcPSDEUILogicParam
   */
  srcDEUILogicParamId?: string;
}
