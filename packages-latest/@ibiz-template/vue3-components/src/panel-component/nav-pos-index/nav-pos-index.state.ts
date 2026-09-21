import { INavViewMsg, PanelItemState } from '@ibiz-template/runtime';

/**
 * @description 导航占位状态
 * @export
 * @class NavPosIndexState
 * @extends {PanelItemState}
 */
export class NavPosIndexState extends PanelItemState {
  /**
   * @exposedoc
   * @description 当前导航视图标识
   * @type {string}
   * @memberof NavPosIndexState
   */
  currentKey: string = '';

  /**
   * @exposedoc
   * @description 缓存的视图标识
   * @type {string[]}
   * @memberof NavPosIndexState
   */
  cacheKeys: string[] = ['RouterShell'];

  /**
   * @exposedoc
   * @description 导航视图详细信息
   * @type {{ [p: string]: INavViewMsg }}
   * @memberof NavPosIndexState
   */
  navViewMsgs: { [p: string]: INavViewMsg } = {};

  /**
   * @exposedoc
   * @description 导航的视图的操作记录
   * @type {string[]}
   * @memberof NavPosIndexState
   */
  operateSort: string[] = [];
}
