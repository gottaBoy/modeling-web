import { IDETreeDEFColumn } from '@ibiz/model-core';
import { TreeGridExColumnController } from '../tree-grid-ex-column/tree-grid-ex-column.controller';
import { TreeGridExNodeColumnController } from './tree-grid-ex-node-column.controller';
import { TreeGridExNotifyState } from '../../../../constant';
import { ITreeGridExRowState } from '../../../../../interface';
/**
 * 树表格（增强）属性列控制器
 * @author lxm
 * @date 2023-12-21 02:02:36
 * @export
 * @class TreeGridExFieldColumnController
 * @extends {TreeGridExColumnController<IDETreeDEFColumn>}
 */
export declare class TreeGridExFieldColumnController extends TreeGridExColumnController<IDETreeDEFColumn> {
    /**
     * 树表格列标识（用于取数和各种比较判断）
     * @author lxm
     * @date 2024-01-09 11:33:37
     * @readonly
     * @type {string}
     */
    get name(): string;
    /**
     * 该树表格列对应不同节点模型的节点列控制器
     * @author lxm
     * @date 2024-01-08 05:40:56
     * @type {Map<string, IDETreeNodeColumn>}
     */
    nodeColumnControllerMap: Map<string, TreeGridExNodeColumnController>;
    init(): Promise<void>;
    /**
     * 解析模型并初始化相关属性
     * @author lxm
     * @date 2024-01-08 05:59:12
     * @return {*}  {Promise<void>}
     */
    initNodeColumnController(): Promise<void>;
    /**
     * 初始化属性列界面行为组按钮状态
     * @author lxm
     * @date 2024-01-11 01:48:38
     * @param {ITreeGridExRowState} row
     */
    initActionStates(row: ITreeGridExRowState): void;
    gridStateNotify(row: ITreeGridExRowState, state: TreeGridExNotifyState): void;
}
//# sourceMappingURL=tree-grid-ex-field-column.controller.d.ts.map