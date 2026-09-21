import { RawAxiosRequestHeaders, AxiosResponse, AxiosRequestConfig, AxiosInstance, CreateAxiosDefaults } from 'axios';
import { FetchEventSourceInit } from '@microsoft/fetch-event-source';
import { Interceptor } from '../interceptor/interceptor';
import { IApiNet, IHttpResponse } from '../../interface';
/**
 * @description 全局请求工具类
 * @export
 * @class Net
 * @implements {IApiNet}
 */
export declare class Net implements IApiNet {
    /**
     * @description axios实例
     * @protected
     * @type {AxiosInstance}
     * @memberof Net
     */
    protected instance: AxiosInstance;
    /**
     * @description 是否为 http || https 开头
     * @protected
     * @memberof Net
     */
    protected urlReg: RegExp;
    /**
     * @description 请求等待队列，防止重复请求。当有完全相同请求参数的请求时，会等待上一个请求完成后把结果返回给当前请求，不会重复请求（key: 由请求的 config 生成的字符串,用于唯一标识请求，value: 当前正在请求的 Promise）
     * @protected
     * @memberof Net
     */
    protected waitRequest: Map<string, Promise<AxiosResponse<any, any, {}>>>;
    protected get baseUrl(): string;
    /**
     * Creates an instance of Net.
     * @param {CreateAxiosDefaults} [config] 创建实例用的默认配置
     * @memberof Net
     */
    constructor(config?: CreateAxiosDefaults);
    /**
     * @description 注册的拦截器
     * @type {Map<string, Interceptor>}
     * @memberof Net
     */
    interceptors: Map<string, Interceptor>;
    /**
     * @description 添加拦截器
     * @param {string} name 唯一标识
     * @param {Interceptor} interceptor 拦截器
     * @memberof Net
     */
    addInterceptor(name: string, interceptor: Interceptor): void;
    /**
     * @description 删除拦截器
     * @param {string} name 唯一标识
     * @memberof Net
     */
    removeInterceptor(name: string): void;
    /**
     * @description 预置config,绑定动态的配置
     * @readonly
     * @protected
     * @type {AxiosRequestConfig}
     * @memberof Net
     */
    protected get presetConfig(): AxiosRequestConfig;
    /**
     * @description 从左到右递归合并配置参数（内置第一个合并的预置参数）
     * @protected
     * @param {...AxiosRequestConfig[]} configs
     * @returns {*}  {AxiosRequestConfig}
     * @memberof Net
     */
    protected mergeConfig(...configs: AxiosRequestConfig[]): AxiosRequestConfig;
    /**
     * @description Post 请求
     * @param {string} url
     * @param {IData} data
     * @param {IParams} [params={}]
     * @param {RawAxiosRequestHeaders} [headers={}]
     * @returns {*}  {Promise<IHttpResponse>}
     * @memberof Net
     */
    post(url: string, data: IData, params?: IParams, headers?: RawAxiosRequestHeaders): Promise<IHttpResponse>;
    /**
     * @description Get 请求
     * @param {string} url
     * @param {IParams} [params={}]
     * @param {RawAxiosRequestHeaders} [headers={}]
     * @param {AxiosRequestConfig} [option={}]
     * @returns {*}  {Promise<IHttpResponse>}
     * @memberof Net
     */
    get(url: string, params?: IParams, headers?: RawAxiosRequestHeaders, option?: AxiosRequestConfig): Promise<IHttpResponse>;
    /**
     * @description Delete 请求
     * @param {string} url
     * @param {IParams} [params={}]
     * @param {RawAxiosRequestHeaders} [headers={}]
     * @returns {*}  {Promise<IHttpResponse>}
     * @memberof Net
     */
    delete(url: string, params?: IParams, headers?: RawAxiosRequestHeaders): Promise<IHttpResponse>;
    /**
     * @description Put 请求
     * @param {string} url
     * @param {IData} data
     * @param {IParams} [params={}]
     * @param {RawAxiosRequestHeaders} [headers={}]
     * @returns {*}  {Promise<IHttpResponse>}
     * @memberof Net
     */
    put(url: string, data: IData, params?: IParams, headers?: RawAxiosRequestHeaders): Promise<IHttpResponse>;
    /**
     * @description 获取模型数据
     * @param {string} url
     * @param {RawAxiosRequestHeaders} [headers={}]
     * @returns {*}  {Promise<IHttpResponse>}
     * @memberof Net
     */
    getModel(url: string, headers?: RawAxiosRequestHeaders): Promise<IHttpResponse>;
    /**
     * @description 基础请求方法，会合并预置配置
     * @param {string} url
     * @param {AxiosRequestConfig} [config={}]
     * @returns {*}  {Promise<IHttpResponse>}
     * @memberof Net
     */
    request(url: string, config?: AxiosRequestConfig): Promise<IHttpResponse>;
    /**
     * @description 创建标准 axios 请求
     * @param {AxiosRequestConfig<IData>} config
     * @returns {*}  {Promise<AxiosResponse>}
     * @memberof Net
     */
    axios(config: AxiosRequestConfig<IData>): Promise<AxiosResponse>;
    /**
     * @description 触发 sse 请求
     * @param {string} url
     * @param {IParams} params
     * @param {FetchEventSourceInit} [options={}]
     * @returns {*}  {Promise<void>}
     * @memberof Net
     */
    sse(url: string, params: IParams, options?: FetchEventSourceInit): Promise<void>;
    /**
     * @description 统一处理请求返回
     * @private
     * @param {AxiosResponse} response
     * @returns {*}  {IHttpResponse}
     * @memberof Net
     */
    private doResponseResult;
    /**
     * @description 处理平台预定义参数
     * @private
     * @param {string} url
     * @param {IParams} params
     * @param {IData} [data={}]
     * @returns {*}  {string}
     * @memberof Net
     */
    private handleAppPresetParam;
    /**
     * @description url 附加请求参数，并处理路径的字符转换 encode
     * @private
     * @param {string} url
     * @param {IParams} params
     * @returns {*}  {string}
     * @memberof Net
     */
    private attachUrlParam;
}
//# sourceMappingURL=net.d.ts.map