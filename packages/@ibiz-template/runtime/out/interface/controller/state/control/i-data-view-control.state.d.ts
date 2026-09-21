import { ISortItem } from '../../../common';
import { IButtonContainerState } from '../../common';
import { IMDControlState } from './i-md-control.state';
/**
 * 数据视图（卡片）部件状态
 *
 * @export
 * @interface IDataViewControlState
 * @extends {IMDControlState}
 */
export interface IDataViewControlState extends IMDControlState {
    /**
     * 分组界面行为组状态
     *
     * @type {(IButtonContainerState)}
     * @memberof PortletPartState
     */
    groupActionGroupState?: IButtonContainerState;
    /**
     * 排序栏项集合
     * @author lxm
     * @date 2023-10-24 05:57:37
     * @type {ISortItem[]}
     */
    sortItems: ISortItem[];
    /**
     * 支持分页栏
     * @author fzh
     * @date 2024-02-04 18:57:18
     * @type {boolean}
     */
    enablePagingBar?: boolean;
    /**
     * @description 折叠分组
     * @type {string[]}
     * @memberof IDataViewControlState
     */
    collapseKeys: string[];
}
//# sourceMappingURL=i-data-view-control.state.d.ts.map