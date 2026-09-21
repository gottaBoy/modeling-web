import { IChartCoordinateSystemControl } from './ichart-coordinate-system-control';
import { IChartPosition } from './ichart-position';

/**
 *
 * 图表坐标系内绘图网格模型对象接口，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。可以在网格上绘制折线图，柱状图，散点图（气泡图）。
 * 继承父接口类型值[grid]
 * @export
 * @interface IChartGrid
 */
export interface IChartGrid
  extends IChartCoordinateSystemControl,
    IChartPosition {
  /**
   * 绘图表格X轴[0]
   *
   * @type {string}
   * 来源  getPSChartGridXAxis0
   */
  chartGridXAxis0Id?: string;

  /**
   * 绘图表格X轴[1]
   *
   * @type {string}
   * 来源  getPSChartGridXAxis1
   */
  chartGridXAxis1Id?: string;

  /**
   * 绘图表格Y轴[0]
   *
   * @type {string}
   * 来源  getPSChartGridYAxis0
   */
  chartGridYAxis0Id?: string;

  /**
   * 绘图表格Y轴[1]
   *
   * @type {string}
   * 来源  getPSChartGridYAxis1
   */
  chartGridYAxis1Id?: string;
}
