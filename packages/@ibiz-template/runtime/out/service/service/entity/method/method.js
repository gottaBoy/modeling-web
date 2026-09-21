/* eslint-disable @typescript-eslint/no-unused-vars */
import { RuntimeModelError } from '@ibiz-template/core';
import { calcResPath } from '../../../utils';
import { MethodInput } from './method-input';
import { MethodReturn } from './method-renturn';
/**
 * 应用实体方法
 *
 * @author chitanda
 * @date 2022-10-10 11:10:43
 * @export
 * @class Method
 */
export class Method {
    /**
     * Creates an instance of Method.
     *
     * @author chitanda
     * @date 2023-12-22 12:12:06
     * @param {IAppDEService} service 当前服务实例
     * @param {IAppDataEntity} entity
     * @param {IAppDEMethod} method
     */
    constructor(service, entity, method, isLocalMode = false) {
        this.service = service;
        this.entity = entity;
        this.method = method;
        this.isLocalMode = isLocalMode;
        this.app = ibiz.hub.getApp(entity.appId);
        this.input = new MethodInput(service, entity, method);
        this.result = new MethodReturn(service, entity, method);
    }
    /**
     * 发送请求
     *
     * @author chitanda
     * @date 2022-10-10 17:10:44
     * @protected
     * @param {string} path
     * @param {IContext} context
     * @param {IData} data
     * @param {IParams} params
     * @return {*}  {Promise<HttpResponse<any>>}
     */
    async request(path, context, data, params, header) {
        const { actionType, requestMethod } = this.method;
        if (actionType === 'REMOTE') {
            const methodName = this.method.requestPath;
            let res = null;
            switch (requestMethod) {
                case 'POST':
                    res = await this.app.net.post(this.mergeRequestPath(path, methodName), data || params || {}, {}, header);
                    break;
                case 'GET':
                    res = await this.app.net.get(this.mergeRequestPath(path, methodName), data || params, header);
                    break;
                case 'PUT': {
                    res = await this.app.net.put(this.mergeRequestPath(path, methodName), data || params || {}, header);
                    break;
                }
                case 'DELETE':
                    res = await this.app.net.delete(this.mergeRequestPath(path, methodName), data || params);
                    break;
                default:
                    if (requestMethod) {
                        throw new RuntimeModelError(this.method, ibiz.i18n.t('runtime.service.requestMethods', { requestMethod }));
                    }
                    else {
                        throw new RuntimeModelError(this.method, ibiz.i18n.t('runtime.service.noConfiguredRequestMethod'));
                    }
            }
            return res;
        }
        throw new RuntimeModelError(this.method, ibiz.i18n.t('runtime.service.unsupportedBehaviorTypes', { actionType }));
    }
    /**
     * 合并请求路径
     * @author lionlau
     * @param path
     * @param methodName 方法名，以 / 开始
     * @returns
     */
    mergeRequestPath(path, methodName) {
        return methodName ? `${path}${methodName}` : `${path}`;
    }
    /**
     * 根据上下文计算当前请求路径
     *
     * @author chitanda
     * @date 2022-08-24 18:08:46
     * @protected
     * @param {IContext} context
     * @return {*}  {string} 拼接结果说明: /祖父实体/祖父实体主键/爷爷实体/爷爷实体主键/父实体/父实体主键/当前实体
     */
    calcPath(context) {
        const curPath = `/${this.entity.deapicodeName2}`;
        const resPath = calcResPath(context, this.entity);
        return resPath + curPath;
    }
    /**
     * 创建实体
     * @author lxm
     * @date 2023-10-19 03:22:00
     * @protected
     * @param {(IData[] | IDataEntity[] | IData | IDataEntity)} data
     * @return {*}  {(IDataEntity | IDataEntity[])}
     */
    createEntity(data) {
        return this.service.createEntity(data);
    }
    /**
     * 计算多数据主键，根据；分隔
     *
     * @protected
     * @param {IContext} context
     * @param {IParams} [params]
     * @return {*}  {string[]}
     * @memberof Method
     */
    calcMultiData(context, params) {
        let key = '';
        if (params) {
            key = params[this.entity.keyAppDEFieldId.toLowerCase()];
        }
        if (!key && context) {
            key = context[this.entity.codeName.toLowerCase()];
        }
        return key.split(';');
    }
}
