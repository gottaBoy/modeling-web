import { IAppView } from '../../app/view/iapp-view';
import { IDBPortletPart } from './idbportlet-part';
/**
 *
 * 继承父接口类型值[VIEW]
 * @export
 * @interface IDBAppViewPortletPart
 */
export interface IDBAppViewPortletPart extends IDBPortletPart {
    /**
     * 嵌入视图对象
     *
     * @type {IAppView}
     * 来源  getPortletPSAppView
     */
    portletAppView?: IAppView;
}
