import { IAppMenuModel } from '../../app/appmenu/iapp-menu-model';
import { IAjaxControl } from '../iajax-control';
import { ILayoutContainer } from '../layout/ilayout-container';
import { IAppMenuItem } from './iapp-menu-item';

/**
 *
 * 继承父接口类型值[APPMENU]
 * @export
 * @interface IAppMenu
 */
export interface IAppMenu
  extends IAjaxControl,
    IAppMenuModel,
    ILayoutContainer {
  /**
   * 应用菜单样式
   * @description 值模式 [应用菜单样式] {ICONVIEW：图标视图、 LISTVIEW：列表视图、 SWIPERVIEW：图片滑动视图、 LISTVIEW2：列表视图（无刷新）、 LISTVIEW3：列表视图（无滑动）、 LISTVIEW4：列表视图（无背景）、 EXTVIEW1：扩展视图1、 EXTVIEW2：扩展视图2、 EXTVIEW3：扩展视图3、 EXTVIEW4：扩展视图4、 EXTVIEW5：扩展视图5、 USER：用户自定义、 USER2：用户自定义2 }
   * @type {( string | 'ICONVIEW' | 'LISTVIEW' | 'SWIPERVIEW' | 'LISTVIEW2' | 'LISTVIEW3' | 'LISTVIEW4' | 'EXTVIEW1' | 'EXTVIEW2' | 'EXTVIEW3' | 'EXTVIEW4' | 'EXTVIEW5' | 'USER' | 'USER2')}
   * 来源  getAppMenuStyle
   */
  appMenuStyle?:
    | string
    | 'ICONVIEW'
    | 'LISTVIEW'
    | 'SWIPERVIEW'
    | 'LISTVIEW2'
    | 'LISTVIEW3'
    | 'LISTVIEW4'
    | 'EXTVIEW1'
    | 'EXTVIEW2'
    | 'EXTVIEW3'
    | 'EXTVIEW4'
    | 'EXTVIEW5'
    | 'USER'
    | 'USER2';

  /**
   * 布局模式
   * @description 值模式 [面板布局模型] {TABLE：表格、 TABLE_12COL：栅格布局（12列）、 TABLE_24COL：栅格布局（24列）、 FLEX：Flex布局、 BORDER：边缘布局、 ABSOLUTE：绝对布局 }
   * @type {( string | 'TABLE' | 'TABLE_12COL' | 'TABLE_24COL' | 'FLEX' | 'BORDER' | 'ABSOLUTE')}
   * 来源  getLayoutMode
   */
  layoutMode?:
    | string
    | 'TABLE'
    | 'TABLE_12COL'
    | 'TABLE_24COL'
    | 'FLEX'
    | 'BORDER'
    | 'ABSOLUTE';

  /**
   * 应用计数器引用
   *
   * @type {string}
   * 来源  getPSAppCounterRef
   */
  appCounterRefId?: string;

  /**
   * 菜单项集合
   *
   * @type {IAppMenuItem[]}
   * 来源  getPSAppMenuItems
   */
  appMenuItems?: IAppMenuItem[];

  /**
   * 支持自定义
   * @type {boolean}
   * @default false
   * 来源  isEnableCustomized
   */
  enableCustomized?: boolean;
}
