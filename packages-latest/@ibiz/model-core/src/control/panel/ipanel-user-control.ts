import { IPanelItem } from './ipanel-item';

/**
 *
 * 面板自定义部件模型对象接口
 * 继承父接口类型值[USERCONTROL]
 * @export
 * @interface IPanelUserControl
 */
export interface IPanelUserControl extends IPanelItem {
  /**
   * 部件参数集合
   * @type {IModel}
   * 来源  getCtrlParams
   */
  ctrlParams?: IModel;

  /**
   * 预置类型
   * @type {string}
   * 来源  getPredefinedType
   */
  predefinedType?: string;
}
