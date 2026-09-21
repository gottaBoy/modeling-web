'use strict';

var navPosIndex_controller = require('./nav-pos-index.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class NavPosIndexProvider {
  constructor() {
    __publicField(this, "component", "IBizNavPosIndex");
  }
  async createController(panelItem, panel, parent) {
    const c = new navPosIndex_controller.NavPosIndexController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.NavPosIndexProvider = NavPosIndexProvider;
