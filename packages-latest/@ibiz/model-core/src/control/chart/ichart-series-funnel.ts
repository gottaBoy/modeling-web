import { IChartPosition } from './ichart-position';
import { IChartSeriesCSNone } from './ichart-series-csnone';

/**
 *
 * 继承父接口类型值[funnel]
 * @export
 * @interface IChartSeriesFunnel
 */
export interface IChartSeriesFunnel extends IChartSeriesCSNone, IChartPosition {
  /**
   * 漏斗图方向
   * @type {string}
   * 来源  getFunnelAlign
   */
  funnelAlign?: string;

  /**
   * 最大面积
   * @type {IModel}
   * 来源  getMaxSize
   */
  maxSize?: IModel;

  /**
   * 最大值
   * @type {number}
   * 来源  getMaxValue
   */
  maxValue?: number;

  /**
   * 最小面积
   * @type {IModel}
   * 来源  getMinSize
   */
  minSize?: IModel;

  /**
   * 最小值
   * @type {number}
   * 来源  getMinValue
   */
  minValue?: number;
}
