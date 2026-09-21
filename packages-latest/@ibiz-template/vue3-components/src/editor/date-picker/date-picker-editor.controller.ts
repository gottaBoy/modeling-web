import { EditorController } from '@ibiz-template/runtime';
import { IDatePicker } from '@ibiz/model-core';

/**
 * 选项框列表编辑器控制器
 * @return {*}
 * @author: zhujiamin
 * @Date: 2022-08-25 10:57:58
 */
export class DatePickerEditorController extends EditorController<IDatePicker> {
  /**
   * 根据编辑器类型获取格式化
   *
   * @author lxm
   * @date 2022-11-03 16:11:21
   * @protected
   * @returns {*}  {string}
   */
  getFormatByType(editorType: string | undefined): string {
    switch (editorType) {
      // 时间选择器
      case 'DATEPICKER':
      case 'MOBDATE':
        return 'YYYY-MM-DD HH:mm:ss';
      // 时间选择控件
      case 'DATEPICKEREX':
        return 'YYYY-MM-DD HH:mm:ss';
      // 时间选择控件_无小时
      case 'DATEPICKEREX_NOTIME':
      case 'MOBDATE_NOTIME':
        return 'YYYY-MM-DD';
      // 时间选择控件_小时
      case 'DATEPICKEREX_HOUR':
      case 'MOBDATE_HOUR':
        return 'YYYY-MM-DD HH';
      // 时间选择控件_分钟
      case 'DATEPICKEREX_MINUTE':
      case 'MOBDATE_MINUTE':
        return 'YYYY-MM-DD HH:mm';
      // 时间选择控件_秒钟
      case 'DATEPICKEREX_SECOND':
      case 'MOBDATE_SECOND':
        return 'YYYY-MM-DD HH:mm:ss';
      // 时间选择控件_无日期
      case 'DATEPICKEREX_NODAY':
      case 'MOBDATE_NODAY':
        return 'HH:mm:ss';
      // 时间选择控件_无日期无秒钟
      case 'DATEPICKEREX_NODAY_NOSECOND':
      case 'MOBDATE_NODAY_NOSECOND':
        return 'HH:mm';
      // 时间选择控件_无秒钟
      case 'DATEPICKEREX_NOSECOND':
        return 'YYYY-MM-DD HH:mm';
      default:
        return 'YYYY-MM-DD HH:mm:ss';
    }
  }

  /**
   * 值格式化
   * @return {*}
   * @author: zhujiamin
   * @Date: 2022-08-25 14:33:14
   */
  get valueFormat(): string | undefined {
    if (this.editorParams.valueformat) return this.editorParams.valueformat;
    if (super.valueFormat) {
      return super.valueFormat;
    }
    if (this.model.dateTimeFormat) {
      return this.model.dateTimeFormat;
    }
    return this.getFormatByType(this.model.editorType);
  }
}
