import { MenuPortletController } from '@ibiz-template/runtime';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class MenuPortletProvider {
  constructor() {
    __publicField(this, "component", "IBizMenuPortlet");
  }
  async createController(portletModel, dashboard, parent) {
    const c = new MenuPortletController(portletModel, dashboard, parent);
    await c.init();
    return c;
  }
}

export { MenuPortletProvider };
