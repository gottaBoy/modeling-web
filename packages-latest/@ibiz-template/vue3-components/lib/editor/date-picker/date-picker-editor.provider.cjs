'use strict';

var datePickerEditor_controller = require('./date-picker-editor.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class DatePickerEditorProvider {
  constructor() {
    __publicField(this, "formEditor", "IBizDatePicker");
    __publicField(this, "gridEditor", "IBizDatePicker");
  }
  async createController(editorModel, parentController) {
    const c = new datePickerEditor_controller.DatePickerEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

exports.DatePickerEditorProvider = DatePickerEditorProvider;
