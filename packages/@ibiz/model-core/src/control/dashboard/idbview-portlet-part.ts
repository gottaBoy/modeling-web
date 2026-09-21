import { IAppView } from '../../app/view/iapp-view';
import { IDBAppViewPortletPart } from './idbapp-view-portlet-part';
import { IDBSysPortletPart } from './idbsys-portlet-part';

/**
 *
 * 继承父接口类型值[VIEW]
 * @export
 * @interface IDBViewPortletPart
 */
export interface IDBViewPortletPart
  extends IDBSysPortletPart,
    IDBAppViewPortletPart {
  /**
   * 嵌入视图对象
   *
   * @type {IAppView}
   * 来源  getPortletPSAppView
   */
  portletAppView?: IAppView;
}
