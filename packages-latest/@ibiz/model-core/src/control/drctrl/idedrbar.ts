import { IDEDRBarGroup } from './idedrbar-group';
import { IDEDRCtrl } from './idedrctrl';
import { IDRBar } from './idrbar';

/**
 *
 * 实体数据关系边栏部件模型对象接口
 * 继承父接口类型值[DRBAR]
 * @export
 * @interface IDEDRBar
 */
export interface IDEDRBar extends IDRBar, IDEDRCtrl {
  /**
   * 实体数据关系栏分组集合
   *
   * @type {IDEDRBarGroup[]}
   * 来源  getPSDEDRBarGroups
   */
  dedrbarGroups?: IDEDRBarGroup[];
}
