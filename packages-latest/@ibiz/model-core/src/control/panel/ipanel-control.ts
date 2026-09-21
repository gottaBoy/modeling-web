import { IControl } from '../icontrol';
import { IPanelItem } from './ipanel-item';

/**
 *
 * 面板部件项模型对象接口
 * 继承父接口类型值[CONTROL]
 * @export
 * @interface IPanelControl
 */
export interface IPanelControl extends IPanelItem {
  /**
   * 部件对象
   *
   * @type {IControl}
   * 来源  getPSControl
   */
  control?: IControl;

  /**
   * 视图模型属性名称
   * @type {string}
   * 来源  getViewFieldName
   */
  viewFieldName?: string;
}
