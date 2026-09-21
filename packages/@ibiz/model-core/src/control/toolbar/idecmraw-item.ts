import { IRawItemContainer } from '../iraw-item-container';
import { IDEContextMenuItem } from './idecontext-menu-item';

/**
 *
 * 继承父接口类型值[RAWITEM]
 * @export
 * @interface IDECMRawItem
 */
export interface IDECMRawItem extends IDEContextMenuItem, IRawItemContainer {}
