import { ITreeViewState } from './i-tree-view.state';
/**
 * 树选择视图UI状态
 *
 * @author zk
 * @date 2023-05-25 05:05:43
 * @export
 * @interface IPickupTreeViewState
 * @extends {ITreeViewState}
 */
export interface IPickupTreeViewState extends ITreeViewState {
    /**
     * 是否单选
     *
     * @author zk
     * @date 2023-07-03 10:07:12
     * @type {boolean}
     * @memberof IPickupTreeViewState
     */
    singleSelect: boolean;
    /**
     * 选中数据
     * @author lxm
     * @date 2024-02-07 05:53:39
     * @type {IData[]}
     */
    selectedData: IData[];
    /**
     * 在多选的情况下，树节点是否严格的遵循父子不互相关联
     *
     * @author zhanghengfeng
     * @date 2024-07-01 14:07:56
     * @type {boolean}
     */
    checkStrictly?: boolean;
}
//# sourceMappingURL=i-pickup-tree-view.state.d.ts.map