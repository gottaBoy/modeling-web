'use strict';

var listBoxEditor_controller = require('./list-box-editor.controller.cjs');
var listBoxPickerEditor_controller = require('./list-box-picker-editor.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ListBoxEditorProvider {
  constructor() {
    __publicField(this, "formEditor", "IBizListBox");
    __publicField(this, "gridEditor", "IBizListBox");
  }
  async createController(editorModel, parentController) {
    let c;
    if (editorModel.editorType === "LISTBOXPICKUP") {
      c = new listBoxPickerEditor_controller.ListBoxPickerEditorController(
        editorModel,
        parentController
      );
    } else {
      c = new listBoxEditor_controller.ListBoxEditorController(
        editorModel,
        parentController
      );
    }
    await c.init();
    return c;
  }
}

exports.ListBoxEditorProvider = ListBoxEditorProvider;
