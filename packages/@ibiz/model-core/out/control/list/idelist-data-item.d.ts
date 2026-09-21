import { IListDataItem } from './ilist-data-item';
/**
 *
 * @export
 * @interface IDEListDataItem
 */
export interface IDEListDataItem extends IListDataItem {
    /**
     * 关联应用实体属性
     *
     * @type {string}
     * 来源  getPSAppDEField
     */
    appDEFieldId?: string;
}
