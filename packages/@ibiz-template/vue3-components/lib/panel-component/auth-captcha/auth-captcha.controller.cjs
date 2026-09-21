'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var axios = require('axios');
var authCaptcha_state = require('./auth-captcha.state.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AuthCaptchaController extends runtime.PanelItemController {
  constructor() {
    super(...arguments);
    /**
     * 验证码数据
     *
     * @private
     * @memberof AuthCaptchaController
     */
    __publicField(this, "captcha", vue.reactive({
      "Captcha-State": "",
      "Captcha-Code": ""
    }));
  }
  /**
   * 创建人机识别状态对象
   *
   * @protected
   * @return {*}  {AuthCaptchaState}
   * @memberof AuthCaptchaController
   */
  createState() {
    var _a;
    return new authCaptcha_state.AuthCaptchaState((_a = this.parent) == null ? void 0 : _a.state);
  }
  /**
   * 面板状态变更通知
   *
   * @param {PanelNotifyState} _state
   * @return {*}  {Promise<void>}
   * @memberof AuthCaptchaController
   */
  async panelStateNotify(_state) {
    super.panelStateNotify(_state);
    this.data.captcha = this.captcha;
  }
  /**
   * 初始化
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof AuthCaptchaController
   */
  async onInit() {
    super.onInit();
    await this.loadCaptcha();
    this.panel.view.evt.on(
      "onAfterLogin",
      (evt) => {
        if (!evt.ok && (!evt.panelDataParent || evt.panelDataParent === this.dataParent.model.id)) {
          this.loadCaptcha();
          this.state.code = "";
        }
      }
    );
  }
  /**
   * 值校验
   *
   * @return {*}  {Promise<boolean>}
   * @memberof AuthCaptchaController
   */
  async validate() {
    if (this.state.code) {
      this.state.error = void 0;
      return true;
    }
    this.state.error = "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801";
    return false;
  }
  /**
   * 值改变
   *
   * @memberof AuthCaptchaController
   */
  onChange() {
    Object.assign(this.captcha, {
      "Captcha-State": this.state.state,
      "Captcha-Code": this.state.code
    });
  }
  /**
   * 加载验证码
   *
   * @return {*}  {Promise<void>}ss
   * @memberof AuthCaptchaController
   */
  async loadCaptcha() {
    this.state.loading = true;
    const requestConfig = {
      url: "".concat(ibiz.env.baseUrl, "/").concat(ibiz.env.appId, "/auths/captcha"),
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json"
      },
      data: {}
    };
    try {
      const res = await axios(requestConfig);
      if (res.status === 200 && res.data) {
        this.state.state = res.data.state;
        this.state.image = res.data.image;
      }
    } catch (error) {
      this.state.state = "";
      this.state.image = "";
    } finally {
      this.state.loading = false;
      this.onChange();
    }
  }
}

exports.AuthCaptchaController = AuthCaptchaController;
