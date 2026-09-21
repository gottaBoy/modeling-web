'use strict';

var presetRawitem_controller = require('./preset-rawitem.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PresetRawitemEditorProvider {
  constructor() {
    __publicField(this, "formEditor", "IBizPresetRawitem");
    __publicField(this, "gridEditor", "IBizPresetRawitem");
  }
  async createController(editorModel, parentController) {
    const c = new presetRawitem_controller.PresetRawitemEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

exports.PresetRawitemEditorProvider = PresetRawitemEditorProvider;
