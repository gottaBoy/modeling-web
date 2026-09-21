import { IEditor } from '../ieditor';
import { INavigateParamContainer } from '../inavigate-param-container';

/**
 *
 * 数据选择编辑器模型基础对象接口
 * @export
 * @interface IPickerEditor
 */
export interface IPickerEditor extends IEditor, INavigateParamContainer {
  /**
   * 附加上下文Json字符串
   * @type {string}
   * 来源  getContextJOString
   */
  contextJOString?: string;

  /**
   * 项参数对象
   * @type {IModel}
   * 来源  getItemParamJO
   */
  itemParamJO?: IModel;

  /**
   * 附加参数Json字符串
   * @type {string}
   * 来源  getParamJOString
   */
  paramJOString?: string;

  /**
   * 选择视图
   *
   * @type {string}
   * 来源  getPickupPSAppView
   */
  pickupAppViewId?: string;

  /**
   * 支持选择视图
   * @type {boolean}
   * 来源  isEnablePickupView
   */
  enablePickupView?: boolean;
}
