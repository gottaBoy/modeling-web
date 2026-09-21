import { IChartObject } from './ichart-object';

/**
 *
 * 图表部件数据表格对象模型对象接口
 * @export
 * @interface IChartDataGrid
 */
export interface IChartDataGrid extends IChartObject {
  /**
   * 数据表格位置
   * @description 值模式 [图表标题位置] {TOP：上、 BOTTOM：下、 LEFT：左、 RIGHT：右 }
   * @type {( string | 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT')}
   * 来源  getDataGridPos
   */
  dataGridPos?: string | 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT';

  /**
   * 显示数据表格
   * @type {boolean}
   * @default false
   * 来源  isShowDataGrid
   */
  showDataGrid?: boolean;
}
