import { IGridState } from './i-grid.state';
/**
 * 树表格部件状态
 *
 * @author zk
 * @date 2023-09-21 11:09:01
 * @export
 * @interface ITreeGridState
 * @extends {IMDControlState}
 */
export interface ITreeGridState extends IGridState {
    /**
     * 树表格是否显示树形结构(默认为true)
     *
     */
    showTreeGrid: boolean;
    /**
     * @description 树表格数据
     * @type {IData[]}
     * @memberof ITreeGridState
     */
    treeGirdData: IData[];
}
//# sourceMappingURL=i-tree-grid.state.d.ts.map