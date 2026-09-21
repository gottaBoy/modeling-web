import { ILayoutPanel } from '../../control/panel/ilayout-panel';
import { IDEACMode } from '../../dataentity/ac/ideacmode';

/**
 *
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
