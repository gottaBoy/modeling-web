import { IDEDRCtrlItem } from './idedrctrl-item';

/**
 *
 * @export
 * @interface IDEDRBarItem
 */
export interface IDEDRBarItem extends IDEDRCtrlItem {
  /**
   * 关系栏项分组
   *
   * @type {string}
   * 来源  getPSDEDRBarGroup
   */
  dedrbarGroupId?: string;
}
