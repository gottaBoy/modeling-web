import { IModelObject } from '../imodel-object';

/**
 *
 * @export
 * @interface ISysViewLogicParam
 */
export interface ISysViewLogicParam extends IModelObject {
  /**
   * 参数值2
   * @type {string}
   * 来源  getParamValue
   */
  paramValue?: string;

  /**
   * 参数值2
   * @type {string}
   * 来源  getParamValue2
   */
  paramValue2?: string;
}
