import { SearchCondEditEditorController } from './ibiz-searchcond-edit.controller.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class SearchCondEditEditorProvider {
  constructor() {
    __publicField(this, "formEditor", "IBizSearchCondEdit");
    __publicField(this, "gridEditor", "IBizSearchCondEdit");
  }
  async createController(editorModel, parentController) {
    const c = new SearchCondEditEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

export { SearchCondEditEditorProvider };
