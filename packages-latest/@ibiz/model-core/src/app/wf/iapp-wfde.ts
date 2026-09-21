import { IModelObject } from '../../imodel-object';

/**
 *
 * @export
 * @interface IAppWFDE
 */
export interface IAppWFDE extends IModelObject {
  /**
   * 流程状态值
   * @type {string}
   * 来源  getEntityWFState
   */
  entityWFState?: string;

  /**
   * 应用实体
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;

  /**
   * 应用工作流
   *
   * @type {string}
   * 来源  getPSAppWF
   */
  appWFId?: string;

  /**
   * 流程状态应用应用属性
   *
   * @type {string}
   * 来源  getWFStatePSAppDEField
   */
  wfstateAppDEFieldId?: string;
}
