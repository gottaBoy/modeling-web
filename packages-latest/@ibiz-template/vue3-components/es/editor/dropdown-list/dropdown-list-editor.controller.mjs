import { CodeListEditorController } from '@ibiz-template/runtime';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class DropDownListEditorController extends CodeListEditorController {
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
     * @memberof DropDownListEditorController
     */
    __publicField(this, "defaultFirstOption", false);
    /**
     * @description 自动选中第一个
     * @memberof DropDownListEditorController
     */
    __publicField(this, "autoSelectFirstOption", false);
    /**
     * 预置项空白项名称
     *
     * @memberof DropDownListEditorController
     */
    __publicField(this, "blankItemName", "");
    /**
     * 预置项空白项值
     *
     * @memberof DropDownListEditorController
     */
    __publicField(this, "blankItemValue");
  }
  async onInit() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    super.onInit();
    if (this.model.editorType === "MDROPDOWNLIST" || this.model.editorType === "MOBCHECKLIST") {
      this.multiple = true;
    }
    if ((_a = this.editorParams) == null ? void 0 : _a.forceSelection) {
      this.forceSelection = this.toBoolean(this.editorParams.forceSelection);
    }
    if ((_b = this.editorParams) == null ? void 0 : _b.forceselection) {
      this.forceSelection = this.toBoolean(this.editorParams.forceselection);
    }
    if ((_c = this.editorParams) == null ? void 0 : _c.defaultFirstOption) {
      this.defaultFirstOption = this.toBoolean(
        this.editorParams.defaultFirstOption
      );
    }
    if ((_d = this.editorParams) == null ? void 0 : _d.defaultfirstoption) {
      this.defaultFirstOption = this.toBoolean(
        this.editorParams.defaultfirstoption
      );
    }
    if ((_e = this.editorParams) == null ? void 0 : _e.autoselectfirstoption) {
      this.autoSelectFirstOption = this.toBoolean(
        this.editorParams.autoselectfirstoption
      );
    }
    if ((_f = this.editorParams) == null ? void 0 : _f.blankItemName) {
      this.blankItemName = this.editorParams.blankItemName;
    }
    if ((_g = this.editorParams) == null ? void 0 : _g.blankitemname) {
      this.blankItemName = this.editorParams.blankitemname;
    }
    if ((_h = this.editorParams) == null ? void 0 : _h.blankitemvalue)
      this.blankItemValue = this.editorParams.blankitemvalue;
  }
}

export { DropDownListEditorController };
