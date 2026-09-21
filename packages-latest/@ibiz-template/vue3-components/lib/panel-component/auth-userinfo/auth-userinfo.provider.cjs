'use strict';

var authUserinfo_controller = require('./auth-userinfo.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AuthUserinfoProvider {
  constructor() {
    __publicField(this, "component", "IBizAuthUserinfo");
  }
  async createController(panelItem, panel, parent) {
    const c = new authUserinfo_controller.AuthUserinfoController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.AuthUserinfoProvider = AuthUserinfoProvider;
