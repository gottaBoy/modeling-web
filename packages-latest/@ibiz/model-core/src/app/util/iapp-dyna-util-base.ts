import { IAppUtil } from './iapp-util';

/**
 *
 * 应用模型存储功能模型对象接口
 * @export
 * @interface IAppDynaUtilBase
 */
export interface IAppDynaUtilBase extends IAppUtil {
  /**
   * 应用标识存储属性
   *
   * @type {string}
   * 来源  getAppIdPSAppDEField
   */
  appIdAppDEFieldId?: string;

  /**
   * 建立数据行为
   *
   * @type {string}
   * 来源  getCreatePSAppDEAction
   */
  createAppDEActionId?: string;

  /**
   * 获取数据行为
   *
   * @type {string}
   * 来源  getGetPSAppDEAction
   */
  getAppDEActionId?: string;

  /**
   * 模型标识存储属性
   *
   * @type {string}
   * 来源  getModelIdPSAppDEField
   */
  modelIdAppDEFieldId?: string;

  /**
   * 模型存储属性
   *
   * @type {string}
   * 来源  getModelPSAppDEField
   */
  modelAppDEFieldId?: string;

  /**
   * 删除数据行为
   *
   * @type {string}
   * 来源  getRemovePSAppDEAction
   */
  removeAppDEActionId?: string;

  /**
   * 功能数据存储实体
   *
   * @type {string}
   * 来源  getStoagePSAppDataEntity
   */
  stoageAppDataEntityId?: string;

  /**
   * 功能数据存储实体
   *
   * @type {string}
   * 来源  getStoragePSAppDataEntity
   */
  storageAppDataEntityId?: string;

  /**
   * 更新数据行为
   *
   * @type {string}
   * 来源  getUpdatePSAppDEAction
   */
  updateAppDEActionId?: string;

  /**
   * 用户标识存储属性
   *
   * @type {string}
   * 来源  getUserIdPSAppDEField
   */
  userIdAppDEFieldId?: string;
}
