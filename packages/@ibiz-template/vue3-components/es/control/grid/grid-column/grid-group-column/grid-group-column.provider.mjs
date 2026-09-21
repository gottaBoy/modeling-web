import { GridGroupColumnController } from '@ibiz-template/runtime';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class GridGroupColumnProvider {
  constructor() {
    __publicField(this, "component", "");
  }
  async createController(columnModel, grid) {
    const c = new GridGroupColumnController(columnModel, grid);
    await c.init();
    return c;
  }
}

export { GridGroupColumnProvider };
