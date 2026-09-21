import { IModelObject } from '../imodel-object';
/**
 *
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
