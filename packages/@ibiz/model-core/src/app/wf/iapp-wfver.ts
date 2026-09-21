import { IModelObject } from '../../imodel-object';

/**
 *
 * @export
 * @interface IAppWFVer
 */
export interface IAppWFVer extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 应用工作流
   *
   * @type {string}
   * 来源  getPSAppWF
   */
  appWFId?: string;
}
