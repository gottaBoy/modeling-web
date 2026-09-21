import { IListDataItem } from './ilist-data-item';

/**
 *
 * 实体列表部件数据项模型对象接口
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
