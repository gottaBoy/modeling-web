import { IModelObject } from '../imodel-object';

/**
 *
 * 数据项参数模型基础对象接口
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
