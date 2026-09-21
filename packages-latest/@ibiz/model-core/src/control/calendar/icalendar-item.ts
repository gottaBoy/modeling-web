import { IControlItem } from '../icontrol-item';
import { IControlMDataContainer } from '../icontrol-mdata-container';
import { IControlObjectNavigatable } from '../icontrol-object-navigatable';
import { IControlXDataContainer } from '../icontrol-xdata-container';
import { ILayoutPanel } from '../panel/ilayout-panel';
import { IDEContextMenu } from '../toolbar/idecontext-menu';
import { ILanguageRes } from '../../res/ilanguage-res';
import { ISysCss } from '../../res/isys-css';
import { ISysImage } from '../../res/isys-image';

/**
 *
 * 日历部件项模型基础对象接口
 * @export
 * @interface ICalendarItem
 */
export interface ICalendarItem
  extends IControlItem,
    IControlXDataContainer,
    IControlMDataContainer,
    IControlObjectNavigatable {
  /**
   * 默认背景颜色
   * @type {string}
   * 来源  getBKColor
   */
  bkcolor?: string;

  /**
   * 默认文本颜色
   * @type {string}
   * 来源  getColor
   */
  color?: string;

  /**
   * 动态样式表
   * @type {string}
   * 来源  getDynaClass
   */
  dynaClass?: string;

  /**
   * 项内置样式
   * @description 值模式 [部件成员样式] {DEFAULT：默认样式、 STYLE2：样式2、 STYLE3：样式3、 STYLE4：样式4 }
   * @type {( string | 'DEFAULT' | 'STYLE2' | 'STYLE3' | 'STYLE4')}
   * 来源  getItemStyle
   */
  itemStyle?: string | 'DEFAULT' | 'STYLE2' | 'STYLE3' | 'STYLE4';

  /**
   * 项标识
   * @type {string}
   * 来源  getItemType
   */
  itemType?: string;

  /**
   * 最大加载项数
   * @type {number}
   * 来源  getMaxSize
   */
  maxSize?: number;

  /**
   * 代码模型对象
   * @type {string}
   * 来源  getModelObj
   */
  modelObj?: string;

  /**
   * 名称语言资源
   *
   * @type {ILanguageRes}
   * 来源  getNamePSLanguageRes
   */
  nameLanguageRes?: ILanguageRes;

  /**
   * 应用实体对象
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;

  /**
   * 上下文菜单对象
   *
   * @type {IDEContextMenu}
   * 来源  getPSDEContextMenu
   */
  decontextMenu?: IDEContextMenu;

  /**
   * 项布局面板
   *
   * @type {ILayoutPanel}
   * 来源  getPSLayoutPanel
   */
  layoutPanel?: ILayoutPanel;

  /**
   * 项界面样式表
   *
   * @type {ISysCss}
   * 来源  getPSSysCss
   */
  sysCss?: ISysCss;

  /**
   * 项图标资源对象
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;

  /**
   * 支持编辑
   * @type {boolean}
   * @default false
   * 来源  isEnableEdit
   */
  enableEdit?: boolean;
}
