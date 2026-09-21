import axios, {
  AxiosError,
  RawAxiosRequestHeaders,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosInstance,
  CreateAxiosDefaults,
} from 'axios';
import {
  FetchEventSourceInit,
  fetchEventSource,
} from '@microsoft/fetch-event-source';
import { merge } from 'lodash-es';
import qs from 'qs';
import { notNilEmpty } from 'qx-util';
import { mergeDeepRight } from 'ramda';
import { HttpErrorFactory } from '../../error';
import { CoreInterceptor } from '../interceptor';
import { Interceptor } from '../interceptor/interceptor';
import { getToken } from '../util/util';
import { IApiNet, IHttpResponse } from '../../interface';

/**
 * @description 全局请求工具类
 * @export
 * @class Net
 * @implements {IApiNet}
 */
export class Net implements IApiNet {
  /**
   * @description axios实例
   * @protected
   * @type {AxiosInstance}
   * @memberof Net
   */
  protected instance: AxiosInstance;

  /**
   * @description 是否为 http || https 开头
   * @protected
   * @memberof Net
   */
  protected urlReg = /^http[s]?:\/\/[^\s]*/;

  /**
   * @description 请求等待队列，防止重复请求。当有完全相同请求参数的请求时，会等待上一个请求完成后把结果返回给当前请求，不会重复请求（key: 由请求的 config 生成的字符串,用于唯一标识请求，value: 当前正在请求的 Promise）
   * @protected
   * @memberof Net
   */
  protected waitRequest = new Map<string, Promise<AxiosResponse>>();

  protected get baseUrl(): string {
    return (
      this.instance.defaults.baseURL || `${ibiz.env.baseUrl}/${ibiz.env.appId}`
    );
  }

  /**
   * Creates an instance of Net.
   * @param {CreateAxiosDefaults} [config] 创建实例用的默认配置
   * @memberof Net
   */
  constructor(config?: CreateAxiosDefaults) {
    this.instance = axios.create(config);
    this.addInterceptor('Default', new CoreInterceptor());
  }

  /**
   * @description 注册的拦截器
   * @type {Map<string, Interceptor>}
   * @memberof Net
   */
  interceptors: Map<string, Interceptor> = new Map();

  /**
   * @description 添加拦截器
   * @param {string} name 唯一标识
   * @param {Interceptor} interceptor 拦截器
   * @memberof Net
   */
  addInterceptor(name: string, interceptor: Interceptor): void {
    interceptor.use(this.instance);
    this.interceptors.set(name, interceptor);
  }

  /**
   * @description 删除拦截器
   * @param {string} name 唯一标识
   * @memberof Net
   */
  removeInterceptor(name: string): void {
    const interceptor = this.interceptors.get(name);
    if (interceptor) {
      interceptor.eject(this.instance);
      this.interceptors.delete(name);
    }
  }

