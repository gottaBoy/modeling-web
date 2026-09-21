import { IRawItemBase } from '../iraw-item-base';
/**
 *
 * 继承父接口类型值[PLACEHOLDER]
 * @export
 * @interface IPlaceholderItem
 */
export interface IPlaceholderItem extends IRawItemBase {
    /**
     * 标题
     * @type {string}
     * 来源  getCaption
     */
    caption?: string;
    /**
     * 内容
     * @type {string}
     * 来源  getContent
     */
    content?: string;
}
