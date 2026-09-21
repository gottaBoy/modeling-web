import { ModelError, RuntimeError, RuntimeModelError, } from '@ibiz-template/core';
import { DECache, calcResPath } from '../../utils';
import { WorkFlowService } from '../work-flow/work-flow.service';
import { FileService } from '../file/file.service';
import { findAppDEMethod } from '../../../model';
import { ConfigService } from '../config/config.service';
import { getDEMethodProvider } from '../../../register';
import { AppDataEntity } from '../../app-data-entity/app-data-entity';
import { MethodDto } from '../../dto/method.dto';
/**
 * 实体服务
 *
 * @author chitanda
 * @date 2022-08-17 22:08:21
 * @export
 * @class DEService
 */
export class DEService {
    /**
     * Creates an instance of DEService.
     *
     * @author chitanda
     * @date 2023-12-22 13:12:21
     * @param {string} srfSessionId 当前实体会话标识
     * @param {IAppDataEntity} model 实体模型
     */
    constructor(srfSessionId, model) {
        this.srfSessionId = srfSessionId;
        this.model = model;
        /**
         * 请求方法实例
         *
         * @author chitanda
         * @date 2022-10-10 12:10:13
         * @protected
         * @type {Map<string, Method>}
         */
        this.methodMap = new Map();
        /**
         * 是否为本地模式(临时数据模式)服务
         *
         * @author chitanda
         * @date 2023-12-22 16:12:13
         * @type {boolean}
         */
        this.isLocalMode = false;
        this.local = new DECache(model);
        this.configCache = new ConfigService(model.appId, 'PSAppDataEntity', model.codeName);
        this.wf = new WorkFlowService(model);
        this.file = new FileService(model);
    }
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
    async getMethod(id, acMode = false) {
        const cacheId = acMode ? `ac-${id}` : id;
        if (this.methodMap.has(cacheId)) {
            return this.methodMap.get(cacheId);
        }
        const model = findAppDEMethod(this.model, id);
        if (!model) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.service.noFoundServiceMethod', { id }));
        }
        // 获取适配器
        const provider = await getDEMethodProvider(model);
        if (!provider) {
            throw new ModelError(model, ibiz.i18n.t('runtime.service.UnsupportedServiceMethod', {
                methodType: model.methodType,
            }));
        }
        const method = provider.create(this, this.model, model, {
            acMode,
            localMode: this.isLocalMode,
        });
        this.methodMap.set(cacheId, method);
        return method;
    }
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
    async exec(id, context, params, params2, header) {
        const method = await this.getMethod(id);
        if (method) {
            return method.exec(context, params, params2, header);
        }
        throw new RuntimeError(ibiz.i18n.t('runtime.service.noSupportedMethod', {
            codeName: this.model.codeName,
            id,
        }));
    }
    getDraft(context, params, params2) {
        return this.exec('GetDraft', context, params, params2);
    }
    create(context, params, params2) {
        return this.exec('Create', context, params, params2);
    }
    get(context, params, params2) {
        return this.exec('Get', context, params, params2);
    }
    update(context, params, params2) {
        return this.exec('Update', context, params, params2);
    }
    remove(context, params, params2) {
        return this.exec('Remove', context, params, params2);
    }
    fetchDefault(context, params, params2) {
        return this.exec('FetchDefault', context, params, params2);
    }
    getDraftTemp(context, params, params2) {
        return this.exec('GetDraftTemp', context, params, params2);
    }
    createTemp(context, params, params2) {
        return this.exec('CreateTemp', context, params, params2);
    }
    getTemp(context, params, params2) {
        return this.exec('GetTemp', context, params, params2);
    }
    updateTemp(context, params, params2) {
        return this.exec('UpdateTemp', context, params, params2);
    }
    removeTemp(context, params, params2) {
        return this.exec('RemoveTemp', context, params, params2);
    }
    fetchTempDefault(context, params, params2) {
        return this.exec('FetchTempDefault', context, params, params2);
    }
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
    async execAc(id, context, params, params2 = {}) {
        const method = await this.getMethod(id, true);
        if (method) {
            return method.exec(context, params, params2);
        }
        throw new RuntimeError(ibiz.i18n.t('runtime.service.noSupportedMethod', {
            codeName: this.model.codeName,
            id,
        }));
    }
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
    aiChatSse(onmessage, context, params = {}, data = {}) {
        const app = ibiz.hub.getApp(this.model.appId);
        const path = this.calcSsePath(context);
        return new Promise((resolve, reject) => {
            app.net.sse(`/${path}`, Object.assign({ srfactag: 'AIChat' }, params), {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                onmessage: e => {
                    if (e.data) {
                        const json = JSON.parse(e.data);
                        onmessage(json);
                    }
                },
                onclose: () => {
                    resolve();
                },
                onerror: (e) => {
                    reject(e);
                },
            });
        });
    }
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
    aiChatHistory(context, params = {}, data = {}) {
        const app = ibiz.hub.getApp(this.model.appId);
        const path = this.calcSsePath(context, true);
        return app.net.post(path, data, Object.assign({ srfactag: 'AIChat' }, params));
    }
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
    calcSsePath(context, isHistories = false) {
        const srfkey = context[this.model.codeName.toLowerCase()];
        const curPath = `/${this.model.deapicodeName2}/ssechatcompletion${isHistories ? '/histories' : ''}${srfkey ? `/${srfkey}` : ''}`;
        const resPath = calcResPath(context, this.model);
        return resPath + curPath;
    }
    newEntity(data) {
        if (data instanceof AppDataEntity) {
            return data.clone();
        }
        return new AppDataEntity(this.model, data);
    }
    /**
     * 创建数据对象实例
     *
     * @author chitanda
     * @date 2023-12-23 19:12:57
     * @param {(IData[] | IDataEntity[] | IData | IDataEntity)} data
     * @return {*}  {(IDataEntity | IDataEntity[])}
     */
    createEntity(data) {
        if (Array.isArray(data)) {
            return data.map(item => this.newEntity(item));
        }
        return this.newEntity(data);
    }
    /**
     * 服务实例销毁
     *
     * @author chitanda
     * @date 2023-12-22 14:12:11
     * @return {*}  {Promise<void>}
     */
    async destroy() {
        this.local.clear();
    }
    createMethodDto(dto, opts) {
        return new MethodDto(this, this.model, opts === null || opts === void 0 ? void 0 : opts.isLocalMode, dto);
    }
}
