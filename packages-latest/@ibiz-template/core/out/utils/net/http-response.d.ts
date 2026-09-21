import { AxiosResponseHeaders, InternalAxiosRequestConfig, RawAxiosResponseHeaders } from 'axios';
import { IHttpResponse } from '../../interface';
/**
 * @description 本地请求仿造响应
 * @export
 * @class HttpResponse
 * @implements {IHttpResponse<T>}
 * @template T
 */
export declare class HttpResponse<T = IData> implements IHttpResponse<T> {
    /**
     * @description 本地仿造响应
     * @memberof HttpResponse
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
     * @param {unknown} [data] 返回的数据
     * @param {number} [status] 状态码 (默认为 200)
     * @param {string} [statusText] 状态描述 (默认为空字符)
     * @param {RawAxiosResponseHeaders | AxiosResponseHeaders} [headers] 响应头
     * @memberof HttpResponse
     */
    constructor(data?: unknown, status?: number, statusText?: string, headers?: RawAxiosResponseHeaders | AxiosResponseHeaders);
}
//# sourceMappingURL=http-response.d.ts.map