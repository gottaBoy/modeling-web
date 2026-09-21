import { ITreeGridExRowState } from '../../state';
import { EventBase } from '../argument';
import { ITreeEvent } from './i-tree.event';
/**
 * 树表格(增强)部件事件
 *
 * @author zk
 * @date 2023-09-21 11:09:54
 * @export
 * @interface ITreeGridExEvent
 * @extends {IMDControlEvent}
 */
export interface ITreeGridExEvent extends ITreeEvent {
    /**
     * 表格行编辑切换事件
     * @author lxm
     * @date 2023-03-26 06:15:06
     * @param {emitArgs} undefined
     * @return {*}  {Promise<void>}
     */
    onRowEditChange: {
        event: {
            row: ITreeGridExRowState;
        } & EventBase;
        emitArgs: {
            row: ITreeGridExRowState;
        };
    };
}
//# sourceMappingURL=i-tree-grid-ex.event.d.ts.map