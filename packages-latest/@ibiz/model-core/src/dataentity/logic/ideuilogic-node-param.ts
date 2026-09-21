import { IDELogicNodeParamBase } from './idelogic-node-param-base';

/**
 *
 * 实体界面逻辑节点参数模型对象接口
 * @export
 * @interface IDEUILogicNodeParam
 */
export interface IDEUILogicNodeParam extends IDELogicNodeParamBase {
  /**
   * 目标逻辑参数
   *
   * @type {string}
   * 来源  getDstPSDEUILogicParam
   */
  dstDEUILogicParamId?: string;

  /**
   * 表达式
   * @type {string}
   * 来源  getExpression
   */
  expression?: string;

  /**
   * 源逻辑参数
   *
   * @type {string}
   * 来源  getSrcPSDEUILogicParam
   */
  srcDEUILogicParamId?: string;
}
