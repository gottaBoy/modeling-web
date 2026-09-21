'use strict';

var numberRangeEditor_controller = require('./number-range-editor.controller.cjs');

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
    const c = new numberRangeEditor_controller.NumberRangeEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

exports.NumberRangeEditorProvider = NumberRangeEditorProvider;
