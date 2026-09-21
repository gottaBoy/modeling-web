import { IChartCoordinateSystemControl } from './ichart-coordinate-system-control';
import { IChartPolarAngleAxis } from './ichart-polar-angle-axis';
import { IChartPolarRadiusAxis } from './ichart-polar-radius-axis';

/**
 *
 * 极坐标系组件模型对象接口，可以用于散点图和折线图。每个极坐标系拥有一个角度轴和一个半径轴。
 * @export
 * @interface IChartPolar
 */
export interface IChartPolar extends IChartCoordinateSystemControl {
  /**
   * 角度轴
   *
   * @type {IChartPolarAngleAxis}
   * 来源  getPSChartPolarAngleAxis
   */
  chartPolarAngleAxis?: IChartPolarAngleAxis;

  /**
   * 径向轴
   *
   * @type {IChartPolarRadiusAxis}
   * 来源  getPSChartPolarRadiusAxis
   */
  chartPolarRadiusAxis?: IChartPolarRadiusAxis;
}
