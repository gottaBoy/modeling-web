import { EventBase } from '../argument';
import { IMDViewEvent } from './i-md-view.event';

/**
 * 选择多数据视图事件
 *
 * @author zk
 * @date 2023-08-21 05:08:15
 * @export
 * @interface IPickupMDViewEvent
 * @extends {IMDViewEvent}
 */
export interface IPickupMDViewEvent extends IMDViewEvent {
  /**
   * 选中数据变更事件
   *
   * @author zk
   * @date 2023-08-21 05:08:09
   * @type {{
   *     event: EventBase;
   *     emitArgs: { data: IData[] };
   *   }}
   * @memberof IPickupMDViewEvent
   */
  onSelectionChange: {
    event: EventBase;
    emitArgs: { data: IData[] };
  };
}
