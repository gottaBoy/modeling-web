import { IChartSeriesEncode } from './ichart-series-encode';

/**
 *
 * 继承父接口类型值[XY]
 * @export
 * @interface IChartSeriesCSCartesian2DEncode
 */
export interface IChartSeriesCSCartesian2DEncode extends IChartSeriesEncode {
  /**
   * 图表X坐标轴
   *
   * @type {string}
   * 来源  getPSChartXAxis
   */
  chartXAxisId?: string;

  /**
   * 图表Y坐标轴
   *
   * @type {string}
   * 来源  getPSChartYAxis
   */
  chartYAxisId?: string;

  /**
   * X轴维度集合
   *
   * 来源 getX
   */
  x?: string[];

  /**
   * Y轴维度集合
   *
   * 来源 getY
   */
  y?: string[];
}
