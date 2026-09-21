import { IButtonContainerState } from '../../common';
import { IColumnState } from './i-grid.state';
import { ITreeNodeData, ITreeState } from './i-tree.state';
/**
 * 树表格(增强)部件状态
 *
 * @author zk
 * @date 2023-09-21 11:09:01
 * @export
 * @interface ITreeGridExState
 * @extends {IMDControlState}
 */
export interface ITreeGridExState extends ITreeState {
    /**
     * 表格列状态数组
     * 顺序就是列的排序
     * @author zk
     * @date 2023-09-21 02:09:57
     * @type {IColumnState[]}
     * @memberof ITreeGridState
     */
    columnStates: IColumnState[];
    /**
     * 树表格(增强)行状态Map
     *
     * @author lxm
     * @date 2022-09-05 19:09:12
     * @type {IGridRowState[]}
     */
    rows: {
        [p: string]: ITreeGridExRowState;
    };
    /**
     * 开启表格行编辑
     * @author lxm
     * @date 2023-08-17 02:38:18
     * @type {boolean}
     */
    rowEditOpen: boolean;
}
/**
 * 树表格(增强)行状态
 * @author lxm
 * @date 2023-12-21 02:22:02
 * @export
 * @interface ITreeGridExRowState
 */
export interface ITreeGridExRowState {
    /**
     * 行数据（一般是树节点的数据）
     * @author lxm
     * @date 2023-12-21 02:27:46
     * @type {ITreeNodeData}
     */
    data: ITreeNodeData;
    /**
     * 错误信息集合，p是对应属性名称
     *
     * @author lxm
     * @date 2022-09-06 15:09:54
     * @type {({ [p: string]: string | null })}
     */
    errors: {
        [p: string]: string | null;
    };
    /**
     * 可能是以下两种类型状态
     * - 操作列按钮状态（p是操作列的标识）
     * - 属性列的内置界面行为组状态(p是属性列的标识)
     *
     * @author lxm
     * @date 2022-09-07 22:09:38
     * @type {({ [p: string]: IButtonContainerState  })}
     */
    columnActionsStates: {
        [p: string]: IButtonContainerState;
    };
    /**
     * 编辑列的状态
     *
     * @author lxm
     * @date 2022-09-20 15:09:58
     * @type {({ [p: string]: { disabled: boolean } })}
     */
    editColStates: {
        [p: string]: {
            disabled: boolean;
            readonly: boolean;
            editable: boolean;
            required: boolean;
        };
    };
    /**
     * 是否显示行编辑
     *
     * @author lxm
     * @date 2022-09-05 22:09:23
     * @type {boolean}
     */
    showRowEdit: boolean;
    /**
     * 是否被修改过
     *
     * @author lxm
     * @date 2022-11-02 22:11:33
     * @type {boolean}
     */
    modified: boolean;
    /**
     * 是否正在处理中(动态控制，值规则，表单项更新等逻辑中)
     * @author lxm
     * @date 2023-03-06 08:00:22
     * @type {boolean}
     * @memberof GridRowState
     */
    processing: boolean;
}
//# sourceMappingURL=i-tree-grid-ex.state.d.ts.map