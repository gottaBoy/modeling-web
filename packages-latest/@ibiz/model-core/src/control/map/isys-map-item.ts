import { IControlMDObject } from '../icontrol-mdobject';
import { IMapItem } from './imap-item';

/**
 *
 * 系统地图部件项模型对象接口
 * @export
 * @interface ISysMapItem
 */
export interface ISysMapItem extends IMapItem, IControlMDObject {
  /**
   * 高度值应用实体属性
   *
   * @type {string}
   * 来源  getAltitudePSAppDEField
   */
  altitudeAppDEFieldId?: string;

  /**
   * 背景颜色应用实体属性
   *
   * @type {string}
   * 来源  getBKColorPSAppDEField
   */
  bkcolorAppDEFieldId?: string;

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
   * 分组值应用实体属性
   *
   * @type {string}
   * 来源  getGroupPSAppDEField
   */
  groupAppDEFieldId?: string;

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
   * 维度值应用实体属性
   *
   * @type {string}
   * 来源  getLatitudePSAppDEField
   */
  latitudeAppDEFieldId?: string;

  /**
   * 链接值应用实体属性
   *
   * @type {string}
   * 来源  getLinkPSAppDEField
   */
  linkAppDEFieldId?: string;

  /**
   * 经度值应用实体属性
   *
   * @type {string}
   * 来源  getLongitudePSAppDEField
   */
  longitudeAppDEFieldId?: string;

  /**
   * 排序值应用实体属性
   *
   * @type {string}
   * 来源  getOrderValuePSAppDEField
   */
  orderValueAppDEFieldId?: string;

  /**
   * 应用实体数据集
   *
   * @type {string}
   * 来源  getPSAppDEDataSet
   */
  appDEDataSetId?: string;

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
   * 图形样式应用实体属性
   *
   * @type {string}
   * 来源  getShapeClsPSAppDEField
   */
  shapeClsAppDEFieldId?: string;

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
   * 时间应用实体属性
   *
   * @type {string}
   * 来源  getTimePSAppDEField
   */
  timeAppDEFieldId?: string;

  /**
   * 提示应用实体属性
   *
   * @type {string}
   * 来源  getTipsPSAppDEField
   */
  tipsAppDEFieldId?: string;
}
