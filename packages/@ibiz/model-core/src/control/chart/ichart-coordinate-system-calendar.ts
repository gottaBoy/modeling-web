import { IChartCalendar } from './ichart-calendar';
import { IChartCoordinateSystem } from './ichart-coordinate-system';

/**
 *
 * 继承父接口类型值[CALENDAR]
 * @export
 * @interface IChartCoordinateSystemCalendar
 */
export interface IChartCoordinateSystemCalendar extends IChartCoordinateSystem {
  /**
   * 地理坐标系组件
   *
   * @type {IChartCalendar}
   * 来源  getPSChartCalendar
   */
  chartCalendar?: IChartCalendar;
}
