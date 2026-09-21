import { IChartSeries } from './ichart-series';

/**
 *
 * 继承父接口类型值[bar,bar3d,column]
 * @export
 * @interface IChartSeriesBar
 */
export interface IChartSeriesBar extends IChartSeries {
  /**
   * 同系列柱间距离
   * @type {IModel}
   * 来源  getBarCategoryGap
   */
  barCategoryGap?: IModel;

  /**
   * 不同系列柱间距离
   * @type {IModel}
   * 来源  getBarGap
   */
  barGap?: IModel;

  /**
   * 柱条最大宽度
   * @type {IModel}
   * 来源  getBarMaxWidth
   */
  barMaxWidth?: IModel;

  /**
   * 柱条最小高度
   * @type {number}
   * 来源  getBarMinHeight
   */
  barMinHeight?: number;

  /**
   * 柱条最小宽度
   * @type {IModel}
   * 来源  getBarMinWidth
   */
  barMinWidth?: IModel;

  /**
   * 柱条宽度
   * @type {IModel}
   * 来源  getBarWidth
   */
  barWidth?: IModel;

  /**
   * 数据堆叠
   * @type {boolean}
   * 来源  isStack
   */
  stack?: boolean;
}
