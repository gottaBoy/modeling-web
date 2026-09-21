import { IDETreeGrid } from '@ibiz/model-core';
import { IGridController } from './i-grid.controller';
import { ITreeGridState } from '../../state';
import { ITreeGridEvent } from '../../event';
/**
 * 树表格部件控制器
 *
 * @author zk
 * @date 2023-09-21 11:09:17
 * @export
 * @interface ITreeGridController
 * @extends {IMDControlController<IDETreeGrid, ITreeGridState, ITreeGridEvent>}
 */
export interface ITreeGridController<T extends IDETreeGrid = IDETreeGrid, S extends ITreeGridState = ITreeGridState, E extends ITreeGridEvent = ITreeGridEvent> extends IGridController<T, S, E> {
    /**
     * 切换树表格显示
     * @return {*}
     * @author: zhujiamin
     *
     */
    switchTreeGridShow(): void;
}
//# sourceMappingURL=i-tree-grid.controller.d.ts.map