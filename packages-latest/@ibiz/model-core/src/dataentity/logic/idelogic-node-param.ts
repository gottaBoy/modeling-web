import { IDELogicNodeParamBase } from './idelogic-node-param-base';

/**
 *
 * 实体处理逻辑节点参数模型对象接口
 * @export
 * @interface IDELogicNodeParam
 */
export interface IDELogicNodeParam extends IDELogicNodeParamBase {
  /**
   * 目标逻辑参数
   *
   * @type {string}
   * 来源  getDstPSDELogicParam
   */
  dstDELogicParamId?: string;

  /**
   * 表达式
   * @type {string}
   * 来源  getExpression
   */
  expression?: string;

  /**
   * 动态参数
   * @type {IModel}
   * 来源  getParams
   */
  params?: IModel;

  /**
   * 源逻辑参数
   *
   * @type {string}
   * 来源  getSrcPSDELogicParam
   */
  srcDELogicParamId?: string;
}
