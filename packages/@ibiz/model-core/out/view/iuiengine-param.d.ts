import { IModelObject } from '../imodel-object';
/**
 *
 * @export
 * @interface IUIEngineParam
 */
export interface IUIEngineParam extends IModelObject {
    /**
     * @type {string}
     * 来源  getParamType
     */
    paramType?: string;
    /**
     * @type {IModel}
     * 来源  getValue
     */
    value?: IModel;
}
