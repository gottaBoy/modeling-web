'use strict';

var runtime = require('@ibiz-template/runtime');
var vueRouter = require('vue-router');
var qxUtil = require('qx-util');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class LoginViewEngine extends runtime.ViewEngineBase {
  constructor() {
    super(...arguments);
    /**
     * 路由对象
     *
     * @type {RouteLocationNormalizedLoaded}
     * @memberof LoginViewEngine
     */
    __publicField(this, "route", vueRouter.useRoute());
    __publicField(this, "enterKeyListener", async (event) => {
      if (event.target.nodeName === "BUTTON" && event.key === "Enter" && this.view.layoutPanel) {
        const args = {
          data: [
            {
              username: this.view.layoutPanel.data.username,
              password: this.view.layoutPanel.data.password,
              captcha: this.view.layoutPanel.data.captcha
            }
          ]
        };
        await this.login(args);
      }
    });
  }
  /**
   * 视图mounted生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof LoginViewEngine
   */
  async onMounted() {
    super.onMounted();
    document.addEventListener("keyup", this.enterKeyListener);
  }
  /**
   * 视图destroyed生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof LoginViewEngine
   */
  async onDestroyed() {
    super.onDestroyed();
    document.removeEventListener("keyup", this.enterKeyListener);
  }
  async call(key, args = {}) {
    if (key === runtime.SysUIActionTag.LOGIN) {
      await this.login(args);
    }
    if (key === runtime.SysUIActionTag.CANCEL_CHANGES) {
      await this.cancelChanges();
    }
    return super.call(key, args);
  }
  async login(args) {
    var _a;
    let rememberme;
    const headers = {};
    const data = args.data[0] || {};
    const panelDataParent = (_a = args.params) == null ? void 0 : _a.panelDataParent;
    if (this.view.layoutPanel) {
      if (!await this.view.layoutPanel.validate(panelDataParent)) {
        return;
      }
      const panelData = this.view.layoutPanel.data;
      if (typeof panelData.isRemember === "boolean") {
        rememberme = panelData.isRemember;
      }
      if (data.captcha) {
        Object.assign(headers, data.captcha);
      }
      if (panelData.srfheaders) {
        Object.assign(headers, panelData.srfheaders);
      }
    }
    let username = data.username;
    if (qxUtil.notNilEmpty(data.orgid)) {
      username = "".concat(data.username, "@").concat(data.orgid);
    }
    const bol = await ibiz.auth.login(
      username,
      data.password,
      rememberme,
      headers
    );
    this.view.evt.emit("onAfterLogin", { ok: bol, panelDataParent });
    if (bol === true) {
      const loginFailed = window.location.href.indexOf("srfthird_auth_success=false") >= 0;
      window.location.hash = this.route.query.ru || "/";
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
  }
  async cancelChanges() {
    if (this.view.layoutPanel) {
      Object.keys(this.view.layoutPanel.panelItems).forEach((key) => {
        const controller = this.view.layoutPanel.panelItems[key];
        const { viewFieldName } = controller.model;
        if (viewFieldName) {
          controller.setDataValue("", viewFieldName);
        }
      });
    }
  }
}

exports.LoginViewEngine = LoginViewEngine;
