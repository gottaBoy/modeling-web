import { IRawItemContainer } from '../iraw-item-container';
import { IDEToolbarItem } from './idetoolbar-item';

/**
 *
 * 实体工具栏直接内容项模型对象接口
 * 继承父接口类型值[RAWITEM]
 * @export
 * @interface IDETBRawItem
 */
export interface IDETBRawItem extends IDEToolbarItem, IRawItemContainer {}
