import { EventBase } from '../argument';
import { IMDControlEvent } from './i-md-control.event';

/**
 * @description 图表部件事件
 * @primary
 * @export
 * @interface IChartEvent
 * @extends {IMDControlEvent}
 */
export interface IChartEvent extends IMDControlEvent {
  /**
   * @description 图表更新前
   * @type {{
   *     event: EventBase;
   *     emitArgs: undefined;
   *   }}
   * @memberof IChartEvent
   */
  onBeforeUpdate: {
    event: EventBase;
    emitArgs: undefined;
  };
}
