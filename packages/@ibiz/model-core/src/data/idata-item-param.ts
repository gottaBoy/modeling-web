import { IModelObject } from '../imodel-object';

/**
 *
 * @export
 * @interface IDataItemParam
 */
export interface IDataItemParam extends IModelObject {
  /**
   * 格式化
   * @type {string}
   * 来源  getFormat
   */
  format?: string;
}
