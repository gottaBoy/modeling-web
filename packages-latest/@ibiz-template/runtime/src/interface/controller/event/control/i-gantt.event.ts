import { ITreeGridExRowState } from '../../state';
import { EventBase } from '../argument';
import { ITreeGridExEvent } from './i-tree-grid-ex.event';

/**
 * @description 甘特图事件
 * @primary
 * @export
 * @interface IGanttEvent
 * @extends {ITreeGridExEvent}
 */
export interface IGanttEvent extends ITreeGridExEvent {
  /**
   * @description 新建行
   * @type {({
   *     event: { row: ITreeGridExRowState } & EventBase;
   *     emitArgs: { row: ITreeGridExRowState };
   *   })}
   * @memberof IGanttEvent
   */
  onNewRow: {
    event: { row: ITreeGridExRowState } & EventBase;
    emitArgs: { row: ITreeGridExRowState };
  };

  /**
   * @description 切换行展开
   * @type {{
   *     event: EventBase;
   *     emitArgs: { row: IData; expand?: boolean };
   *   }}
   * @memberof IGanttEvent
   */
  onToggleRowExpansion: {
    event: EventBase;
    emitArgs: { row: IData; expand?: boolean };
  };
}
