import { NumberRangeEditorController } from './number-range-editor.controller.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class NumberRangeEditorProvider {
  constructor() {
    __publicField(this, "formEditor", "IBizNumberRangePicker");
    __publicField(this, "gridEditor", "IBizNumberRangePicker");
  }
  async createController(editorModel, parentController) {
    const c = new NumberRangeEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

export { NumberRangeEditorProvider };
