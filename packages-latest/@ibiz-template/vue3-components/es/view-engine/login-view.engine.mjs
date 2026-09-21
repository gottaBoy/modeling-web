import { ViewEngineBase, SysUIActionTag, getAppFuncBlockProvider } from '@ibiz-template/runtime';
import { useRoute } from 'vue-router';
import { notNilEmpty } from 'qx-util';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class LoginViewEngine extends ViewEngineBase {
  constructor() {
    super(...arguments);
    /**
     * 路由对象
     *
     * @type {RouteLocationNormalizedLoaded}
     * @memberof LoginViewEngine
     */
    __publicField(this, "route", useRoute());
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
        const targetID = event.target.dataset.id;
        if (targetID) {
          const targetPanelItem = this.view.layoutPanel.findPanelItemByName(targetID);
          if (targetPanelItem) {
            args.data = [targetPanelItem.data];
          }
        }
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
    if (key === SysUIActionTag.LOGIN) {
      await this.login(args);
      return null;
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
    if (notNilEmpty(data.orgid)) {
      username = "".concat(data.username, "@").concat(data.orgid);
    }
    const appFuncBlockProvider = await getAppFuncBlockProvider();
    await appFuncBlockProvider.login(
      {
        loginname: username,
        password: data.password,
        rememberme,
        headers
      },
      (result) => {
        this.view.evt.emit("onAfterLogin", { ok: result, panelDataParent });
      }
    );
  }
  /**
   * @description 取消变更
   * @param {({
   *       targetState: 'INIT' | 'UNDO' | 'REDO';
   *     })} [_args={ targetState: 'INIT' }] 目标状态，初始化状态|撤销上一步操作|重做下一步操作
   * @returns {*}  {Promise<void>}
   * @memberof LoginViewEngine
   */
  async cancelChanges(_args = { targetState: "INIT" }) {
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

export { LoginViewEngine };
