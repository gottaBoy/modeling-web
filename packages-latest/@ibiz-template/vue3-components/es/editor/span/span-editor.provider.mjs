import { SpanEditorController } from './span-editor.controller.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class SpanEditorProvider {
  constructor(editorType) {
    __publicField(this, "formEditor", "IBizSpan");
    __publicField(this, "gridEditor", "IBizSpan");
    if (editorType === "SPAN_LINK") {
      this.formEditor = "IBizSpanLink";
      this.gridEditor = "IBizSpanLink";
    }
  }
  async createController(editorModel, parentController) {
    const c = new SpanEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

export { SpanEditorProvider };
