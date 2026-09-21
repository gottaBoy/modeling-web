import { IControl } from '../icontrol';
import { IDEToolbarItem } from './idetoolbar-item';

/**
 *
 * 实体工具栏部件模型对象接口
 * 继承父接口类型值[TOOLBAR]
 * @export
 * @interface IDEToolbar
 */
export interface IDEToolbar extends IControl {
  /**
   * 工具栏项集合
   *
   * @type {IDEToolbarItem[]}
   * 来源  getPSDEToolbarItems
   */
  detoolbarItems?: IDEToolbarItem[];

  /**
   * 工具栏样式
   * @type {string}
   * 来源  getToolbarStyle
   */
  toolbarStyle?: string;

  /**
   * 界面行为数据部件名称
   * @type {string}
   * 来源  getXDataControlName
   */
  xdataControlName?: string;
}
