import { IChartCoordinateSystemControl } from './ichart-coordinate-system-control';
import { IChartPosition } from './ichart-position';

/**
 *
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
