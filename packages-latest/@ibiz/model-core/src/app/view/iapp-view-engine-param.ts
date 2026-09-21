import { IUIEngineParam } from '../../view/iuiengine-param';

/**
 *
 * 应用视图界面引擎参数模型对象接口
 * @export
 * @interface IAppViewEngineParam
 */
export interface IAppViewEngineParam extends IUIEngineParam {
  /**
   * 视图逻辑名称
   * @type {string}
   * 来源  getAppViewLogicName
   */
  appViewLogicName?: string;

  /**
   * 部件名称
   * @type {string}
   * 来源  getCtrlName
   */
  ctrlName?: string;

  /**
   * 参数类型
   * @type {string}
   * 来源  getParamType
   */
  paramType?: string;

  /**
   * 直接值
   * @type {IModel}
   * 来源  getValue
   */
  value?: IModel;
}
