import { IRawItemContainer } from '../iraw-item-container';
import { IAppMenuItem } from './iapp-menu-item';

/**
 *
 * 继承父接口类型值[RAWITEM]
 * @export
 * @interface IAppMenuRawItem
 */
export interface IAppMenuRawItem extends IAppMenuItem, IRawItemContainer {}
