import { IGridRowState } from '../../state';
import { EventBase } from './base.event';

/**
 * 行编辑切换事件
 * @author lxm
 * @date 2023-03-26 02:07:11
 * @export
 * @interface RowEditChangeEvent
 * @extends {EventBase}
 */
export interface RowEditChangeEvent extends EventBase {
  /**
   * 行状态对象
   * @author lxm
   * @date 2023-08-17 06:58:15
   * @type {IGridRowState}
   */
  row: IGridRowState;
}
