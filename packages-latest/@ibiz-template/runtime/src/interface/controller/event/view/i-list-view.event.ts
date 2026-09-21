import { EventBase } from '../argument';
import { IMDViewEvent } from './i-md-view.event';

/**
 * 列表视图事件
 *
 * @author lxm
 * @date 2022-09-13 10:09:00
 * @export
 * @interface IListViewEvent
 * @extends {IMDViewEvent}
 */
export interface IListViewEvent extends IMDViewEvent {
  /**
   * 选中数据变更事件
   *
   * @author lxm
   * @date 2022-08-31 14:08:12
   * @param {IData[]} selection 选中的数据集合
   */
  onSelectionChange: {
    event: EventBase;
    emitArgs: { data: IData[] };
  };
}
