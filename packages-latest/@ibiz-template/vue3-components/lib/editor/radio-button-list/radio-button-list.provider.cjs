'use strict';

var radioButtonList_controller = require('./radio-button-list.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class RadioButtonListEditorProvider {
  constructor() {
    __publicField(this, "formEditor", "IBizRadio");
    __publicField(this, "gridEditor", "IBizRadio");
  }
  async createController(editorModel, parentController) {
    const c = new radioButtonList_controller.RadioButtonListEditorController(
      editorModel,
      parentController
    );
    await c.init();
    return c;
  }
}

exports.RadioButtonListEditorProvider = RadioButtonListEditorProvider;
