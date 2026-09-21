import { EventBase } from '../argument';
import { ITreeViewEvent } from './i-tree-view.event';

/**
 * 选择树视图事件
 *
 * @author lxm
 * @date 2022-09-13 10:09:00
 * @export
 * @interface IPikcupTreeViewEvent
 * @extends {ITreeViewEvent}
 */
export interface IPickupTreeViewEvent extends ITreeViewEvent {
  /**
   * 选中数据变更事件
   *
   * @author zk
   * @date 2023-07-03 01:07:38
   * @type {{
   *     event: EventBase;
   *     emitArgs: { data: IData[] };
   *   }} 选中的数据集合
   * @memberof IPickupTreeViewEvent
   */
  onSelectionChange: {
    event: EventBase;
    emitArgs: { data: IData[] };
  };
}
