import { EventBase } from './base.event';

/**
 * 界面行为执行事件
 * @author lxm
 * @date 2023-05-08 08:25:30
 * @export
 * @interface UIActionEvent
 * @extends {EventBase}
 */
export interface UIActionEvent extends EventBase {
  /**
   * 界面行为标识
   * @author lxm
   * @date 2023-03-26 02:02:16
   * @type {string}
   */
  actionId: string;
}
