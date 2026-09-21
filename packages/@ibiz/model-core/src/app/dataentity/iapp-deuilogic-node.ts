import { IDEUILogicNode } from '../../dataentity/logic/ideuilogic-node';

/**
 *
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
