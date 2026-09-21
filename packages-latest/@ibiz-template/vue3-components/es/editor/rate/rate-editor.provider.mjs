import { RateEditorController } from './rate-editor.controller.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class RateEditorProvider {
  constructor() {
    __publicField(this, "formEditor", "IBizRate");
    __publicField(this, "gridEditor", "IBizRate");
  }
  async createController(editorModel, parentController) {
    const c = new RateEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

export { RateEditorProvider };
