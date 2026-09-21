'use strict';

var htmlEditor_controller = require('./html-editor.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class HtmlEditorProvider {
  constructor() {
    __publicField(this, "formEditor", "IBizHtml");
    __publicField(this, "gridEditor", "IBizHtml");
  }
  async createController(editorModel, parentController) {
    const c = new htmlEditor_controller.HtmlEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

exports.HtmlEditorProvider = HtmlEditorProvider;
