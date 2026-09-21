'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class FormGroupPanelProvider {
  constructor() {
    __publicField(this, "component", "IBizFormGroupPanel");
  }
  async createController(detailModel, form, parent) {
    const c = new runtime.FormGroupPanelController(detailModel, form, parent);
    await c.init();
    return c;
  }
}

exports.FormGroupPanelProvider = FormGroupPanelProvider;
