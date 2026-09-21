import { IDEUILogicNode } from './ideuilogic-node';

/**
 *
 * 继承父接口类型值[VIEWCTRLINVOKE]
 * @export
 * @interface IDEUICtrlInvokeLogic
 */
export interface IDEUICtrlInvokeLogic extends IDEUILogicNode {
  /**
   * 调用部件
   *
   * @type {string}
   * 来源  getInvokeCtrl
   */
  invokeCtrlId?: string;

  /**
   * 调用方法
   * @type {string}
   * 来源  getInvokeMethod
   */
  invokeMethod?: string;

  /**
   * 调用参数
   *
   * @type {string}
   * 来源  getInvokeParam
   */
  invokeParamId?: string;
}
