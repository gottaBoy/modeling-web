import { IChartDataSetField } from './ichart-data-set-field';
import { IChartObject } from './ichart-object';

/**
 *
 * 图表数据集模型对象接口
 * @export
 * @interface IChartDataSet
 */
export interface IChartDataSet extends IChartObject {
  /**
   * 图表数据集属性集合
   *
   * @type {IChartDataSetField[]}
   * 来源  getPSChartDataSetFields
   */
  chartDataSetFields?: IChartDataSetField[];
}
