import { IDECalendarItem } from './idecalendar-item';

/**
 *
 * 系统日历部件项模型对象接口
 * @export
 * @interface ISysCalendarItem
 */
export interface ISysCalendarItem extends IDECalendarItem {
  /**
   * 背景颜色应用实体属性
   *
   * @type {string}
   * 来源  getBKColorPSAppDEField
   */
  bkcolorAppDEFieldId?: string;

  /**
   * 开始时间应用实体属性
   *
   * @type {string}
   * 来源  getBeginTimePSAppDEField
   */
  beginTimeAppDEFieldId?: string;

  /**
   * 项样式表值应用实体属性
   *
   * @type {string}
   * 来源  getClsPSAppDEField
   */
  clsAppDEFieldId?: string;

  /**
   * 文本颜色应用实体属性
   *
   * @type {string}
   * 来源  getColorPSAppDEField
   */
  colorAppDEFieldId?: string;

  /**
   * 内容应用实体属性
   *
   * @type {string}
   * 来源  getContentPSAppDEField
   */
  contentAppDEFieldId?: string;

  /**
   * 建立数据应用实体行为
   *
   * @type {string}
   * 来源  getCreatePSAppDEAction
   */
  createAppDEActionId?: string;

  /**
   * 建立要求操作标识
   *
   * @type {string}
   * 来源  getCreatePSDEOPPriv
   */
  createDEOPPrivId?: string;

  /**
   * 附加查询条件
   * @type {string}
   * 来源  getCustomCond
   */
  customCond?: string;

  /**
   * 数据值2应用实体属性
   *
   * @type {string}
   * 来源  getData2PSAppDEField
   */
  data2AppDEFieldId?: string;

  /**
   * 数据值应用实体属性
   *
   * @type {string}
   * 来源  getDataPSAppDEField
   */
  dataAppDEFieldId?: string;

  /**
   * 结束时间应用实体属性
   *
   * @type {string}
   * 来源  getEndTimePSAppDEField
   */
  endTimeAppDEFieldId?: string;

  /**
   * 项图标值应用实体属性
   *
   * @type {string}
   * 来源  getIconPSAppDEField
   */
  iconAppDEFieldId?: string;

  /**
   * 项标识值应用实体属性
   *
   * @type {string}
   * 来源  getIdPSAppDEField
   */
  idAppDEFieldId?: string;

  /**
   * 级别应用实体属性
   *
   * @type {string}
   * 来源  getLevelPSAppDEField
   */
  levelAppDEFieldId?: string;

  /**
   * 链接值应用实体属性
   *
   * @type {string}
   * 来源  getLinkPSAppDEField
   */
  linkAppDEFieldId?: string;

  /**
   * 应用实体数据集
   *
   * @type {string}
   * 来源  getPSAppDEDataSet
   */
  appDEDataSetId?: string;

  /**
   * 前端模板插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 日历项默认行为
   *
   * @type {string}
   * 来源  getPSUIAction
   */
  uiactionId?: string;

  /**
   * 删除数据应用实体行为
   *
   * @type {string}
   * 来源  getRemovePSAppDEAction
   */
  removeAppDEActionId?: string;

  /**
   * 删除要求操作标识
   *
   * @type {string}
   * 来源  getRemovePSDEOPPriv
   */
  removeDEOPPrivId?: string;

  /**
   * 标记值2应用实体属性
   *
   * @type {string}
   * 来源  getTag2PSAppDEField
   */
  tag2AppDEFieldId?: string;

  /**
   * 标记值应用实体属性
   *
   * @type {string}
   * 来源  getTagPSAppDEField
   */
  tagAppDEFieldId?: string;

  /**
   * 项文本值应用实体属性
   *
   * @type {string}
   * 来源  getTextPSAppDEField
   */
  textAppDEFieldId?: string;

  /**
   * 提示应用实体属性
   *
   * @type {string}
   * 来源  getTipsPSAppDEField
   */
  tipsAppDEFieldId?: string;

  /**
   * 更新数据应用实体行为
   *
   * @type {string}
   * 来源  getUpdatePSAppDEAction
   */
  updateAppDEActionId?: string;

  /**
   * 更新要求操作标识
   *
   * @type {string}
   * 来源  getUpdatePSDEOPPriv
   */
  updateDEOPPrivId?: string;
}
