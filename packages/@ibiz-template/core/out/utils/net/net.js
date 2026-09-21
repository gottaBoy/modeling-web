import axios from 'axios';
import { fetchEventSource, } from '@microsoft/fetch-event-source';
import { merge } from 'lodash-es';
import qs from 'qs';
import { notNilEmpty } from 'qx-util';
import { mergeDeepRight } from 'ramda';
import { HttpErrorFactory } from '../../error';
import { CoreInterceptor } from '../interceptor';
import { getToken } from '../util/util';
/**
 * 全局请求工具类
 *
 * @author chitanda
 * @date 2022-07-14 15:07:42
 * @export
 * @class Net
 */
export class Net {
    get baseUrl() {
        return (this.instance.defaults.baseURL || `${ibiz.env.baseUrl}/${ibiz.env.appId}`);
    }
    /**
     * Creates an instance of Net.
     * @author lxm
     * @date 2022-10-27 16:10:05
     * @param {CreateAxiosDefaults} [config] 创建实例用的默认配置
     */
    constructor(config) {
        /**
         * 是否为 http || https 开头
         *
         * @author chitanda
         * @date 2022-11-07 14:11:28
         * @protected
         */
        this.urlReg = /^http[s]?:\/\/[^\s]*/;
        /**
         * 请求等待队列，防止重复请求。当有完全相同请求参数的请求时，会等待上一个请求完成后把结果返回给当前请求，不会重复请求
         * key: 由请求的 config 生成的字符串,用于唯一标识请求
         * value: 当前正在请求的 Promise
         *
         * @author chitanda
         * @date 2023-06-07 14:06:19
         * @protected
         */
        this.waitRequest = new Map();
        /**
         * 注册的拦截器
         *
         * @author lxm
         * @date 2022-10-27 17:10:18
         * @type {Map<string, Interceptor>}
         */
        this.interceptors = new Map();
        this.instance = axios.create(config);
        this.addInterceptor('Default', new CoreInterceptor());
    }
    /**
     * 添加拦截器
     *
     * @author lxm
     * @date 2022-10-27 17:10:42
     * @param {string} name 唯一标识
     * @param {Interceptor} interceptor 拦截器
     */
    addInterceptor(name, interceptor) {
        interceptor.use(this.instance);
        this.interceptors.set(name, interceptor);
    }
    /**
     * 删除拦截器
     *
     * @author lxm
     * @date 2022-10-27 17:10:27
     * @param {string} name 唯一标识
     */
    removeInterceptor(name) {
        const interceptor = this.interceptors.get(name);
        if (interceptor) {
            interceptor.eject(this.instance);
            this.interceptors.delete(name);
        }
    }
    /**
     * 预置config,绑定动态的配置
     *
     * @author lxm
     * @date 2022-10-27 16:10:48
     * @readonly
     * @protected
     * @type {AxiosRequestConfig}
     */
    get presetConfig() {
        return {
            // 请求前缀路径
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                Accept: 'application/json',
            },
        };
    }
    /**
     * 从左到右递归合并配置参数（内置第一个合并的预置参数）
     *
     * @author lxm
     * @date 2022-10-27 16:10:09
     * @protected
     * @param {...AxiosRequestConfig[]} configs
     * @returns {*}
     */
    mergeConfig(...configs) {
        const config = this.presetConfig;
        if (configs.length === 0) {
            return config;
        }
        const { url } = configs[0];
        if (url && this.urlReg.test(url)) {
            delete config.baseURL;
        }
        return merge(config, ...configs);
    }
    /**
     * Post 请求
     *
     * @author chitanda
     * @date 2022-10-19 11:10:30
     * @param {string} url
     * @param {IData} data
     * @param {IParams} [params={}]
     * @param {RawAxiosRequestHeaders} [headers={}]
     * @return {*}  {Promise<IHttpResponse>}
     */
    async post(url, data, params = {}, headers = {}) {
        url = this.handleAppPresetParam(url, params, data);
        try {
            const response = await this.request(url, {
                method: 'post',
                data,
                headers,
            });
            return this.doResponseResult(response);
        }
        catch (error) {
            throw HttpErrorFactory.getInstance(error);
        }
    }
    /**
     * Get 请求
     *
     * @author chitanda
     * @date 2022-10-19 11:10:24
     * @param {string} url
     * @param {IParams} [params={}]
     * @param {RawAxiosRequestHeaders} [headers={}]
     * @param {IParams} [option={}]
     * @return {*}  {Promise<IHttpResponse>}
     */
    async get(url, params = {}, headers = {}, option = {}) {
        url = this.attachUrlParam(url, params);
        try {
            const response = await this.request(url, merge({ method: 'get', headers }, option));
            return this.doResponseResult(response);
        }
        catch (error) {
            throw HttpErrorFactory.getInstance(error);
        }
    }
    /**
     * Delete 请求
     *
     * @author chitanda
     * @date 2022-10-19 11:10:17
     * @param {string} url
     * @param {IParams} [params]
     * @param {RawAxiosRequestHeaders} [headers={}]
     * @return {*}  {Promise<IHttpResponse>}
     */
    async delete(url, params = {}, headers = {}) {
        url = this.handleAppPresetParam(url, params);
        try {
            const response = await this.request(url, { method: 'delete', headers });
            return this.doResponseResult(response);
        }
        catch (error) {
            throw HttpErrorFactory.getInstance(error);
        }
    }
    /**
     * Put 请求
     *
     * @author chitanda
     * @date 2022-10-19 11:10:11
     * @param {string} url
     * @param {IData} data
     * @param {IParams} [params={}]
     * @param {RawAxiosRequestHeaders} [headers={}]
     * @return {*}  {Promise<IHttpResponse>}
     */
    async put(url, data, params = {}, headers = {}) {
        url = this.handleAppPresetParam(url, params);
        try {
            const response = await this.request(url, {
                method: 'put',
                data,
                headers,
            });
            return this.doResponseResult(response);
        }
        catch (error) {
            throw HttpErrorFactory.getInstance(error);
        }
    }
    /**
     * 获取模型数据
     *
     * @author chitanda
     * @date 2022-07-14 15:07:15
     * @param {string} url
     * @param {RawAxiosRequestHeaders} [headers={}]
     * @return {*}  {Promise<IHttpResponse>}
     */
    async getModel(url, headers = {}) {
        try {
            const response = await this.instance.get(url, {
                headers,
            });
            return this.doResponseResult(response);
        }
        catch (error) {
            throw HttpErrorFactory.getInstance(error);
        }
    }
    /**
     * 基础请求方法，会合并预置配置
     *
     * @author lxm
     * @date 2022-10-27 14:10:06
     * @param {string} url
     * @param {AxiosRequestConfig} [config={}]
     * @returns {*}  {Promise<IHttpResponse>}
     */
    async request(url, config = {}) {
        // axios 请求参数配置
        const cfg = this.mergeConfig({ url }, config);
        // 当前请求的唯一标识
        const key = JSON.stringify(cfg);
        try {
            let requestPromise = null;
            if (!this.waitRequest.has(key)) {
                requestPromise = this.instance.request(cfg);
                this.waitRequest.set(key, requestPromise);
            }
            else {
                requestPromise = this.waitRequest.get(key);
            }
            const response = await requestPromise;
            // 当第一个请求完成后就删除等待队列中的请求
            if (this.waitRequest.has(key)) {
                this.waitRequest.delete(key);
            }
            return this.doResponseResult(response);
        }
        catch (error) {
            // 请求异常删除等待队列中的请求体
            if (this.waitRequest.has(key)) {
                this.waitRequest.delete(key);
            }
            throw HttpErrorFactory.getInstance(error);
        }
    }
    /**
     * 创建标准 axios 请求
     *
     * @author chitanda
     * @date 2023-01-30 15:01:27
     * @param {AxiosRequestConfig<IData>} config
     * @return {*}
     */
    axios(config) {
        return axios(config);
    }
    /**
     * 触发 sse 请求
     *
     * @author chitanda
     * @date 2023-10-10 16:10:08
     * @param {string} url
     * @param {IParams} params
     * @param {FetchEventSourceInit} [options={}]
     * @return {*}  {Promise<void>}
     */
    async sse(url, params, options = {}) {
        url = this.attachUrlParam(this.baseUrl + url, params);
        if (!options.headers) {
            options.headers = {};
        }
        const headers = options.headers;
        // 补充基本认证信息
        {
            const token = getToken();
            if (token) {
                headers[`${ibiz.env.tokenHeader}Authorization`] =
                    `${ibiz.env.tokenPrefix}Bearer ${getToken()}`;
            }
            let systemId = ibiz.env.dcSystem;
            const { orgData } = ibiz;
            if (orgData) {
                if (orgData.systemid) {
                    systemId = orgData.systemid;
                }
                if (orgData.orgid) {
                    headers.srforgid = orgData.orgid;
                }
            }
            headers.srfsystemid = systemId;
        }
        const config = mergeDeepRight({
            openWhenHidden: true,
            method: 'POST',
        }, options);
        await fetchEventSource(url, config);
    }
    /**
     * 统一处理请求返回
     *
     * @author chitanda
     * @date 2022-07-14 16:07:23
     * @private
     * @param {AxiosResponse} response
     * @return {*}  {IHttpResponse}
     */
    doResponseResult(response) {
        const res = response;
        if (res.status >= 200 && res.status <= 299) {
            res.ok = true;
            const resData = res.data;
            if (resData === '' || resData === null) {
                res.data = undefined;
            }
        }
        return res;
    }
    /**
     * 处理平台预定义参数
     *
     * @author tony001
     * @date 2024-04-18 10:04:52
     * @private
     * @param {string} url
     * @param {IData} [data={}]
     * @param {IParams} [params]
     * @return {*}  {string}
     */
    handleAppPresetParam(url, params, data = {}) {
        // [特殊参数识别]post请求时将srfversionid视图参数或编辑器中的视图参数以请求问号参数传递
        if (data && Object.prototype.hasOwnProperty.call(data, 'srfversionid')) {
            params.srfversionid = data.srfversionid;
        }
        // [特殊参数识别]删除界面使用视图参数srfdefdata
        if (params && Object.prototype.hasOwnProperty.call(params, 'srfdefdata')) {
            delete params.srfdefdata;
        }
        if (params) {
            return this.attachUrlParam(url, params);
        }
        return url;
    }
    /**
     * url 附加请求参数，并处理路径的字符转换 encode
     *
     * @author chitanda
     * @date 2022-07-14 15:07:34
     * @private
     * @param {string} url
     * @param {IParams} params
     * @return {*}  {string}
     */
    attachUrlParam(url, params) {
        // [特殊参数识别]删除界面使用视图参数srfdefdata
        if (params && Object.prototype.hasOwnProperty.call(params, 'srfdefdata')) {
            delete params.srfdefdata;
        }
        {
            // url 转码
            const urlSplit = url.split('?');
            urlSplit[0] = urlSplit[0]
                .split('/')
                .map(item => encodeURIComponent(item))
                .join('/');
            url = urlSplit.length > 1 ? urlSplit.join('?') : urlSplit[0];
        }
        const strParams = qs.stringify(params);
        if (notNilEmpty(strParams)) {
            if (url.endsWith('?')) {
                url = `${url}${strParams}`;
            }
            else if (url.indexOf('?') !== -1 && url.endsWith('&')) {
                url = `${url}${strParams}`;
            }
            else if (url.indexOf('?') !== -1 && !url.endsWith('&')) {
                url = `${url}&${strParams}`;
            }
            else {
                url = `${url}?${strParams}`;
            }
        }
        return url;
    }
}
