import { IChartCoordinateSystem } from './ichart-coordinate-system';
import { IChartSingle } from './ichart-single';

/**
 *
 * 继承父接口类型值[SINGLE]
 * @export
 * @interface IChartCoordinateSystemSingle
 */
export interface IChartCoordinateSystemSingle extends IChartCoordinateSystem {
  /**
   * 单坐标系界面对象
   *
   * @type {IChartSingle}
   * 来源  getPSChartSingle
   */
  chartSingle?: IChartSingle;
}
