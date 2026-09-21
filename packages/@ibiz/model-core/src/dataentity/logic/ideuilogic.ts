import { IDELogicBase } from './idelogic-base';
import { IDEUILogicNode } from './ideuilogic-node';
import { IDEUILogicParam } from './ideuilogic-param';

/**
 *
 * @export
 * @interface IDEUILogic
 */
export interface IDEUILogic extends IDELogicBase {
  /**
   * 逻辑处理节点集合
   *
   * @type {IDEUILogicNode[]}
   * 来源  getPSDEUILogicNodes
   */
  deuilogicNodes?: IDEUILogicNode[];

  /**
   * 逻辑处理参数集合
   *
   * @type {IDEUILogicParam[]}
   * 来源  getPSDEUILogicParams
   */
  deuilogicParams?: IDEUILogicParam[];

  /**
   * 开始处理节点
   *
   * @type {string}
   * 来源  getStartPSDEUILogicNode
   */
  startDEUILogicNodeId?: string;
}
