import { AxiosResponse, AxiosResponseHeaders, InternalAxiosRequestConfig, RawAxiosResponseHeaders } from 'axios';
/**
 * Http请求返回接口
 *
 * @author chitanda
 * @date 2022-08-21 17:08:06
 * @export
 * @interface IHttpResponse
 * @extends {AxiosResponse}
 * @template T
 */
export interface IHttpResponse<T = IData> extends AxiosResponse {
    /**
     * 是否请求成功
     *
     * @description 当状态码为 200-299 时认为成功
     * @author chitanda
     * @date 2022-07-14 16:07:59
     * @type {boolean}
     */
    ok: boolean;
    /**
     * 是否为本地仿造响应
     *
     * @description 只有当值为 true 时, 才认为是本地仿造响应
     * @author chitanda
     * @date 2022-08-18 15:08:44
     * @type {boolean}
     */
    local: boolean;
    data: T;
    /**
     * 当前页
     */
    page?: number;
    /**
     * 分页条数
     */
    size?: number;
    /**
     * 总条数
     */
    total?: number;
    /**
     * 全部计数条数
     *
     * @type {number}
     * @memberof IHttpResponse
     */
    totalx?: number;
    /**
     * 总页数
     */
    totalPages?: number;
}
/**
 * 本地请求仿造响应
 *
 * @author chitanda
 * @date 2022-08-21 17:08:00
 * @export
 * @class HttpResponse
 * @implements {IHttpResponse<T>}
 * @template T
 */
export declare class HttpResponse<T = IData> implements IHttpResponse<T> {
    /**
     * 本地仿造响应
     *
     * @author chitanda
     * @date 2022-08-18 15:08:06
     */
    local: boolean;
    ok: boolean;
    data: T;
    status: number;
    statusText: string;
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
    config: InternalAxiosRequestConfig<IData>;
    /**
     * Creates an instance of HttpResponse.
     *
     * @author chitanda
     * @date 2022-08-18 15:08:11
     * @param {unknown} [data] 返回的数据
     * @param {number} [status] 状态码 (默认为 200)
     * @param {string} [statusText] 状态描述 (默认为空字符)
     */
    constructor(data?: unknown, status?: number, statusText?: string);
}
//# sourceMappingURL=http-response.d.ts.map