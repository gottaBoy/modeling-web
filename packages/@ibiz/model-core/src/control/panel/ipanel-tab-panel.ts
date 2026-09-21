import { IPanelDataRegion } from './ipanel-data-region';
import { IPanelItem } from './ipanel-item';
import { IPanelTabPage } from './ipanel-tab-page';

/**
 *
 * 继承父接口类型值[TABPANEL]
 * @export
 * @interface IPanelTabPanel
 */
export interface IPanelTabPanel extends IPanelItem, IPanelDataRegion {
  /**
   * 分页面板集合
   *
   * @type {IPanelTabPage[]}
   * 来源  getPSPanelTabPages
   */
  panelTabPages?: IPanelTabPage[];
}
