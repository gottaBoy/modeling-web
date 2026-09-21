import { IChartPosition } from './ichart-position';
import { IChartSeriesCSNone } from './ichart-series-csnone';

/**
 *
 * 继承父接口类型值[pie,pie3d]
 * @export
 * @interface IChartSeriesPie
 */
export interface IChartSeriesPie extends IChartSeriesCSNone, IChartPosition {
  /**
   * 圆心
   * @type {IModel}
   * 来源  getCenter
   */
  center?: IModel;

  /**
   * 最小扇区角度
   * @type {number}
   * 来源  getMinAngle
   */
  minAngle?: number;

  /**
   * 无标签扇区角度
   * @type {number}
   * 来源  getMinShowLabelAngle
   */
  minShowLabelAngle?: number;

  /**
   * 半径
   * @type {IModel}
   * 来源  getRadius
   */
  radius?: IModel;

  /**
   * 展示南丁格尔图
   * @type {IModel}
   * 来源  getRoseType
   */
  roseType?: IModel;

  /**
   * 起始角度
   * @type {number}
   * 来源  getStartAngle
   */
  startAngle?: number;
}
