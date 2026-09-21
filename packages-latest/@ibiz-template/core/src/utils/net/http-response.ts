import axios, {
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
  RawAxiosResponseHeaders,
} from 'axios';
import { IHttpResponse } from '../../interface';

/**
 * @description 本地请求仿造响应
 * @export
 * @class HttpResponse
 * @implements {IHttpResponse<T>}
 * @template T
 */
export class HttpResponse<T = IData> implements IHttpResponse<T> {
  /**
   * @description 本地仿造响应
   * @memberof HttpResponse
   */
  local = true;

  ok = false;

  data: T;

  status: number;

  statusText: string;

  headers: RawAxiosResponseHeaders | AxiosResponseHeaders = {};

  config: InternalAxiosRequestConfig<IData> = {
    headers: new axios.AxiosHeaders(),
  };

  /**
   * Creates an instance of HttpResponse.
   * @param {unknown} [data] 返回的数据
   * @param {number} [status] 状态码 (默认为 200)
   * @param {string} [statusText] 状态描述 (默认为空字符)
   * @param {RawAxiosResponseHeaders | AxiosResponseHeaders} [headers] 响应头
   * @memberof HttpResponse
   */
  constructor(
    data?: unknown,
    status?: number,
    statusText?: string,
    headers?: RawAxiosResponseHeaders | AxiosResponseHeaders,
  ) {
    this.data = data as T;
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
