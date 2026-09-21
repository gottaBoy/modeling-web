import { IAppBICube, IAppBIReport, IAppBIScheme, IAppDataEntity, IAppView, IApplication } from '@ibiz/model-core';
import { Convert } from '../../../hub';
import { ModelLoaderProvider } from '../../provider';
import { IAppConfigService } from '../i-app-config-service/i-app-config-service';
import { IHubController, INoticeController } from '../../controller';
import { IAppDEService, IConfigService } from '../../service';
import { IAppService } from '../i-app-service/i-app-service';
import { Application } from '../../../application';
import { MqttService } from '../../../service';
/**
 * 应用 hub 服务
 *
 * @author chitanda
 * @date 2023-04-23 15:04:02
 * @export
 * @interface IAppHubService
 */
export interface IAppHubService {
    /**
     * 模型转换器
     *
     * @author chitanda
     * @date 2023-04-23 15:04:15
     * @type {Convert}
     */
    readonly convert: Convert;
    /**
     * 全局控制器，放置全局性的功能性方法
     *
     * @author chitanda
     * @date 2023-08-21 15:08:00
     * @type {IHubController}
     */
    readonly controller: IHubController;
    /**
     * 基座级配置存储服务
     *
     * @author chitanda
     * @date 2023-09-22 10:09:59
     * @type {IConfigService}
     */
    configCache: IConfigService;
    /**
     * 默认应用首页视图
     *
     * @author chitanda
     * @date 2023-04-23 15:04:41
     * @type {string}
     */
    defaultAppIndexViewName: string;
    /**
     * 默认页面（用于匿名访问获取默认页面数据）
     *
     * @author tony001
     * @date 2024-05-09 13:05:03
     * @type {(IModel | undefined)}
     */
    defaultPage: IModel | undefined;
    /**
     * hub配置信息服务
     * @author lxm
     * @date 2023-07-03 07:12:05
     */
    config: IAppConfigService;
    /**
     * 全局消息总控制器
     * @author lxm
     * @date 2024-01-25 06:49:19
     * @type {INoticeController}
     */
    notice: INoticeController;
    /**
     * mqtt 服务
     *
     * @author tony001
     * @date 2024-12-14 15:12:52
     * @type {MqttService}
     */
    mqtt?: MqttService;
    /**
     * 初始化Mqtt服务
     *
     * @author tony001
     * @date 2024-12-14 15:12:32
     * @return {*}  {Promise<void>}
     */
    initMqtt(): Promise<void>;
    /**
     * 注册模型加载适配器
     *
     * @author chitanda
     * @date 2023-04-23 15:04:56
     * @param {ModelLoaderProvider} provider
     */
    registerModelLoaderProvider(provider: ModelLoaderProvider): void;
    /**
     * 注册应用视图模型
     *
     * @author chitanda
     * @date 2023-04-23 15:04:47
     * @param {IAppView} model
     */
    registerAppView(model: IAppView): void;
    /**
     * 注册应用实体模型
     *
     * @author chitanda
     * @date 2023-04-23 15:04:25
     * @param {IAppDataEntity} model
     * @param {string} [appId=ibiz.env.appId]
     */
    registerAppDataEntity(model: IAppDataEntity, appId: string): void;
    /**
     * 注册子应用dedrcontrols模型
     *
     * @author tony001
     * @date 2024-04-29 15:04:38
     * @param {string} appId
     * @param {IModel} model
     */
    registerSubAppDrControls(appId: string, model: IModel): void;
    /**
     * 注册子应用界面行为组模型
     *
     * @author tony001
     * @date 2024-09-09 11:09:37
     * @param {string} appId
     * @param {IModel} model
     */
    registerSubAppDEUIActionGroups(appId: string, model: IModel): void;
    /**
     * 注册子应用菜单模型
     *
     * @author tony001
     * @date 2024-09-26 13:09:38
     * @param {string} appId
     * @param {IModel} model
     */
    registerSubAppMenuModels(appId: string, model: IModel): void;
    /**
     * 注册子应用部件模型
     *
     * @author tony001
     * @date 2024-09-26 13:09:58
     * @param {string} appId
     * @param {IModel} model
     */
    registerSubAppControls(appId: string, model: IModel): void;
    /**
     * 设置应用视图所属应用，兼容识别视图 codeName 或 id
     *
     * @author chitanda
     * @date 2024-01-15 15:01:39
     * @param {string} tag
     * @param {string} [appId]
     * @param {number} [priority]
     */
    setAppView(tag: string, appId?: string, priority?: number): void;
    /**
     * 应用视图是否已注册
     *
     * @author chitanda
     * @date 2023-04-23 15:04:43
     * @param {string} tag
     * @return {*}  {boolean}
     */
    hasAppView(tag: string): boolean;
    /**
     * 获取应用模型样式内容
     *
     * @author chitanda
     * @date 2023-09-06 10:09:07
     * @param {string} appId
     * @return {*}  {(Promise<string | null>)}
     */
    getAppStyle(appId: string): Promise<string | null>;
    /**
     * 根据应用视图 codeName 或 id 获取应用视图模型
     *
     * @author chitanda
     * @date 2023-04-23 15:04:59
     * @param {string} tag
     * @return {*}  {Promise<IAppView>}
     */
    getAppView(tag: string): Promise<IAppView>;
    /**
     * 根据DrControl的名称和子应用标识获取模型
     *
     * @author tony001
     * @date 2024-04-29 15:04:54
     * @param {string} tag
     * @param {string} appId
     * @return {*}  {Promise<IModel | undefined>}
     */
    getSubAppDrControl(tag: string, appId: string): IModel | undefined;
    /**
     * 根据界面行为组标识和子应用标识获取模型
     *
     * @author tony001
     * @date 2024-09-09 11:09:59
     * @param {string} tag
     * @param {string} appId
     * @return {*}  {(IModel | undefined)}
     */
    getSubAppDEUIActionGroups(tag: string, appId: string): IModel | undefined;
    /**
     * 根据菜单名称和子应用标识获取菜单模型
     *
     * @author tony001
     * @date 2024-09-26 14:09:21
     * @param {string} tag
     * @param {string} appId
     * @return {*}  {(IModel | undefined)}
     */
    getSubAppMenuModel(tag: string, appId: string): IModel | undefined;
    /**
     * 根据部件标识和子应用标识获取部件模型
     *
     * @author tony001
     * @date 2024-09-26 17:09:56
     * @param {string} tag
     * @param {string} appId
     * @return {*}  {(IModel | undefined)}
     */
    getSubAppControl(tag: string, appId: string): IModel | undefined;
    /**
     * 根据参数加载请求视图模型，用于后台根据运行时参数加载视图
     *
     * @author chitanda
     * @date 2024-01-08 11:01:27
     * @param {string} appId
     * @param {string} viewId
     * @param {IParams} params
     * @return {*}  {Promise<IAppView>}
     */
    loadAppView(appId: string, viewId: string, params: IParams): Promise<IAppView>;
    /**
     * 获取应用实体模型
     *
     * @author chitanda
     * @date 2023-04-23 15:04:33
     * @param {string} id
     * @param {string} [appId=ibiz.env.appId]
     * @return {*}  {Promise<IAppDataEntity>}
     */
    getAppDataEntity(id: string, appId?: string): Promise<IAppDataEntity>;
    /**
     * 获取应用智能报表体系
     *
     * @author tony001
     * @date 2024-06-04 16:06:25
     * @param {string[]} ids 智能报表体系标识集合
     * @param {string} appId 应用标识
     * @return {*}  {Promise<IAppBIScheme[]>}
     */
    getAppBISchemes(ids?: string[], appId?: string): Promise<IAppBIScheme[]>;
    /**
     * 获取应用智能报表立方体数据
     *
     * @author tony001
     * @date 2024-06-04 17:06:01
     * @param {string[]} ids 智能报表立方体标识集合
     * @param {string} appId 应用标识
     * @return {*}  {Promise<IAppBICube[]>}
     */
    getAppAppBICubes(ids: string[], appId?: string): Promise<IAppBICube[]>;
    /**
     * 获取应用智能报表数据
     *
     * @author tony001
     * @date 2024-06-04 16:06:51
     * @param {string[]} ids 智能报表标识集合
     * @param {string} appId 应用标识
     * @return {*}  {Promise<IAppBIReport[]>}
     */
    getAppBIReports(ids: string[], appId?: string): Promise<IAppBIReport[]>;
    /**
     * 异步获取应用对象，用于不确定应用是否已经加载的情况
     *
     * @author chitanda
     * @date 2023-04-23 15:04:46
     * @param {string} [appId=ibiz.env.appId]
     * @return {*}  {Promise<IAppService>}
     */
    getAppAsync(appId?: string): Promise<IAppService>;
    /**
     * 获取应用实例
     *
     * @author chitanda
     * @date 2023-04-23 15:04:24
     * @param {(string | IApplication)} [app]
     * @return {*}  {IAppService}
     */
    getApp(app?: string | IApplication): IAppService;
    /**
     * 获取所有应用实例
     *
     * @author chitanda
     * @date 2023-12-22 16:12:09
     * @return {*}  {IAppService[]}
     */
    getAllApps(): IAppService[];
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
     * 设置插件
     *
     * @author tony001
     * @date 2024-11-26 16:11:45
     * @param {IModel} plugin
     * @param {string} appId
     */
    setPlugin(plugin: IModel, appId?: string): void;
    /**
     * 获取插件
     *
     * @author tony001
     * @date 2024-11-26 17:11:59
     * @param {string} pluginId
     * @param {string} [appId]
     * @return {*}  {(IModel | undefined)}
     */
    getPlugin(pluginId: string, appId?: string): IModel | undefined;
    /**
     * 获取应用实体服务
     *
     * @author chitanda
     * @date 2024-01-10 13:01:40
     * @param {string} appId
     * @param {string} entityId
     * @param {IContext} context
     * @return {*}  {IAppDEService}
     */
    getAppDEService(appId: string, entityId: string, context: IContext): Promise<IAppDEService>;
    /**
     * 原始模型转化为dsl对象
     *
     * @author tony001
     * @date 2024-06-27 17:06:14
     * @param {IData} data
     * @param {('APP' | 'VIEW' | 'CTRL' | 'APPENTITY')} type
     * @return {*}  {Promise<IModel | undefined>}
     */
    translationModelToDsl(data: IData, type: 'APP' | 'VIEW' | 'CTRL' | 'APPENTITY'): Promise<IModel | undefined>;
    /**
     * 新建 hub 应用
     *
     * @author tony001
     * @date 2024-11-15 17:11:59
     * @param {string} id
     * @return {*}  {Promise<Application>}
     */
    createApp(id: string): Promise<Application>;
    /**
     * 重置清空基座
     * @author lxm
     * @date 2024-01-03 06:46:57
     */
    reset(): void;
    /**
     * 销毁基座
     *
     * @author tony001
     * @date 2024-04-10 15:04:21
     */
    destroy(): void;
}
//# sourceMappingURL=i-app-hub-service.d.ts.map