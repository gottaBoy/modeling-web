import { ITreeGridExRowState } from '../../state';
import { EventBase } from '../argument';
import { ITreeEvent } from './i-tree.event';

/**
 * @description  树表格(增强)部件事件
 * @primary
 * @export
 * @interface ITreeGridExEvent
 * @extends {ITreeEvent}
 */
export interface ITreeGridExEvent extends ITreeEvent {
  /**
   * @description  表格行编辑切换事件
   * @type {({
   *     event: { row: ITreeGridExRowState } & EventBase;
   *     emitArgs: { row: ITreeGridExRowState };
   *   })}
   * @memberof ITreeGridExEvent
   */
  onRowEditChange: {
    event: { row: ITreeGridExRowState } & EventBase;
    emitArgs: { row: ITreeGridExRowState };
  };
}
