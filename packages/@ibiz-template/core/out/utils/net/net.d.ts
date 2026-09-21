import { RawAxiosRequestHeaders, AxiosResponse, AxiosRequestConfig, AxiosInstance, CreateAxiosDefaults } from 'axios';
import { FetchEventSourceInit } from '@microsoft/fetch-event-source';
import { Interceptor } from '../interceptor/interceptor';
import { IHttpResponse } from './http-response';
/**
 * 全局请求工具类
 *
 * @author chitanda
 * @date 2022-07-14 15:07:42
 * @export
 * @class Net
 */
export declare class Net {
    /**
     * axios实例
     *
     * @author lxm
     * @date 2022-10-27 17:10:18
     * @protected
     * @type {AxiosInstance}
     */
    protected instance: AxiosInstance;
    /**
     * 是否为 http || https 开头
     *
     * @author chitanda
     * @date 2022-11-07 14:11:28
     * @protected
     */
    protected urlReg: RegExp;
    /**
     * 请求等待队列，防止重复请求。当有完全相同请求参数的请求时，会等待上一个请求完成后把结果返回给当前请求，不会重复请求
     * key: 由请求的 config 生成的字符串,用于唯一标识请求
     * value: 当前正在请求的 Promise
     *
     * @author chitanda
     * @date 2023-06-07 14:06:19
     * @protected
     */
    protected waitRequest: Map<string, Promise<AxiosResponse<any, any>>>;
    protected get baseUrl(): string;
    /**
     * Creates an instance of Net.
     * @author lxm
     * @date 2022-10-27 16:10:05
     * @param {CreateAxiosDefaults} [config] 创建实例用的默认配置
     */
    constructor(config?: CreateAxiosDefaults);
    /**
     * 注册的拦截器
     *
     * @author lxm
     * @date 2022-10-27 17:10:18
     * @type {Map<string, Interceptor>}
     */
    interceptors: Map<string, Interceptor>;
    /**
     * 添加拦截器
     *
     * @author lxm
     * @date 2022-10-27 17:10:42
     * @param {string} name 唯一标识
     * @param {Interceptor} interceptor 拦截器
     */
    addInterceptor(name: string, interceptor: Interceptor): void;
    /**
     * 删除拦截器
     *
     * @author lxm
     * @date 2022-10-27 17:10:27
     * @param {string} name 唯一标识
     */
    removeInterceptor(name: string): void;
    /**
     * 预置config,绑定动态的配置
     *
     * @author lxm
     * @date 2022-10-27 16:10:48
     * @readonly
     * @protected
     * @type {AxiosRequestConfig}
     */
    protected get presetConfig(): AxiosRequestConfig;
    /**
     * 从左到右递归合并配置参数（内置第一个合并的预置参数）
     *
     * @author lxm
     * @date 2022-10-27 16:10:09
     * @protected
     * @param {...AxiosRequestConfig[]} configs
     * @returns {*}
     */
    protected mergeConfig(...configs: AxiosRequestConfig[]): AxiosRequestConfig;
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
    post(url: string, data: IData, params?: IParams, headers?: RawAxiosRequestHeaders): Promise<IHttpResponse>;
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
    get(url: string, params?: IParams, headers?: RawAxiosRequestHeaders, option?: AxiosRequestConfig): Promise<IHttpResponse>;
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
    delete(url: string, params?: IParams, headers?: RawAxiosRequestHeaders): Promise<IHttpResponse>;
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
    put(url: string, data: IData, params?: IParams, headers?: RawAxiosRequestHeaders): Promise<IHttpResponse>;
    /**
     * 获取模型数据
     *
     * @author chitanda
     * @date 2022-07-14 15:07:15
     * @param {string} url
     * @param {RawAxiosRequestHeaders} [headers={}]
     * @return {*}  {Promise<IHttpResponse>}
     */
    getModel(url: string, headers?: RawAxiosRequestHeaders): Promise<IHttpResponse>;
    /**
     * 基础请求方法，会合并预置配置
     *
     * @author lxm
     * @date 2022-10-27 14:10:06
     * @param {string} url
     * @param {AxiosRequestConfig} [config={}]
     * @returns {*}  {Promise<IHttpResponse>}
     */
    request(url: string, config?: AxiosRequestConfig): Promise<IHttpResponse>;
    /**
     * 创建标准 axios 请求
     *
     * @author chitanda
     * @date 2023-01-30 15:01:27
     * @param {AxiosRequestConfig<IData>} config
     * @return {*}
     */
    axios(config: AxiosRequestConfig<IData>): Promise<AxiosResponse>;
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
    sse(url: string, params: IParams, options?: FetchEventSourceInit): Promise<void>;
    /**
     * 统一处理请求返回
     *
     * @author chitanda
     * @date 2022-07-14 16:07:23
     * @private
     * @param {AxiosResponse} response
     * @return {*}  {IHttpResponse}
     */
    private doResponseResult;
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
    private handleAppPresetParam;
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
    private attachUrlParam;
}
//# sourceMappingURL=net.d.ts.map