import { IPanelItemLogic } from './ipanel-item-logic';

/**
 *
 * 继承父接口类型值[GROUP]
 * @export
 * @interface IPanelItemGroupLogic
 */
export interface IPanelItemGroupLogic extends IPanelItemLogic {
  /**
   * 组逻辑
   * @type {string}
   * 来源  getGroupOP
   */
  groupOP?: string;

  /**
   * 逻辑项集合
   *
   * @type {IPanelItemLogic[]}
   * 来源  getPSPanelItemLogics
   */
  panelItemLogics?: IPanelItemLogic[];

  /**
   * 逻辑取反
   * @type {boolean}
   * 来源  isNotMode
   */
  notMode?: boolean;
}
