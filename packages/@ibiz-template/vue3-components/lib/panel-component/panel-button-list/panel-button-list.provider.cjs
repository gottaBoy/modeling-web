'use strict';

var panelButtonList_controller = require('./panel-button-list.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PanelButtonListProvider {
  constructor() {
    __publicField(this, "component", "IBizPanelButtonList");
  }
  async createController(panelItem, panel, parent) {
    const c = new panelButtonList_controller.PanelButtonListController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.PanelButtonListProvider = PanelButtonListProvider;
