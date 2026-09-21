import { IPanelButton } from './ipanel-button';
import { IPanelItem } from './ipanel-item';
import { IUIActionGroup } from '../../view/iuiaction-group';

/**
 *
 * 面板按钮列表项模型对象接口
 * 继承父接口类型值[BUTTONLIST]
 * @export
 * @interface IPanelButtonList
 */
export interface IPanelButtonList extends IPanelItem {
  /**
   * 界面行为组展开模式
   * @description 值模式 [界面行为组展开模式] {ITEM：按项展开（默认）、 ITEMS：按分组展开、 ITEMX：首项+分组展开 }
   * @type {( string | 'ITEM' | 'ITEMS' | 'ITEMX')}
   * @default ITEM
   * 来源  getActionGroupExtractMode
   */
  actionGroupExtractMode?: string | 'ITEM' | 'ITEMS' | 'ITEMX';

  /**
   * 按钮列表类型
   * @description 值模式 [表单按钮列表类型] {UIACTIONGROUP：界面行为组、 BUTTONS：按钮集合 }
   * @type {( string | 'UIACTIONGROUP' | 'BUTTONS')}
   * @default UIACTIONGROUP
   * 来源  getButtonListType
   */
  buttonListType?: string | 'UIACTIONGROUP' | 'BUTTONS';

  /**
   * 按钮集合
   *
   * @type {IPanelButton[]}
   * 来源  getPSPanelButtons
   */
  panelButtons?: IPanelButton[];

  /**
   * 界面行为组对象
   *
   * @type {IUIActionGroup}
   * 来源  getPSUIActionGroup
   */
  uiactionGroup?: IUIActionGroup;
}
