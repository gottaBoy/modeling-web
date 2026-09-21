import { INavViewMsg, PanelItemState } from '@ibiz-template/runtime';

/**
 * 导航占位状态
 *
 * @export
 * @class NavPosState
 * @extends {PanelItemState}
 */
export class NavPosState extends PanelItemState {
  /**
   * @description 是否启用缓存
   * @exposedoc
   * @type {boolean}
   * @memberof NavPosState
   */
  cache: boolean = true;

  /**
   * @description 是否是路由打开
   * @exposedoc
   * @type {boolean}
   * @memberof NavPosState
   */
  routeOpen: boolean = true;

  /**
   * @description 当前导航视图标识
   * @exposedoc
   * @type {string}
   */
  currentKey: string = '';

  /**
   * @description 缓存的视图标识
   * @exposedoc
   * @type {string[]}
   */
  cacheKeys: string[] = ['RouterShell'];

  /**
   * @description 导航视图详细信息
   * @exposedoc
   * @type {INavViewMsg[]}
   */
  navViewMsgs: { [p: string]: INavViewMsg } = {};

  /**
   * @description 视图是否正在加载
   * @exposedoc
   * @type {boolean}
   * @memberof NavPosState
   */
  isLoading: boolean = false;
}
