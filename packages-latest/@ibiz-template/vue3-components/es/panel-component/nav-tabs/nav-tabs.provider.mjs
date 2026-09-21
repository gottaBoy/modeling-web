import { NavTabsController } from './nav-tabs.controller.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class NavTabsProvider {
  constructor() {
    __publicField(this, "component", "IBizNavTabs");
  }
  async createController(panelItem, panel, parent) {
    const c = new NavTabsController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { NavTabsProvider };
