'use strict';

var appSwitch_controller = require('./app-switch.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AppSwitchProvider {
  constructor() {
    __publicField(this, "component", "IBizAppSwitch");
  }
  async createController(panelItem, panel, parent) {
    const c = new appSwitch_controller.AppSwitchController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.AppSwitchProvider = AppSwitchProvider;
