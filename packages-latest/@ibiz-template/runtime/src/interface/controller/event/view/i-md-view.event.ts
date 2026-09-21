import { EventBase } from '../argument';
import { IViewEvent } from './i-view.event';

/**
 * 多数据视图事件
 *
 * @author lxm
 * @date 2022-09-13 10:09:00
 * @export
 * @interface IMDViewEvent
 * @extends {IViewEvent}
 */
export interface IMDViewEvent extends IViewEvent {
  /**
   * 数据激活事件
   *
   * @author zk
   * @date 2023-05-26 10:05:26
   * @type {{
   *         event: EventBase;
   *         emitArgs: { data: IData[] };
   *     }}
   * @memberof IMDViewEvent
   */
  onDataActive: {
    event: EventBase;
    emitArgs: { data: IData[] };
  };
}
