import { IChartCoordinateSystem } from './ichart-coordinate-system';
import { IChartParallel } from './ichart-parallel';

/**
 *
 * 继承父接口类型值[PARALLEL]
 * @export
 * @interface IChartCoordinateSystemParallel
 */
export interface IChartCoordinateSystemParallel extends IChartCoordinateSystem {
  /**
   * 平行坐标系界面对象
   *
   * @type {IChartParallel}
   * 来源  getPSChartParallel
   */
  chartParallel?: IChartParallel;
}
