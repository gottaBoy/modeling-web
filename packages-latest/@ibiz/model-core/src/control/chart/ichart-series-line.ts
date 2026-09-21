import { IChartSeries } from './ichart-series';

/**
 *
 * 继承父接口类型值[area,line]
 * @export
 * @interface IChartSeriesLine
 */
export interface IChartSeriesLine extends IChartSeries {
  /**
   * 阶梯线图
   * @type {IModel}
   * 来源  getStep
   */
  step?: IModel;

  /**
   * 数据堆叠
   * @type {boolean}
   * 来源  isStack
   */
  stack?: boolean;
}
