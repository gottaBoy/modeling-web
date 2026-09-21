import { IChartObject } from './ichart-object';

/**
 *
 * 图表部件图例对象模型对象接口
 * @export
 * @interface IChartLegend
 */
export interface IChartLegend extends IChartObject {
  /**
   * 图例位置
   * @description 值模式 [图表标题位置] {TOP：上、 BOTTOM：下、 LEFT：左、 RIGHT：右 }
   * @type {( string | 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT')}
   * 来源  getLegendPos
   */
  legendPos?: string | 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT';

  /**
   * 显示图例
   * @type {boolean}
   * 来源  isShowLegend
   */
  showLegend?: boolean;
}
