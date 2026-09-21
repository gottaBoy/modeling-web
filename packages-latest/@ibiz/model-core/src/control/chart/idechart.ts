import { IChart } from './ichart';
import { IDEChartDataGrid } from './idechart-data-grid';
import { IDEChartLegend } from './idechart-legend';
import { IDEChartSeries } from './idechart-series';
import { IDEChartTitle } from './idechart-title';
import { IECharts } from './iecharts';

/**
 *
 * 实体图表部件模型对象接口
 * 继承父接口类型值[CHART]
 * @export
 * @interface IDEChart
 */
export interface IDEChart extends IChart, IECharts {
  /**
   * 默认排序方向
   * @description 值模式 [字段排序方向] {ASC：升序、 DESC：降序 }
   * @type {( string | 'ASC' | 'DESC')}
   * 来源  getMinorSortDir
   */
  minorSortDir?: string | 'ASC' | 'DESC';

  /**
   * 默认排序应用实体属性
   *
   * @type {string}
   * 来源  getMinorSortPSAppDEField
   */
  minorSortAppDEFieldId?: string;

  /**
   * 实体图表数据表格对象
   *
   * @type {IDEChartDataGrid}
   * 来源  getPSDEChartDataGrid
   */
  dechartDataGrid?: IDEChartDataGrid;

  /**
   * 实体图表图例对象
   *
   * @type {IDEChartLegend}
   * 来源  getPSDEChartLegend
   */
  dechartLegend?: IDEChartLegend;

  /**
   * 图表数据序列集合
   *
   * @type {IDEChartSeries[]}
   * 来源  getPSDEChartSerieses
   */
  dechartSerieses?: IDEChartSeries[];

  /**
   * 实体图表标题对象
   *
   * @type {IDEChartTitle}
   * 来源  getPSDEChartTitle
   */
  dechartTitle?: IDEChartTitle;
}
