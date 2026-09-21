'use strict';

var qxUtil = require('qx-util');

"use strict";
class AppHooks {
}
/**
 * @description 创建 Vue 应用实例钩子
 * @static
 * @memberof AppHooks
 */
AppHooks.createApp = new qxUtil.SyncSeriesHook();
/**
 * @description 用于在多实例下，挂载到已经创建的 Vue 实例上插件钩子
 * @static
 * @memberof AppHooks
 */
AppHooks.useComponent = new qxUtil.SyncSeriesHook();
/**
 * @description 应用资源初始化完成钩子
 * @static
 * @memberof AppHooks
 */
AppHooks.appResorceInited = new qxUtil.AsyncSeriesHook();
/**
 * @description 应用初始化前钩子
 * @static
 * @memberof AppHooks
 */
AppHooks.beforeInitApp = new qxUtil.AsyncSeriesHook();
/**
 * @description 应用授权完成钩子
 * @static
 * @memberof AppHooks
 */
AppHooks.authedApp = new qxUtil.AsyncSeriesHook();
/**
 * @description 应用初始化完成钩子
 * @static
 * @memberof AppHooks
 */
AppHooks.initedApp = new qxUtil.AsyncSeriesHook();
/**
 * @description 应用销毁钩子
 * @static
 * @memberof AppHooks
 */
AppHooks.destoryApp = new qxUtil.AsyncSeriesHook();

exports.AppHooks = AppHooks;
