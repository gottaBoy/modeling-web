import { IDEUILogicNode } from './ideuilogic-node';

/**
 *
 * 继承父接口类型值[DEACTION]
 * @export
 * @interface IDEUIDEActionLogic
 */
export interface IDEUIDEActionLogic extends IDEUILogicNode {
  /**
   * 调用应用实体行为
   *
   * @type {string}
   * 来源  getDstPSAppDEAction
   */
  dstAppDEActionId?: string;

  /**
   * 目标应用实体对象
   *
   * @type {string}
   * 来源  getDstPSAppDataEntity
   */
  dstAppDataEntityId?: string;

  /**
   * 目标逻辑参数对象
   *
   * @type {string}
   * 来源  getDstPSDEUILogicParam
   */
  dstDEUILogicParamId?: string;

  /**
   * 返回值绑定逻辑参数对象
   *
   * @type {string}
   * 来源  getRetPSDEUILogicParam
   */
  retDEUILogicParamId?: string;
}
