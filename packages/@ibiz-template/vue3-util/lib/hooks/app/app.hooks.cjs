'use strict';

var qxUtil = require('qx-util');

"use strict";
class AppHooks {
}
/**
 * 创建 Vue 应用实例
 *
 * @author chitanda
 * @date 2024-02-04 17:02:41
 * @static
 */
AppHooks.createApp = new qxUtil.SyncSeriesHook();
/**
 * 用于在多实例下，挂载到已经创建的 Vue 实例上插件
 *
 * @author chitanda
 * @date 2024-02-04 18:02:49
 * @static
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
AppHooks.useComponent = new qxUtil.SyncSeriesHook();

exports.AppHooks = AppHooks;
