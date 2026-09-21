'use strict';

var sliderEditor_controller = require('./slider-editor.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class SliderEditorProvider {
  constructor() {
    __publicField(this, "formEditor", "IBizSlider");
    __publicField(this, "gridEditor", "IBizSlider");
  }
  async createController(editorModel, parentController) {
    const c = new sliderEditor_controller.SliderEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

exports.SliderEditorProvider = SliderEditorProvider;
