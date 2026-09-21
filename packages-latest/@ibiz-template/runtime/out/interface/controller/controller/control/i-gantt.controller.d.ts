import { IDEGantt } from '@ibiz/model-core';
import { IGanttEvent } from '../../event';
import { IGanttNodeData, IGanttState } from '../../state';
import { IApiGanttController } from '../../../api';
import { IViewController } from '../view';
import { ITreeGridExController } from './i-tree-grid-ex.controller';
/**
 * @description 甘特图控制器
 * @export
 * @interface IGanttController
 * @extends {IMDControlController<T, S, E>}
 * @extends {IApiGanttController<T, S>}
 * @template T
 * @template S
 * @template E
 */
export interface IGanttController<T extends IDEGantt = IDEGantt, S extends IGanttState = IGanttState, E extends IGanttEvent = IGanttEvent> extends ITreeGridExController<T, S, E>, IApiGanttController<T, S> {
    /**
     * @description 当前上下文环境的视图控制器
     * @type {IViewController}
     * @memberof IGanttController
     */
    view: IViewController;
    /**
     * @description 保存
     * @param {IGanttNodeData} data
     * @returns {*}  {Promise<void>}
     * @memberof IGanttController
     */
    save(data: IGanttNodeData): Promise<void>;
    /**
     * @description  刷新指定树节点的子节点数据
     * @param {(IGanttNodeData | IApiData)} nodeData 节点数据
     * @param {boolean} [refreshParent] 是否刷新父数据
     * @returns {*}  {Promise<void>}
     * @memberof IGanttController
     */
    refreshNodeChildren(nodeData: IGanttNodeData | IData, refreshParent?: boolean): Promise<void>;
}
//# sourceMappingURL=i-gantt.controller.d.ts.map