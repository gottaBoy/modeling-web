'use strict';

var authCaptcha_controller = require('./auth-captcha.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AuthCaptchaProvider {
  constructor() {
    __publicField(this, "component", "IBizAuthCaptcha");
  }
  async createController(panelItem, panel, parent) {
    const c = new authCaptcha_controller.AuthCaptchaController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.AuthCaptchaProvider = AuthCaptchaProvider;
