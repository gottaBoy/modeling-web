'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class DropDownListEditorController extends runtime.CodeListEditorController {
  constructor() {
    super(...arguments);
    /**
     * 是否多选
     * @return {*}
     * @author: zhujiamin
     * @Date: 2022-08-25 14:33:14
     */
    __publicField(this, "multiple", false);
    /**
     * 是否可选可填
     * @return {*}
     * @author: fangzhihao
     * @Date: 2024-03-12 14:33:14
     */
    __publicField(this, "forceSelection", true);
    /**
     * 默认选中第一个
     *
     * @memberof CustomTagSelectController
     */
    __publicField(this, "defaultFirstOption", false);
    /**
     * 预置项空白项名称
     *
     * @memberof DropDownListEditorController
     */
    __publicField(this, "blankItemName", "");
  }
  async onInit() {
    var _a, _b, _c;
    super.onInit();
    if (this.model.editorType === "MDROPDOWNLIST") {
      this.multiple = true;
    }
    if ((_a = this.editorParams) == null ? void 0 : _a.forceSelection) {
      this.forceSelection = this.toBoolean(this.editorParams.forceSelection);
    }
    if ((_b = this.editorParams) == null ? void 0 : _b.defaultFirstOption) {
      this.defaultFirstOption = this.toBoolean(
        this.editorParams.defaultFirstOption
      );
    }
    if ((_c = this.editorParams) == null ? void 0 : _c.blankItemName) {
      this.blankItemName = this.editorParams.blankItemName;
    }
  }
}

exports.DropDownListEditorController = DropDownListEditorController;
