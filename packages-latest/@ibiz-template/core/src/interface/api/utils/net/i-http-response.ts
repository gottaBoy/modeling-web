import { AxiosResponse } from 'axios';
import { IApiData } from '../../global-param';

/**
 * @description Http请求返回接口
 * @export
 * @interface IHttpResponse
 * @extends {AxiosResponse}
 * @template T
 */
export interface IHttpResponse<T = IApiData> extends AxiosResponse {
  /**
   * @description 是否请求成功,当状态码为 200-299 时认为成功
   * @type {boolean}
   * @memberof IHttpResponse
   */
  ok: boolean;

  /**
   * @description 是否为本地仿造响应,只有当值为 true 时, 才认为是本地仿造响应
   * @type {boolean}
   * @memberof IHttpResponse
   */
  local: boolean;

  /**
   * @description 响应数据
   * @type {T}
   * @memberof IHttpResponse
   */
  data: T;

  /**
   * @description 当前页
   * @type {number}
   * @memberof IHttpResponse
   */
  page?: number;

  /**
   * @description 分页条数
   * @type {number}
   * @memberof IHttpResponse
   */
  size?: number;

  /**
   * @description 总条数
   * @type {number}
   * @memberof IHttpResponse
   */
  total?: number;

  /**
   * @description 全部计数条数
   * @type {number}
   * @memberof IHttpResponse
   */
  totalx?: number;

  /**
   * @description 总页数
   * @type {number}
   * @memberof IHttpResponse
   */
  totalPages?: number;
}
