import { IChartSeries } from './ichart-series';

/**
 *
 * 继承父接口类型值[gauge]
 * @export
 * @interface IChartSeriesGauge
 */
export interface IChartSeriesGauge extends IChartSeries {
  /**
   * 结束角度
   * @type {number}
   * 来源  getEndAngle
   */
  endAngle?: number;

  /**
   * 最大值
   * @type {number}
   * 来源  getMaxValue
   */
  maxValue?: number;

  /**
   * 最小值
   * @type {number}
   * 来源  getMinValue
   */
  minValue?: number;

  /**
   * 半径
   * @type {IModel}
   * 来源  getRadius
   */
  radius?: IModel;

  /**
   * 分割段数
   * @type {number}
   * 来源  getSplitNumber
   */
  splitNumber?: number;

  /**
   * 起始角度
   * @type {number}
   * 来源  getStartAngle
   */
  startAngle?: number;

  /**
   * 顺时针
   * @type {boolean}
   * 来源  isClockwise
   */
  clockwise?: boolean;
}
