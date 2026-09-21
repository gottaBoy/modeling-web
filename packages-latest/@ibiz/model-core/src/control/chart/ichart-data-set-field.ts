import { IChartObject } from './ichart-object';

/**
 *
 * 图表数据集属性模型对象接口
 * @export
 * @interface IChartDataSetField
 */
export interface IChartDataSetField extends IChartObject {
  /**
   * 分组模式
   * @type {string}
   * 来源  getGroupMode
   */
  groupMode?: string;

  /**
   * 代码表对象
   *
   * @type {string}
   * 来源  getPSCodeList
   */
  codeListId?: string;

  /**
   * 分组属性
   * @type {boolean}
   * 来源  isGroupField
   */
  groupField?: boolean;
}
