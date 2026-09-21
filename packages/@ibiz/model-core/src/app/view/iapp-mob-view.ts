import { IAppView } from './iapp-view';

/**
 *
 * @export
 * @interface IAppMobView
 */
export interface IAppMobView extends IAppView {
  /**
   * 支持下拉刷新
   * @type {boolean}
   * 来源  isEnablePullDownRefresh
   */
  enablePullDownRefresh?: boolean;
}
