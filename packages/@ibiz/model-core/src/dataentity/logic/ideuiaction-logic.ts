import { IDEUILogicNode } from './ideuilogic-node';

/**
 *
 * 继承父接口类型值[DEUIACTION]
 * @export
 * @interface IDEUIActionLogic
 */
export interface IDEUIActionLogic extends IDEUILogicNode {
  /**
   * 调用应用实体界面行为
   *
   * @type {string}
   * 来源  getDstPSAppDEUIAction
   */
  dstAppDEUIActionId?: string;

  /**
   * 目标应用实体对象
   *
   * @type {string}
   * 来源  getDstPSAppDataEntity
   */
  dstAppDataEntityId?: string;
}
