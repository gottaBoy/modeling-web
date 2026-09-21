import { IChartCoordinateSystem } from './ichart-coordinate-system';
import { IModelObject } from '../../imodel-object';

/**
 *
 * ECharts图表模型对象接口
 * @export
 * @interface IECharts
 */
export interface IECharts extends IModelObject {
  /**
   * 基础配置Json内容
   * @type {string}
   * 来源  getBaseOptionJOString
   */
  baseOptionJOString?: string;

  /**
   * 图表坐标系集合
   *
   * @type {IChartCoordinateSystem[]}
   * 来源  getPSChartCoordinateSystems
   */
  chartCoordinateSystems?: IChartCoordinateSystem[];
}
