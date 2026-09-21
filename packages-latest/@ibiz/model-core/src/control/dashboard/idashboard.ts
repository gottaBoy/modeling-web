import { IAjaxControl } from '../iajax-control';
import { IControlContainer } from '../icontrol-container';
import { IDashboardContainer } from './idashboard-container';
import { ILayoutContainer } from '../layout/ilayout-container';
import { ISysCss } from '../../res/isys-css';

/**
 *
 * 数据看板部件模型基础对象接口
 * @export
 * @interface IDashboard
 */
export interface IDashboard
  extends IAjaxControl,
    IControlContainer,
    IDashboardContainer,
    ILayoutContainer {
  /**
   * 看板定制模式
   * @description 值模式 [部件自定义模式] {0：禁用、 1：启用、 2：启用扩展 }
   * @type {( number | 0 | 1 | 2)}
   * @default 0
   * 来源  getCustomizeMode
   */
  customizeMode?: number | 0 | 1 | 2;

  /**
   * 数据看板样式
   * @description 值模式 [数据看板样式] {BIREPORTDASHBOARD：BI报表数据看板、 BIREPORTDASHBOARD2：BI报表数据看板2、 USER：用户自定义、 USER2：用户自定义2 }
   * @type {( string | 'BIREPORTDASHBOARD' | 'BIREPORTDASHBOARD2' | 'USER' | 'USER2')}
   * 来源  getDashboardStyle
   */
  dashboardStyle?:
    | string
    | 'BIREPORTDASHBOARD'
    | 'BIREPORTDASHBOARD2'
    | 'USER'
    | 'USER2';

  /**
   * 导航栏样式表
   *
   * @type {ISysCss}
   * 来源  getNavBarPSSysCss
   */
  navBarSysCss?: ISysCss;

  /**
   * 导航栏位置
   * @description 值模式 [导航栏位置] {TOPLEFT：左上角、 TOPRIGHT：右上角、 BOTTOMLEFT：左下角、 BOTTOMRIGHT：右下角、 MIDDLELEFT：左侧中间、 MIDDLERIGHT：右侧中间、 TOP：上方、 BOTTOM：下方、 USER：用户自定义、 USER2：用户自定义2 }
   * @type {( string | 'TOPLEFT' | 'TOPRIGHT' | 'BOTTOMLEFT' | 'BOTTOMRIGHT' | 'MIDDLELEFT' | 'MIDDLERIGHT' | 'TOP' | 'BOTTOM' | 'USER' | 'USER2')}
   * 来源  getNavBarPos
   */
  navBarPos?:
    | string
    | 'TOPLEFT'
    | 'TOPRIGHT'
    | 'BOTTOMLEFT'
    | 'BOTTOMRIGHT'
    | 'MIDDLELEFT'
    | 'MIDDLERIGHT'
    | 'TOP'
    | 'BOTTOM'
    | 'USER'
    | 'USER2';

  /**
   * 导航栏样式
   * @type {string}
   * 来源  getNavBarStyle
   */
  navBarStyle?: string;

  /**
   * 导航栏宽度
   * @type {number}
   * @default 0.0
   * 来源  getNavBarWidth
   */
  navBarWidth?: number;

  /**
   * 导航栏高度
   * @type {number}
   * @default 0.0
   * 来源  getNavbarHeight
   */
  navbarHeight?: number;

  /**
   * 应用动态看板功能
   *
   * @type {string}
   * 来源  getPSAppDynaDashboardUtil
   */
  appDynaDashboardUtilId?: string;

  /**
   * 支持看板定制
   * @type {boolean}
   * 来源  isEnableCustomized
   */
  enableCustomized?: boolean;

  /**
   * 显示看板导航栏
   * @type {boolean}
   * @default false
   * 来源  isShowDashboardNavBar
   */
  showDashboardNavBar?: boolean;
}
