import { EditorController } from '@ibiz-template/runtime';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class DateRangeEditorController extends EditorController {
  constructor() {
    super(...arguments);
    /**
     * 日期选择弹框内选中的时间值
     *
     * @author ljx
     * @date 2024-03-28 16:11:21
     * @public
     * @returns {*}  {string}
     */
    __publicField(this, "dateRange", []);
  }
  /**
   * 根据编辑器类型获取格式化
   *
   * @author lxm
   * @date 2022-11-03 16:11:21
   * @public
   * @returns {*}  {string}
   */
  getFormatByType() {
    switch (this.model.editorType) {
      case "DATERANGE":
        return "YYYY-MM-DD HH:mm:ss";
      case "DATERANGE_NOTIME":
        return "YYYY-MM-DD";
      default:
        return "YYYY-MM-DD HH:mm:ss";
    }
  }
  /**
   * 值格式化
   * @return {*}
   * @author: zhujiamin
   * @Date: 2022-08-25 14:33:14
   */
  get valueFormat() {
    if (this.model.dateTimeFormat) {
      return this.model.dateTimeFormat;
    }
    if (super.valueFormat) {
      return super.valueFormat;
    }
    return this.getFormatByType();
  }
}

export { DateRangeEditorController };
