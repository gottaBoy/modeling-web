import { IRawItemBase } from '../iraw-item-base';

/**
 *
 * Html直接内容项模型对象接口
 * 继承父接口类型值[HTML]
 * @export
 * @interface IHtmlItem
 */
export interface IHtmlItem extends IRawItemBase {
  /**
   * 内容
   * @type {string}
   * 来源  getContent
   */
  content?: string;
}
