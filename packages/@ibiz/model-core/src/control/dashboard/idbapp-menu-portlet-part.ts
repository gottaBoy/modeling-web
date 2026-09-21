import { IDBPortletPart } from './idbportlet-part';

/**
 *
 * 继承父接口类型值[APPMENU]
 * @export
 * @interface IDBAppMenuPortletPart
 */
export interface IDBAppMenuPortletPart extends IDBPortletPart {
  /**
   * 应用菜单列表样式
   * @type {string}
   * 来源  getAMListStyle
   */
  amlistStyle?: string;

  /**
   * 应用菜单绘制插件
   *
   * @type {string}
   * 来源  getAMPSSysPFPlugin
   */
  amsysPFPluginId?: string;
}
