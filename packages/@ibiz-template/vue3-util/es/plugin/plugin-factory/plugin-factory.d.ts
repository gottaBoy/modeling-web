import { IPluginFactory, IPluginItem, ISystemImportMap, RemotePluginConfig, RemotePluginItem } from '@ibiz-template/runtime';
import { ISysPFPlugin } from '@ibiz/model-core';
import { App, Plugin } from 'vue';
/**
 * 插件工具类
 *
 * @author chitanda
 * @date 2022-10-21 16:10:29
 * @export
 * @class PluginFactory
 */
export declare class PluginFactory implements IPluginFactory {
    /**
     * 是否为 http || https 开头
     *
     * @author chitanda
     * @date 2022-11-07 14:11:28
     * @protected
     */
    protected urlReg: RegExp;
    /**
     * 是否已经加载过文件缓存
     *
     * @author chitanda
     * @date 2022-10-31 14:10:17
     * @protected
     * @type {Map<string, boolean>}
     */
    protected cache: Map<string, boolean>;
    /**
     * 插件缓存
     *
     * @author chitanda
     * @date 2022-10-31 14:10:28
     * @protected
     * @type {Map<string, RemotePluginItem>}
     */
    protected pluginCache: Map<string, RemotePluginItem>;
    /**
     * 所有的插件
     *
     * @author chitanda
     * @date 2023-02-02 16:02:55
     * @protected
     * @type {Plugin[]}
     */
    protected pluginCodes: Plugin[];
    /**
     * 预定义插件集合
     *
     * @author chitanda
     * @date 2023-03-09 17:03:46
     * @protected
     * @type {Map<string, IPluginItem>}
     */
    protected predefinedPlugins: Map<string, IPluginItem>;
    /**
     * 忽略加载的插件规则，支持正则。配配规则为插件包地址，如：@ibiz-template-vue/vue3-plugin-*
     *
     * @author chitanda
     * @date 2023-12-04 15:12:58
     * @protected
     * @type {((string | RegExp)[])}
     */
    protected ignoreRules: (string | RegExp)[];
    /**
     * 插件加载队列
     *
     * @author chitanda
     * @date 2023-12-05 16:12:04
     * @protected
     * @type {Map<string, Promise<boolean>>}
     */
    protected loadQueue: Map<string, Promise<boolean>>;
    /**
     * 是否忽略插件加载
     *
     * @author chitanda
     * @date 2023-12-04 16:12:48
     * @protected
     * @param {string} pluginPath
     * @return {*}  {boolean}
     */
    protected isIgnore(pluginPath: string): boolean;
    /**
     * 设置本地开发忽略远程加载的插件
     *
     * @author chitanda
     * @date 2023-12-04 17:12:49
     * @param {(string | RegExp)} rule
     */
    setDevIgnore(rule: string | RegExp): void;
    /**
     * 注册视图默认插件
     *
     * @author chitanda
     * @date 2023-02-06 21:02:10
     * @param {IPluginItem} plugin
     */
    registerPredefinedPlugin(plugin: IPluginItem): void;
    /**
     * 给入应用实例，将已经加载的过插件注入。主要用于多实例的情况
     *
     * @author chitanda
     * @date 2023-02-02 16:02:51
     * @param {App} app
     */
    register(app: App): void;
    /**
     * 加载预置插件
     *
     * @author chitanda
     * @date 2023-03-09 18:03:48
     * @param {string} name
     * @return {*}  {Promise<void>}
     */
    loadPredefinedPlugin(name: string): Promise<void>;
    /**
     * 插件刚加载完成回来，设置到目前所有的 vue 实例当中
     *
     * @author chitanda
     * @date 2023-02-02 17:02:38
     * @protected
     * @param {Plugin} code
     */
    protected setPluginCode(code: Plugin): void;
    /**
     * 加载插件
     *
     * @author chitanda
     * @date 2022-10-31 14:10:13
     * @param {ISysPFPlugin} plugin
     * @return {*}  {Promise<boolean>}
     */
    loadPlugin(plugin: ISysPFPlugin): Promise<boolean>;
    /**
     * 加载应用插件
     *
     * @author chitanda
     * @date 2022-10-31 16:10:57
     * @param {IPSAppPFPluginRef} pluginRef
     * @return {*}  {Promise<boolean>}
     */
    loadPluginRef(rtObjectName: string, rtObjectRepo: string): Promise<boolean>;
    /**
     * 加载插件
     *
     * @author chitanda
     * @date 2022-11-02 14:11:31
     * @protected
     * @param {RemotePluginItem} remotePlugin
     * @return {*}  {Promise<void>}
     */
    protected loadScript(remotePlugin: RemotePluginItem): Promise<void>;
    /**
     * 编译请求文件地址
     *
     * @author chitanda
     * @date 2024-01-11 16:01:19
     * @protected
     * @param {string} pathUrl
     * @param {string} [baseUrl=ibiz.env.pluginBaseUrl]
     * @return {*}  {string}
     */
    protected parseUrl(pathUrl: string, baseUrl?: string): string;
    /**
     * 加载插件的外部依赖
     *
     * @author chitanda
     * @date 2024-01-19 19:01:39
     * @protected
     * @param {RemotePluginConfig} config
     * @return {*}  {Promise<void>}
     */
    protected loadPluginExternal(config: RemotePluginConfig): Promise<void>;
    /**
     * 处理 systemjs importmap 配置
     *
     * @author chitanda
     * @date 2024-01-11 20:01:07
     * @protected
     * @param {ISystemImportMap} importMap
     * @return {*}  {IParams}
     */
    protected handleSystemImportMap(importMap: ISystemImportMap): ISystemImportMap | null;
}
//# sourceMappingURL=plugin-factory.d.ts.map