import { IAppViewMsg } from './iapp-view-msg';

/**
 *
 * 继承父接口类型值[1]
 * @export
 * @interface IAppDEDataSetViewMsg
 */
export interface IAppDEDataSetViewMsg extends IAppViewMsg {
  /**
   * 缓存范围
   * @description 值模式 [视图消息缓存范围] {GLOBAL：全局 }
   * @type {( string | 'GLOBAL')}
   * 来源  getCacheScope
   */
  cacheScope?: string | 'GLOBAL';

  /**
   * 缓存标记2应用实体属性对象
   *
   * @type {string}
   * 来源  getCacheTag2PSAppDEField
   */
  cacheTag2AppDEFieldId?: string;

  /**
   * 缓存标记应用实体属性对象
   *
   * @type {string}
   * 来源  getCacheTagPSAppDEField
   */
  cacheTagAppDEFieldId?: string;

  /**
   * 缓存超时
   * @type {number}
   * 来源  getCacheTimeout
   */
  cacheTimeout?: number;

  /**
   * 消息内容应用实体属性对象
   *
   * @type {string}
   * 来源  getContentPSAppDEField
   */
  contentAppDEFieldId?: string;

  /**
   * 内容类型应用实体属性对象
   *
   * @type {string}
   * 来源  getContentTypePSAppDEField
   */
  contentTypeAppDEFieldId?: string;

  /**
   * 显示位置应用实体属性对象
   *
   * @type {string}
   * 来源  getMsgPosPSAppDEField
   */
  msgPosAppDEFieldId?: string;

  /**
   * 消息类型标记应用实体属性对象
   *
   * @type {string}
   * 来源  getMsgTypePSAppDEField
   */
  msgTypeAppDEFieldId?: string;

  /**
   * 显示次序应用实体属性对象
   *
   * @type {string}
   * 来源  getOrderValuePSAppDEField
   */
  orderValueAppDEFieldId?: string;

  /**
   * 应用实体数据集合对象
   *
   * @type {string}
   * 来源  getPSAppDEDataSet
   */
  appDEDataSetId?: string;

  /**
   * 应用实体对象
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;

  /**
   * 移除标志应用实体属性对象
   *
   * @type {string}
   * 来源  getRemoveFlagPSAppDEField
   */
  removeFlagAppDEFieldId?: string;

  /**
   * 抬头语言标记应用实体属性对象
   *
   * @type {string}
   * 来源  getTitleLanResTagPSAppDEField
   */
  titleLanResTagAppDEFieldId?: string;

  /**
   * 抬头应用实体属性对象
   *
   * @type {string}
   * 来源  getTitlePSAppDEField
   */
  titleAppDEFieldId?: string;

  /**
   * 支持缓存
   * @type {boolean}
   * 来源  isEnableCache
   */
  enableCache?: boolean;
}
