import { IAppView } from './iapp-view';

/**
 *
 * 继承父接口类型值[APPINDEXVIEW]
 * @export
 * @interface IAppIndexView
 */
export interface IAppIndexView extends IAppView {
  /**
   * 图标路径
   * @type {string}
   * 来源  getAppIconPath
   */
  appIconPath?: string;

  /**
   * 图标路径2
   * @type {string}
   * 来源  getAppIconPath2
   */
  appIconPath2?: string;

  /**
   * 应用选择模式
   * @description 值模式 [应用首页视图应用选择器模式] {0：无、 1：默认 }
   * @type {( number | 0 | 1)}
   * 来源  getAppSwitchMode
   */
  appSwitchMode?: number | 0 | 1;

  /**
   * 下方信息
   * @type {string}
   * 来源  getBottomInfo
   */
  bottomInfo?: string;

  /**
   * 默认内容视图
   *
   * @type {string}
   * 来源  getDefPSAppView
   */
  defAppViewId?: string;

  /**
   * 头部信息
   * @type {string}
   * 来源  getHeaderInfo
   */
  headerInfo?: string;

  /**
   * 应用菜单方向
   * @description 值模式 [应用首页视图主菜单方向] {LEFT：左侧、 TOP：上方、 CENTER：中间、 TREEEXP：树导航、 TABEXP_TOP：分页导航（上方分页）、 TABEXP_LEFT：分页导航（左侧分页）、 TABEXP_BOTTOM：分页导航（下方分页）、 TABEXP_RIGHT：分页导航（右侧分页）、 NONE：不显示 }
   * @type {( string | 'LEFT' | 'TOP' | 'CENTER' | 'TREEEXP' | 'TABEXP_TOP' | 'TABEXP_LEFT' | 'TABEXP_BOTTOM' | 'TABEXP_RIGHT' | 'NONE')}
   * 来源  getMainMenuAlign
   */
  mainMenuAlign?:
    | string
    | 'LEFT'
    | 'TOP'
    | 'CENTER'
    | 'TREEEXP'
    | 'TABEXP_TOP'
    | 'TABEXP_LEFT'
    | 'TABEXP_BOTTOM'
    | 'TABEXP_RIGHT'
    | 'NONE';

  /**
   * 门户应用计数器引用
   *
   * @type {string}
   * 来源  getPortalPSAppCounterRef
   */
  portalAppCounterRefId?: string;

  /**
   * 空白视图模式
   * @type {boolean}
   * 来源  isBlankMode
   */
  blankMode?: boolean;

  /**
   * 应用起始视图
   * @type {boolean}
   * @default false
   * 来源  isDefaultPage
   */
  defaultPage?: boolean;

  /**
   * 支持应用切换
   * @type {boolean}
   * 来源  isEnableAppSwitch
   */
  enableAppSwitch?: boolean;
}
