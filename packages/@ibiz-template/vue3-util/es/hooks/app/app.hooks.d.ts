import { SyncSeriesHook } from 'qx-util';
import { App } from 'vue';
/**
 * 应用钩子(内部使用)
 *
 * @author chitanda
 * @date 2024-02-04 17:02:18
 * @export
 * @class AppHooks
 */
export declare class AppHooks {
    /**
     * 创建 Vue 应用实例
     *
     * @author chitanda
     * @date 2024-02-04 17:02:41
     * @static
     */
    static createApp: SyncSeriesHook<App<any>, null>;
    /**
     * 用于在多实例下，挂载到已经创建的 Vue 实例上插件
     *
     * @author chitanda
     * @date 2024-02-04 18:02:49
     * @static
     */
    static useComponent: SyncSeriesHook<any, null>;
}
//# sourceMappingURL=app.hooks.d.ts.map