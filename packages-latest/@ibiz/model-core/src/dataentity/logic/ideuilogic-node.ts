import { IDELogicNodeBase } from './idelogic-node-base';
import { IDEUILogicLink } from './ideuilogic-link';
import { IDEUILogicNodeParam } from './ideuilogic-node-param';

/**
 *
 * 实体界面逻辑节点模型对象接口
 * 子接口类型识别属性[logicNodeType]
 * @export
 * @interface IDEUILogicNode
 */
export interface IDEUILogicNode extends IDELogicNodeBase {
  /**
   * 目标逻辑参数对象
   *
   * @type {string}
   * 来源  getDstPSDEUILogicParam
   */
  dstDEUILogicParamId?: string;

  /**
   * 逻辑节点连出连接集合
   *
   * @type {IDEUILogicLink[]}
   * 来源  getPSDEUILogicLinks
   */
  deuilogicLinks?: IDEUILogicLink[];

  /**
   * 逻辑节点参数集合
   *
   * @type {IDEUILogicNodeParam[]}
   * 来源  getPSDEUILogicNodeParams
   */
  deuilogicNodeParams?: IDEUILogicNodeParam[];

  /**
   * 源逻辑参数对象
   *
   * @type {string}
   * 来源  getSrcPSDEUILogicParam
   */
  srcDEUILogicParamId?: string;
}
