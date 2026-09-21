import { ColorPickerEditorController } from './color-picker-editor.controller.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ColorPickerEditorProvider {
  constructor() {
    __publicField(this, "formEditor", "IBizColorPicker");
    __publicField(this, "gridEditor", "IBizColorPicker");
  }
  async createController(editorModel, parentController) {
    const c = new ColorPickerEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

export { ColorPickerEditorProvider };
