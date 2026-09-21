import { PanelButtonListController } from './panel-button-list.controller.mjs';

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
    const c = new PanelButtonListController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { PanelButtonListProvider };
