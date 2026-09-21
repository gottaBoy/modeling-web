'use strict';

var checkboxListEditor_controller = require('./checkbox-list-editor.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class CheckBoxListEditorProvider {
  constructor() {
    __publicField(this, "formEditor", "IBizCheckboxList");
    __publicField(this, "gridEditor", "IBizCheckboxList");
  }
  async createController(editorModel, parentController) {
    const c = new checkboxListEditor_controller.CheckBoxListEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

exports.CheckBoxListEditorProvider = CheckBoxListEditorProvider;
