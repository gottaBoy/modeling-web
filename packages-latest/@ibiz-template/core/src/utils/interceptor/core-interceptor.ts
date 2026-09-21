import { InternalAxiosRequestConfig } from 'axios';
import { getToken } from '../util/util';
import { Interceptor } from './interceptor';
import { getAppCookie } from '../cookie-util/cookie-util';
import { CoreConst } from '../../constant';

/**
 * @description 核心包拦截器
 * @export
 * @class CoreInterceptor
 * @extends {Interceptor}
 */
export class CoreInterceptor extends Interceptor {
  /**
   * @description 请求之前处理
   * @protected
   * @param {InternalAxiosRequestConfig} config
   * @returns {*}  {Promise<InternalAxiosRequestConfig>}
   * @memberof CoreInterceptor
   */
  protected async onBeforeRequest(
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> {
    config = await super.onBeforeRequest(config);

    const { headers } = config;

    // Set the access token.
    const token = getToken();
    if (token) {
      headers.set(
        `${ibiz.env.tokenHeader}Authorization`,
        `${ibiz.env.tokenPrefix}Bearer ${token}`,
      );
    }

    // Set the system ID.
    let systemId = ibiz.env.dcSystem;
    const { orgData } = ibiz;
    if (orgData) {
      if (orgData.systemid) {
        systemId = orgData.systemid;
      }
      if (orgData.orgid) {
        headers.set('srforgid', orgData.orgid);
      }
    }
    headers.set('srfsystemid', systemId);

    return config;
  }

  /**
   * @description 响应失败之后处理
   * @protected
   * @param {Error} error
   * @returns {*}  {Promise<never>}
   * @memberof CoreInterceptor
   */
  protected async onResponseError(error: Error): Promise<never> {
    const { config, response } = error as IData;
    if (
      this.instance &&
      response?.status === 401 &&
      config &&
      !config._retry &&
      config.url &&
      // 排除获取系统信息、应用数据、刷新 token 预定义接口
      (config.url.indexOf('/uaa/getbydcsystem/') === -1 ||
        config.url.indexOf('/appdata') !== -1 ||
        config.url.indexOf('/uaa/refresh_token/') !== -1)
    ) {
      try {
        // 标记为已重试
        config._retry = true;
        // 刷新 token(匿名登录通过登录换算token，非匿名登录通过refreshToken换算新的token)
        if (ibiz.env.enableAnonymous) {
          const authInfo = (ibiz as IData).auth.getAuthInfo();
          const refreshToken = getAppCookie(CoreConst.REFRESH_TOKEN);
          // 匿名登录、匿名登录无refreshToken情况通过登录换算token
          if (authInfo.isAnonymous || !refreshToken) {
            const tempOrgData = ibiz.orgData;
            await (ibiz as IData).auth.anonymousLogin();
            ibiz.orgData = tempOrgData;
          } else {
            await (ibiz as IData).auth.refreshToken();
          }
        } else {
          await (ibiz as IData).auth.refreshToken();
        }
        // 重新加载应用数据
        const res = await ibiz.net.get(
          '/appdata',
          (ibiz as IData).appUtil?.getAppContext(),
        );
        if (res && res.ok) {
          ibiz.appData = res.data;
        }
        // 重新发起原始请求
        const { headers } = config;
        const token = getToken();
        if (token) {
          headers.set(
            `${ibiz.env.tokenHeader}Authorization`,
            `${ibiz.env.tokenPrefix}Bearer ${token}`,
          );
        }
        let systemId = ibiz.env.dcSystem;
        const { orgData } = ibiz;
        if (orgData) {
          if (orgData.systemid) {
            systemId = orgData.systemid;
          }
          if (orgData.orgid) {
            headers.set('srforgid', orgData.orgid);
          }
        }
        headers.set('srfsystemid', systemId);
        return this.instance(config);
      } catch (err) {
        return Promise.reject(error);
      }
    }
    // 处理响应错误
    return Promise.reject(error);
  }
}
