import { IEditor } from '../ieditor';

/**
 *
 * 具备值项编辑器模型基础对象接口
 * @export
 * @interface IValueItemEditor
 */
export interface IValueItemEditor extends IEditor {
  /**
   * 值项名称
   * @type {string}
   * 来源  getValueItemName
   */
  valueItemName?: string;
}
