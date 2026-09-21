import { ITreeGridExRowState } from '../../state';
import { EventBase } from '../argument';
import { ITreeGridExEvent } from './i-tree-grid-ex.event';
/**
 * 甘特图事件
 *
 * @author zhanghengfeng
 * @date 2023-12-08 15:12:56
 * @export
 * @interface IGanttEvent
 * @extends {IMDControlEvent}
 */
export interface IGanttEvent extends ITreeGridExEvent {
    /**
     * 新建行
     *
     * @type {({
     *     event: { row: ITreeGridExRowState } & EventBase;
     *     emitArgs: { row: ITreeGridExRowState };
     *   })}
     * @memberof IGanttEvent
     */
    onNewRow: {
        event: {
            row: ITreeGridExRowState;
        } & EventBase;
        emitArgs: {
            row: ITreeGridExRowState;
        };
    };
    /**
     * @description 切换行展开
     * @type {{
     *     event: EventBase;
     *     emitArgs: { row: IData, expand?: boolean };
     *   }}
     * @memberof IGanttEvent
     */
    onToggleRowExpansion: {
        event: EventBase;
        emitArgs: {
            row: IData;
            expand?: boolean;
        };
    };
}
//# sourceMappingURL=i-gantt.event.d.ts.map