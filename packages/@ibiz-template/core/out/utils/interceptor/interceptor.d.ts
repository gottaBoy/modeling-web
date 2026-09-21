import { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
/**
 * 拦截器基类
 *
 * @author chitanda
 * @date 2022-07-20 18:07:11
 * @export
 * @class Interceptor
 */
export declare class Interceptor {
    /**
     * 请求拦截器绑定标识
     *
     * @author lxm
     * @date 2022-10-27 17:10:20
     * @private
     * @type {number}
     */
    private requestTag?;
    /**
     * 响应拦截器绑定标识
     *
     * @author lxm
     * @date 2022-10-27 17:10:19
     * @private
     * @type {number}
     */
    private responseTag?;
    /**
     * 请求之前处理
     *
     * @author lxm
     * @date 2022-10-27 17:10:41
     * @protected
     * @param {InternalAxiosRequestConfig} config
     * @returns {*}  {Promise<InternalAxiosRequestConfig>}
     */
    protected onBeforeRequest(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig>;
    /**
     * 请求失败之后处理
     *
     * @author lxm
     * @date 2022-10-27 17:10:40
     * @protected
     * @param {*} error
     */
    protected onRequestError(error: Error): Promise<never>;
    /**
     * 响应成功之后处理
     *
     * @author lxm
     * @date 2022-10-27 17:10:38
     * @protected
     * @param {AxiosResponse} config
     * @returns {*}  {Promise<AxiosRequestConfig>}
     */
    protected onResponseSuccess(config: AxiosResponse): Promise<AxiosResponse>;
    /**
     * 响应失败之后处理
     *
     * @author lxm
     * @date 2022-10-27 17:10:37
     * @protected
     * @param {*} _error
     */
    protected onResponseError(error: Error): Promise<never>;
    /**
     * 使用拦截器
     *
     * @author lxm
     * @date 2022-10-27 17:10:28
     * @param {AxiosInstance} instance
     */
    use(instance: AxiosInstance): void;
    /**
     * 移出拦截器
     *
     * @author lxm
     * @date 2022-10-27 17:10:27
     * @param {AxiosInstance} instance
     */
    eject(instance: AxiosInstance): void;
}
//# sourceMappingURL=interceptor.d.ts.map