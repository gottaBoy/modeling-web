'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class RadioButtonListEditorController extends runtime.CodeListEditorController {
  constructor() {
    super(...arguments);
    /**
     * 单选一行展示几个
     * @author fangZhiHao
     * @date 2024-07-17 10:07:40
     * @type {(number | undefined)}
     */
    __publicField(this, "rowNumber");
  }
  async onInit() {
    var _a;
    super.onInit();
    if ((_a = this.editorParams) == null ? void 0 : _a.rowNumber) {
      this.rowNumber = Number(this.editorParams.rowNumber);
    }
  }
}

exports.RadioButtonListEditorController = RadioButtonListEditorController;
