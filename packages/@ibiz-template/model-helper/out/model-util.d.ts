import { ServicePathUtil } from './utils';
/**
 * 全动模型处理工具类,每个App一个实例
 *
 * @author chitanda
 * @date 2023-04-16 17:04:06
 * @export
 * @class ModelUtil
 */
export declare class ModelUtil {
    protected appId: string;
    protected modelTag: string;
    protected get: (url: string, params?: IParams) => Promise<IModel>;
    protected hub: boolean;
    protected appContext: IParams;
    protected permission: boolean;
    /**
     * 模型缓存
     *
     * @author chitanda
     * @date 2023-04-16 17:04:40
     * @protected
     * @type {Map<string, IModel>}
     */
    protected modelCache: Map<string, IModel>;
    /**
     * 应用模型
     *
     * @author chitanda
     * @date 2023-04-16 17:04:17
     * @protected
     * @type {IModel}
     */
    protected appModel: IModel;
    /**
     * 服务路径计算工具类
     *
     * @author chitanda
     * @date 2023-04-22 12:04:15
     * @type {ServicePathUtil}
     */
    servicePathUtil: ServicePathUtil;
    /**
     * Creates an instance of GlobalModel.
     *
     * @author chitanda
     * @date 2023-04-13 21:04:21
     * @param {string}appId 应用标识
     * @param {string} modelTag
     * @param {(url: string, params?: IParams) => Promise<IModel>} get 模型加载方法
     * @param {boolean} hub 是否为 hub 应用基座
     * @param {IParams} appContext 应用级上下文参数
     */
    constructor(appId: string, modelTag: string, get: (url: string, params?: IParams) => Promise<IModel>, hub: boolean, appContext: IParams, permission?: boolean);
    /**
     * 在使用前需要初始化，来进行异步加载
     *
     * @author chitanda
     * @date 2023-04-16 17:04:35
     * @return {*}  {Promise<void>}
     */
    init(): Promise<void>;
    /**
     * 特殊处理应用模型
     *
     * @author chitanda
     * @date 2023-09-21 15:09:07
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected specialHandling(): Promise<void>;
    /**
     * 获取应用模型
     *
     * @author chitanda
     * @date 2023-04-16 17:04:21
     * @return {*}  {Promise<IModel>}
     */
    getAppModel(): Promise<IModel>;
    /**
     * 加载应用模型全局样式
     *
     * @author chitanda
     * @date 2023-09-06 10:09:11
     * @return {*}  {(Promise<string | null>)}
     */
    getAppStyle(): Promise<string | null>;
    /**
     * 根据应用实体 codeName 或者 id 获取应用实体模型
     *
     * @author chitanda
     * @date 2023-04-16 18:04:45
     * @param {string} tag
     * @param {boolean} [isId=true]
     * @param {boolean} [ignoreCase=false]
     * @return {*}  {Promise<IModel>}
     */
    getAppDataEntityModel(tag: string, isId?: boolean, ignoreCase?: boolean): Promise<IModel>;
    /**
     * 根据应用视图 id 获取应用视图模型,如果给了 params 则每次都会重新加载模型
     *
     * @author chitanda
     * @date 2024-01-15 12:01:36
     * @param {string} tag
     * @param {IParams} [params]
     * @param {boolean} [isDynamic]
     * @return {*}  {Promise<IModel>}
     */
    getAppViewModel(tag: string, params?: IParams, isDynamic?: boolean): Promise<IModel>;
    /**
     * 加载应用多语言模型
     *
     * @author chitanda
     * @date 2023-08-24 22:08:23
     * @param {string} language
     * @return {*}  {Promise<IModel>}
     */
    getPSAppLang(language: string): Promise<IModel>;
    /**
     * 加载应用样式字符串
     *
     * @author chitanda
     * @date 2023-09-07 11:09:11
     * @param {string} modelPath
     * @return {*}  {Promise<string>}
     */
    getStyleModel(modelPath: string): Promise<string>;
    /**
     * 获取应用智能报表体系集合
     *
     * @author tony001
     * @date 2024-06-04 16:06:19
     * @param {IModel[]} model
     * @return {*}  {Promise<IModel[]>}
     */
    getAppBISchemeModel(model?: IModel[]): Promise<IModel[]>;
    /**
     * 获取应用智能报表立方体数据集合
     *
     * @author tony001
     * @date 2024-06-04 16:06:19
     * @param {IModel[]} [model=[]]
     * @return {*}  {Promise<IModel[]>}
     */
    getAppAppBICubes(model?: IModel[]): Promise<IModel[]>;
    /**
     * 获取应用智能报表数据集合
     *
     * @author tony001
     * @date 2024-06-04 16:06:29
     * @param {IModel[]} [model=[]]
     * @return {*}  {Promise<IModel[]>}
     */
    getAppBIReports(model?: IModel[]): Promise<IModel[]>;
    /**
     * 加载模型，如果给了 params 则不会缓存模型
     *
     * @author chitanda
     * @date 2024-01-15 12:01:57
     * @param {string} modelPath
     * @param {IParams} [params]
     * @param {boolean} [isDynamic]
     * @return {*}  {Promise<IModel>}
     */
    getModel(modelPath: string, params?: IParams, isDynamic?: boolean): Promise<IModel>;
    /**
     * 递归填充应用标识
     *
     * @author chitanda
     * @date 2023-08-21 10:08:41
     * @protected
     * @param {IModel} model
     */
    protected deepFillAppId(model: IModel): void;
    /**
     * 计算应用模型请求路径
     *
     * @author chitanda
     * @date 2024-01-15 12:01:45
     * @protected
     * @param {string} modelPath
     * @param {boolean} [isDynamic=false]
     * @return {*}  {string}
     */
    protected calcAppPath(modelPath: string, isDynamic?: boolean): string;
    /**
     * 计算子应用模型请求路径
     *
     * @author chitanda
     * @date 2024-01-15 12:01:39
     * @protected
     * @param {string} modelPath
     * @param {boolean} [isDynamic=false]
     * @return {*}  {string}
     */
    protected calcSubAppPath(modelPath: string, isDynamic?: boolean): string;
}
//# sourceMappingURL=model-util.d.ts.map