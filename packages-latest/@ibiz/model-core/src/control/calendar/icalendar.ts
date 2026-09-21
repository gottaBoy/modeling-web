import { IControlContainer } from '../icontrol-container';
import { IControlNavigatable } from '../icontrol-navigatable';
import { IMDAjaxControl } from '../imdajax-control';
import { IMDControl2 } from '../imdcontrol2';
import { ILanguageRes } from '../../res/ilanguage-res';

/**
 *
 * 日历部件模型基础对象接口
 * @export
 * @interface ICalendar
 */
export interface ICalendar
  extends IMDAjaxControl,
    IControlContainer,
    IControlNavigatable,
    IMDControl2 {
  /**
   * 日历样式
   * @description 值模式 [日历样式] {DAY：天、 WEEK：周、 MONTH：月、 TIMELINE：时间轴、 WEEK_TIMELINE：周（复合时间轴）、 MONTH_TIMELINE：月（复合时间轴）、 USER：用户自定义、 USER2：用户自定义2 }
   * @type {( string | 'DAY' | 'WEEK' | 'MONTH' | 'TIMELINE' | 'WEEK_TIMELINE' | 'MONTH_TIMELINE' | 'USER' | 'USER2')}
   * 来源  getCalendarStyle
   */
  calendarStyle?:
    | string
    | 'DAY'
    | 'WEEK'
    | 'MONTH'
    | 'TIMELINE'
    | 'WEEK_TIMELINE'
    | 'MONTH_TIMELINE'
    | 'USER'
    | 'USER2';

  /**
   * 无值显示内容
   * @type {string}
   * 来源  getEmptyText
   */
  emptyText?: string;

  /**
   * 无值内容语言资源
   *
   * @type {ILanguageRes}
   * 来源  getEmptyTextPSLanguageRes
   */
  emptyTextLanguageRes?: ILanguageRes;

  /**
   * 支持编辑
   * @type {boolean}
   * @default false
   * 来源  isEnableEdit
   */
  enableEdit?: boolean;
}
