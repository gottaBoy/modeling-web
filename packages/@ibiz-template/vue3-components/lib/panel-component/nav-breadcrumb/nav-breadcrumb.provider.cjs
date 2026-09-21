'use strict';

var navBreadcrumb_controller = require('./nav-breadcrumb.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class NavBreadcrumbProvider {
  constructor() {
    __publicField(this, "component", "IBizNavBreadcrumb");
  }
  async createController(panelItem, panel, parent) {
    const c = new navBreadcrumb_controller.NavBreadcrumbController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.NavBreadcrumbProvider = NavBreadcrumbProvider;
