import { IDELogicNode } from './idelogic-node';

/**
 *
 * 继承父接口类型值[DEACTION]
 * @export
 * @interface IDEDEActionLogic
 */
export interface IDEDEActionLogic extends IDELogicNode {
  /**
   * 应用实体行为对象
   *
   * @type {string}
   * 来源  getDstPSAppDEAction
   */
  dstAppDEActionId?: string;

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
   * 来源  getDstPSDELogicParam
   */
  dstDELogicParamId?: string;

  /**
   * 返回值绑定逻辑参数对象
   *
   * @type {string}
   * 来源  getRetPSDELogicParam
   */
  retDELogicParamId?: string;
}
