'use strict';

var rawEditor_controller = require('./raw-editor.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class RawEditorProvider {
  constructor(editorType) {
    __publicField(this, "formEditor", "IBizRaw");
    __publicField(this, "gridEditor", "IBizRaw");
    if (editorType === "QRCODE") {
      this.formEditor = "IBizQrcode";
      this.gridEditor = "IBizQrcode";
    }
  }
  async createController(editorModel, parentController) {
    const c = new rawEditor_controller.RawEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

exports.RawEditorProvider = RawEditorProvider;
