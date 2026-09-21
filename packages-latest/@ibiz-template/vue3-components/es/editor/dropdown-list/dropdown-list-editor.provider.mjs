import { DropDownListEditorController } from './dropdown-list-editor.controller.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class DropDownListEditorProvider {
  constructor(editorType) {
    __publicField(this, "formEditor", "IBizDropdown");
    __publicField(this, "gridEditor", "IBizDropdown");
    let componentName = "IBizDropdown";
    switch (editorType) {
      case "EMOJI_PICKER":
        componentName = "IBizEmojiPicker";
        break;
      case "VIRTUALIZED_LIST":
        componentName = "IBizVirtualizedList";
        break;
      case "TREE_PICKER":
        componentName = "IBizTreePicker";
        break;
      default:
    }
    this.formEditor = componentName;
    this.gridEditor = componentName;
  }
  async createController(editorModel, parentController) {
    const c = new DropDownListEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

export { DropDownListEditorProvider };
