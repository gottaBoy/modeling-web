import { IDEUILogicNode } from './ideuilogic-node';

/**
 *
 * 继承父接口类型值[PFPLUGIN]
 * @export
 * @interface IDEUIPFPluginLogic
 */
export interface IDEUIPFPluginLogic extends IDEUILogicNode {
  /**
   * 前端扩展插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;
}
