import { CheckBoxEditorController } from './check-box-editor.controller.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class CheckBoxEditorProvider {
  constructor() {
    __publicField(this, "formEditor", "IBizCheckbox");
    __publicField(this, "gridEditor", "IBizCheckbox");
  }
  async createController(editorModel, parentController) {
    const c = new CheckBoxEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

export { CheckBoxEditorProvider };
