import { IDBSysPortletPart } from './idbsys-portlet-part';
import { IDEDQCondition } from '../../dataentity/ds/idedqcondition';

/**
 *
 * 过滤器门户部件模型对象接口
 * 继承父接口类型值[FILTER]
 * @export
 * @interface IDBFilterPortletPart
 */
export interface IDBFilterPortletPart extends IDBSysPortletPart {
  /**
   * 过滤器条件
   *
   * @type {IDEDQCondition[]}
   * 来源  getFilterPSDEDQConditions
   */
  filterDEDQConditions?: IDEDQCondition[];
}
