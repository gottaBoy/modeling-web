import { IRawItemBase } from '../iraw-item-base';

/**
 *
 * MARKDOWN直接内容项模型对象接口
 * 继承父接口类型值[MARKDOWN]
 * @export
 * @interface IMarkdownItem
 */
export interface IMarkdownItem extends IRawItemBase {
  /**
   * 内容
   * @type {string}
   * 来源  getContent
   */
  content?: string;
}
