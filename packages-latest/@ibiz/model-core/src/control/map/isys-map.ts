import { IMap } from './imap';
import { ISysMapItem } from './isys-map-item';

/**
 *
 * 系统地图部件模型对象接口
 * 继承父接口类型值[MAP]
 * @export
 * @interface ISysMap
 */
export interface ISysMap extends IMap {
  /**
   * 图例位置
   * @description 值模式 [表单项标签位置] {LEFT：左边、 TOP：上方、 RIGHT：右边、 BOTTOM：下方、 NONE：不显示 }
   * @type {( string | 'LEFT' | 'TOP' | 'RIGHT' | 'BOTTOM' | 'NONE')}
   * 来源  getLegendPos
   */
  legendPos?: string | 'LEFT' | 'TOP' | 'RIGHT' | 'BOTTOM' | 'NONE';

  /**
   * 地图项集合
   *
   * @type {ISysMapItem[]}
   * 来源  getPSSysMapItems
   */
  sysMapItems?: ISysMapItem[];
}
