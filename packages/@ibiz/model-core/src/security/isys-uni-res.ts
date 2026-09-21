import { IModelObject } from '../imodel-object';

/**
 *
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
