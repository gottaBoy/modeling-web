'use strict';

var autocompleteEditor_controller = require('./autocomplete-editor.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AutoCompleteEditorProvider {
  constructor() {
    __publicField(this, "formEditor", "IBizAutoComplete");
    __publicField(this, "gridEditor", "IBizAutoComplete");
  }
  async createController(editorModel, parentController) {
    const c = new autocompleteEditor_controller.AutoCompleteEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

exports.AutoCompleteEditorProvider = AutoCompleteEditorProvider;
