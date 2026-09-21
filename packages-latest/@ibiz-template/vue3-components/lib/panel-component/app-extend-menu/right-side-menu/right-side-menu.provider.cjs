'use strict';

var rightSideMenu_controller = require('./right-side-menu.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class RightSideMenuProvider {
  constructor() {
    __publicField(this, "component", "IBizRightSideMenu");
  }
  async createController(panelItem, panel, parent) {
    const c = new rightSideMenu_controller.RightSideMenuController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.RightSideMenuProvider = RightSideMenuProvider;
