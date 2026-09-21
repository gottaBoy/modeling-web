import { ICodeListEditor } from './icode-list-editor';

/**
 *
 * 继承父接口类型值[DROPDOWNLIST,MOBDROPDOWNLIST,DROPDOWNLIST_100]
 * @export
 * @interface IDropDownList
 */
export interface IDropDownList extends ICodeListEditor {
  /**
   * 单项选择模式
   * @type {boolean}
   * 来源  isSingleSelect
   */
  singleSelect?: boolean;
}
