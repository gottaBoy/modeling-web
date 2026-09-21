import { IAppWFDE } from './iapp-wfde';
import { IAppWFVer } from './iapp-wfver';
import { IModelObject } from '../../imodel-object';

/**
 *
 * @export
 * @interface IAppWF
 */
export interface IAppWF extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 应用工作流实体集合
   *
   * @type {IAppWFDE[]}
   * 来源  getPSAppWFDEs
   */
  appWFDEs?: IAppWFDE[];

  /**
   * 应用工作流版本集合
   *
   * @type {IAppWFVer[]}
   * 来源  getPSAppWFVers
   */
  appWFVers?: IAppWFVer[];

  /**
   * 有工作流版本
   * @type {boolean}
   * 来源  hasPSAppWFVer
   */
  hasAppWFVer?: boolean;
}
