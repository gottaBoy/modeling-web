import { IRawItemContainer } from '../iraw-item-container';
import { IDEContextMenuItem } from './idecontext-menu-item';

/**
 *
 * 上下文直接内容菜单项模型对象接口
 * 继承父接口类型值[RAWITEM]
 * @export
 * @interface IDECMRawItem
 */
export interface IDECMRawItem extends IDEContextMenuItem, IRawItemContainer {}
