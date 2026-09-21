'use strict';

var panelTabPanel_controller = require('./panel-tab-panel.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PanelTabPanelProvider {
  constructor() {
    __publicField(this, "component", "IBizPanelTabPanel");
  }
  async createController(panelItem, panel, parent) {
    const c = new panelTabPanel_controller.PanelTabPanelController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.PanelTabPanelProvider = PanelTabPanelProvider;
