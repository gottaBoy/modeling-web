import { IModelObject } from '../imodel-object';

/**
 *
 * 系统统一资源模型对象接口
 * @export
 * @interface ISysUniRes
 */
export interface ISysUniRes extends IModelObject {
  /**
   * 资源标识
   * @type {string}
   * 来源  getResCode
   */
  resCode?: string;
}