  /**
   * @description 预置config,绑定动态的配置
   * @readonly
   * @protected
   * @type {AxiosRequestConfig}
   * @memberof Net
   */
  protected get presetConfig(): AxiosRequestConfig {
    return {
      // 请求前缀路径
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json',
      },
    };
  }

  /**
   * @description 从左到右递归合并配置参数（内置第一个合并的预置参数）
   * @protected
   * @param {...AxiosRequestConfig[]} configs
   * @returns {*}  {AxiosRequestConfig}
   * @memberof Net
   */
  protected mergeConfig(...configs: AxiosRequestConfig[]): AxiosRequestConfig {
    const config = this.presetConfig;
    if (configs.length === 0) {
      return config;
    }
    const { url } = configs[0];
    if (url && this.urlReg.test(url)) {
      delete config.baseURL;
    }
    return merge(config, ...configs);
  }

  /**
   * @description Post 请求
   * @param {string} url
   * @param {IData} data
   * @param {IParams} [params={}]
   * @param {RawAxiosRequestHeaders} [headers={}]
   * @returns {*}  {Promise<IHttpResponse>}
   * @memberof Net
   */
  async post(
    url: string,
    data: IData,
    params: IParams = {},
    headers: RawAxiosRequestHeaders = {},
  ): Promise<IHttpResponse> {
    url = this.handleAppPresetParam(url, params, data);
    try {
      const response = await this.request(url, {
        method: 'post',
        data,
        headers,
      });
      return this.doResponseResult(response);
    } catch (error) {
      throw await HttpErrorFactory.getInstance(error as AxiosError);
    }
  }

  /**
   * @description Get 请求
   * @param {string} url
   * @param {IParams} [params={}]
   * @param {RawAxiosRequestHeaders} [headers={}]
   * @param {AxiosRequestConfig} [option={}]
   * @returns {*}  {Promise<IHttpResponse>}
   * @memberof Net
   */
  async get(
    url: string,
    params: IParams = {},
    headers: RawAxiosRequestHeaders = {},
    option: AxiosRequestConfig = {},
  ): Promise<IHttpResponse> {
    url = this.attachUrlParam(url, params);
    try {
      const response = await this.request(
        url,
        merge({ method: 'get', headers }, option),
      );
      return this.doResponseResult(response);
    } catch (error) {
      throw await HttpErrorFactory.getInstance(error as AxiosError);
    }
  }

  /**
   * @description Delete 请求
   * @param {string} url
   * @param {IParams} [params={}]
   * @param {RawAxiosRequestHeaders} [headers={}]
   * @returns {*}  {Promise<IHttpResponse>}
   * @memberof Net
   */
  async delete(
    url: string,
    params: IParams = {},
    headers: RawAxiosRequestHeaders = {},
  ): Promise<IHttpResponse> {
    url = this.handleAppPresetParam(url, params);
    try {
      const response = await this.request(url, { method: 'delete', headers });
      return this.doResponseResult(response);
    } catch (error) {
      throw await HttpErrorFactory.getInstance(error as AxiosError);
    }
  }

  /**
   * @description Put 请求
   * @param {string} url
   * @param {IData} data
   * @param {IParams} [params={}]
   * @param {RawAxiosRequestHeaders} [headers={}]
   * @returns {*}  {Promise<IHttpResponse>}
   * @memberof Net
   */
  async put(
    url: string,
    data: IData,
    params: IParams = {},
    headers: RawAxiosRequestHeaders = {},
  ): Promise<IHttpResponse> {
    url = this.handleAppPresetParam(url, params);
    try {
      const response = await this.request(url, {
        method: 'put',
        data,
        headers,
      });
      return this.doResponseResult(response);
    } catch (error) {
      throw await HttpErrorFactory.getInstance(error as AxiosError);
    }
  }

  /**
   * @description 获取模型数据
   * @param {string} url
   * @param {RawAxiosRequestHeaders} [headers={}]
   * @returns {*}  {Promise<IHttpResponse>}
   * @memberof Net
   */
  async getModel(
    url: string,
    headers: RawAxiosRequestHeaders = {},
  ): Promise<IHttpResponse> {
    try {
      const response = await this.instance.get(url, {
        headers,
      });
      return this.doResponseResult(response);
    } catch (error) {
      throw await HttpErrorFactory.getInstance(error as AxiosError);
    }
  }

  /**
   * @description 基础请求方法，会合并预置配置
   * @param {string} url
   * @param {AxiosRequestConfig} [config={}]
   * @returns {*}  {Promise<IHttpResponse>}
   * @memberof Net
   */
  async request(
    url: string,
    config: AxiosRequestConfig = {},
  ): Promise<IHttpResponse> {
    // axios 请求参数配置
    const cfg = this.mergeConfig({ url }, config);
    // 当前请求的唯一标识
    const key = JSON.stringify(cfg);
    try {
      let requestPromise: Promise<AxiosResponse> | null = null;
      if (!this.waitRequest.has(key)) {
        requestPromise = this.instance.request(cfg);
        this.waitRequest.set(key, requestPromise);
      } else {
        requestPromise = this.waitRequest.get(key)!;
      }
      const response = await requestPromise;
      // 当第一个请求完成后就删除等待队列中的请求
      if (this.waitRequest.has(key)) {
        this.waitRequest.delete(key);
      }
      return this.doResponseResult(response);
    } catch (error) {
      // 请求异常删除等待队列中的请求体
      if (this.waitRequest.has(key)) {
        this.waitRequest.delete(key);
      }
      throw await HttpErrorFactory.getInstance(error as AxiosError);
    }
  }

  /**
   * @description 创建标准 axios 请求
   * @param {AxiosRequestConfig<IData>} config
   * @returns {*}  {Promise<AxiosResponse>}
   * @memberof Net
   */
  axios(config: AxiosRequestConfig<IData>): Promise<AxiosResponse> {
    return axios(config);
  }

  /**
   * @description 触发 sse 请求
   * @param {string} url
   * @param {IParams} params
   * @param {FetchEventSourceInit} [options={}]
   * @returns {*}  {Promise<void>}
   * @memberof Net
   */
  async sse(
    url: string,
    params: IParams,
    options: FetchEventSourceInit = {},
  ): Promise<void> {
    url = this.attachUrlParam(this.baseUrl + url, params);
    if (!options.headers) {
      options.headers = {};
    }
    const headers = options.headers!;
    // 补充基本认证信息
    {
      const token = getToken();
      if (token) {
        headers[`${ibiz.env.tokenHeader}Authorization`] =
          `${ibiz.env.tokenPrefix}Bearer ${getToken()}`;
      }
      let systemId = ibiz.env.dcSystem;
      const { orgData } = ibiz;
      if (orgData) {
        if (orgData.systemid) {
          systemId = orgData.systemid;
        }
        if (orgData.orgid) {
          headers.srforgid = orgData.orgid;
        }
      }
      headers.srfsystemid = systemId;
    }
    const config = mergeDeepRight(
      {
        openWhenHidden: true,
        method: 'POST',
      },
      options,
    );
    await fetchEventSource(url, config);
  }

  /**
   * @description 统一处理请求返回
   * @private
   * @param {AxiosResponse} response
   * @returns {*}  {IHttpResponse}
   * @memberof Net
   */
  private doResponseResult(response: AxiosResponse): IHttpResponse {
    const res = response as IHttpResponse;
    if (res.status >= 200 && res.status <= 299) {
      res.ok = true;
      const resData = res.data as unknown;
      if (resData === '' || resData === null) {
        res.data = undefined as unknown as IData;
      }
    }
    return res;
  }

  /**
   * @description 处理平台预定义参数
   * @private
   * @param {string} url
   * @param {IParams} params
   * @param {IData} [data={}]
   * @returns {*}  {string}
   * @memberof Net
   */
  private handleAppPresetParam(
    url: string,
    params: IParams,
    data: IData = {},
  ): string {
    // [特殊参数识别]post请求时将srfversionid视图参数或编辑器中的视图参数以请求问号参数传递
    if (data && Object.prototype.hasOwnProperty.call(data, 'srfversionid')) {
      params.srfversionid = data.srfversionid;
    }
    // [特殊参数识别]删除界面使用视图参数srfmenuitem
    if (data && Object.prototype.hasOwnProperty.call(data, 'srfmenuitem')) {
      delete data.srfmenuitem;
    }
    // [特殊参数识别]删除界面使用视图参数srfexportdataset
    if (
      data &&
      Object.prototype.hasOwnProperty.call(data, 'srfexportdataset')
    ) {
      delete data.srfexportdataset;
    }
    // [特殊参数识别]删除界面使用视图参数srfexportdatakey
    if (
      data &&
      Object.prototype.hasOwnProperty.call(data, 'srfexportdatakey')
    ) {
      delete data.srfexportdatakey;
    }
    // [特殊参数识别]删除界面使用视图参数srfdefdata
    if (params && Object.prototype.hasOwnProperty.call(params, 'srfdefdata')) {
      delete params.srfdefdata;
    }

    if (params) {
      return this.attachUrlParam(url, params);
    }
    return url;
  }

  /**
   * @description url 附加请求参数，并处理路径的字符转换 encode
   * @private
   * @param {string} url
   * @param {IParams} params
   * @returns {*}  {string}
   * @memberof Net
   */
  private attachUrlParam(url: string, params: IParams): string {
    // [特殊参数识别]删除界面使用视图参数srfdefdata
    if (params && Object.prototype.hasOwnProperty.call(params, 'srfdefdata')) {
      delete params.srfdefdata;
    }
    // [特殊参数识别]删除界面使用视图参数srfmenuitem
    if (params && Object.prototype.hasOwnProperty.call(params, 'srfmenuitem')) {
      delete params.srfmenuitem;
    }
    {
      // url 转码
      const urlSplit = url.split('?');
      urlSplit[0] = urlSplit[0]
        .split('/')
        .map(item => encodeURIComponent(item))
        .join('/');
      url = urlSplit.length > 1 ? urlSplit.join('?') : urlSplit[0];
    }
    const strParams: string = qs.stringify(params);
    if (notNilEmpty(strParams)) {
      if (url.endsWith('?')) {
        url = `${url}${strParams}`;
      } else if (url.indexOf('?') !== -1 && url.endsWith('&')) {
        url = `${url}${strParams}`;
      } else if (url.indexOf('?') !== -1 && !url.endsWith('&')) {
        url = `${url}&${strParams}`;
      } else {
        url = `${url}?${strParams}`;
      }
    }
    return url;
  }
}
