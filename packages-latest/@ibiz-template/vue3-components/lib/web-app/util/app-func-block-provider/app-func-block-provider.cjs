'use strict';

"use strict";
class AppFuncBlockProvider {
  /**
   * @description 登录
   * @author tony001
   * @date 2026-05-13 15:05:24
   * @param {ILoginContext} ctx
   * @param {(result: boolean) => void} [requestedCallback] 数据响应成功的回调
   * @returns {*}  {Promise<boolean>}
   * @memberof AppFuncBlockProvider
   */
  async login(ctx, requestedCallback) {
    const { loginname, password, rememberme, headers } = ctx;
    const bol = await ibiz.auth.login(loginname, password, rememberme, headers);
    if (requestedCallback) {
      requestedCallback(bol);
    }
    if (bol === true) {
      const loginFailed = window.location.href.indexOf("srfthird_auth_success=false") >= 0;
      const hash = window.location.hash.substring(1);
      const regex = new RegExp("[?&]ru=([^&]*)");
      const match = hash.match(regex);
      const ru = match ? decodeURIComponent(match[1]) : null;
      window.location.hash = ru || "/";
      window.history.pushState({}, "");
      if (loginFailed) {
        const path = window.location.href.replace(
          "?srfthird_auth_success=false",
          ""
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
  async logout(params) {
    const bol = await ibiz.auth.logout();
    if (bol) {
      const path = window.location;
      if (path.search.indexOf("isAnonymous=true") !== -1) {
        const href = "".concat(path.origin).concat(path.pathname).concat(path.hash);
        window.history.replaceState({}, "", href);
      }
      if (params && params.router) {
        await params.router.push("/login");
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
  async loadAppData(context) {
    let res;
    if (context && Object.keys(context).length > 0) {
      res = await ibiz.net.get("/appdata", context);
    } else {
      res = await ibiz.net.get("/appdata");
    }
    return {
      ok: res.ok,
      data: res.data
    };
  }
  /**
   * @description 获取组织数据
   * @author tony001
   * @date 2026-05-13 16:05:36
   * @returns {*}  {Promise<{ ok: boolean; data: IOrgData[] }>}
   * @memberof AppFuncBlockProvider
   */
  async loadOrgData() {
    const res = await ibiz.net.get("/uaa/getbydcsystem/".concat(ibiz.env.dcSystem));
    return {
      ok: res.ok,
      data: res.data
    };
  }
}

exports.AppFuncBlockProvider = AppFuncBlockProvider;
