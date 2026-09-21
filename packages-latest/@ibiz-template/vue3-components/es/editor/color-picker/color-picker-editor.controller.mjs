import { EditorController } from '@ibiz-template/runtime';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ColorPickerEditorController extends EditorController {
  constructor() {
    super(...arguments);
    /**
     * @description 默认显示颜色
     * @type {string[]}
     * @memberof ColorPickerEditorController
     */
    __publicField(this, "defaultVal", []);
  }
  async onInit() {
    await super.onInit();
    const { defaultVal, defaultval } = this.editorParams;
    if (defaultVal) {
      this.defaultVal = JSON.parse(defaultVal);
    }
    if (defaultval) {
      this.defaultVal = JSON.parse(defaultval);
    }
  }
}

export { ColorPickerEditorController };
