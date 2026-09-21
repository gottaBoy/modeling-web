import { IImageBase } from '../iimage-base';
import { IRawItemBase } from '../iraw-item-base';

/**
 *
 * 图片直接内容项模型对象接口
 * 继承父接口类型值[IMAGE]
 * @export
 * @interface IImageItem
 */
export interface IImageItem extends IRawItemBase, IImageBase {}
