import { IDEDRCtrl } from './idedrctrl';
import { IDEDRTabPage } from './idedrtab-page';
import { IDRTab } from './idrtab';

/**
 *
 * 继承父接口类型值[DRTAB]
 * @export
 * @interface IDEDRTab
 */
export interface IDEDRTab extends IDRTab, IDEDRCtrl {
  /**
   * 关系分页集合
   *
   * @type {IDEDRTabPage[]}
   * 来源  getPSDEDRTabPages
   */
  dedrtabPages?: IDEDRTabPage[];
}
