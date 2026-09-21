import { IChartSeries } from './ichart-series';

/**
 *
 * 实体图表数据序列模型对象接口
 * 子接口类型识别属性[seriesType]
 * @export
 * @interface IDEChartSeries
 */
export interface IDEChartSeries extends IChartSeries {
  /**
   * 示例数据
   * @type {string}
   * 来源  getSampleData
   */
  sampleData?: string;
}
