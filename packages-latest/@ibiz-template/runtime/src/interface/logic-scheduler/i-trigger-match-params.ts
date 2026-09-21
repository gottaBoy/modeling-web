import { TriggerType } from './i-scheduler-logic';

export interface ITriggerMatchParams {
  /**
   * 触发类型
   * @author lxm
   * @date 2023-06-26 01:34:14
   * @type {TriggerType}
   */
  triggerType: TriggerType;

  /**
   * 子项名称
   * @type {string}
   * 来源  getItemName
   */
  itemName?: string;

  /**
   * 事件名称
   * @type {string}
   * 来源  getEventNames
   */
  eventName?: string;

  /**
   * 部件名称
   * @type {string}
   */
  ctrlName?: string;
}
