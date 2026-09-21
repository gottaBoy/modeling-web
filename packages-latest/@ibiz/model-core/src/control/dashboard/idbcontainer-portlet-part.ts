import { IDBPortletPart } from './idbportlet-part';
import { IDashboardContainer } from './idashboard-container';

/**
 *
 * 容器门户部件模型对象接口
 * 继承父接口类型值[CONTAINER]
 * @export
 * @interface IDBContainerPortletPart
 */
export interface IDBContainerPortletPart
  extends IDBPortletPart,
    IDashboardContainer {}
