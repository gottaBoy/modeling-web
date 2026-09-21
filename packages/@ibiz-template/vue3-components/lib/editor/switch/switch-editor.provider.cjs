'use strict';

var switchEditor_controller = require('./switch-editor.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class SwitchEditorProvider {
  constructor() {
    __publicField(this, "formEditor", "IBizSwitch");
    __publicField(this, "gridEditor", "IBizSwitch");
  }
  async createController(editorModel, parentController) {
    const c = new switchEditor_controller.SwitchEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

exports.SwitchEditorProvider = SwitchEditorProvider;
