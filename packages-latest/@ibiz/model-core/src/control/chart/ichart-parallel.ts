import { IChartCoordinateSystemControl } from './ichart-coordinate-system-control';
import { IChartPosition } from './ichart-position';

/**
 *
 * 图表平行坐标系组件模型对象接口
 * 继承父接口类型值[parallel]
 * @export
 * @interface IChartParallel
 */
export interface IChartParallel
  extends IChartCoordinateSystemControl,
    IChartPosition {}
