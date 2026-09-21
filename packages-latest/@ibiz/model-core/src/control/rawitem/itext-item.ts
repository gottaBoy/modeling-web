import { IRawItemBase } from '../iraw-item-base';
import { ITextBase } from '../itext-base';

/**
 *
 * 文本内容项模型对象接口
 * 继承父接口类型值[RAW]
 * @export
 * @interface ITextItem
 */
export interface ITextItem extends IRawItemBase, ITextBase {}
