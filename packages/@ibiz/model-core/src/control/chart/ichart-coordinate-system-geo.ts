import { IChartCoordinateSystem } from './ichart-coordinate-system';
import { IChartGeo } from './ichart-geo';

/**
 *
 * 继承父接口类型值[MAP]
 * @export
 * @interface IChartCoordinateSystemGeo
 */
export interface IChartCoordinateSystemGeo extends IChartCoordinateSystem {
  /**
   * 地理坐标系组件
   *
   * @type {IChartGeo}
   * 来源  getPSChartGeo
   */
  chartGeo?: IChartGeo;
}
