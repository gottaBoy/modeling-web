import axios from 'axios';
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
export class HttpResponse {
    /**
     * Creates an instance of HttpResponse.
     *
     * @author chitanda
     * @date 2022-08-18 15:08:11
     * @param {unknown} [data] 返回的数据
     * @param {number} [status] 状态码 (默认为 200)
     * @param {string} [statusText] 状态描述 (默认为空字符)
     */
    constructor(data, status, statusText) {
        /**
         * 本地仿造响应
         *
         * @author chitanda
         * @date 2022-08-18 15:08:06
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
    }
}
