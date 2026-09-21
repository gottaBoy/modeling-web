'use strict';

var vue3Util = require('@ibiz-template/vue3-util');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class IndexActionsProvider {
  constructor() {
    __publicField(this, "component", "IBizIndexActions");
  }
  async createController(panelItem, panel, parent) {
    const c = new vue3Util.PanelContainerController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.IndexActionsProvider = IndexActionsProvider;
