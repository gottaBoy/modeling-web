import { IChartCoordinateSystemControl } from './ichart-coordinate-system-control';
import { IChartPosition } from './ichart-position';

/**
 *
 * 图表日历组件模型基础对象接口
 * @export
 * @interface IChartCalendar
 */
export interface IChartCalendar
  extends IChartCoordinateSystemControl,
    IChartPosition {}
