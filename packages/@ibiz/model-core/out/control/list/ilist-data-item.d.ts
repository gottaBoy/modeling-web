import { IDataItem } from '../../data/idata-item';
/**
 *
 * @export
 * @interface IListDataItem
 */
export interface IListDataItem extends IDataItem {
    /**
     * 前端代码表
     *
     * @type {string}
     * 来源  getFrontPSCodeList
     */
    frontCodeListId?: string;
    /**
     * 数据分组项
     * @type {string}
     * 来源  getGroupItem
     */
    groupItem?: string;
    /**
     * 脚本代码
     * @type {string}
     * 来源  getScriptCode
     */
    scriptCode?: string;
    /**
     * 脚本代码模式
     * @type {boolean}
     * @default false
     * 来源  isCustomCode
     */
    customCode?: boolean;
}
