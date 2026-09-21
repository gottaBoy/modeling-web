import { IAppDEMethodDTO, IAppDataEntity } from '@ibiz/model-core';
import { IHttpResponse, IPortalAsyncAction } from '@ibiz-template/core';
import { DECache } from '../../utils';
import { WorkFlowService } from '../work-flow/work-flow.service';
import { Method } from './method/method';
import { FileService } from '../file/file.service';
import { IAppDEService, IAppService, IDataEntity, IDeMethodProcesser } from '../../../interface';
import { ConfigService } from '../config/config.service';
import { MethodDto } from '../../dto/method.dto';
/**
 * 实体服务
 *
 * @author chitanda
 * @date 2022-08-17 22:08:21
 * @export
 * @class DEService
 */
export declare class DEService implements IAppDEService {
    protected srfSessionId: string;
    readonly model: IAppDataEntity;
    /**
     * 实体配置存储服务
     *
     * @author chitanda
     * @date 2023-09-22 10:09:55
     * @type {ConfigService}
     */
    readonly configCache: ConfigService;
    /**
     * 工作流相关服务
     *
     * @author lxm
     * @date 2022-09-29 11:09:28
     * @type {WorkFlowService}
     */
    readonly wf: WorkFlowService;
    /**
     * 文件相关服务
     *
     * @author lxm
     * @date 2022-11-25 13:11:11
     * @type {FileService}
     */
    readonly file: FileService;
    /**
     * @description 应用服务
     * @type {IAppService}
     * @memberof DEService
     */
    readonly app: IAppService;
    /**
     * 请求方法实例
     *
     * @author chitanda
     * @date 2022-10-10 12:10:13
     * @protected
     * @type {Map<string, Method>}
     */
    protected readonly methodMap: Map<string, Method>;
    /**
     * 数据缓存
     *
     * @author chitanda
     * @date 2022-08-18 19:08:40
     * @type {DECache}
     */
    readonly local: DECache;
    /**
     * @description 方法处理器
     * @type {IDeMethodProcesser}
     * @memberof DEService
     */
    readonly methodProcesser: IDeMethodProcesser;
    /**
     * 是否为本地模式(临时数据模式)服务
     *
     * @author chitanda
     * @date 2023-12-22 16:12:13
     * @type {boolean}
     */
    isLocalMode: boolean;
    /**
     * Creates an instance of DEService.
     *
     * @author chitanda
     * @date 2023-12-22 13:12:21
     * @param {string} srfSessionId 当前实体会话标识
     * @param {IAppDataEntity} model 实体模型
     */
    constructor(srfSessionId: string, model: IAppDataEntity);
    /**
     * @description 根据上下文计算当前请求路径
     * @protected
     * @param {IContext} context
     * @returns {*}  {string} 拼接结果说明: /祖父实体/祖父实体主键/爷爷实体/爷爷实体主键/父实体/父实体主键/当前实体
     * @memberof DEService
     */
    protected calcPath(context: IContext): string;
    /**
     * 获取实体服务方法实例
     *
     * @author chitanda
     * @date 2023-10-12 17:10:10
     * @protected
     * @param {string} id
     * @param {boolean} [acMode=false]
     * @return {*}  {Method}
     */
    protected getMethod(id: string, acMode?: boolean): Promise<Method>;
    /**
     * 执行服务方法
     *
     * @author chitanda
     * @date 2022-09-13 19:09:55
     * @param {string} id 执行服务方法标识
     * @param {IContext} context
     * @param {IData} [params={}] 请求参数
     * @param {IParams} [params2={}] 查询参数
     * @return {*}  {Promise<IHttpResponse>}
     */
    exec(id: string, context: IContext, params?: IData | IData[], params2?: IParams, header?: IData): Promise<IHttpResponse>;
    getDraft(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse<IData>>;
    create(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse<IData>>;
    get(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse<IData>>;
    update(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse<IData>>;
    remove(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse<IData>>;
    fetchDefault(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse<IData>>;
    getDraftTemp(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse<IData>>;
    createTemp(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse<IData>>;
    getTemp(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse<IData>>;
    updateTemp(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse<IData>>;
    removeTemp(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse<IData>>;
    fetchTempDefault(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse<IData>>;
    /**
     * @description 创建下载凭证
     * @param {IContext} context
     * @param {{ srfossfileid: string }} params
     * @returns {*}  {Promise<IHttpResponse<IData>>}
     * @memberof DEService
     */
    createDownloadTicket(context: IContext, params: {
        srfossfileid: string;
    }): Promise<IHttpResponse<IData>>;
    /**
     * 执行服务方法 ac 模式
     *
     * @author chitanda
     * @date 2022-09-13 19:09:55
     * @param {string} id 执行服务方法标识
     * @param {IContext} context
     * @param {IData} [params={}] 请求参数
     * @param {IParams} [params2={}] 查询参数
     * @return {*}  {Promise<IHttpResponse>}
     */
    execAc(id: string, context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse>;
    /**
     * 实体级别 AI 聊天会话
     *
     * @author chitanda
     * @date 2023-10-16 16:10:16
     * @param {(data: IPortalAsyncAction) => void} onmessage
     * @param {IContext} context
     * @param {IParams} [params={}]
     * @param {IData} [data={}]
     * @return {*}  {Promise<void>}
     */
    aiChatSse(onmessage: (data: IPortalAsyncAction) => void, controller: AbortController, context: IContext, params?: IParams, data?: IData): Promise<void>;
    /**
     * 获取 AI 聊天会话推荐提示
     *
     * @author tony001
     * @date 2025-03-19 10:03:55
     * @param {IContext} context
     * @param {IParams} [params={}]
     * @param {IData} [data={}]
     * @return {*}  {Promise<IHttpResponse>}
     */
    aiChatRecommendPrompt(context: IContext, params?: IParams, data?: IData): Promise<IHttpResponse>;
    /**
     * 获取 AI 聊天会话摘要
     * @param context
     * @param params
     * @param data
     * @returns {*}  {Promise<IHttpResponse>}
     */
    aiChatChatDigest(context: IContext, params?: IParams, data?: IData): Promise<IHttpResponse>;
    /**
     * 获取 AI 聊天会话历史记录
     *
     * @author chitanda
     * @date 2023-10-26 14:10:58
     * @param {IContext} context
     * @param {IParams} [params={}]
     * @param {IData} [data={}]
     * @return {*}  {Promise<IHttpResponse>}
     */
    aiChatHistory(context: IContext, params?: IParams, data?: IData): Promise<IHttpResponse>;
    /**
     * 取消 AI 聊天会话
     * @param context
     * @param params
     * @param data
     * @return {*}  {Promise<IHttpResponse>}
     */
    aiChatCancel(context: IContext, params?: IParams, data?: IData): Promise<IHttpResponse>;
    /**
     * 计算 AI 请求路径
     *
     * @author chitanda
     * @date 2023-10-26 14:10:25
     * @protected
     * @param {IContext} context
     * @param {boolean} [isHistories=false]
     * @return {*}  {string}
     */
    protected calcSsePath(context: IContext, isHistories?: boolean): string;
    protected newEntity(data: IData | IDataEntity): IDataEntity;
    /**
     * 创建数据对象实例
     *
     * @author chitanda
     * @date 2023-12-23 19:12:57
     * @param {(IData[] | IDataEntity[] | IData | IDataEntity)} data
     * @return {*}  {(IDataEntity | IDataEntity[])}
     */
    createEntity(data: IData[] | IDataEntity[] | IData | IDataEntity): IDataEntity | IDataEntity[];
    /**
     * 服务实例销毁
     *
     * @author chitanda
     * @date 2023-12-22 14:12:11
     * @return {*}  {Promise<void>}
     */
    destroy(): Promise<void>;
    createMethodDto(dto?: IAppDEMethodDTO, opts?: {
        isLocalMode?: boolean;
    }): MethodDto;
}
//# sourceMappingURL=de.service.d.ts.map