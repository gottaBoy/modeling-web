import { ICalendar } from './icalendar';
import { ISysCss } from '../../res/isys-css';

/**
 *
 * 实体日历部件模型对象接口
 * @export
 * @interface IDECalendar
 */
export interface IDECalendar extends ICalendar {
  /**
   * 分组高度
   * @type {number}
   * @default 0
   * 来源  getGroupHeight
   */
  groupHeight?: number;

  /**
   * 分组布局
   * @description 值模式 [多数据部件分组方向] {ROW：从左往右、 COLUMN：从上往下 }
   * @type {( string | 'ROW' | 'COLUMN')}
   * 来源  getGroupLayout
   */
  groupLayout?: string | 'ROW' | 'COLUMN';

  /**
   * 分组模式
   * @description 值模式 [多数据部件分组模式] {NONE：无分组、 AUTO：自动分组、 CODELIST：分组代码表 }
   * @type {( string | 'NONE' | 'AUTO' | 'CODELIST')}
   * 来源  getGroupMode
   */
  groupMode?: string | 'NONE' | 'AUTO' | 'CODELIST';

  /**
   * 分组应用实体属性
   *
   * @type {string}
   * 来源  getGroupPSAppDEField
   */
  groupAppDEFieldId?: string;

  /**
   * 分组代码表
   *
   * @type {string}
   * 来源  getGroupPSCodeList
   */
  groupCodeListId?: string;

  /**
   * 分组默认界面样式
   *
   * @type {ISysCss}
   * 来源  getGroupPSSysCss
   */
  groupSysCss?: ISysCss;

  /**
   * 分组绘制插件
   *
   * @type {string}
   * 来源  getGroupPSSysPFPlugin
   */
  groupSysPFPluginId?: string;

  /**
   * 分组应用实体属性
   *
   * @type {string}
   * 来源  getGroupTextPSAppDEField
   */
  groupTextAppDEFieldId?: string;

  /**
   * 分组宽度
   * @type {number}
   * @default 0
   * 来源  getGroupWidth
   */
  groupWidth?: number;

  /**
   * 图例位置
   * @description 值模式 [表单项标签位置] {LEFT：左边、 TOP：上方、 RIGHT：右边、 BOTTOM：下方、 NONE：不显示 }
   * @type {( string | 'LEFT' | 'TOP' | 'RIGHT' | 'BOTTOM' | 'NONE')}
   * 来源  getLegendPos
   */
  legendPos?: string | 'LEFT' | 'TOP' | 'RIGHT' | 'BOTTOM' | 'NONE';

  /**
   * 启用分组
   * @type {boolean}
   * 来源  isEnableGroup
   */
  enableGroup?: boolean;
}
