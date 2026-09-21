import { IDBPortletPart } from './idbportlet-part';

/**
 *
 * 系统预置门户部件模型对象接口
 * @export
 * @interface IDBSysPortletPart
 */
export interface IDBSysPortletPart extends IDBPortletPart {
  /**
   * 刷新间隔（ms）
   * @type {number}
   * @default 0
   * 来源  getTimer
   */
  timer?: number;
}
