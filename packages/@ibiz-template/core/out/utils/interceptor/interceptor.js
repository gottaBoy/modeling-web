/**
 * 拦截器基类
 *
 * @author chitanda
 * @date 2022-07-20 18:07:11
 * @export
 * @class Interceptor
 */
export class Interceptor {
    /**
     * 请求之前处理
     *
     * @author lxm
     * @date 2022-10-27 17:10:41
     * @protected
     * @param {InternalAxiosRequestConfig} config
     * @returns {*}  {Promise<InternalAxiosRequestConfig>}
     */
    async onBeforeRequest(config) {
        return config;
    }
    /**
     * 请求失败之后处理
     *
     * @author lxm
     * @date 2022-10-27 17:10:40
     * @protected
     * @param {*} error
     */
    onRequestError(error) {
        // 处理请求错误
        return Promise.reject(error);
    }
    /**
     * 响应成功之后处理
     *
     * @author lxm
     * @date 2022-10-27 17:10:38
     * @protected
     * @param {AxiosResponse} config
     * @returns {*}  {Promise<AxiosRequestConfig>}
     */
    async onResponseSuccess(config) {
        return config;
    }
    /**
     * 响应失败之后处理
     *
     * @author lxm
     * @date 2022-10-27 17:10:37
     * @protected
     * @param {*} _error
     */
    onResponseError(error) {
        // 处理响应错误
        return Promise.reject(error);
    }
    /**
     * 使用拦截器
     *
     * @author lxm
     * @date 2022-10-27 17:10:28
     * @param {AxiosInstance} instance
     */
    use(instance) {
        this.requestTag = instance.interceptors.request.use(this.onBeforeRequest, this.onRequestError);
        this.responseTag = instance.interceptors.response.use(this.onResponseSuccess, this.onResponseError);
    }
    /**
     * 移出拦截器
     *
     * @author lxm
     * @date 2022-10-27 17:10:27
     * @param {AxiosInstance} instance
     */
    eject(instance) {
        if (this.requestTag) {
            instance.interceptors.request.eject(this.requestTag);
        }
        if (this.responseTag) {
            instance.interceptors.response.eject(this.responseTag);
        }
    }
}
