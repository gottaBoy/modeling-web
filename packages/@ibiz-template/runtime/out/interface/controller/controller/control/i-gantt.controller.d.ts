import { IDEGantt } from '@ibiz/model-core';
import { IGanttEvent } from '../../event';
import { IGanttNodeData, IGanttState } from '../../state';
import { IMDControlController, MDCtrlLoadParams } from './i-md-control.controller';
/**
 * 甘特图控制器
 *
 * @author zhanghengfeng
 * @date 2023-12-08 15:12:06
 * @export
 * @interface IGanttController
 * @extends {IMDControlController<T, S, E>}
 * @template T
 * @template S
 * @template E
 */
export interface IGanttController<T extends IDEGantt = IDEGantt, S extends IGanttState = IGanttState, E extends IGanttEvent = IGanttEvent> extends IMDControlController<T, S, E> {
    /**
     * 保存数据
     *
     * @param {IGanttNodeData} data
     * @return {*}  {Promise<void>}
     * @memberof IGanttController
     */
    save(data: IGanttNodeData): Promise<void>;
    /**
     * 保存甘特图所有数据
     *
     * @return {*}  {Promise<void>}
     * @memberof IGanttController
     */
    saveAll(): Promise<void>;
    /**
     * 切换甘特图的行编辑开启关闭状态
     *
     * @memberof IGanttController
     */
    toggleRowEdit(): void;
    /**
     * 新建行
     *
     * @param {MDCtrlLoadParams} [args]
     * @return {*}  {Promise<void>}
     * @memberof IGanttController
     */
    newRow(args?: MDCtrlLoadParams): Promise<void>;
    /**
     * @description 切换折叠
     * @param {IData} [params]
     * @memberof IGanttController
     */
    changeCollapse(params?: IData): void;
}
//# sourceMappingURL=i-gantt.controller.d.ts.map