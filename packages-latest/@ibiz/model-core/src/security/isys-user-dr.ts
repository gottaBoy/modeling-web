import { IModelObject } from '../imodel-object';

/**
 *
 * 系统用户自定义数据范围模型对象接口
 * @export
 * @interface ISysUserDR
 */
export interface ISysUserDR extends IModelObject {
  /**
   * 自定义模式
   * @type {string}
   * 来源  getCustomMode
   */
  customMode?: string;
}
