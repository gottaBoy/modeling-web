import { IPanelDataRegion } from './ipanel-data-region';
import { IPanelItem } from './ipanel-item';
import { IUIActionGroup } from '../../view/iuiaction-group';

/**
 *
 * 面板容器项模型对象接口
 * 继承父接口类型值[CONTAINER]
 * @export
 * @interface IPanelContainer
 */
export interface IPanelContainer extends IPanelItem, IPanelDataRegion {
  /**
   * 界面行为组展开模式
   * @description 值模式 [界面行为组展开模式] {ITEM：按项展开（默认）、 ITEMS：按分组展开、 ITEMX：首项+分组展开 }
   * @type {( string | 'ITEM' | 'ITEMS' | 'ITEMX')}
   * @default ITEM
   * 来源  getActionGroupExtractMode
   */
  actionGroupExtractMode?: string | 'ITEM' | 'ITEMS' | 'ITEMX';

  /**
   * 动态标题绑定值项
   * @type {string}
   * 来源  getCaptionItemName
   */
  captionItemName?: string;

  /**
   * 成员集合
   *
   * @type {IPanelItem[]}
   * 来源  getPSPanelItems
   */
  panelItems?: IPanelItem[];

  /**
   * 界面行为组对象
   *
   * @type {IUIActionGroup}
   * 来源  getPSUIActionGroup
   */
  uiactionGroup?: IUIActionGroup;

  /**
   * 预置类型
   * @type {string}
   * 来源  getPredefinedType
   */
  predefinedType?: string;

  /**
   * 标题栏关闭模式
   * @description 值模式 [分组标题栏关闭模式] {0：无关闭、 1：启用关闭（默认打开）、 2：启用关闭（默认关闭） }
   * @type {( number | 0 | 1 | 2)}
   * @default 0
   * 来源  getTitleBarCloseMode
   */
  titleBarCloseMode?: number | 0 | 1 | 2;
}
