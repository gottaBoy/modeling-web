import { IChartCoordinateSystemControl } from './ichart-coordinate-system-control';
import { IChartPolarAngleAxis } from './ichart-polar-angle-axis';
import { IChartPolarRadiusAxis } from './ichart-polar-radius-axis';
/**
 *
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
