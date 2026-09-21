import { EventBase } from '../argument';
import { IMDControlEvent } from './i-md-control.event';

/**
 * @description 列表部件事件
 * @primary
 * @export
 * @interface IListEvent
 * @extends {IMDControlEvent}
 */
export interface IListEvent extends IMDControlEvent {
  /**
   * @description 滚动到顶部
   * @type {{
   *     event: EventBase;
   *     emitArgs: undefined;
   *   }}
   * @memberof IListEvent
   */
  onScrollToTop: {
    event: EventBase;
    emitArgs: undefined;
  };
}
