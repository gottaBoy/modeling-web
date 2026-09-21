import { IListItem } from './ilist-item';
import { IDEUIActionGroup } from '../../dataentity/uiaction/ideuiaction-group';

/**
 *
 * 实体列表部件项模型对象接口
 * @export
 * @interface IDEListItem
 */
export interface IDEListItem extends IListItem {
  /**
   * 数据项名称
   * @type {string}
   * 来源  getDataItemName
   */
  dataItemName?: string;

  /**
   * 界面行为组
   *
   * @type {IDEUIActionGroup}
   * 来源  getPSDEUIActionGroup
   */
  deuiactionGroup?: IDEUIActionGroup;

  /**
   * 值格式化
   * @type {string}
   * 来源  getValueFormat
   */
  valueFormat?: string;

  /**
   * 宽度
   * @type {number}
   * 来源  getWidth
   */
  width?: number;
}
