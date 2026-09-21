import { IAutoComplete } from './iauto-complete';
import { IPickerEditor } from './ipicker-editor';
import { IValueItemEditor } from './ivalue-item-editor';

/**
 *
 * 继承父接口类型值[PICKER,MOBPICKER,PICKEREX_LINK,PICKEREX_NOAC,PICKEREX_TRIGGER,PICKEREX_LINKONLY,PICKEREX_NOBUTTON,PICKEREX_NOAC_LINK,PICKEREX_DROPDOWNVIEW,PICKEREX_TRIGGER_LINK,MOBPICKER_DROPDOWNVIEW,PICKEREX_DROPDOWNVIEW_LINK]
 * @export
 * @interface IPicker
 */
export interface IPicker
  extends IPickerEditor,
    IValueItemEditor,
    IAutoComplete {
  /**
   * 下拉视图高度[DROPDOWNVIEWHEIGHT]
   * @type {number}
   * 来源  getDropDownViewHeight
   */
  dropDownViewHeight?: number;

  /**
   * 下拉视图宽度[DROPDOWNVIEWWIDTH]
   * @type {number}
   * 来源  getDropDownViewWidth
   */
  dropDownViewWidth?: number;

  /**
   * 数据链接视图
   *
   * @type {string}
   * 来源  getLinkPSAppView
   */
  linkAppViewId?: string;

  /**
   * 下拉选择视图
   * @type {boolean}
   * @default false
   * 来源  isDropDownView
   */
  dropDownView?: boolean;

  /**
   * 支持链接视图
   * @type {boolean}
   * @default false
   * 来源  isEnableLinkView
   */
  enableLinkView?: boolean;

  /**
   * 支持选择视图
   * @type {boolean}
   * 来源  isEnablePickupView
   */
  enablePickupView?: boolean;

  /**
   * 单项选择
   * @type {boolean}
   * 来源  isSingleSelect
   */
  singleSelect?: boolean;
}
