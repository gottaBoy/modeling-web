import { SwitchEditorController } from './switch-editor.controller.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class SwitchEditorProvider {
  constructor(editorStyle) {
    __publicField(this, "formEditor", "IBizSwitch");
    __publicField(this, "gridEditor", "IBizSwitch");
    if (editorStyle === "TRISTATE") {
      this.formEditor = "IBizSwitchTriState";
      this.gridEditor = "IBizSwitchTriState";
    }
  }
  async createController(editorModel, parentController) {
    const c = new SwitchEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

export { SwitchEditorProvider };
