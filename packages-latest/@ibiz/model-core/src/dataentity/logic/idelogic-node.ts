import { IDELogicLink } from './idelogic-link';
import { IDELogicNodeBase } from './idelogic-node-base';
import { IDELogicNodeParam } from './idelogic-node-param';

/**
 *
 * 实体处理逻辑节点模型对象接口
 * 子接口类型识别属性[logicNodeType]
 * @export
 * @interface IDELogicNode
 */
export interface IDELogicNode extends IDELogicNodeBase {
  /**
   * 节点动态参数
   * @type {IModel}
   * 来源  getNodeParams
   */
  nodeParams?: IModel;

  /**
   * 逻辑节点连出连接集合
   *
   * @type {IDELogicLink[]}
   * 来源  getPSDELogicLinks
   */
  links?: IDELogicLink[];

  /**
   * 节点参数集合
   *
   * @type {IDELogicNodeParam[]}
   * 来源  getPSDELogicNodeParams
   */
  delogicNodeParams?: IDELogicNodeParam[];
}
