import { IAppView } from './iapp-view';

/**
 *
 * 移动端应用视图模型基础对象接口
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
