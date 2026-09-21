import { IDEFormDetail } from './ideform-detail';
import { IDEFormGroupBase } from './ideform-group-base';
import { IUIActionGroup } from '../../view/iuiaction-group';

/**
 *
 * 继承父接口类型值[GROUPPANEL]
 * @export
 * @interface IDEFormGroupPanel
 */
export interface IDEFormGroupPanel extends IDEFormDetail, IDEFormGroupBase {
  /**
   * 界面行为组展开模式
   * @description 值模式 [界面行为组展开模式] {ITEM：按项展开（默认）、 ITEMS：按分组展开、 ITEMX：首项+分组展开 }
   * @type {( string | 'ITEM' | 'ITEMS' | 'ITEMX')}
   * 来源  getActionGroupExtractMode
   */
  actionGroupExtractMode?: string | 'ITEM' | 'ITEMS' | 'ITEMX';

  /**
   * 内建操作
   * @type {number}
   * @default 0
   * 来源  getBuildInActions
   */
  buildInActions?: number;

  /**
   * 界面行为组对象
   *
   * @type {IUIActionGroup}
   * 来源  getPSUIActionGroup
   */
  uiactionGroup?: IUIActionGroup;

  /**
   * 信息面板模式
   * @type {boolean}
   * 来源  isInfoGroupMode
   */
  infoGroupMode?: boolean;
}
