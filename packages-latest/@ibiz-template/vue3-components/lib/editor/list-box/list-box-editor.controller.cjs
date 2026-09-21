'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ListBoxEditorController extends runtime.CodeListEditorController {
  constructor() {
    super(...arguments);
    /**
     * 代码表模型
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-05-24 10:55:50
     */
    __publicField(this, "codeList");
    /**
     * @description 自动选中第一个
     * @memberof ListBoxEditorController
     */
    __publicField(this, "autoSelectFirstOption", false);
  }
  async onInit() {
    var _a;
    super.onInit();
    if (this.model.appCodeListId) {
      const app = await ibiz.hub.getApp(this.context.srfappid);
      this.codeList = app.codeList.getCodeList(this.model.appCodeListId);
    }
    if ((_a = this.editorParams) == null ? void 0 : _a.autoselectfirstoption) {
      this.autoSelectFirstOption = this.toBoolean(
        this.editorParams.autoselectfirstoption
      );
    }
  }
}

exports.ListBoxEditorController = ListBoxEditorController;
