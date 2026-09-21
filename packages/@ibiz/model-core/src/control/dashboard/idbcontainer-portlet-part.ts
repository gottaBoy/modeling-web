import { IDBPortletPart } from './idbportlet-part';
import { IDashboardContainer } from './idashboard-container';

/**
 *
 * 继承父接口类型值[CONTAINER]
 * @export
 * @interface IDBContainerPortletPart
 */
export interface IDBContainerPortletPart
  extends IDBPortletPart,
    IDashboardContainer {}
