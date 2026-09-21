import { AutoCompleteEditorController } from './autocomplete-editor.controller.mjs';

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
    const c = new AutoCompleteEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

export { AutoCompleteEditorProvider };
