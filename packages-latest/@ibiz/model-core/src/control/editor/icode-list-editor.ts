import { IAppCodeList } from '../../app/codelist/iapp-code-list';
import { IEditor } from '../ieditor';

/**
 *
 * 代码表编辑器模型基础对象接口
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
   * 代码表（运行时内联）
   *
   * @type {IAppCodeList}
   * 来源  getInlinePSAppCodeList
   */
  inlineAppCodeList?: IAppCodeList;

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
