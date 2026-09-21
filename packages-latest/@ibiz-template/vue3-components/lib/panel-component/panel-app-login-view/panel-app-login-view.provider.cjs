'use strict';

var panelAppLoginView_controller = require('./panel-app-login-view.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PanelAppLoginViewProvider {
  constructor() {
    __publicField(this, "component", "IBizPanelAppLoginView");
  }
  async createController(panelItem, panel, parent) {
    const c = new panelAppLoginView_controller.PanelAppLoginViewController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.PanelAppLoginViewProvider = PanelAppLoginViewProvider;
