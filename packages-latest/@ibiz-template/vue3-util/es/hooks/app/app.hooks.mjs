import { SyncSeriesHook, AsyncSeriesHook } from 'qx-util';

"use strict";
class AppHooks {
}
/**
 * @description 创建 Vue 应用实例钩子
 * @static
 * @memberof AppHooks
 */
AppHooks.createApp = new SyncSeriesHook();
/**
 * @description 用于在多实例下，挂载到已经创建的 Vue 实例上插件钩子
 * @static
 * @memberof AppHooks
 */
AppHooks.useComponent = new SyncSeriesHook();
/**
 * @description 应用资源初始化完成钩子
 * @static
 * @memberof AppHooks
 */
AppHooks.appResorceInited = new AsyncSeriesHook();
/**
 * @description 应用初始化前钩子
 * @static
 * @memberof AppHooks
 */
AppHooks.beforeInitApp = new AsyncSeriesHook();
/**
 * @description 应用授权完成钩子
 * @static
 * @memberof AppHooks
 */
AppHooks.authedApp = new AsyncSeriesHook();
/**
 * @description 应用初始化完成钩子
 * @static
 * @memberof AppHooks
 */
AppHooks.initedApp = new AsyncSeriesHook();
/**
 * @description 应用销毁钩子
 * @static
 * @memberof AppHooks
 */
AppHooks.destoryApp = new AsyncSeriesHook();

export { AppHooks };
