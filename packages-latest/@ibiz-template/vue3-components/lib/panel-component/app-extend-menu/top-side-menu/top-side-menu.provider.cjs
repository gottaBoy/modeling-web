'use strict';

var topSideMenu_controller = require('./top-side-menu.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class TopSideMenuProvider {
  constructor() {
    __publicField(this, "component", "IBizTopSideMenu");
  }
  async createController(panelItem, panel, parent) {
    const c = new topSideMenu_controller.TopSideMenuController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.TopSideMenuProvider = TopSideMenuProvider;
