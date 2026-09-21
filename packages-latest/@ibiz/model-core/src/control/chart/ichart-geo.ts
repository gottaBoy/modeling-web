import { IChartCoordinateSystemControl } from './ichart-coordinate-system-control';
import { IChartPosition } from './ichart-position';

/**
 *
 * 图表地理坐标细组件模型对象接口
 * 继承父接口类型值[geo]
 * @export
 * @interface IChartGeo
 */
export interface IChartGeo
  extends IChartCoordinateSystemControl,
    IChartPosition {}
