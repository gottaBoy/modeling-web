import { IndexBlankPlaceholderController } from './index-blank-placeholder.controller.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class IndexBlankPlaceholderProvider {
  constructor() {
    __publicField(this, "component", "IBizIndexBlankPlaceholder");
  }
  async createController(panelItem, panel, parent) {
    const c = new IndexBlankPlaceholderController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { IndexBlankPlaceholderProvider };
