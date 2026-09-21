import { IDEFormButton } from './ideform-button';
import { IDEFormDetail } from './ideform-detail';
import { IUIActionGroup } from '../../view/iuiaction-group';

/**
 *
 * 继承父接口类型值[BUTTONLIST]
 * @export
 * @interface IDEFormButtonList
 */
export interface IDEFormButtonList extends IDEFormDetail {
  /**
   * 界面行为组展开模式
   * @description 值模式 [界面行为组展开模式] {ITEM：按项展开（默认）、 ITEMS：按分组展开、 ITEMX：首项+分组展开 }
   * @type {( string | 'ITEM' | 'ITEMS' | 'ITEMX')}
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
   * 表单按钮集合
   *
   * @type {IDEFormButton[]}
   * 来源  getPSDEFormButtons
   */
  deformButtons?: IDEFormButton[];

  /**
   * 界面行为组对象
   *
   * @type {IUIActionGroup}
   * 来源  getPSUIActionGroup
   */
  uiactionGroup?: IUIActionGroup;
}
