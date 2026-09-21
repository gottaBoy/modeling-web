import { ISearchBarGroup } from '@ibiz/model-core';
import { IControlState } from '../i-control.state';
import { IFilterNode } from './i-filter-node';
import { IBackendSearchBarGroup } from './i-search-bar-group';
import { IQuickSearchItem } from './i-quick-search';
export interface ISearchBarState extends IControlState {
    /**
     * 快速搜索字符串
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-06-01 17:51:04
     */
    query: string;
    /**
     * 是否显示
     * @author lxm
     * @date 2023-08-25 05:32:59
     * @type {boolean}
     */
    visible: boolean;
    /**
     * 选中的分组项
     * @author lxm
     * @date 2023-08-25 05:32:59
     * @type {boolean}
     */
    selectedGroupItem: ISearchBarGroup | null;
    /**
     * 过滤项树节点数据集合
     * @author lxm
     * @date 2023-10-12 05:16:12
     * @type {IFilterNode[]}
     */
    filterNodes: IFilterNode[];
    /**
     * 选中的后台分组项
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-21 11:40:29
     */
    selectedSearchGroupItem: IBackendSearchBarGroup | null;
    /**
     * 搜索栏后台分组项
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-19 14:45:33
     */
    searchBarGroups: IBackendSearchBarGroup[];
    /**
     * 是否启用高级快速搜索模式
     * @author lxm
     * @date 2024-04-11 10:40:33
     * @type {boolean}
     */
    advancedQuickSearch: boolean;
    /**
     * 快速搜索项集合
     * @author lxm
     * @date 2024-04-11 11:19:18
     * @type {IQuickSearchItem[]}
     */
    quickSearchItems: IQuickSearchItem[];
    /**
     * 快速搜索字段名称集合
     * @author lxm
     * @date 2024-04-11 11:20:57
     * @type {string[]}
     */
    quickSearchFieldNames: string[];
    /**
     * 快速搜索的占位信息
     * @author lxm
     * @date 2024-04-11 05:32:33
     * @type {string}
     */
    quickSearchPlaceHolder: string;
    /**
     * 过滤模式
     *
     * @author zhanghengfeng
     * @date 2024-07-18 17:07:15
     * @type {('default' | 'pql')}
     */
    filterMode?: 'default' | 'pql';
    /**
     * 自定义条件
     *
     * @author zhanghengfeng
     * @date 2024-07-18 17:07:35
     * @type {string}
     */
    customCond?: string;
}
//# sourceMappingURL=i-search-bar.state.d.ts.map