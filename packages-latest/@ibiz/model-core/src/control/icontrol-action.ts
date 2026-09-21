import { IModelObject } from '../imodel-object';

/**
 *
 * 界面部件行为模型基础对象接口
 * @export
 * @interface IControlAction
 */
export interface IControlAction extends IModelObject {
  /**
   * 上下文转换逻辑
   *
   * @type {string}
   * 来源  getADPSAppDELogic
   */
  adappDELogicId?: string;

  /**
   * 行为描述
   * @type {string}
   * 来源  getActionDesc
   */
  actionDesc?: string;

  /**
   * 应用实体方法
   *
   * @type {string}
   * 来源  getPSAppDEMethod
   */
  appDEMethodId?: string;

  /**
   * 应用实体对象
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;

  /**
   * 处理超时时长（毫秒）
   * @type {number}
   * @default -1
   * 来源  getTimeout
   */
  timeout?: number;
}
