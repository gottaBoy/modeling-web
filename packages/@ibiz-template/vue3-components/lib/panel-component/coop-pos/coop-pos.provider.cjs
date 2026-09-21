'use strict';

var coopPos_controller = require('./coop-pos.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class CoopPosProvider {
  constructor() {
    __publicField(this, "component", "IBizCoopPos");
  }
  async createController(panelItem, panel, parent) {
    const c = new coopPos_controller.CoopPosController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.CoopPosProvider = CoopPosProvider;
