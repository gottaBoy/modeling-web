import { INavigateParamContainer } from '../inavigate-param-container';
import { ILayoutContainer } from '../layout/ilayout-container';
import { ILayoutItem } from '../layout/ilayout-item';
import { IMenuItem } from './imenu-item';
import { ISysCss } from '../../res/isys-css';
import { ISysImage } from '../../res/isys-image';

/**
 *
 * 应用菜单项模型对象接口
 * 子接口类型识别属性[itemType]
 * 继承父接口类型值[APPMENUREF|MENUITEM|SEPERATOR]
 * @export
 * @interface IAppMenuItem
 */
export interface IAppMenuItem
  extends IMenuItem,
    ILayoutContainer,
    ILayoutItem,
    INavigateParamContainer {
  /**
   * 菜单项状态
   * @description 值模式 [菜单项状态] {1：新功能、 2：热门功能 }
   * @type {( number | 1 | 2)}
   * @default 0
   * 来源  getAppMenuItemState
   */
  appMenuItemState?: number | 1 | 2;

  /**
   * 计数器标识
   * @type {string}
   * 来源  getCounterId
   */
  counterId?: string;

  /**
   * 项直接样式
   * @type {string}
   * 来源  getCssStyle
   */
  cssStyle?: string;

  /**
   * 项数据
   * @type {string}
   * 来源  getData
   */
  data?: string;

  /**
   * 动态样式表
   * @type {string}
   * 来源  getDynaClass
   */
  dynaClass?: string;

  /**
   * 菜单项通知标记
   * @type {string}
   * 来源  getInformTag
   */
  informTag?: string;

  /**
   * 菜单项通知标记2
   * @type {string}
   * 来源  getInformTag2
   */
  informTag2?: string;

  /**
   * 应用功能
   *
   * @type {string}
   * 来源  getPSAppFunc
   */
  appFuncId?: string;

  /**
   * 菜单项集合
   *
   * @type {IAppMenuItem[]}
   * 来源  getPSAppMenuItems
   */
  appMenuItems?: IAppMenuItem[];

  /**
   * 系统样式表
   *
   * @type {ISysCss}
   * 来源  getPSSysCss
   */
  sysCss?: ISysCss;

  /**
   * 系统图片
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;

  /**
   * 前端应用插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 预置类型
   * @type {string}
   * 来源  getPredefinedType
   */
  predefinedType?: string;

  /**
   * 预置类型参数
   * @type {string}
   * 来源  getPredefinedTypeParam
   */
  predefinedTypeParam?: string;

  /**
   * 标题栏关闭模式
   * @description 值模式 [分组标题栏关闭模式] {0：无关闭、 1：启用关闭（默认打开）、 2：启用关闭（默认关闭） }
   * @type {( number | 0 | 1 | 2)}
   * @default 0
   * 来源  getTitleBarCloseMode
   */
  titleBarCloseMode?: number | 0 | 1 | 2;

  /**
   * 禁用关闭
   * @type {boolean}
   * @default false
   * 来源  isDisableClose
   */
  disableClose?: boolean;

  /**
   * 打开时隐藏边栏
   * @type {boolean}
   * @default false
   * 来源  isHideSideBar
   */
  hideSideBar?: boolean;

  /**
   * 默认打开
   * @type {boolean}
   * @default false
   * 来源  isOpenDefault
   */
  openDefault?: boolean;

  /**
   * 是否延展
   * @type {boolean}
   * @default false
   * 来源  isSpanMode
   */
  spanMode?: boolean;

  /**
   * 启用
   * @type {boolean}
   * @default true
   * 来源  isValid
   */
  valid?: boolean;
}
