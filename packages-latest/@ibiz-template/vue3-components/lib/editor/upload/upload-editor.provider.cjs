'use strict';

var uploadEditor_controller = require('./upload-editor.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class FileUploaderEditorProvider {
  constructor(editorType) {
    __publicField(this, "formEditor", "IBizFileUpload");
    __publicField(this, "gridEditor", "IBizFileUpload");
    let componentName = "IBizFileUpload";
    switch (editorType) {
      case "PICTURE":
      case "PICTURE_ONE":
      case "MOBPICTURE":
      case "MOBPICTURELIST":
        componentName = "IBizImageUpload";
        break;
      case "PICTURE_CROPPING":
        componentName = "IBizImageCropping";
        break;
      case "PICTURE_ONE_RAW":
      case "MOBPICTURE_RAW":
        componentName = "IBizImagePreview";
        break;
      default:
    }
    this.formEditor = componentName;
    this.gridEditor = componentName;
  }
  async createController(editorModel, parentController) {
    const c = new uploadEditor_controller.UploadEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

exports.FileUploaderEditorProvider = FileUploaderEditorProvider;
