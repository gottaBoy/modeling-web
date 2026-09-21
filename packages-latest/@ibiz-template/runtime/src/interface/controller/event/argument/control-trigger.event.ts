import { EventBase } from './base.event';

/**
 * 部件事件
 * @author lxm
 * @date 2023-08-09 10:52:48
 * @export
 * @interface ControlTriggerEvent
 * @extends {EventBase}
 */
export interface ControlTriggerEvent extends EventBase {
  /**
   * 触发的部件名称
   * @author lxm
   * @date 2023-03-26 02:02:16
   * @type {string}
   */
  triggerControlName: string;

  /**
   * 触发的部件事件的名称
   * @author lxm
   * @date 2023-07-26 11:00:37
   * @type {string}
   */
  triggerEventName: string;

  /**
   * 触发的部件事件的事件对象
   * @author lxm
   * @date 2023-08-09 07:02:28
   * @type {EventBase}
   */
  triggerEvent: EventBase;
}
