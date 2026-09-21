import { IUIActionGroup, IDETreeUAColumn, IDETreeNodeUAColumn, IUIActionGroupDetail } from '@ibiz/model-core';
import { TreeGridExColumnController } from '../tree-grid-ex-column/tree-grid-ex-column.controller';
import { ITreeGridExRowState } from '../../../../../interface';
import { TreeGridExNotifyState } from '../../../../constant';
import { TreeGridExRowState } from '../../tree-grid-ex-row.state';
/**
 * 树表格（增强）操作列控制器
 * @author lxm
 * @date 2023-12-21 02:04:05
 * @export
 * @class TreeGridExUAColumnController
 * @extends {TreeGridExColumnController<IDETreeUAColumn>}
 */
export declare class TreeGridExUAColumnController extends TreeGridExColumnController<IDETreeUAColumn> {
    /**
     * 该树表格列对应不同节点模型的节点列控制器
     * @author lxm
     * @date 2024-01-08 05:40:56
     * @type {Map<string, IDETreeNodeUAColumn>}
     */
    nodeColumnMap: Map<string, IDETreeNodeUAColumn>;
    init(): Promise<void>;
    /**
     * 解析模型初始化节点对应的节点列模型
     * @author lxm
     * @date 2024-01-24 02:41:05
     */
    initNodeColumnMap(): void;
    /**
     * 获取界面行为组mode
     * @author lxm
     * @date 2024-01-24 04:13:03
     * @param {ITreeGridExRowState} row
     * @return {*}  {(IUIActionGroup | undefined)}
     */
    getUIActionGroup(row: ITreeGridExRowState): IUIActionGroup | undefined;
    /**
     * 给rowController初始化操作列的状态
     *
     * @author lxm
     * @date 2022-09-07 21:09:43
     * @param {ITreeGridExRowState} row
     */
    initActionStates(row: ITreeGridExRowState): void;
    /**
     * 触发操作列点击事件
     *
     * @author lxm
     * @date 2022-09-07 22:09:46
     * @param {IPSUIActionGroupDetail} detail
     * @param {MouseEvent} event
     */
    onActionClick(detail: IUIActionGroupDetail, row: ITreeGridExRowState, event: MouseEvent): Promise<void>;
    gridStateNotify(row: TreeGridExRowState, state: TreeGridExNotifyState): void;
}
//# sourceMappingURL=tree-grid-ex-ua-column.controller.d.ts.map