import { IRawItemContainer } from '../iraw-item-container';
import { IDBPortletPart } from './idbportlet-part';

/**
 *
 * 继承父接口类型值[RAWITEM]
 * @export
 * @interface IDBRawItemPortletPart
 */
export interface IDBRawItemPortletPart
  extends IDBPortletPart,
    IRawItemContainer {}
