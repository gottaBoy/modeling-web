import { IDEUILogicNode } from './ideuilogic-node';

/**
 *
 * 继承父接口类型值[DELOGIC]
 * @export
 * @interface IDEUIDELogicLogic
 */
export interface IDEUIDELogicLogic extends IDEUILogicNode {
  /**
   * 应用实体逻辑对象
   *
   * @type {string}
   * 来源  getDstPSAppDELogic
   */
  dstAppDELogicId?: string;

  /**
   * 应用实体对象
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
