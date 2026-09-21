import { IRawItemBase } from '../iraw-item-base';
/**
 *
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
