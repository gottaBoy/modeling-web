import { IRawItemContainer } from '../iraw-item-container';
import { IPanelItem } from './ipanel-item';

/**
 *
 * 面板直接内容项模型对象接口
 * 继承父接口类型值[RAWITEM]
 * @export
 * @interface IPanelRawItem
 */
export interface IPanelRawItem extends IPanelItem, IRawItemContainer {}
