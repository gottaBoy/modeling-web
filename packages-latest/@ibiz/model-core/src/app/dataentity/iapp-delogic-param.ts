import { IDELogicParam } from '../../dataentity/logic/idelogic-param';

/**
 *
 * 应用实体处理逻辑参数模型对象接口
 * @export
 * @interface IAppDELogicParam
 */
export interface IAppDELogicParam extends IDELogicParam {
  /**
   * 参数应用实体对象
   *
   * @type {string}
   * 来源  getParamPSAppDataEntity
   */
  paramAppDataEntityId?: string;
}
