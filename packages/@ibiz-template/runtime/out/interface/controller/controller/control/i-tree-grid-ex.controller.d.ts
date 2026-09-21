import { IDETreeGridEx } from '@ibiz/model-core';
import { ITreeGridExEvent } from '../../event';
import { ITreeGridExState, ITreeNodeData } from '../../state';
import { ITreeController } from './i-tree.controller';
/**
 * 树表格(增强)部件控制器
 *
 * @author lxm
 * @date 2023-12-21 11:04:25
 * @export
 * @interface ITreeGridExController
 * @extends {ITreeController<T, S, E>}
 */
export interface ITreeGridExController<T extends IDETreeGridEx = IDETreeGridEx, S extends ITreeGridExState = ITreeGridExState, E extends ITreeGridExEvent = ITreeGridExEvent> extends ITreeController<T, S, E> {
    /**
     * 保存单条数据
     *
     * @author zk
     * @date 2023-07-31 02:07:52
     * @memberof IGridController
     */
    save(data: ITreeNodeData): Promise<void>;
    /**
     * 保存表格所有数据
     *
     * @author zk
     * @date 2023-07-31 02:07:52
     * @memberof IGridController
     */
    saveAll(): Promise<void>;
    /**
     * 切换表格的行编辑开启关闭状态
     * @author lxm
     * @date 2023-08-16 10:18:14
     */
    toggleRowEdit(): void;
}
//# sourceMappingURL=i-tree-grid-ex.controller.d.ts.map