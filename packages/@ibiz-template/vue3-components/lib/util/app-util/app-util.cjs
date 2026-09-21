'use strict';

"use strict";
class AppUtil {
  /**
   * Creates an instance of AppUtil.
   * @author tony001
   * @date 2024-05-14 17:05:00
   * @param {Router} router
   */
  constructor(router) {
    this.router = router;
  }
  /**
   * 登录
   *
   * @author tony001
   * @date 2024-05-14 16:05:41
   * @param {string} loginName
   * @param {string} password
   * @param {(boolean | undefined)} [remember]
   * @param {(IData | undefined)} [headers]
   * @param {(IData | undefined)} [opts]
   * @return {*}  {Promise<boolean>}
   */
  async login(loginName, password, remember, headers, opts) {
    const bol = await ibiz.auth.login(loginName, password, remember, headers);
    if (bol === true) {
      window.location.hash = this.router.currentRoute.value.query.ru || "/";
      window.history.pushState({}, "");
      window.location.reload();
    }
    return bol;
  }
  /**
   * 登出
   *
   * @author tony001
   * @date 2024-05-14 16:05:02
   * @param {(IData | undefined)} [opts]
   * @return {*}  {Promise<boolean>}
   */
  async logout(opts) {
    const bol = await ibiz.auth.logout();
    if (bol) {
      const path = window.location;
      if (path.search.indexOf("isAnonymous=true") !== -1) {
        const href = "".concat(path.origin).concat(path.pathname).concat(path.hash);
        window.history.replaceState({}, "", href);
      }
      await this.router.push(
        // `/login?ru=${encodeURIComponent(
        //   window.location.hash.replace('#/', '/'),
        // )}`,
        "/login"
      );
      ibiz.util.showAppLoading();
      window.location.reload();
    }
    return bol;
  }
  /**
   * 变更密码
   *
   * @author tony001
   * @date 2024-05-14 16:05:11
   * @param {string} oldPwd
   * @param {string} newPwd
   * @param {(IData | undefined)} [opts]
   * @return {*}  {Promise<boolean>}
   */
  async changePwd(oldPwd, newPwd, opts) {
    if (this.validatePwd(oldPwd, newPwd, opts)) {
      const result = await ibiz.auth.changePwd(oldPwd, newPwd);
      return result;
    }
    return { ok: false, result: {} };
  }
  /**
   * 切换组织
   *
   * @author tony001
   * @date 2024-05-14 16:05:20
   * @param {string} oldOrgId
   * @param {string} newOrgId
   * @param {(IData | undefined)} [opts]
   * @return {*}  {Promise<boolean>}
   */
  switchOrg(oldOrgId, newOrgId, opts) {
    throw new Error("Method not implemented.");
  }
  /**
   * 切换主题
   *
   * @author tony001
   * @date 2024-05-14 16:05:30
   * @param {string} oldTheme
   * @param {string} newTheme
   * @param {(IData | undefined)} [opts]
   * @return {*}  {Promise<boolean>}
   */
  switchTheme(oldTheme, newTheme, opts) {
    throw new Error("Method not implemented.");
  }
  /**
   * 切换语言
   *
   * @author tony001
   * @date 2024-05-14 16:05:42
   * @param {string} oldLanguage
   * @param {string} newLanguage
   * @param {(IData | undefined)} [opts]
   * @return {*}  {Promise<boolean>}
   */
  switchLanguage(oldLanguage, newLanguage, opts) {
    throw new Error("Method not implemented.");
  }
  /**
   * 校验密码
   *
   * @author tony001
   * @date 2024-05-14 17:05:31
   * @protected
   * @param {string} oldPwd
   * @param {string} newPwd
   * @param {IData} [opts={}]
   * @return {*}  {boolean}
   */
  validatePwd(oldPwd, newPwd, opts = {}) {
    const { surePwd } = opts;
    if (!oldPwd) {
      ibiz.message.error("\u539F\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A");
      return false;
    }
    if (!newPwd) {
      ibiz.message.error("\u65B0\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A");
      return false;
    }
    if (!surePwd) {
      ibiz.message.error("\u786E\u8BA4\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A");
      return false;
    }
    if (oldPwd === newPwd) {
      ibiz.message.error("\u65B0\u5BC6\u7801\u4E0D\u80FD\u4E0E\u65E7\u5BC6\u7801\u4E00\u81F4");
      return false;
    }
    if (newPwd !== surePwd) {
      ibiz.message.error("\u4E24\u6B21\u5BC6\u7801\u4E0D\u4E00\u81F4");
      return false;
    }
    return true;
  }
}

exports.AppUtil = AppUtil;
