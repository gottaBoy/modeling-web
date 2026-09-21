import { StepperEditorController } from './stepper-editor.controller.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class StepperEditorProvider {
  constructor() {
    __publicField(this, "formEditor", "IBizStepper");
    __publicField(this, "gridEditor", "IBizStepper");
  }
  async createController(editorModel, parentController) {
    const c = new StepperEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

export { StepperEditorProvider };
