import { Net } from '@ibiz-template/core';
import { IAppDEUIAction, IAppFunc, IAppUtil, IApplication, IDEOPPriv, IDEUILogic, ISubAppRef, IAppDEFInputTipSet } from '@ibiz/model-core';
import { AuthorityService, CodeListService, ConfigService, DEServiceUtil } from './service';
import { IAppService } from './interface';
/**
 * 应用对象
 *
 * @author chitanda
 * @date 2023-04-23 15:04:59
 * @export
 * @class Application
 * @implements {IAppService}
 */
export declare class Application implements IAppService {
    readonly model: IApplication;
    readonly subAppRef: ISubAppRef | undefined;
    /**
     * 当前应用标识(带系统标识)
     *
     * @author chitanda
     * @date 2023-04-19 22:04:55
     * @readonly
     * @type {string}
     */
    get appId(): string;
    /**
     * 当前应用标识(仅标识)
     *
     * @author tony001
     * @date 2024-09-11 14:09:43
     * @readonly
     * @type {string}
     */
    get id(): string;
    /**
     * 应用实体名称到应用实体代码名称的映射
     *
     * @author chitanda
     * @date 2023-06-14 17:06:02
     * @type {Map<string, string>}
     */
    readonly deName2DeCodeName: Map<string, string>;
    /**
     * 应用智能报表体系映射，key为应用智能报表体系标识，value为原始模型
     *
     * @author tony001
     * @date 2024-06-04 15:06:35
     * @type {Map<string, IModel>}
     */
    readonly appBISchemeMap: Map<string, IModel>;
    /**
     * 应用智能报表立方体映射，key为应用智能报表立方体标识，value为原始模型
     *
     * @author tony001
     * @date 2024-06-04 15:06:56
     * @type {Map<string, IModel>}
     */
    readonly appBICubeMap: Map<string, IModel>;
    /**
     * 应用智能报表映射，key为应用智能报表立方体标识，value为原始模型
     *
     * @author tony001
     * @date 2024-06-04 15:06:57
     * @type {Map<string, IModel>}
     */
    readonly appBIReportMap: Map<string, IModel>;
    /**
     * 应用请求服务
     *
     * @author chitanda
     * @date 2022-12-22 15:12:33
     * @type {Net}
     */
    readonly net: Net;
    /**
     * 应用级配置存储服务
     *
     * @author chitanda
     * @date 2023-09-22 10:09:58
     * @type {ConfigService}
     */
    readonly configCache: ConfigService;
    /**
     * 应用实体服务工具对象
     *
     * @author chitanda
     * @date 2022-12-23 10:12:46
     */
    readonly deService: DEServiceUtil;
    /**
     * 代码表服务
     *
     * @author chitanda
     * @date 2022-12-23 11:12:40
     * @type {CodeListService}
     */
    readonly codeList: CodeListService;
    /**
     * 权限服务
     *
     * @author chitanda
     * @date 2022-12-23 11:12:11
     * @type {AuthorityService}
     */
    readonly authority: AuthorityService;
    /**
     * Creates an instance of Application.
     *
     * @author chitanda
     * @date 2022-12-22 15:12:26
     * @param {IApplication} model
     */
    constructor(model: IApplication, subAppRef: ISubAppRef | undefined);
    /**
     * 初始化应用
     *
     * @author chitanda
     * @date 2023-04-19 11:04:02
     * @return {*}  {Promise<void>}
     */
    init(): Promise<void>;
    /**
     * 加载应用多语言
     *
     */
    protected loadAppLang(): Promise<void>;
    /**
     * 加载应用模型全局样式
     *
     * @author chitanda
     * @date 2023-07-24 20:07:41
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected loadAppModelStyle(): Promise<void>;
    /**
     * 加载应用插件(用于替换默认的组件和功能)
     *
     * @author tony001
     * @date 2025-01-24 14:01:34
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected loadGlobalAppUtil(): Promise<void>;
    /**
     * @description 加载替换默认插件（仅主应用执行）
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof Application
     */
    protected loadReplaceDefaultPlugin(): Promise<void>;
    /**
     * 根据 id 查找应用功能
     *
     * @author chitanda
     * @date 2023-04-20 17:04:24
     * @param {string} id
     * @return {*}  {(IAppFunc | null)}
     */
    getAppFunc(id: string): IAppFunc | null;
    /**
     * 根据id获取应用功能组件
     *
     * @author tony001
     * @date 2024-04-23 11:04:27
     * @param {string} id
     * @return {*}  {(IAppUtil | undefined)}
     */
    getAppUtil(id: string, type?: 'CUSTOM' | 'DEFAULT'): IAppUtil | undefined;
    /**
     * 根据id获取应用实体属性输入提示集合
     *
     * @param {string} id
     * @return {*}  {(IAppDEFInputTipSet | undefined)}
     * @memberof Application
     */
    getInputTipsSet(id: string): IAppDEFInputTipSet | undefined;
    /**
     * 获取界面行为模型
     * @author lxm
     * @date 2023-04-28 05:44:14
     * @param {string} actionId
     * @param {string} [_appDataEntityId]
     * @return {*}
     */
    getUIAction(actionId: string): Promise<IAppDEUIAction | undefined>;
    /**
     * 获取操作标识模型
     * @author lxm
     * @date 2023-05-10 11:24:17
     * @param {string} id
     * @param {string} [appDataEntityId]
     * @return {*}  {(Promise<IDEOPPriv | undefined>)}
     */
    getOPPriv(id: string, appDataEntityId?: string): Promise<IDEOPPriv | undefined>;
    /**
     * 查找实体的界面逻辑模型
     * @author lxm
     * @date 2023-06-14 07:20:30
     * @param {string} deUILogicId
     * @param {string} appDataEntityId
     * @return {*}  {(Promise<IDEUILogic | undefined>)}
     */
    getDEUILogic(deUILogicId: string, appDataEntityId: string): Promise<IDEUILogic | undefined>;
    /**
     * 销毁应用
     *
     * @author tony001
     * @date 2024-04-10 15:04:51
     */
    destroy(): void;
}
//# sourceMappingURL=application.d.ts.map