import { IRawItemContainer } from '../iraw-item-container';
import { IDBPortletPart } from './idbportlet-part';

/**
 *
 * 直接内容门户部件模型对象接口
 * 继承父接口类型值[RAWITEM]
 * @export
 * @interface IDBRawItemPortletPart
 */
export interface IDBRawItemPortletPart
  extends IDBPortletPart,
    IRawItemContainer {}
