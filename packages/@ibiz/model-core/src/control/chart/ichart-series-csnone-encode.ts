import { IChartSeriesEncode } from './ichart-series-encode';

/**
 *
 * 继承父接口类型值[NONE]
 * @export
 * @interface IChartSeriesCSNoneEncode
 */
export interface IChartSeriesCSNoneEncode extends IChartSeriesEncode {
  /**
   * 分类属性
   * @type {string}
   * 来源  getCategory
   */
  category?: string;

  /**
   * 值属性
   * @type {string}
   * 来源  getValue
   */
  value?: string;
}
