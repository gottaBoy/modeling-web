import { EventBase } from './base.event';

/**
 * 加载事件参数
 * @author lxm
 * @date 2023-03-21 05:59:44
 * @export
 * @interface EventBase
 */
export interface LoadEvent extends EventBase {
  /**
   * 是否是初始加载，
   * 第一次加载和刷新触发的加载都是初始加载。
   * @author lxm
   * @date 2023-03-26 01:14:11
   * @type {boolean}
   */
  isInitialLoad: boolean;
}
