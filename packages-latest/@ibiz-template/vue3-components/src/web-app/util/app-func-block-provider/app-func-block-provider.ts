/* eslint-disable prefer-regex-literals */
import { IAppData, IOrgData } from '@ibiz-template/core';
import { ILoginContext, IAppFuncBlockProvider } from '@ibiz-template/runtime';

/**
 * @description 应用功能块适配器
 * @author tony001
 * @date 2026-05-13 14:05:36
 * @export
 * @class AppFuncBlockProvider
 * @implements {IAppFuncBlockProvider}
 */
export class AppFuncBlockProvider implements IAppFuncBlockProvider {
  /**
   * @description 登录
   * @author tony001
   * @date 2026-05-13 15:05:24
   * @param {ILoginContext} ctx
   * @param {(result: boolean) => void} [requestedCallback] 数据响应成功的回调
   * @returns {*}  {Promise<boolean>}
   * @memberof AppFuncBlockProvider
   */
  async login(
    ctx: ILoginContext,
    requestedCallback?: (result: boolean) => void,
  ): Promise<boolean> {
    const { loginname, password, rememberme, headers } = ctx;
    const bol = await ibiz.auth.login(loginname, password, rememberme, headers);
    if (requestedCallback) {
      requestedCallback(bol);
    }
    if (bol === true) {
      const loginFailed =
        window.location.href.indexOf('srfthird_auth_success=false') >= 0;
      // 基于hash获取ru
      const hash = window.location.hash.substring(1);
      const regex = new RegExp(`[?&]ru=([^&]*)`);
      const match = hash.match(regex);
      const ru = match ? decodeURIComponent(match[1]) : null;
      const redirect = ru && !ru.startsWith('/login') ? ru : '/';
      window.location.hash = redirect;
      // 重置会话记录state,防止直接返回到登录页
      window.history.pushState({}, '');
      if (loginFailed) {
        const path = window.location.href.replace(
          '?srfthird_auth_success=false',
          '',
        );
        window.location.href = path;
      } else {
        window.location.reload();
      }
    }
    return bol;
  }

  /**
   * @description 登出
   * @author tony001
   * @date 2026-05-13 16:05:28
   * @param {IData} [params]
   * @returns {*}  {Promise<boolean>}
   * @memberof AppFuncBlockProvider
   */
  async logout(params: IData): Promise<boolean> {
    const bol = await ibiz.auth.logout();
    if (bol) {
      const path = window.location;
      if (path.search.indexOf('isAnonymous=true') !== -1) {
        const href = `${path.origin}${path.pathname}${path.hash}`;
        window.history.replaceState({}, '', href);
      }
      if (params && params.router) {
        await params.router.push('/login');
        ibiz.util.showAppLoading();
        window.location.reload();
      }
    }
    return bol;
  }

  /**
   * @description 加载应用数据
   * @author tony001
   * @date 2026-05-13 16:05:52
   * @param {IParams} [context]
   * @returns {*}  {Promise<{ ok: boolean; data: IAppData }>}
   * @memberof AppFuncBlockProvider
   */
  async loadAppData(
    context?: IParams,
  ): Promise<{ ok: boolean; data: IAppData }> {
    let res;
    if (context && Object.keys(context).length > 0) {
      res = await ibiz.net.get('/appdata', context);
    } else {
      res = await ibiz.net.get('/appdata');
    }
    return {
      ok: res.ok,
      data: res.data as IAppData,
    };
  }

  /**
   * @description 获取组织数据
   * @author tony001
   * @date 2026-05-13 16:05:36
   * @returns {*}  {Promise<{ ok: boolean; data: IOrgData[] }>}
   * @memberof AppFuncBlockProvider
   */
  async loadOrgData(): Promise<{ ok: boolean; data: IOrgData[] }> {
    const res = await ibiz.net.get(`/uaa/getbydcsystem/${ibiz.env.dcSystem}`);
    return {
      ok: res.ok,
      data: res.data as IOrgData[],
    };
  }
}
