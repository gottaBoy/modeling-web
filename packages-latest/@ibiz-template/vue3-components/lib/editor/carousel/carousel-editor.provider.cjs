'use strict';

var carouselEditor_controller = require('./carousel-editor.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class CarouselEditorProvider {
  constructor() {
    __publicField(this, "formEditor", "IBizCarousel");
    __publicField(this, "gridEditor", "IBizCarousel");
  }
  async createController(editorModel, parentController) {
    const c = new carouselEditor_controller.CarouselEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

exports.CarouselEditorProvider = CarouselEditorProvider;
