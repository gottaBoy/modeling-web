/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

/**
 * @description 拦截器基类
 * @export
 * @class Interceptor
 */
export class Interceptor {
  /**
   * @description 请求拦截器绑定标识
   * @private
   * @type {number}
   * @memberof Interceptor
   */
  private requestTag?: number;

  /**
   * @description 响应拦截器绑定标识
   * @private
   * @type {number}
   * @memberof Interceptor
   */
  private responseTag?: number;

  /**
   * @description axios实例
   * @protected
   * @type {(AxiosInstance | undefined)}
   * @memberof Interceptor
   */
  protected instance: AxiosInstance | undefined;

  /**
   * @description 请求之前处理
   * @protected
   * @param {InternalAxiosRequestConfig} config
   * @returns {*}  {Promise<InternalAxiosRequestConfig>}
   * @memberof Interceptor
   */
  protected async onBeforeRequest(
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> {
    return config;
  }

  /**
   * @description 请求失败之后处理
   * @protected
   * @param {Error} error
   * @returns {*}  {Promise<never>}
   * @memberof Interceptor
   */
  protected onRequestError(error: Error): Promise<never> {
    // 处理请求错误
    return Promise.reject(error);
  }

  /**
   * @description 响应成功之后处理
   * @protected
   * @param {AxiosResponse} config
   * @returns {*}  {Promise<AxiosResponse>}
   * @memberof Interceptor
   */
  protected async onResponseSuccess(
    config: AxiosResponse,
  ): Promise<AxiosResponse> {
    return config;
  }

  /**
   * @description 响应失败之后处理
   * @protected
   * @param {Error} error
   * @returns {*}  {Promise<never>}
   * @memberof Interceptor
   */
  protected onResponseError(error: Error): Promise<never> {
    // 处理响应错误
    return Promise.reject(error);
  }

  /**
   * @description 使用拦截器
   * @param {AxiosInstance} instance
   * @memberof Interceptor
   */
  use(instance: AxiosInstance): void {
    this.instance = instance;
    this.onBeforeRequest = this.onBeforeRequest.bind(this);
    this.onRequestError = this.onRequestError.bind(this);
    this.onResponseSuccess = this.onResponseSuccess.bind(this);
    this.onResponseError = this.onResponseError.bind(this);
    this.requestTag = instance.interceptors.request.use(
      this.onBeforeRequest,
      this.onRequestError,
    );
    this.responseTag = instance.interceptors.response.use(
      this.onResponseSuccess,
      this.onResponseError,
    );
  }

  /**
   * @description 移出拦截器
   * @param {AxiosInstance} instance
   * @memberof Interceptor
   */
  eject(instance: AxiosInstance): void {
    if (this.requestTag) {
      instance.interceptors.request.eject(this.requestTag);
    }
    if (this.responseTag) {
      instance.interceptors.response.eject(this.responseTag);
    }
  }
}
