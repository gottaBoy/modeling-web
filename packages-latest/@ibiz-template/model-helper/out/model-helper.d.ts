import { IAppCodeList, IAppDataEntity, IAppView, IApplication, IAppLan, ISubAppRef, IAppBIScheme, IAppBICube, IAppBIReport } from '@ibiz/model-core';
import { DSLHelper } from '@ibiz/rt-model-api';
import { ModelUtil } from './model-util';
import { MergeSubModelHelper } from './utils';
/**
 * 模型加载工具类
 *
 * @author chitanda
 * @date 2023-04-16 17:04:46
 * @export
 * @class ModelHelper
 */
export declare class ModelHelper {
    protected getModel: (url: string, params?: IParams) => Promise<IModel>;
    protected defaultAppId: string;
    protected appContext: IParams;
    protected permission: boolean;
    /**
     * dsl解析包
     *
     * @author tony001
     * @date 2024-09-26 16:09:49
     * @protected
     */
    protected dsl: DSLHelper;
    /**
     * 子应用模型合并对象
     *
     * @author tony001
     * @date 2024-09-26 16:09:51
     * @protected
     */
    protected merge: MergeSubModelHelper;
    /**
     * 当前子应用清单
     *
     * @author chitanda
     * @date 2023-12-06 15:12:30
     * @protected
     * @type {ISubAppRef[]}
     */
    protected subAppRefs: ISubAppRef[];
    /**
     * 模型获取工具类缓存
     *
     * @author chitanda
     * @date 2023-04-16 17:04:56
     * @protected
     * @type {Map<string, ModelUtil>}
     */
    protected cache: Map<string, ModelUtil>;
    /**
     * Creates an instance of ModelHelper.
     * @author chitanda
     * @date 2024-01-08 10:01:20
     * @param {(url: string, params?: IParams) => Promise<IModel>} getModel 模型加载方法
     * @param {string} defaultAppId 默认应用标识
     * @param {string} appContext 应用级上下文参数
     * @param {boolean} [permission=true] 是否启用权限
     */
    constructor(getModel: (url: string, params?: IParams) => Promise<IModel>, defaultAppId: string, appContext: IParams, permission?: boolean);
    /**
     * 初始化应用内容
     *
     * @author chitanda
     * @date 2023-12-06 17:12:51
     * @param {string} [id]
     * @return {*}  {Promise<boolean>}
     */
    initApp(id?: string): Promise<boolean>;
    /**
     * 初始化具体应用模型工具类
     *
     * @author chitanda
     * @date 2023-04-16 17:04:41
     * @param {string} modelTag
     * @param {string} [appId=this.defaultAppId]
     * @return {*}  {Promise<void>}
     */
    initModelUtil(modelTag: string, appId?: string): Promise<void>;
    /**
     * 初始化模型至Hub中
     *
     * @author chitanda
     * @date 2023-04-17 14:04:55
     * @protected
     * @param {(string | IObject)} [appId]
     * @return {*}  {Promise<void>}
     */
    protected initToHub(appId?: string | IObject): Promise<void>;
    /**
     * 递归填充指定应用标识
     *
     * @author tony001
     * @date 2024-09-09 15:09:20
     * @protected
     * @param {IModel} model
     * @param {string} appId
     */
    protected deepFillSubAppId(model: IModel, appId: string): void;
    /**
     * 初始化子应用相关内容
     *
     * @author chitanda
     * @date 2023-12-06 15:12:23
     * @protected
     * @param {IApplication} app
     * @param {ISubAppRef} subApp
     * @return {*}  {Promise<void>}
     */
    protected initSubApp(app: IApplication, subApp: ISubAppRef, sourceSubApp: IModel): Promise<void>;
    /**
     * 获取应用模型
     *
     * @author chitanda
     * @date 2023-04-16 17:04:13
     * @param {(string | IObject)} [appId]
     * @return {*}  {Promise<IApplication>}
     */
    getAppModel(appId?: string | IObject): Promise<IApplication>;
    /**
     * 获取子应用引用模型
     *
     * @author tony001
     * @date 2024-06-23 15:06:31
     * @param {string} appId
     * @return {*}  {(Promise<ISubAppRef | undefined>)}
     */
    getSubAppRef(appId: string): Promise<ISubAppRef | undefined>;
    /**
     * 获取应用全局样式
     *
     * @author chitanda
     * @date 2023-09-06 10:09:48
     * @param {(string | IObject)} [appId]
     * @return {*}  {(Promise<string | null>)}
     */
    getAppStyle(appId?: string | IObject): Promise<string | null>;
    /**
     * @description 计算应用实体需要合并的子应用模型
     * @protected
     * @param {IAppDataEntity} appDataEntity
     * @memberof ModelHelper
     */
    protected calcAppDataEntitySubAppModel(appDataEntity: IAppDataEntity): void;
    /**
     * 根据应用实体 codeName 获取应用实体模型
     *
     * @author chitanda
     * @date 2023-04-16 18:04:33
     * @param {string} name
     * @param {(string | IObject)} [appId]
     * @param {boolean} [isId]
     * @return {*}  {Promise<IAppDataEntity>}
     */
    getAppDataEntityModel(name: string, appId?: string | IObject, isId?: boolean): Promise<IAppDataEntity>;
    /**
     * 计算应用视图需要合并的子应用模型
     *
     * @author chitanda
     * @date 2023-12-06 16:12:25
     * @protected
     * @param {IAppView} view
     */
    protected calcAppViewSubAppModel(view: IAppView): void;
    /**
     * 根据应用视图 codeName 获取应用视图模型
     *
     * @author chitanda
     * @date 2023-04-16 17:04:38
     * @param {string} name
     * @param {(string | IObject)} [appId]
     * @return {*}  {Promise<IAppView>}
     */
    getAppViewModel(name: string, appId?: string | IObject): Promise<IAppView>;
    /**
     * 根据路径和参数加载应用视图模型，主要用于后台根据运行时参数重新计算视图模型
     *
     * @author chitanda
     * @date 2024-01-08 10:01:43
     * @param {string} viewId
     * @param {IParams} [params]
     * @param {string} [appId]
     * @return {*}  {Promise<IAppView>}
     */
    loadAppViewModel(viewId: string, params?: IParams, appId?: string): Promise<IAppView>;
    /**
     * 获取应用多语言模型
     *
     * @author chitanda
     * @date 2023-08-24 21:08:17
     * @param {string} language
     * @param {(string | IObject)} [appId]
     * @return {*}  {Promise<IAppLan>}
     */
    getPSAppLang(language: string, appId?: string | IObject): Promise<IAppLan>;
    /**
     * 获取应用智能报表体系集合
     *
     * @author tony001
     * @date 2024-06-04 15:06:46
     * @param {string} appId 应用标识
     * @param {string[]} ids 智能报表体系标识集合
     * @return {*}  {Promise<IAppBIScheme[]>}
     */
    getAppBISchemes(appId: string, ids?: string[]): Promise<IAppBIScheme[]>;
    /**
     * 获取应用智能报表立方体集合
     *
     * @author tony001
     * @date 2024-06-04 16:06:19
     * @param {string} appId 应用标识
     * @param {string[]} [ids=[]] 立方体数据标识集合
     * @return {*}  {Promise<IAppBICube[]>}
     */
    getAppAppBICubes(appId: string, ids?: string[]): Promise<IAppBICube[]>;
    /**
     * 获取应用智能报表集合
     *
     * @author tony001
     * @date 2024-06-04 16:06:39
     * @param {string} appId 应用标识
     * @param {string[]} [ids=[]] 报表数据标识集合
     * @return {*}  {Promise<IAppBIReport[]>}
     */
    getAppBIReports(appId: string, ids?: string[]): Promise<IAppBIReport[]>;
    /**
     * 原始模型转化为dsl对象
     *
     * @author tony001
     * @date 2024-06-27 17:06:54
     * @param {ModelObject} data
     * @param {('APP' | 'VIEW' | 'CTRL' | 'APPENTITY' | 'APPBIREPORT')} type
     * @return {*}  {(Promise<IData | undefined>)}
     */
    translationModelToDsl(data: ModelObject, type: 'APP' | 'VIEW' | 'CTRL' | 'APPENTITY' | 'APPBIREPORT'): Promise<IData | undefined>;
    /**
     * 获取对应模型工具类
     *
     * @author chitanda
     * @date 2023-04-16 18:04:08
     * @protected
     * @param {(IObject | string)} context
     * @return {*}  {ModelUtil}
     */
    protected getModelUtil(context?: IObject | string): ModelUtil;
    /**
     * 计算应用标识
     *
     * @author chitanda
     * @date 2023-04-16 17:04:19
     * @protected
     * @param {(IObject | string)} [data=this.defaultAppId]
     * @return {*}  {string}
     */
    protected calcAppId(data?: IObject | string): string;
    /**
     * 合并子应用代码表
     * @param codeList
     */
    mergeSubAppCodeList(codeList: IAppCodeList): void;
}
//# sourceMappingURL=model-helper.d.ts.map