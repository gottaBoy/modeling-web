import { IDEUILogicNode } from './ideuilogic-node';

/**
 *
 * 继承父接口类型值[VIEWCTRLFIREEVENT]
 * @export
 * @interface IDEUICtrlFireEventLogic
 */
export interface IDEUICtrlFireEventLogic extends IDEUILogicNode {
  /**
   * 事件名称
   * @type {string}
   * 来源  getEventName
   */
  eventName?: string;

  /**
   * 事件参数
   *
   * @type {string}
   * 来源  getEventParam
   */
  eventParamId?: string;

  /**
   * 触发对象
   *
   * @type {string}
   * 来源  getFireCtrl
   */
  fireCtrlId?: string;
}
