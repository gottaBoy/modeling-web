import { IEditor } from '../ieditor';

/**
 *
 * @export
 * @interface ICodeListEditor
 */
export interface ICodeListEditor extends IEditor {
  /**
   * 全部项文本[ALLITEMSTEXT]
   * @type {string}
   * 来源  getAllItemsText
   */
  itemsText?: string;

  /**
   * 快速代码表模型
   * @type {string}
   * 来源  getCodeListModel
   */
  codeListModel?: string;

  /**
   * 应用代码表对象
   *
   * @type {string}
   * 来源  getPSAppCodeList
   */
  appCodeListId?: string;

  /**
   * 输出全部项[ALLITEMS]
   * @type {boolean}
   * @default false
   * 来源  isAllItems
   */
  allItems?: boolean;
}
