import { IDEFormDetail } from './ideform-detail';

/**
 *
 * 继承父接口类型值[USERCONTROL]
 * @export
 * @interface IDEFormUserControl
 */
export interface IDEFormUserControl extends IDEFormDetail {
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
