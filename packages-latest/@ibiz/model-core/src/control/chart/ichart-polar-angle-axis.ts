import { IChartAngleAxis } from './ichart-angle-axis';
import { IChartPolarAxis } from './ichart-polar-axis';

/**
 *
 * 图表极坐标系角度轴模型对象接口
 * @export
 * @interface IChartPolarAngleAxis
 */
export interface IChartPolarAngleAxis
  extends IChartPolarAxis,
    IChartAngleAxis {}
