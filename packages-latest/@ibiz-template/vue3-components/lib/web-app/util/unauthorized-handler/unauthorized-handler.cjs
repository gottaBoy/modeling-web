'use strict';

var qs = require('qs');
var core = require('@ibiz-template/core');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class UnauthorizedHandler {
  constructor() {
    /**
     * @description 是否存在403错误未处理
     * @protected
     * @type {boolean}
     * @memberof UnauthorizedHandler
     */
    __publicField(this, "hasPermErrPending", false);
  }
  match(error) {
    return error instanceof core.HttpError && (error.status === 401 || error.status === 403);
  }
  /**
   * oauth登录处理
   *
   * @author tony001
   * @date 2024-12-22 10:12:48
   * @protected
   * @return {*}  {Promise<void>}
   */
  async oauthLogin() {
    if (window.location.href.indexOf("srfthird_auth_success=false") >= 0) {
      ibiz.log.debug("\u83B7\u53D6OAUTH\u7684token\u5931\u8D25\uFF0C\u8DF3\u8F6C\u6B63\u5E38\u767B\u5F55\u9875");
      this.normalLogin();
      return;
    }
    const res = await ibiz.thirdAuth.auth("OAUTH", "THIRD");
    if (!res.ok) {
      ibiz.log.debug("\u83B7\u53D6OAUTH\u91CD\u5B9A\u5411\u5730\u5740\u5931\u8D25\uFF0C\u8DF3\u8F6C\u6B63\u5E38\u767B\u5F55\u9875");
      this.normalLogin();
    }
  }
  /**
   * cas登录处理
   *
   * @author lxm
   * @date 2022-10-11 14:10:35
   * @protected
   * @returns {*}  {Promise<void>}
   */
  async casLogin() {
    if (!ibiz.env.casLoginUrl) {
      throw new core.RuntimeError(
        ibiz.i18n.t("webApp.unauthorizedHandler.noFoundEnvParams")
      );
    }
    const { origin } = window.location;
    const baseUrl = "".concat(origin).concat(ibiz.env.baseUrl);
    const backUrl = "".concat(baseUrl, "/cas/v7/login").concat(qs.stringify(
      {
        RU: core.UrlHelper.fullPath,
        base: baseUrl
      },
      { addQueryPrefix: true }
    ));
    const hasQueryPrefix = ibiz.env.casLoginUrl.indexOf("?") !== -1;
    const targetUrl = ibiz.env.casLoginUrl + (hasQueryPrefix ? "&" : "?") + qs.stringify(
      {
        service: backUrl
      },
      { addQueryPrefix: false }
    );
    window.location.href = targetUrl;
  }
  /**
   * 普通登录处理
   *
   * @author lxm
   * @date 2022-10-11 14:10:24
   * @protected
   * @returns {*}  {Promise<void>}
   */
  async normalLogin() {
    const ru = window.location.hash.replace("#", "");
    const targetUrl = "".concat(core.UrlHelper.routeBase, "/login?ru=").concat(encodeURIComponent(
      ru
    ));
    document.body.style.display = "none";
    window.location.href = targetUrl;
    window.location.reload();
  }
  /**
   * 处理403
   * @author lxm
   * @date 2023-12-06 10:19:12
   * @protected
   * @return {*}  {Promise<void>}
   */
  async handle403(error) {
    if (error.tag === "APPINIT") {
      if (this.hasPermErrPending) {
        return;
      }
      this.hasPermErrPending = true;
      const result = await ibiz.confirm.warning({
        title: ibiz.i18n.t("webApp.unauthorizedHandler.forbiddenAccess"),
        desc: ibiz.i18n.t("webApp.unauthorizedHandler.logoutAccount")
      });
      this.hasPermErrPending = false;
      if (result) {
        const bol = await ibiz.hub.controller.logout();
        if (bol) {
          window.location.reload();
        }
      }
    } else {
      ibiz.mc.error.send(error);
    }
  }
  /**
   * 没有权限处理
   *
   * @author lxm
   * @date 2022-10-11 14:10:50
   * @returns {*}  {Promise<void>}
   */
  handle(error) {
    if (error instanceof core.HttpError) {
      if (error.status === 401) {
        const search = qs.parse(window.location.search.replace("?", ""));
        if ((search.isAnonymous || ibiz.env.enableAnonymous) && // 匿名登录获取视图模型发生异常，走普通登录，防止循环执行
        error.tag !== "APPINIT") {
          ibiz.auth.anonymousLogin().then((bol) => {
            if (bol) {
              window.location.reload();
            }
          });
        } else if (ibiz.env.loginMode === core.LoginMode.CAS) {
          this.casLogin();
        } else if (ibiz.env.loginMode === core.LoginMode.OAUTH) {
          this.oauthLogin();
        } else {
          this.normalLogin();
        }
        return true;
      }
      if (error.status === 403) {
        this.handle403(error);
        return true;
      }
    }
  }
}

exports.UnauthorizedHandler = UnauthorizedHandler;
