'use strict';

var leftSideMenu_controller = require('./left-side-menu.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class LeftSideMenuProvider {
  constructor() {
    __publicField(this, "component", "IBizLeftSideMenu");
  }
  async createController(panelItem, panel, parent) {
    const c = new leftSideMenu_controller.LeftSideMenuController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.LeftSideMenuProvider = LeftSideMenuProvider;
