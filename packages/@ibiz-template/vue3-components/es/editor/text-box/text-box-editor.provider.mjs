import { TextBoxEditorController } from './text-box-editor.controller.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class TextBoxEditorProvider {
  constructor(editorType) {
    __publicField(this, "formEditor", "IBizInput");
    __publicField(this, "gridEditor", "IBizInput");
    if (editorType === "NUMBER") {
      this.formEditor = "IBizInputNumber";
      this.gridEditor = "IBizInputNumber";
    }
    if (editorType === "IPADDRESSTEXTBOX") {
      this.formEditor = "IBizInputIP";
      this.gridEditor = "IBizInputIP";
    }
  }
  async createController(editorModel, parentController) {
    const c = new TextBoxEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

export { TextBoxEditorProvider };
