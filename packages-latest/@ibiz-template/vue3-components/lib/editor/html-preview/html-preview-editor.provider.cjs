'use strict';

var htmlPreviewEditor_controller = require('./html-preview-editor.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class HtmlPreviewEditorProvider {
  constructor() {
    __publicField(this, "formEditor", "IBizHtmlPreview");
    __publicField(this, "gridEditor", "IBizHtmlPreview");
  }
  async createController(editorModel, parentController) {
    const c = new htmlPreviewEditor_controller.HtmlPreviewEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

exports.HtmlPreviewEditorProvider = HtmlPreviewEditorProvider;
