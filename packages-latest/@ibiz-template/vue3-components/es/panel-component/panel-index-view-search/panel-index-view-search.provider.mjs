import { PanelIndexViewSearchController } from './panel-index-view-search.controller.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PanelIndexViewSearchProvider {
  constructor() {
    __publicField(this, "component", "IBizPanelIndexViewSearch");
  }
  async createController(panelItem, panel, parent) {
    const c = new PanelIndexViewSearchController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { PanelIndexViewSearchProvider };
