import {
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from 'axios';
import { IHttpResponse } from './i-http-response';
import { IApiData, IApiParams } from '../../global-param';

/**
 * @description 网络请求工具
 * @export
 * @interface IApiNet
 */
export interface IApiNet {
  /**
   * @description Post 请求
   * @param {string} url 请求地址
   * @param {IApiData} data 请求数据
   * @param {IApiParams} [params={}] 请求参数
   * @param {RawAxiosRequestHeaders} [headers={}] 请求头
   * @returns {*}  {Promise<IHttpResponse>}
   * @memberof IApiNet
   */
  post(
    url: string,
    data: IApiData,
    params?: IApiParams,
    headers?: RawAxiosRequestHeaders,
  ): Promise<IHttpResponse>;

  /**
   * @description Get 请求
   * @param {string} url 请求地址
   * @param {IApiParams} [params={}] 请求参数
   * @param {RawAxiosRequestHeaders} [headers={}] 请求头
   * @param {AxiosRequestConfig} [option={}] 请求配置
   * @returns {*}  {Promise<IHttpResponse>}
   * @memberof IApiNet
   */
  get(
    url: string,
    params?: IApiParams,
    headers?: RawAxiosRequestHeaders,
    option?: AxiosRequestConfig,
  ): Promise<IHttpResponse>;

  /**
   * @description Delete 请求
   * @param {string} url 请求地址
   * @param {IApiParams} [params] 请求参数
   * @param {RawAxiosRequestHeaders} [headers] 请求头
   * @returns {*}  {Promise<IHttpResponse>}
   * @memberof IApiNet
   */
  delete(
    url: string,
    params?: IApiParams,
    headers?: RawAxiosRequestHeaders,
  ): Promise<IHttpResponse>;

  /**
   * @description Put 请求
   * @param {string} url 请求地址
   * @param {IApiData} data 请求数据
   * @param {IApiParams} [params={}] 请求参数
   * @param {RawAxiosRequestHeaders} [headers={}] 请求头
   * @returns {*}  {Promise<IHttpResponse>}
   * @memberof IApiNet
   */
  put(
    url: string,
    data: IApiData,
    params?: IApiParams,
    headers?: RawAxiosRequestHeaders,
  ): Promise<IHttpResponse>;

  /**
   * @description 基础请求方法，会合并预置配置
   * @param {string} url 请求地址
   * @param {AxiosRequestConfig} [config={}] 请求配置
   * @returns {*}  {Promise<IHttpResponse>}
   * @memberof IApiNet
   */
  request(url: string, config?: AxiosRequestConfig): Promise<IHttpResponse>;

  /**
   * @description 创建标准 axios 请求,此方法会跳过预置网络拦截器
   * @param {AxiosRequestConfig<IApiData>} config 请求配置
   * @returns {*}  {Promise<AxiosResponse>}
   * @memberof IApiNet
   */
  axios(config: AxiosRequestConfig<IApiData>): Promise<AxiosResponse>;
}
