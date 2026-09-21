'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AuthCaptchaState extends runtime.PanelItemState {
  constructor() {
    super(...arguments);
    /**
     * @description 验证码
     * @exposedoc
     * @description ''
     * @type {string}
     * @memberof AuthCaptchaState
     */
    __publicField(this, "code", "");
    /**
     * @description 验证图片
     * @exposedoc
     * @type {string}
     * @memberof AuthCaptchaState
     */
    __publicField(this, "image", "");
    /**
     * @description 验证UUID码
     * @exposedoc
     * @type {string}
     * @memberof AuthCaptchaState
     */
    __publicField(this, "state", "");
    /**
     * @description 加载状态
     * @exposedoc
     * @type {boolean}
     * @memberof AuthCaptchaState
     */
    __publicField(this, "loading", false);
    /**
     * @description 错误信息
     * @type {string}
     * @exposedoc
     * @memberof AuthCaptchaState
     */
    __publicField(this, "error");
  }
}

exports.AuthCaptchaState = AuthCaptchaState;
