import { IAppDataEntity, IApplication } from '@ibiz/model-core';
import { IHttpResponse } from '@ibiz-template/core';
import { IApiDEServiceUtil, IAppDEService, IMethodProcessState } from '../interface';
/**
 * 实体服务构造方法
 */
export type DEServiceConstructor = (srfSessionId: string, entityModel: IAppDataEntity) => Promise<IAppDEService>;
/**
 * 应用服务工具类
 *
 * @author chitanda
 * @date 2022-08-17 23:08:12
 * @export
 * @class DEServiceUtil
 */
export declare class DEServiceUtil implements IApiDEServiceUtil {
    protected appModel: IApplication;
    /**
     * 实体服务缓存
     *
     * @author chitanda
     * @date 2022-08-17 23:08:36
     * @protected
     * @type {Map<string, Map<string, IAppDEService>>} Map<域标识, Map<实体标识, 实体服务>>
     */
    protected cache: Map<string, Map<string, IAppDEService>>;
    /**
     * 创建中缓存
     *
     * @author tony001
     * @date 2024-07-24 22:07:21
     * @protected
     * @type {Map<string, Promise<IAppDEService>>}
     */
    protected creatingCache: Map<string, Promise<IAppDEService>>;
    /**
     * 实体服务构造方法缓存
     *
     * @author lxm
     * @date 2023-05-15 08:37:13
     * @protected
     */
    protected static constructorCache: Map<string, DEServiceConstructor>;
    /**
     * @description 执行中方法数量缓存
     * @protected
     * @type {Map<string, Method>} Map<域标识，{执行中数量,是否销毁}>
     * @memberof DEServiceUtil
     */
    protected processingCache: Map<string, {
        count: number;
        isDestoryed: boolean;
    }>;
    /**
     * Creates an instance of DEServiceUtil.
     *
     * @author chitanda
     * @date 2023-04-18 14:04:01
     * @param {IApplication} appModel
     */
    constructor(appModel: IApplication);
    /**
     * 注册服务工厂方法
     *
     * @author chitanda
     * @date 2023-06-14 10:06:31
     * @param {string} id 实体标识
     * @param {DEServiceConstructor} constructor
     */
    static register(id: string, constructor: DEServiceConstructor): void;
    /**
     * @description 处理方法处理状态变更
     * @param {IMethodProcessState} data
     * @memberof DEServiceUtil
     */
    handleMethodProcessStateChange(data: IMethodProcessState): void;
    /**
     * 根据实体标识获取实体服务
     *
     * @author chitanda
     * @date 2023-12-22 10:12:47
     * @param {IContext} context 上下文,用于计算模型所属沙箱环境
     * @param {string} id 实体标识
     * @return {*}  {Promise<IAppDEService>}
     */
    getService(context: IContext, id: string): Promise<IAppDEService>;
    /**
     * 创建实体服务实例
     *
     * @author tony001
     * @date 2024-07-24 22:07:28
     * @param {string} sandboxId
     * @param {string} id
     * @return {*}  {Promise<IAppDEService>}
     */
    createServiceInstance(sandboxId: string, id: string, appid?: string): Promise<IAppDEService>;
    /**
     * 重置服务, 删除指定域下的所有服务缓存
     *
     * @author chitanda
     * @date 2023-12-22 13:12:47
     * @param {IContext} context
     * @return {*}  {void}
     */
    reset(context: IContext): void;
    /**
     * @description 清除当前界面域下所有缓存，包含当前服务缓存、当前执行状态缓存、服务数据缓存
     * @param {string} sandboxId 界面域标识
     * @returns {*}  {void}
     * @memberof DEServiceUtil
     */
    cleaUIDomainCache(sandboxId: string): void;
    /**
     * 清理所有服务, 当前临时域下的所有临时数据缓存
     *
     * @description 根据 srfsessionid 作为临时数据域
     * @author chitanda
     * @date 2022-08-18 14:08:48
     * @param {IContext} context
     */
    clearTempCache(context: IContext): void;
    /**
     * 清理指定实体的临时数据缓存，并根据关系清理掉子实体的临时数据缓存
     *
     * @author chitanda
     * @date 2024-01-19 14:01:32
     * @param {IContext} context
     * @param {string} entityID
     * @param {string[]} [clearEntities=[]] 已经清理过的实体忽略，避免关系循环引用导致死循环
     * @return {*}  {void}
     */
    clearTempCacheByRs(context: IContext, entityID: string, clearEntities?: string[]): void;
    /**
     * 执行服务方法
     * @author lxm
     * @date 2023-04-26 02:02:43
     * @param {string} appDataEntityId 实体名称
     * @param {string} methodName 方法名
     * @param {IContext} context 上下文
     * @param {(IData | undefined)} [params] 数据
     * @param {(IParams | undefined)} [params2] 视图参数
     * @return {*}  {Promise<IHttpResponse<IData>>}
     */
    exec(appDataEntityId: string, methodName: string, context: IContext, params?: IData | IData[] | undefined, params2?: IParams | undefined, header?: IData): Promise<IHttpResponse<IData>>;
    /**
     * 计算应用实体服务映射参数
     * srfappdemapping：是否开启应用实体服务映射
     * srfappmappingmap：应用映射表,与srfappdemapping搭配使用，原应用本身标识：目标应用本身标识，以冒号分割，多个应用以逗号隔开
     * 如:logicdesign:plmweb
     *
     * @author tony001
     * @date 2024-07-19 15:07:31
     * @param {IContext} context
     * @param {string} appDataEntityId
     * @return {*}  {Promise<IData>}
     */
    computeAppDEMappingParam(context: IContext, appDataEntityId: string): Promise<IData>;
    /**
     * @description 记录当前域变更
     * @param {('ADD' | 'RESET' | 'UNDO' | 'REDO')} actionType 添加数据 | 重置数据
     * @returns {*}  {void}
     * @memberof DEServiceUtil
     */
    recordUIDomainChanges(srfsessionid: string, actionType: 'ADD' | 'RESET'): void;
    /**
     * @description 取消当前域变更，'UNDO' | 'REDO'暂未支持
     * @param {string} srfsessionid 域标识
     * @param {('INIT' | 'UNDO' | 'REDO')} targetState 目标状态，初始化状态|撤销上一步操作|重做下一步操作
     * @returns {*}  {void}
     * @memberof DEServiceUtil
     */
    cancelUIDomainDChanges(srfsessionid: string, targetState: 'INIT' | 'UNDO' | 'REDO'): void;
}
//# sourceMappingURL=de-service-util.d.ts.map