import { IDEUILogicNode } from '../../dataentity/logic/ideuilogic-node';

/**
 *
 * 应用实体界面逻辑节点模型对象接口
 * @export
 * @interface IAppDEUILogicNode
 */
export interface IAppDEUILogicNode extends IDEUILogicNode {
  /**
   * 前端模板插件对象
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;
}
