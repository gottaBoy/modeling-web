'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class RawItemPortletProvider {
  constructor() {
    __publicField(this, "component", "IBizRawItemPortlet");
  }
  async createController(portletModel, dashboard, parent) {
    const c = new runtime.RawItemPortletController(portletModel, dashboard, parent);
    await c.init();
    return c;
  }
}

exports.RawItemPortletProvider = RawItemPortletProvider;
