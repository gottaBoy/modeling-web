import { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
/**
 * @description 拦截器基类
 * @export
 * @class Interceptor
 */
export declare class Interceptor {
    /**
     * @description 请求拦截器绑定标识
     * @private
     * @type {number}
     * @memberof Interceptor
     */
    private requestTag?;
    /**
     * @description 响应拦截器绑定标识
     * @private
     * @type {number}
     * @memberof Interceptor
     */
    private responseTag?;
    /**
     * @description axios实例
     * @protected
     * @type {(AxiosInstance | undefined)}
     * @memberof Interceptor
     */
    protected instance: AxiosInstance | undefined;
    /**
     * @description 请求之前处理
     * @protected
     * @param {InternalAxiosRequestConfig} config
     * @returns {*}  {Promise<InternalAxiosRequestConfig>}
     * @memberof Interceptor
     */
    protected onBeforeRequest(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig>;
    /**
     * @description 请求失败之后处理
     * @protected
     * @param {Error} error
     * @returns {*}  {Promise<never>}
     * @memberof Interceptor
     */
    protected onRequestError(error: Error): Promise<never>;
    /**
     * @description 响应成功之后处理
     * @protected
     * @param {AxiosResponse} config
     * @returns {*}  {Promise<AxiosResponse>}
     * @memberof Interceptor
     */
    protected onResponseSuccess(config: AxiosResponse): Promise<AxiosResponse>;
    /**
     * @description 响应失败之后处理
     * @protected
     * @param {Error} error
     * @returns {*}  {Promise<never>}
     * @memberof Interceptor
     */
    protected onResponseError(error: Error): Promise<never>;
    /**
     * @description 使用拦截器
     * @param {AxiosInstance} instance
     * @memberof Interceptor
     */
    use(instance: AxiosInstance): void;
    /**
     * @description 移出拦截器
     * @param {AxiosInstance} instance
     * @memberof Interceptor
     */
    eject(instance: AxiosInstance): void;
}
//# sourceMappingURL=interceptor.d.ts.map