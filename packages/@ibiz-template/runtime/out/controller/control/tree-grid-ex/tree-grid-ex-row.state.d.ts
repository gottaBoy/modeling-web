import { IButtonContainerState, ITreeGridExRowState, ITreeNodeData } from '../../../interface';
import { TreeGridExController } from './tree-grid-ex.controller';
/**
 * 树表格（增强）行数据状态类
 *
 * @author lxm
 * @date 2023-12-22 10:39:01
 * @export
 * @class TreeGridExRowState
 * @implements {ITreeGridExRowState}
 */
export declare class TreeGridExRowState implements ITreeGridExRowState {
    data: ITreeNodeData;
    cacheData?: ITreeNodeData;
    errors: {
        [p: string]: string | null;
    };
    columnActionsStates: {
        [p: string]: IButtonContainerState;
    };
    editColStates: {
        [p: string]: {
            disabled: boolean;
            readonly: boolean;
            editable: boolean;
            required: boolean;
        };
    };
    modified: boolean;
    showRowEdit: boolean;
    processing: boolean;
    constructor(data: ITreeNodeData, treeGrid: TreeGridExController);
}
//# sourceMappingURL=tree-grid-ex-row.state.d.ts.map