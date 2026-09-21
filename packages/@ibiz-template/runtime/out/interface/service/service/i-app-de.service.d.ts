import { IHttpResponse, IPortalAsyncAction } from '@ibiz-template/core';
import { IAppDEMethodDTO, IAppDataEntity } from '@ibiz/model-core';
import { DECache } from '../../../service/utils';
import { IFileService } from './i-file.service';
import { IWorkFlowService } from './i-wf.service';
import { IConfigService } from './i-config.service';
import { IDataEntity } from '../i-data-entity/i-data-entity';
import { MethodDto } from '../../../service';
/**
 * 实体服务
 *
 * @author chitanda
 * @date 2023-04-23 09:04:10
 * @export
 * @interface IAppDEService
 */
export interface IAppDEService {
    /**
     * 是否本地模式(临时数据模式)
     *
     * @description 由 method.dto.ts 在 DTO 填充，根据是否为子嵌套数据进行设置
     * @author chitanda
     * @date 2023-12-22 16:12:57
     * @type {boolean}
     */
    isLocalMode: boolean;
    /**
     * 实体本地缓存工具
     *
     * @author chitanda
     * @date 2023-04-23 10:04:23
     * @type {DECache}
     */
    readonly local: DECache;
    /**
     * 实体配置存储服务
     *
     * @author chitanda
     * @date 2023-09-22 10:09:55
     * @type {IConfigService}
     */
    readonly configCache: IConfigService;
    /**
     * 工作流相关服务
     *
     * @author lxm
     * @date 2022-09-29 11:09:28
     * @type {WorkFlowService}
     */
    readonly wf: IWorkFlowService;
    /**
     * 文件相关服务
     *
     * @author lxm
     * @date 2022-11-25 13:11:11
     * @type {IFileService}
     */
    readonly file: IFileService;
    /**
     * 当前实体服务对应的实体模型
     *
     * @author chitanda
     * @date 2024-01-17 17:01:16
     * @type {IAppDataEntity}
     */
    readonly model: IAppDataEntity;
    /**
     * 执行实体服务方法
     *
     * @author chitanda
     * @date 2023-04-23 09:04:16
     * @param {string} id 执行标识
     * @param {IContext} context 上下文
     * @param {IData} [params] 参数
     * @param {IParams} [params2] 参数2
     * @return {*}  {Promise<IHttpResponse>}
     */
    exec(id: string, context: IContext, params?: IData | IData[], params2?: IParams, header?: IData): Promise<IHttpResponse>;
    /**
     * 获取草稿数据[系统预置]
     *
     * @author chitanda
     * @date 2023-11-21 16:11:34
     * @param {IContext} context
     * @param {(IData | IData[])} [params]
     * @param {IParams} [params2]
     * @return {*}  {Promise<IHttpResponse>}
     */
    getDraft(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse>;
    /**
     * 获取草稿数据[系统预置](临时数据)
     *
     * @author chitanda
     * @date 2023-11-21 16:11:34
     * @param {IContext} context
     * @param {(IData | IData[])} [params]
     * @param {IParams} [params2]
     * @return {*}  {Promise<IHttpResponse>}
     */
    getDraftTemp(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse>;
    /**
     * 创建数据[系统预置]
     *
     * @author chitanda
     * @date 2023-11-21 16:11:50
     * @param {IContext} context
     * @param {(IData | IData[])} [params]
     * @param {IParams} [params2]
     * @return {*}  {Promise<IHttpResponse>}
     */
    create(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse>;
    /**
     * 创建数据[系统预置](临时数据)
     *
     * @author chitanda
     * @date 2023-11-21 16:11:50
     * @param {IContext} context
     * @param {(IData | IData[])} [params]
     * @param {IParams} [params2]
     * @return {*}  {Promise<IHttpResponse>}
     */
    createTemp(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse>;
    /**
     * 获取数据[系统预置]
     *
     * @author chitanda
     * @date 2023-11-21 16:11:00
     * @param {IContext} context
     * @param {(IData | IData[])} [params]
     * @param {IParams} [params2]
     * @return {*}  {Promise<IHttpResponse>}
     */
    get(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse>;
    /**
     * 获取数据[系统预置](临时数据)
     *
     * @author chitanda
     * @date 2023-11-21 16:11:00
     * @param {IContext} context
     * @param {(IData | IData[])} [params]
     * @param {IParams} [params2]
     * @return {*}  {Promise<IHttpResponse>}
     */
    getTemp(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse>;
    /**
     * 更新数据[系统预置]
     *
     * @author chitanda
     * @date 2023-11-21 16:11:09
     * @param {IContext} context
     * @param {(IData | IData[])} [params]
     * @param {IParams} [params2]
     * @return {*}  {Promise<IHttpResponse>}
     */
    update(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse>;
    /**
     * 更新数据[系统预置](临时数据)
     *
     * @author chitanda
     * @date 2023-11-21 16:11:09
     * @param {IContext} context
     * @param {(IData | IData[])} [params]
     * @param {IParams} [params2]
     * @return {*}  {Promise<IHttpResponse>}
     */
    updateTemp(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse>;
    /**
     * 删除数据[系统预置]
     *
     * @author chitanda
     * @date 2023-11-21 16:11:12
     * @param {IContext} context
     * @param {(IData | IData[])} [params]
     * @param {IParams} [params2]
     * @return {*}  {Promise<IHttpResponse>}
     */
    remove(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse>;
    /**
     * 删除数据[系统预置](临时数据)
     *
     * @author chitanda
     * @date 2023-11-21 16:11:12
     * @param {IContext} context
     * @param {(IData | IData[])} [params]
     * @param {IParams} [params2]
     * @return {*}  {Promise<IHttpResponse>}
     */
    removeTemp(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse>;
    /**
     * 获取默认数据集[系统预置]
     *
     * @author chitanda
     * @date 2023-11-21 16:11:06
     * @param {IContext} context
     * @param {(IData | IData[])} [params]
     * @param {IParams} [params2]
     * @return {*}  {Promise<IHttpResponse>}
     */
    fetchDefault(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse>;
    /**
     * 获取默认数据集[系统预置](临时数据)
     *
     * @author chitanda
     * @date 2023-11-21 16:11:06
     * @param {IContext} context
     * @param {(IData | IData[])} [params]
     * @param {IParams} [params2]
     * @return {*}  {Promise<IHttpResponse>}
     */
    fetchTempDefault(context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse>;
    /**
     * 触发实体服务方法 ac 模式
     *
     * @author chitanda
     * @date 2023-10-12 17:10:27
     * @param {string} id
     * @param {IContext} context
     * @param {(IData | IData[])} [params]
     * @param {IParams} [params2]
     * @return {*}  {Promise<IHttpResponse>}
     */
    execAc(id: string, context: IContext, params?: IData | IData[], params2?: IParams): Promise<IHttpResponse>;
    /**
     * 实体级别 AI 聊天单次会话
     *
     * @author chitanda
     * @date 2023-10-12 16:10:03
     * @param {(data: IPortalAsyncAction) => void} onmessage
     * @param {IContext} context
     * @param {IParams} [params]
     * @param {IData} [data]
     * @return {*}  {Promise<void>}
     */
    aiChatSse(onmessage: (data: IPortalAsyncAction) => void, context: IContext, params?: IParams, data?: IData): Promise<void>;
    /**
     * 获取 AI 聊天会话历史记录
     *
     * @author chitanda
     * @date 2023-10-26 14:10:40
     * @param {IContext} context
     * @param {IParams} [params]
     * @param {IData} [data]
     * @return {*}  {Promise<IHttpResponse>}
     */
    aiChatHistory(context: IContext, params?: IParams, data?: IData): Promise<IHttpResponse>;
    /**
     * 创建当前数据对象实例
     *
     * @author chitanda
     * @date 2023-12-23 19:12:01
     * @param {(IData[] | IDataEntity[] | IData | IDataEntity)} data
     * @return {*}  {(IDataEntity | IDataEntity[])}
     */
    createEntity(data: IData[] | IDataEntity[] | IData | IDataEntity): IDataEntity | IDataEntity[];
    /**
     * 当前实体服务销毁时调用
     *
     * @author chitanda
     * @date 2023-12-22 13:12:42
     * @return {*}  {void}
     */
    destroy(): void;
    /**
     * 创建DTO实例
     * @author lxm
     * @date 2024-01-10 09:48:34
     * @param {IAppDEMethodDTO} [dto] dto模型对象
     * @param {{
     *       isLocalMode?: boolean; 是否是临时模式
     *     }} [opts]
     * @return {*}  {MethodDto}
     */
    createMethodDto(dto?: IAppDEMethodDTO, opts?: {
        isLocalMode?: boolean;
    }): MethodDto;
}
//# sourceMappingURL=i-app-de.service.d.ts.map