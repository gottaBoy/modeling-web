'use strict';

var dateRangeEditor_controller = require('./date-range-editor.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class DateRangeEditorProvider {
  constructor() {
    __publicField(this, "formEditor", "IBizDateRangePicker");
    __publicField(this, "gridEditor", "IBizDateRangePicker");
  }
  async createController(editorModel, parentController) {
    const c = new dateRangeEditor_controller.DateRangeEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

exports.DateRangeEditorProvider = DateRangeEditorProvider;
