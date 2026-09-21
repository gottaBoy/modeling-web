'use strict';

var bottomSideMenu_controller = require('./bottom-side-menu.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class BottomSideMenuProvider {
  constructor() {
    __publicField(this, "component", "IBizBottomSideMenu");
  }
  async createController(panelItem, panel, parent) {
    const c = new bottomSideMenu_controller.BottomSideMenuController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.BottomSideMenuProvider = BottomSideMenuProvider;
