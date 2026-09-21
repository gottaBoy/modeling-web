import { IAppDEMethodLogic } from './iapp-demethod-logic';

/**
 *
 * 应用实体行为附加逻辑模型对象接口
 * @export
 * @interface IAppDEActionLogic
 */
export interface IAppDEActionLogic extends IAppDEMethodLogic {
  /**
   * 触发目标行为
   *
   * @type {string}
   * 来源  getDstPSAppDEAction
   */
  dstAppDEActionId?: string;

  /**
   * 目标行为所属实体
   *
   * @type {string}
   * 来源  getDstPSAppDataEntity
   */
  dstAppDataEntityId?: string;

  /**
   * 应用实体逻辑
   *
   * @type {string}
   * 来源  getPSAppDELogic
   */
  appDELogicId?: string;

  /**
   * 克隆传入参数
   * @type {boolean}
   * @default false
   * 来源  isCloneParam
   */
  cloneParam?: boolean;

  /**
   * 内部逻辑
   * @type {boolean}
   * @default false
   * 来源  isInternalLogic
   */
  internalLogic?: boolean;
}
