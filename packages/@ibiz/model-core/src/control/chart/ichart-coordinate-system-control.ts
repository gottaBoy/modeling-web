import { IChartObject } from './ichart-object';

/**
 *
 * 子接口类型识别属性[type]
 * @export
 * @interface IChartCoordinateSystemControl
 */
export interface IChartCoordinateSystemControl extends IChartObject {
  /**
   * 基础配置Json内容
   * @type {string}
   * 来源  getBaseOptionJOString
   */
  baseOptionJOString?: string;

  /**
   * 图表坐标系统
   *
   * @type {string}
   * 来源  getPSChartCoordinateSystem
   */
  chartCoordinateSystemId?: string;

  /**
   * 部件类型
   * @type {string}
   * 来源  getType
   */
  type?: string;
}
