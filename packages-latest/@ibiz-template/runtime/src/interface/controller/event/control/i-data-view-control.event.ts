import { EventBase } from '../argument';
import { IMDControlEvent } from './i-md-control.event';

/**
 * @description 数据视图（卡片）部件事件
 * @primary
 * @export
 * @interface IDataViewControlEvent
 * @extends {IMDControlEvent}
 */
export interface IDataViewControlEvent extends IMDControlEvent {
  /**
   * @description 滚动到顶部
   * @type {{
   *     event: EventBase;
   *     emitArgs: undefined;
   *   }}
   * @memberof IDataViewControlEvent
   */
  onScrollToTop: {
    event: EventBase;
    emitArgs: undefined;
  };
}
