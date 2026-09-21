'use strict';

var globalSearch_controller = require('./global-search.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class GlobalSearchProvider {
  constructor() {
    __publicField(this, "component", "IBizGlobalSearch");
  }
  async createController(panelItem, panel, parent) {
    const c = new globalSearch_controller.GlobalSearchController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.GlobalSearchProvider = GlobalSearchProvider;
