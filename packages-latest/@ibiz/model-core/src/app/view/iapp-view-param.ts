import { IModelObject } from '../../imodel-object';

/**
 *
 * 应用视图参数模型对象接口
 * @export
 * @interface IAppViewParam
 */
export interface IAppViewParam extends IModelObject {
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
}
