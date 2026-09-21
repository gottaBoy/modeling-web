import { ICodeList } from '../../codelist/icode-list';

/**
 *
 * 应用代码表模型对象接口
 * @export
 * @interface IAppCodeList
 */
export interface IAppCodeList extends ICodeList {
  /**
   * 背景颜色值应用实体属性
   *
   * @type {string}
   * 来源  getBKColorPSAppDEField
   */
  bkcolorAppDEFieldId?: string;

  /**
   * 开始值应用实体属性
   *
   * @type {string}
   * 来源  getBeginValuePSAppDEField
   */
  beginValueAppDEFieldId?: string;

  /**
   * 样式表值应用实体属性
   *
   * @type {string}
   * 来源  getClsPSAppDEField
   */
  clsAppDEFieldId?: string;

  /**
   * 前景颜色值应用实体属性
   *
   * @type {string}
   * 来源  getColorPSAppDEField
   */
  colorAppDEFieldId?: string;

  /**
   * 数据应用实体属性
   *
   * @type {string}
   * 来源  getDataPSAppDEField
   */
  dataAppDEFieldId?: string;

  /**
   * 禁用标志应用实体属性
   *
   * @type {string}
   * 来源  getDisablePSAppDEField
   */
  disableAppDEFieldId?: string;

  /**
   * 结束值应用实体属性
   *
   * @type {string}
   * 来源  getEndValuePSAppDEField
   */
  endValueAppDEFieldId?: string;

  /**
   * 图标样式应用实体属性
   *
   * @type {string}
   * 来源  getIconClsPSAppDEField
   */
  iconClsAppDEFieldId?: string;

  /**
   * 图标样式（倍数）应用实体属性
   *
   * @type {string}
   * 来源  getIconClsXPSAppDEField
   */
  iconClsXAppDEFieldId?: string;

  /**
   * 图标路径应用实体属性
   *
   * @type {string}
   * 来源  getIconPathPSAppDEField
   */
  iconPathAppDEFieldId?: string;

  /**
   * 图标路径（倍数）应用实体属性
   *
   * @type {string}
   * 来源  getIconPathXPSAppDEField
   */
  iconPathXAppDEFieldId?: string;

  /**
   * 排序应用实体属性
   *
   * @type {string}
   * 来源  getMinorSortPSAppDEField
   */
  minorSortAppDEFieldId?: string;

  /**
   * 应用实体数据集合
   *
   * @type {string}
   * 来源  getPSAppDEDataSet
   */
  appDEDataSetId?: string;

  /**
   * 应用实体
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;

  /**
   * 父值应用实体属性
   *
   * @type {string}
   * 来源  getPValuePSAppDEField
   */
  pvalueAppDEFieldId?: string;

  /**
   * 文本应用实体属性
   *
   * @type {string}
   * 来源  getTextPSAppDEField
   */
  textAppDEFieldId?: string;

  /**
   * 值应用实体属性
   *
   * @type {string}
   * 来源  getValuePSAppDEField
   */
  valueAppDEFieldId?: string;
}
