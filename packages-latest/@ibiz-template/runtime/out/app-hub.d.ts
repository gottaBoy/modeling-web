import { IAppBICube, IAppBIReport, IAppBIScheme, IAppCodeList, IAppDataEntity, IAppLan, IAppView, IApplication } from '@ibiz/model-core';
import { Application } from './application';
import { IAppDEService, IAppHubService, IAppService, IMicroAppConfigCenter, ModelLoaderProvider } from './interface';
import { AppConfigService, Convert } from './hub';
import { HubController } from './controller';
import { ConfigService, MqttService } from './service';
import { NoticeController } from './controller/notification';
/**
 * 运行时总集
 *
 * @author chitanda
 * @date 2022-12-21 14:12:00
 * @export
 * @class AppHub
 */
export declare class AppHub implements IAppHubService {
    /**
     * 多应用模式下，应用模型转换器
     *
     * @author chitanda
     * @date 2023-04-23 15:04:06
     * @type {Convert}
     */
    readonly convert: Convert;
    /**
     * @description 微应用配置中心（仅全代码使用）
     * @type {IMicroAppConfigCenter}
     * @memberof AppHub
     */
    readonly microAppConfigCenter: IMicroAppConfigCenter;
    /**
     * 全局控制器，放置全局性的功能性方法
     *
     * @author chitanda
     * @date 2023-08-21 15:08:48
     */
    readonly controller: HubController;
    /**
     * 基座级配置存储服务
     *
     * @author chitanda
     * @date 2023-09-22 10:09:25
     * @type {ConfigService}
     */
    configCache: ConfigService;
    /**
     * 应用总集
     *
     * @author chitanda
     * @date 2022-12-21 14:12:45
     * @protected
     * @type {Map<string, Application>}
     */
    protected appMap: Map<string, Application>;
    /**
     * @description 原始应用模型
     * @protected
     * @type {Map<string, IModel>}
     * @memberof AppHub
     */
    protected appModelMap: Map<string, IModel>;
    /**
     * 当前基座下所有的应用视图
     *
     * @author chitanda
     * @date 2023-04-17 11:04:20
     * @protected
     * @type {Map<string, string>} Map<视图 id, 视图所属应用>
     */
    protected view2appMap: Map<string, string>;
    /**
     * 当前注册的应用视图优先级
     *
     * @author chitanda
     * @date 2024-01-15 15:01:57
     * @protected
     * @type {Map<string, number>}
     */
    protected view2appPriorityMap: Map<string, number>;
    /**
     * 实例化的应用视图模型
     *
     * @author chitanda
     * @date 2023-04-17 23:04:00
     * @protected
     * @type {Map<string, IAppView>}
     */
    protected views: Map<string, IAppView>;
    /**
     * 子应用dr部件模型
     *
     * @author tony001
     * @date 2024-04-29 15:04:24
     * @protected
     * @type {Map<string, IModel[]>}
     */
    protected drcontrols: Map<string, IModel[]>;
    /**
     * 子应用分页导航面板模型
     */
    protected subAppTabExpPanels: Map<string, IModel[]>;
    /**
     * 子应用界面行为组模型
     *
     * @author tony001
     * @date 2024-09-09 10:09:02
     * @protected
     * @type {Map<string, IModel[]>} key为应用标识、value为所有子应用该标识的界面行为组
     */
    protected subAppDEUIActionGroups: Map<string, IModel[]>;
    /**
     * 子应用菜单模型（不包含主菜单）
     *
     * @author tony001
     * @date 2024-09-26 13:09:07
     * @protected
     * @type {Map<string, IModel[]>} key为应用标识、value为所有子应用该标识的菜单模型
     */
    protected subAppMenuModels: Map<string, IModel[]>;
    /**
     * 子应用部件模型（不包含drctrl）
     *
     * @author tony001
     * @date 2024-09-26 13:09:04
     * @protected
     * @type {Map<string, IModel[]>}
     */
    protected subAppControls: Map<string, IModel[]>;
    /**
     * 应用实体实例模型
     *
     * @author chitanda
     * @date 2023-04-17 23:04:32
     * @protected
     * @type {Map<string, Map<string, IAppDataEntity>>}
     */
    protected dataEntities: Map<string, Map<string, IAppDataEntity>>;
    /**
     * 模型加载适配器由外部注册，存在时使用
     *
     * @author chitanda
     * @date 2023-04-17 23:04:02
     * @type {ModelLoaderProvider}
     */
    protected modelLoaderProvider?: ModelLoaderProvider;
    /**
     * 插件清单，key为应用标识，值为key为插件标识，value为插件模型对象的MAP
     *
     * @author tony001
     * @date 2024-11-26 17:11:15
     * @protected
     * @type {Map<string, Map<string, IModel>>}
     */
    protected plugins: Map<string, Map<string, IModel>>;
    /**
     * 子应用代码表清单，key为应用标识，值为key为代码表标识，value为代码表模型对象MAP
     *
     * @author tony001
     * @protected
     * @type {Map<string, Map<string, IAppCodeList>>}
     */
    protected codeLists: Map<string, Map<string, IAppCodeList>>;
    /**
     * hub配置信息服务
     * @author lxm
     * @date 2023-07-03 07:12:05
     */
    config: AppConfigService;
    notice: NoticeController;
    /**
     * 默认首页视图名称
     *
     * @author chitanda
     * @date 2023-04-19 20:04:22
     * @type {string}
     */
    defaultAppIndexViewName: string;
    /**
     * 默认页面
     *
     * @author tony001
     * @date 2024-05-09 13:05:58
     * @type {(IModel | undefined)}
     */
    defaultPage: IModel | undefined;
    /**
     * mqtt 服务
     *
     * @author tony001
     * @date 2024-12-14 15:12:20
     * @type {MqttService}
     */
    mqtt?: MqttService;
    /**
     * @description 当前激活的微应用标识
     * @type {string}
     * @memberof AppHub
     */
    activeMicroAppId: string;
    /**
     * 初始化Mqtt服务
     *
     * @author tony001
     * @date 2024-12-14 15:12:24
     * @return {*}  {Promise<void>}
     */
    initMqtt(): Promise<void>;
    /**
     * 预加载子应用
     *
     * @author tony001
     * @date 2025-04-03 10:04:19
     * @return {*}  {Promise<void>}
     */
    preLoadSubApp(): Promise<void>;
    /**
     * 计算应用视图 标识
     *
     * @author chitanda
     * @date 2023-04-20 18:04:48
     * @protected
     * @param {string} tag
     * @return {*}  {string}
     */
    protected calcAppViewId(tag?: string): string;
    /**
     * 注册模型加载适配器
     *
     * @author chitanda
     * @date 2023-04-17 23:04:14
     * @param {ModelLoaderProvider} provider
     */
    registerModelLoaderProvider(provider: ModelLoaderProvider): void;
    /**
     * 注册应用视图实例模型
     *
     * @author chitanda
     * @date 2023-04-17 23:04:42
     * @param {IAppView} model
     */
    registerAppView(model: IAppView): void;
    /**
     *  注册子应用dedrcontrols模型
     *
     * @author tony001
     * @date 2024-04-29 15:04:36
     * @param {string} appId
     * @param {IModel} model
     */
    registerSubAppDrControls(appId: string, model: IModel): void;
    /**
     * 注册子应用分页导航面板模型
     * @param appId
     * @param model
     */
    registerSubAppTabExpPanel(appId: string, model: IModel): void;
    /**
     * 注册子应用界面行为组
     *
     * @author tony001
     * @date 2024-09-09 10:09:05
     * @param {string} appId
     * @param {IModel} model
     */
    registerSubAppDEUIActionGroups(appId: string, model: IModel): void;
    /**
     * 注册子应用菜单模型
     *
     * @author tony001
     * @date 2024-09-26 13:09:36
     * @param {string} appId
     * @param {IModel} model
     */
    registerSubAppMenuModels(appId: string, model: IModel): void;
    /**
     * 注册子应用部件模型
     *
     * @author tony001
     * @date 2024-09-26 13:09:35
     * @param {string} appId
     * @param {IModel} model
     */
    registerSubAppControls(appId: string, model: IModel): void;
    /**
     * 注册应用实体
     *
     * @author chitanda
     * @date 2023-04-17 23:04:24
     * @param {IAppDataEntity} model
     * @param {string} [appId=ibiz.env.appId]
     */
    registerAppDataEntity(model: IAppDataEntity, appId?: string): void;
    /**
     * 设置插件
     *
     * @author tony001
     * @date 2024-11-26 16:11:03
     * @param {IModel} plugin
     * @param {string} [appId=ibiz.env.appId]
     */
    setPlugin(plugin: IModel, appId?: string): void;
    /**
     * 获取插件
     *
     * @author tony001
     * @date 2024-11-26 17:11:15
     * @param {string} pluginId
     * @param {string} [appId=ibiz.env.appId]
     * @return {*}  {(IModel | undefined)}
     */
    getPlugin(pluginId: string, appId?: string): IModel | undefined;
    /**
     * @description 获取指定应用所有插件
     * @param {*} [appIdstring=ibiz.env.appId]
     * @returns {*}  {(IModel[])}
     * @memberof AppHub
     */
    getPlugins(appId?: string): IModel[];
    /**
     * 注册子应用代码表
     *
     * @author tony001
     * @param {string} appId
     * @param {IAppCodeList} model
     */
    registerSubAppCodeList(appId: string, model: IAppCodeList): void;
    /**
     * 设置应用视图所属应用
     *
     * @author chitanda
     * @date 2024-01-15 15:01:41
     * @param {string} tag 视图 codeName 或者视图 id
     * @param {string} [appId=ibiz.env.appId]
     * @param {number} [priority=-1] 视图的优先级，值越小优先级越高。10为最高优先级
     */
    setAppView(tag: string, appId?: string, priority?: number): void;
    /**
     * 判断应用视图是否存在
     *
     * @author chitanda
     * @date 2023-04-20 18:04:00
     * @param {string} tag 视图 codeName 或者视图 id
     * @return {*}  {boolean}
     */
    hasAppView(tag: string): boolean;
    /**
     * 获取多语言资源
     *
     * @param language
     * @param appId
     * @returns
     */
    getPSAppLang(language: string, appId?: string | IObject): Promise<IAppLan | null>;
    /**
     * 获取应用样式
     *
     * @author chitanda
     * @date 2023-09-06 10:09:22
     * @param {string} appId
     * @return {*}  {(Promise<string | null>)}
     */
    getAppStyle(appId: string): Promise<string | null>;
    /**
     * 获取应用智能报表体系
     *
     * @author tony001
     * @date 2024-06-06 16:06:57
     * @param {string[]} [ids=[]]
     * @param {string} [appId=ibiz.env.appId]
     * @return {*}  {Promise<IAppBIScheme[]>}
     */
    getAppBISchemes(ids?: string[], appId?: string): Promise<IAppBIScheme[]>;
    /**
     * 获取应用智能报表立方体数据
     *
     * @author tony001
     * @date 2024-06-04 16:06:03
     * @param {string[]} ids
     * @param {string} appId
     * @return {*}  {Promise<IAppBICube[]>}
     */
    getAppAppBICubes(ids: string[], appId?: string): Promise<IAppBICube[]>;
    /**
     * 获取应用智能报表数据
     *
     * @author tony001
     * @date 2024-06-04 16:06:25
     * @param {string[]} ids
     * @param {string} appId
     * @return {*}  {Promise<IAppBIReport[]>}
     */
    getAppBIReports(ids: string[], appId?: string): Promise<IAppBIReport[]>;
    /**
     * 根据视图代码名称查找视图
     *
     * @author chitanda
     * @date 2023-04-17 21:04:14
     * @param {string} tag 视图 codeName 或者视图 id
     * @return {*}  {Promise<IAppView>}
     */
    getAppView(tag: string): Promise<IAppView>;
    /**
     * 根据DrControl的名称和子应用标识获取模型
     *
     * @author tony001
     * @date 2024-04-29 15:04:25
     * @param {string} tag
     * @param {string} appId
     * @return {*}  {Promise<IModel | undefined>}
     */
    getSubAppDrControl(tag: string, appId: string): IModel | undefined;
    /**
     * @description 根据分页导航面板的唯一标识（uniqueTag）获取模型
     * @param tag
     * @param appId
     */
    getSubAppTabExpPanel(tag: string, appId: string): IModel | undefined;
    /**
     * 根据界面行为组标识和子应用标识获取模型
     *
     * @author tony001
     * @date 2024-09-09 11:09:43
     * @param {string} tag
     * @param {string} appId
     * @return {*}  {(IModel | undefined)}
     */
    getSubAppDEUIActionGroups(tag: string, appId: string): IModel | undefined;
    /**
     * 根据菜单名称和子应用标识获取菜单模型
     *
     * @author tony001
     * @date 2024-09-26 14:09:50
     * @param {string} tag
     * @param {string} appId
     * @return {*}  {(IModel | undefined)}
     */
    getSubAppMenuModel(tag: string, appId: string): IModel | undefined;
    /**
     * 根据部件标识和子应用标识获取部件模型
     *
     * @author tony001
     * @date 2024-09-26 17:09:58
     * @param {string} tag
     * @param {string} appId
     * @return {*}  {(IModel | undefined)}
     */
    getSubAppControl(tag: string, appId: string): IModel | undefined;
    /**
     * 根据视图模型路径，加参数重新计算视图模型
     *
     * @author chitanda
     * @date 2024-01-08 11:01:54
     * @param {string} appId
     * @param {string} modelPath
     * @param {IParams} params
     * @return {*}  {Promise<IAppView>}
     */
    loadAppView(appId: string, modelPath: string, params: IParams): Promise<IAppView>;
    /**
     * 根据应用实体代码名称查找应用视图
     *
     * @author chitanda
     * @date 2023-04-17 23:04:08
     * @param {string} name
     * @param {string} [appId=ibiz.env.appId]
     * @return {*}  {Promise<IAppDataEntity>}
     */
    getAppDataEntity(id: string, appId?: string): Promise<IAppDataEntity>;
    /**
     * 根据代码表标识获取子应用代码表
     *
     * @author tony001
     * @param {string} id
     * @param {string} [appId=ibiz.env.appId]
     * @return {*}  {Promise<IAppCodeList>}
     */
    getSubAppCodeList(id: string, appId?: string): IAppCodeList | undefined;
    /**
     * @description 加载扩展插件
     * @public
     * @param {string} appId
     * @returns {*}  {Promise<void>}
     * @memberof AppHub
     */
    loadExtensionPlugin(appId: string): Promise<void>;
    /**
     * 新建 hub 应用
     *
     * @author chitanda
     * @date 2023-04-17 21:04:11
     * @param {string} id
     * @return {*}  {Promise<Application>}
     */
    createApp(id: string): Promise<Application>;
    /**
     * 异步获取应用对象，用于不确定应用是否已经加载的情况
     *
     * @author chitanda
     * @date 2023-04-17 21:04:41
     * @param {string} [key=ibiz.env.appId]
     * @return {*}  {Promise<IAppService>}
     */
    getAppAsync(key?: string): Promise<IAppService>;
    /**
     * 根据应用 id 或应用模型获取应用实例
     *
     * @author chitanda
     * @date 2023-04-17 22:04:42
     * @param {(string | IApplication)} [app]
     * @return {*}  {IAppService}
     */
    getApp(app?: string | IApplication): IAppService;
    /**
     * 通过标识获取应用对象
     *
     * @author tony001
     * @date 2024-09-11 15:09:13
     * @param {string} id
     * @return {*}  {(IAppService | undefined)}
     */
    getAppById(id: string): IAppService | undefined;
    /**
     * 获取所有应用实例
     *
     * @author chitanda
     * @date 2023-12-22 16:12:28
     * @return {*}  {IAppService[]}
     */
    getAllApps(): IAppService[];
    /**
     * 获取应用实体服务
     *
     * @author chitanda
     * @date 2024-01-10 13:01:01
     * @param {string} appId
     * @param {string} entityId
     * @param {IContext} context
     * @return {*}  {Promise<IAppDEService>}
     */
    getAppDEService(appId: string, entityId: string, context: IContext): Promise<IAppDEService>;
    translationModelToDsl(data: IData, type: 'APP' | 'VIEW' | 'CTRL' | 'APPENTITY'): Promise<IModel | undefined>;
    reset(): void;
    setAppSourceModel(key: string, model: IModel): void;
    getAppSourceModel(app?: string | IApplication): IModel;
    /**
     * 销毁基座
     *
     * @author tony001
     * @date 2024-04-10 17:04:38
     */
    destroy(): void;
    /**
     * 合并子应用代码表
     * @param codeList
     */
    mergeSubAppCodeList(codeList: IAppCodeList): void;
}
//# sourceMappingURL=app-hub.d.ts.map