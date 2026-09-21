'use strict';

var mapPickerEditor_controller = require('./map-picker-editor.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class MapPickerEditorProvider {
  constructor() {
    __publicField(this, "formEditor", "IBizMapPicker");
    __publicField(this, "gridEditor", "IBizMapPicker");
  }
  async createController(editorModel, parentController) {
    const c = new mapPickerEditor_controller.MapPickerEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

exports.MapPickerEditorProvider = MapPickerEditorProvider;
