import { IAjaxControl } from '../iajax-control';
import { IControl } from '../icontrol';
import { IControlContainer } from '../icontrol-container';
import { IUserControl } from '../iuser-control';
import { ILayoutItem } from '../layout/ilayout-item';
import { ILayoutPos } from '../layout/ilayout-pos';
import { ILanguageRes } from '../../res/ilanguage-res';
import { ISysImage } from '../../res/isys-image';
import { IUIActionGroup } from '../../view/iuiaction-group';

/**
 *
 * 子接口类型识别属性[portletType]
 * 继承父接口类型值[PORTLET]
 * @export
 * @interface IDBPortletPart
 */
export interface IDBPortletPart
  extends IControl,
    IAjaxControl,
    IControlContainer,
    IUserControl,
    ILayoutItem {
  /**
   * 界面行为组展开模式
   * @description 值模式 [界面行为组展开模式] {ITEM：按项展开（默认）、 ITEMS：按分组展开、 ITEMX：首项+分组展开 }
   * @type {( string | 'ITEM' | 'ITEMS' | 'ITEMX')}
   * 来源  getActionGroupExtractMode
   */
  actionGroupExtractMode?: string | 'ITEM' | 'ITEMS' | 'ITEMX';

  /**
   * 内容部件
   *
   * @type {string}
   * 来源  getContentPSControl
   */
  contentControlId?: string;

  /**
   * 动态样式表
   * @type {string}
   * 来源  getDynaClass
   */
  dynaClass?: string;

  /**
   * 部件位置
   *
   * @type {ILayoutPos}
   * 来源  getPSLayoutPos
   */
  layoutPos?: ILayoutPos;

  /**
   * 系统图片
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;

  /**
   * 系统统一资源
   *
   * @type {string}
   * 来源  getPSSysUniRes
   */
  sysUniResId?: string;

  /**
   * 界面行为组对象
   *
   * @type {IUIActionGroup}
   * 来源  getPSUIActionGroup
   */
  uiactionGroup?: IUIActionGroup;

  /**
   * 门户部件类型
   * @description 值模式 [云平台门户部件类型（全部）] {LIST：实体列表、 CHART：实体图表、 VIEW：系统视图、 REPORT：实体报表、 HTML：网页部件、 FILTER：过滤器、 TOOLBAR：工具栏、 ACTIONBAR：操作栏、 CUSTOM：自定义、 APPMENU：快捷菜单栏、 CONTAINER：布局容器、 RAWITEM：直接内容 }
   * @type {( string | 'LIST' | 'CHART' | 'VIEW' | 'REPORT' | 'HTML' | 'FILTER' | 'TOOLBAR' | 'ACTIONBAR' | 'CUSTOM' | 'APPMENU' | 'CONTAINER' | 'RAWITEM')}
   * 来源  getPortletType
   */
  portletType?:
    | string
    | 'LIST'
    | 'CHART'
    | 'VIEW'
    | 'REPORT'
    | 'HTML'
    | 'FILTER'
    | 'TOOLBAR'
    | 'ACTIONBAR'
    | 'CUSTOM'
    | 'APPMENU'
    | 'CONTAINER'
    | 'RAWITEM';

  /**
   * 抬头
   * @type {string}
   * 来源  getTitle
   */
  title?: string;

  /**
   * 标题栏关闭模式
   * @description 值模式 [分组标题栏关闭模式] {0：无关闭、 1：启用关闭（默认打开）、 2：启用关闭（默认关闭） }
   * @type {( number | 0 | 1 | 2)}
   * @default 0
   * 来源  getTitleBarCloseMode
   */
  titleBarCloseMode?: number | 0 | 1 | 2;

  /**
   * 抬头语言资源
   *
   * @type {ILanguageRes}
   * 来源  getTitlePSLanguageRes
   */
  titleLanguageRes?: ILanguageRes;

  /**
   * 启用锚点
   * @type {boolean}
   * @default false
   * 来源  isEnableAnchor
   */
  enableAnchor?: boolean;

  /**
   * 显式标题栏
   * @type {boolean}
   * 来源  isShowTitleBar
   */
  showTitleBar?: boolean;
}
