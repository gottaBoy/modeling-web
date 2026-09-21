import { ISearchBarGroup } from '@ibiz/model-core';
import { IControlState } from '../i-control.state';
import { IFilterNode } from './i-filter-node';
import { IBackendSearchBarGroup } from './i-search-bar-group';
import { IApiSearchBarState } from '../../../../api';

/**
 * @description 搜索栏状态接口
 * @export
 * @interface ISearchBarState
 * @extends {IControlState}
 * @extends {IApiSearchBarState}
 */
export interface ISearchBarState extends IControlState, IApiSearchBarState {
  /**
   * @description 过滤项树节点数据集合
   * @type {IFilterNode[]}
   * @memberof ISearchBarState
   */
  filterNodes: IFilterNode[];

  /**
   * @description 选中的分组项
   * @type {(ISearchBarGroup | null)}
   * @memberof ISearchBarState
   */
  selectedGroupItem: ISearchBarGroup | null;

  /**
   * @description 选中的后台分组项
   * @type {(IBackendSearchBarGroup | null)}
   * @memberof ISearchBarState
   */
  selectedSearchGroupItem: IBackendSearchBarGroup | null;

  /**
   * @description 搜索栏后台分组项
   * @type {IBackendSearchBarGroup[]}
   * @memberof ISearchBarState
   */
  searchBarGroups: IBackendSearchBarGroup[];

  /**
   * @description 是否启用高级快速搜索模式
   * @type {boolean}
   * @memberof ISearchBarState
   */
  advancedQuickSearch: boolean;
}
