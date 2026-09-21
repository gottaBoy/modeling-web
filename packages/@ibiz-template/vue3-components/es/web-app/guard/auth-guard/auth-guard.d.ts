import { IApplication } from '@ibiz/model-core';
import { ModelLoaderProvider } from '@ibiz-template/runtime';
export declare class AuthGuard {
    /**
     * 是否是全代码模式
     * @author lxm
     * @date 2024-02-21 11:16:08
     * @type {boolean}
     */
    isFullCode: boolean;
    /**
     * 自定义模型加载
     * @author lxm
     * @date 2024-02-21 11:16:17
     * @type {ModelLoaderProvider}
     */
    customModelLoader?: ModelLoaderProvider;
    constructor(opts?: {
        isFullCode: boolean;
        customModelLoader: ModelLoaderProvider;
    });
    /**
     * 总的入口校验
     *
     * @author tony001
     * @date 2024-11-12 14:11:32
     * @param {IParams} context
     * @param {boolean} [notLogin=true]
     * @return {*}  {Promise<boolean>}
     */
    verify(context: IParams, notLogin?: boolean): Promise<boolean>;
    /**
     * 匿名登录相关校验逻辑，不通过会抛异常
     *
     * @author tony001
     * @date 2024-11-12 14:11:27
     * @param {IParams} context
     * @return {*}  {Promise<void>}
     */
    anonymousValidate(context: IParams): Promise<void>;
    /**
     * 应用参数初始化
     *
     * @author tony001
     * @date 2024-11-12 14:11:06
     * @param {IParams} context
     * @return {*}  {Promise<void>}
     */
    appInit(context: IParams): Promise<void>;
    /**
     * 初始化模型
     *
     * @author tony001
     * @date 2024-11-12 14:11:43
     * @param {IParams} context
     * @param {boolean} [_permission=true]
     * @return {*}  {Promise<void>}
     */
    initModel(context: IParams, _permission?: boolean): Promise<void>;
    /**
     * 加载应用数据
     *
     * @author tony001
     * @date 2024-12-19 20:12:01
     * @param {IParams} [context]
     * @return {*}  {Promise<void>}
     */
    loadAppData(context?: IParams): Promise<void>;
    /**
     * 加载组织数据
     *
     * @author chitanda
     * @date 2022-07-20 20:07:44
     * @return {*}  {Promise<void>}
     */
    loadOrgData(): Promise<void>;
    initTheme(appModel: IApplication): Promise<void>;
    /**
     * 加载主题插件
     *
     * @author chitanda
     * @date 2023-12-03 01:12:38
     * @protected
     * @return {*}  {Promise<void>}
     */
    loadTheme(): Promise<void>;
    /**
     * 根据应用自定义参数解析成环境变量
     *
     * @author chitanda
     * @date 2023-11-24 19:11:50
     * @return {*}  {Promise<void>}
     */
    initEnvironment(app: IApplication): Promise<void>;
    throw401(): void;
}
