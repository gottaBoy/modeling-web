import { IChartSeries } from './ichart-series';

/**
 *
 * 继承父接口类型值[map]
 * @export
 * @interface IChartSeriesMap
 */
export interface IChartSeriesMap extends IChartSeries {
  /**
   * 地图类型
   * @type {string}
   * 来源  getMapType
   */
  mapType?: string;
}
