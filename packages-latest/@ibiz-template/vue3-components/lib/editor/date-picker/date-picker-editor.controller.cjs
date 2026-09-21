'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class DatePickerEditorController extends runtime.EditorController {
  /**
   * 根据编辑器类型获取格式化
   *
   * @author lxm
   * @date 2022-11-03 16:11:21
   * @protected
   * @returns {*}  {string}
   */
  getFormatByType(editorType) {
    switch (editorType) {
      case "DATEPICKER":
      case "MOBDATE":
        return "YYYY-MM-DD HH:mm:ss";
      case "DATEPICKEREX":
        return "YYYY-MM-DD HH:mm:ss";
      case "DATEPICKEREX_NOTIME":
      case "MOBDATE_NOTIME":
        return "YYYY-MM-DD";
      case "DATEPICKEREX_HOUR":
      case "MOBDATE_HOUR":
        return "YYYY-MM-DD HH";
      case "DATEPICKEREX_MINUTE":
      case "MOBDATE_MINUTE":
        return "YYYY-MM-DD HH:mm";
      case "DATEPICKEREX_SECOND":
      case "MOBDATE_SECOND":
        return "YYYY-MM-DD HH:mm:ss";
      case "DATEPICKEREX_NODAY":
      case "MOBDATE_NODAY":
        return "HH:mm:ss";
      case "DATEPICKEREX_NODAY_NOSECOND":
      case "MOBDATE_NODAY_NOSECOND":
        return "HH:mm";
      case "DATEPICKEREX_NOSECOND":
        return "YYYY-MM-DD HH:mm";
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
    if (this.editorParams.valueformat)
      return this.editorParams.valueformat;
    if (super.valueFormat) {
      return super.valueFormat;
    }
    if (this.model.dateTimeFormat) {
      return this.model.dateTimeFormat;
    }
    return this.getFormatByType(this.model.editorType);
  }
}

exports.DatePickerEditorController = DatePickerEditorController;
