import { PanelButtonController } from './panel-button.controller.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PanelButtonProvider {
  constructor() {
    __publicField(this, "component", "IBizPanelButton");
  }
  async createController(panelItem, panel, parent) {
    const c = new PanelButtonController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { PanelButtonProvider };
