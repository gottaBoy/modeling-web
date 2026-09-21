import { IControlItem } from '../icontrol-item';
import { IControlMDataContainer } from '../icontrol-mdata-container';
import { IControlObjectNavigatable } from '../icontrol-object-navigatable';
import { IControlXDataContainer } from '../icontrol-xdata-container';
import { IDEContextMenu } from '../toolbar/idecontext-menu';
import { ILanguageRes } from '../../res/ilanguage-res';
import { ISysCss } from '../../res/isys-css';
import { ISysImage } from '../../res/isys-image';

/**
 *
 * 地图部件项模型对象基础接口
 * @export
 * @interface IMapItem
 */
export interface IMapItem
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
   * 边框颜色
   * @type {string}
   * 来源  getBorderColor
   */
  borderColor?: string;

  /**
   * 边框宽度
   * @type {number}
   * 来源  getBorderWidth
   */
  borderWidth?: number;

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
   * 项样式
   * @description 值模式 [地图项样式] {POINT：点、 POINT2：点2、 POINT3：点3、 POINT4：点4、 LINE：连线、 LINE2：连线2、 LINE3：连线3、 LINE4：连线4、 REGION：区域、 REGION2：区域2、 REGION3：区域3、 REGION4：区域4、 USER：用户自定义、 USER2：用户自定义2、 USER3：用户自定义3、 USER4：用户自定义4 }
   * @type {( string | 'POINT' | 'POINT2' | 'POINT3' | 'POINT4' | 'LINE' | 'LINE2' | 'LINE3' | 'LINE4' | 'REGION' | 'REGION2' | 'REGION3' | 'REGION4' | 'USER' | 'USER2' | 'USER3' | 'USER4')}
   * 来源  getItemStyle
   */
  itemStyle?:
    | string
    | 'POINT'
    | 'POINT2'
    | 'POINT3'
    | 'POINT4'
    | 'LINE'
    | 'LINE2'
    | 'LINE3'
    | 'LINE4'
    | 'REGION'
    | 'REGION2'
    | 'REGION3'
    | 'REGION4'
    | 'USER'
    | 'USER2'
    | 'USER3'
    | 'USER4';

  /**
   * 项类型
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
   * 项界面样式表
   *
   * @type {ISysCss}
   * 来源  getPSSysCss
   */
  sysCss?: ISysCss;

  /**
   * 项图标对象
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;

  /**
   * 半径
   * @type {number}
   * 来源  getRadius
   */
  radius?: number;

  /**
   * 图形动态样式表
   * @type {string}
   * 来源  getShapeDynaClass
   */
  shapeDynaClass?: string;

  /**
   * 图形界面样式表
   *
   * @type {ISysCss}
   * 来源  getShapePSSysCss
   */
  shapeSysCss?: ISysCss;
}
