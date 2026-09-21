import { IModelObject } from '../../imodel-object';

/**
 *
 * @export
 * @interface ICounter
 */
export interface ICounter extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;
}
