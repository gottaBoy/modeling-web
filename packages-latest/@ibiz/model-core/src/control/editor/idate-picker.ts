import { IEditor } from '../ieditor';

/**
 *
 * 继承父接口类型值[MOBDATE,DATEPICKER,DATEPICKEREX,DATEPICKEREX_HOUR,DATEPICKEREX_NODAY,DATEPICKEREX_MINUTE,DATEPICKEREX_NOTIME,DATEPICKEREX_SECOND,DATEPICKEREX_NODAY_NOSECOND]
 * @export
 * @interface IDatePicker
 */
export interface IDatePicker extends IEditor {
  /**
   * 日期时间格式
   * @type {string}
   * 来源  getDateTimeFormat
   */
  dateTimeFormat?: string;
}
