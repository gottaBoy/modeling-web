import { ILayoutPanel } from '../../control/panel/ilayout-panel';
import { IDEACMode } from '../../dataentity/ac/ideacmode';

/**
 *
 * 应用实体自填模式模型对象接口
 * @export
 * @interface IAppDEACMode
 */
export interface IAppDEACMode extends IDEACMode {
  /**
   * 布局面板
   *
   * @type {ILayoutPanel}
   * 来源  getItemPSLayoutPanel
   */
  itemLayoutPanel?: ILayoutPanel;

  /**
   * 数据链接视图
   *
   * @type {string}
   * 来源  getLinkPSAppView
   */
  linkAppViewId?: string;

  /**
   * 从排序应用属性对象
   *
   * @type {string}
   * 来源  getMinorSortPSAppDEField
   */
  minorSortAppDEFieldId?: string;

  /**
   * 应用实体数据集对象
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
   * 嵌入选择视图
   *
   * @type {string}
   * 来源  getPickupPSAppView
   */
  pickupAppViewId?: string;

  /**
   * 文本应用属性对象
   *
   * @type {string}
   * 来源  getTextPSAppDEField
   */
  textAppDEFieldId?: string;

  /**
   * 值应用属性对象
   *
   * @type {string}
   * 来源  getValuePSAppDEField
   */
  valueAppDEFieldId?: string;
}
