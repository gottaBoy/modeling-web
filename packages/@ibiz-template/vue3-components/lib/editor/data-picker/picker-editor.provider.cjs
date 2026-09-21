'use strict';

var pickerEditor_controller = require('./picker-editor.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class DataPickerEditorProvider {
  constructor(editorType) {
    __publicField(this, "formEditor");
    __publicField(this, "gridEditor");
    let componentName = "IBizPicker";
    switch (editorType) {
      case "PICKEREX_TRIGGER":
        componentName = "IBizPickerDropDown";
        break;
      case "PICKEREX_LINKONLY":
        componentName = "IBizPickerLink";
        break;
      case "ADDRESSPICKUP":
      case "ADDRESSPICKUP_AC":
        componentName = "IBizMPicker";
        break;
      case "PICKEREX_DROPDOWNVIEW":
      case "PICKEREX_DROPDOWNVIEW_LINK":
        componentName = "IBizPickerSelectView";
        break;
      case "PICKUPVIEW":
        componentName = "IBizPickerEmbedView";
        break;
      default:
    }
    this.formEditor = componentName;
    this.gridEditor = componentName;
  }
  async createController(editorModel, parentController) {
    const c = new pickerEditor_controller.PickerEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

exports.DataPickerEditorProvider = DataPickerEditorProvider;
