import { IMDControlState } from './i-md-control.state';
/**
 * 列表部件状态
 * @author lxm
 * @date 2023-05-22 02:18:43
 * @export
 * @interface IListState
 * @extends {IMDControlState}
 */
export interface IListState extends IMDControlState {
    /**
     * 支持分页栏
     * @author fzh
     * @date 2024-02-04 18:57:18
     * @type {boolean}
     */
    enablePagingBar?: boolean;
    /**
     * @description 展开
     * @type {string[]}
     * @memberof IListState
     */
    expandedKeys: string[];
}
//# sourceMappingURL=i-list.state.d.ts.map