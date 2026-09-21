import { IAppDEACMode } from '@ibiz/model-core';
import { IAcItemProvider, PanelItemState } from '@ibiz-template/runtime';

/**
 * 全局搜索项
 *
 * @export
 * @interface ISearchItem
 */
export interface ISearchItem {
  /**
   * 实体标识
   *
   * @type {string}
   * @memberof ISearchItem
   */
  appDataEntityId: string;
  /**
   * 实体自填模式
   *
   * @type {IAppDEACMode}
   * @memberof ISearchItem
   */
  deACMode: IAppDEACMode;
  /**
   * 自填列表项适配器
   *
   * @type {IAcItemProvider}
   * @memberof ISearchItem
   */
  acItemProvider?: IAcItemProvider;
}

/**
 * 全局搜索状态
 *
 * @export
 * @class GlobalSearchState
 * @extends {PanelItemState}
 */
export class GlobalSearchState extends PanelItemState {
  /**
   * @description 当前快速搜索值
   * @exposedoc
   * @type {string}
   * @memberof GlobalSearchState
   */
  query: string = '';

  /**
   * @description 自填模式全局搜索项
   * @type {ISearchItem[]}
   * @exposedoc
   * @memberof GlobalSearchState
   */
  items: ISearchItem[] = [];

  /**
   * @description 搜索历史记录
   * @type {string[]}
   * @exposedoc
   * @memberof GlobalSearchState
   */
  histories: string[] = [];

  /**
   * @description 搜索列表
   * @exposedoc
   * @type {IData[]}
   * @memberof GlobalSearchState
   */
  list: IData[] = [];

  /**
   * @description 是否在加载中
   * @exposedoc
   * @type {boolean}
   * @memberof GlobalSearchState
   */
  loading: boolean = false;
}
