import { IModelObject } from '../imodel-object';

/**
 *
 * 部件导航参数模型对象接口
 * @export
 * @interface INavigateParam
 */
export interface INavigateParam extends IModelObject {
  /**
   * 说明
   * @type {string}
   * 来源  getDesc
   */
  desc?: string;

  /**
   * 参数
   * @type {string}
   * 来源  getKey
   */
  key?: string;

  /**
   * 值
   * @type {string}
   * 来源  getValue
   */
  value?: string;

  /**
   * 直接值
   * @type {boolean}
   * 来源  isRawValue
   */
  rawValue?: boolean;
}
