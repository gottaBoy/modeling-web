import { IMicroAppConfig, IMicroAppConfigCenter } from '../interface';
/**
 * @description 微应用配置中心
 * @export
 * @class MicroAppConfigCenter
 * @implements {IMicroAppConfigCenter}
 */
export declare class MicroAppConfigCenter implements IMicroAppConfigCenter {
    /**
     * @description 已注册的微应用
     * @protected
     * @type {Map<string, IMicroAppConfig>}
     * @memberof MicroAppConfigCenter
     */
    protected apps: Map<string, IMicroAppConfig>;
    /**
     * @description 注册微应用
     * @param {IMicroAppConfig[]} apps
     * @returns {*}  {void}
     * @memberof MicroAppConfigCenter
     */
    registerMicroApps(apps: IMicroAppConfig[]): void;
    /**
     * @description 获取微应用列表
     * @returns {*}  {IMicroAppConfig[]}
     * @memberof MicroAppConfigCenter
     */
    getMicroApps(): IMicroAppConfig[];
    /**
     * @description 获取指定名称的微应用
     * @param {string} name
     * @returns {*}  {(IMicroAppConfig | undefined)}
     * @memberof MicroAppConfigCenter
     */
    getMicroApp(name: string): IMicroAppConfig | undefined;
    /**
     * @description 获取插件基础路径
     * @param {string} name
     * @returns {*}  {string}
     * @memberof MicroAppConfigCenter
     */
    getPluginBaseUrl(name: string): string;
}
//# sourceMappingURL=config-center.d.ts.map