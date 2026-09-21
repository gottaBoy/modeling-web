import { IDBPortletPart } from './idbportlet-part';
/**
 *
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
