import { EventBase } from '../argument';
import { IGridViewEvent } from './i-grid-view.event';

/**
 * 选择表格视图事件
 *
 * @author lxm
 * @date 2022-09-13 10:09:00
 * @export
 * @interface IPikcupGridViewEvent
 * @extends {IGridViewEvent}
 */
export interface IPickupGridViewEvent extends IGridViewEvent {
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
