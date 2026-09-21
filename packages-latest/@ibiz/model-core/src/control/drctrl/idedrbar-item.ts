import { IDEDRCtrlItem } from './idedrctrl-item';

/**
 *
 * 实体数据关系边栏项模型对象接口
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
