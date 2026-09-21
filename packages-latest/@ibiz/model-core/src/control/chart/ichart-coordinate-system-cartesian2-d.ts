import { IChartCoordinateSystem } from './ichart-coordinate-system';
import { IChartGrid } from './ichart-grid';

/**
 *
 * 继承父接口类型值[XY]
 * @export
 * @interface IChartCoordinateSystemCartesian2D
 */
export interface IChartCoordinateSystemCartesian2D
  extends IChartCoordinateSystem {
  /**
   * 直角坐标绘图网格对象
   *
   * @type {IChartGrid}
   * 来源  getPSChartGrid
   */
  chartGrid?: IChartGrid;
}
