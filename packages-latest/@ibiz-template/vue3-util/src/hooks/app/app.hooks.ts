/* eslint-disable @typescript-eslint/no-explicit-any */
import { IApiAppHubService, IAppService } from '@ibiz-template/runtime';
import { AsyncSeriesHook, SyncSeriesHook } from 'qx-util';
import { App } from 'vue';

/**
 * @description 应用钩子
 * @export
 * @class AppHooks
 */
export class AppHooks {
  /**
   * @description 创建 Vue 应用实例钩子
   * @static
   * @memberof AppHooks
   */
  static createApp = new SyncSeriesHook<App>();

  /**
   * @description 用于在多实例下，挂载到已经创建的 Vue 实例上插件钩子
   * @static
   * @memberof AppHooks
   */
  static useComponent = new SyncSeriesHook<any>();

  /**
   * @description 应用资源初始化完成钩子
   * @static
   * @memberof AppHooks
   */
  static appResorceInited = new AsyncSeriesHook<[], IApiAppHubService>();

  /**
   * @description 应用初始化前钩子
   * @static
   * @memberof AppHooks
   */
  static beforeInitApp = new AsyncSeriesHook<[], { context: IParams }>();

  /**
   * @description 应用授权完成钩子
   * @static
   * @memberof AppHooks
   */
  static authedApp = new AsyncSeriesHook<[], { context: IParams }>();

  /**
   * @description 应用初始化完成钩子
   * @static
   * @memberof AppHooks
   */
  static initedApp = new AsyncSeriesHook<
    [],
    { context: IParams; app: IAppService }
  >();

  /**
   * @description 应用销毁钩子
   * @static
   * @memberof AppHooks
   */
  static destoryApp = new AsyncSeriesHook<[], any>();
}
