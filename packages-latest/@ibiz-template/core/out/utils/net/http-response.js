import axios from 'axios';
/**
 * @description 本地请求仿造响应
 * @export
 * @class HttpResponse
 * @implements {IHttpResponse<T>}
 * @template T
 */
export class HttpResponse {
    /**
     * Creates an instance of HttpResponse.
     * @param {unknown} [data] 返回的数据
     * @param {number} [status] 状态码 (默认为 200)
     * @param {string} [statusText] 状态描述 (默认为空字符)
     * @param {RawAxiosResponseHeaders | AxiosResponseHeaders} [headers] 响应头
     * @memberof HttpResponse
     */
    constructor(data, status, statusText, headers) {
        /**
         * @description 本地仿造响应
         * @memberof HttpResponse
         */
        this.local = true;
        this.ok = false;
        this.headers = {};
        this.config = {
            headers: new axios.AxiosHeaders(),
        };
        this.data = data;
        this.status = status || 200;
        this.statusText = statusText || '';
        if (this.status >= 200 && this.status < 300) {
            this.ok = true;
        }
        if (headers) {
            this.headers = headers;
        }
    }
}
