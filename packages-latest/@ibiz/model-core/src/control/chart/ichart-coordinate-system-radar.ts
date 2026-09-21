import { IChartCoordinateSystem } from './ichart-coordinate-system';
import { IChartRadar } from './ichart-radar';

/**
 *
 * 继承父接口类型值[RADAR]
 * @export
 * @interface IChartCoordinateSystemRadar
 */
export interface IChartCoordinateSystemRadar extends IChartCoordinateSystem {
  /**
   * 图表雷达部件
   *
   * @type {IChartRadar}
   * 来源  getPSChartRadar
   */
  chartRadar?: IChartRadar;
}
