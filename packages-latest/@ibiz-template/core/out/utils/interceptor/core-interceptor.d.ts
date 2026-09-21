import { InternalAxiosRequestConfig } from 'axios';
import { Interceptor } from './interceptor';
/**
 * @description 核心包拦截器
 * @export
 * @class CoreInterceptor
 * @extends {Interceptor}
 */
export declare class CoreInterceptor extends Interceptor {
    /**
     * @description 请求之前处理
     * @protected
     * @param {InternalAxiosRequestConfig} config
     * @returns {*}  {Promise<InternalAxiosRequestConfig>}
     * @memberof CoreInterceptor
     */
    protected onBeforeRequest(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig>;
    /**
     * @description 响应失败之后处理
     * @protected
     * @param {Error} error
     * @returns {*}  {Promise<never>}
     * @memberof CoreInterceptor
     */
    protected onResponseError(error: Error): Promise<never>;
}
//# sourceMappingURL=core-interceptor.d.ts.map