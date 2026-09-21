import { IModelObject } from '../imodel-object';

/**
 *
 * 界面部件参数模型基础对象接口
 * @export
 * @interface IControlParam
 */
export interface IControlParam extends IModelObject {
  /**
   * 部件参数集合
   * @type {IModel}
   * 来源  getCtrlParams
   */
  ctrlParams?: IModel;
}
