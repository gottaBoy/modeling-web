import { IChartObject } from './ichart-object';

/**
 *
 * 图表数据集分组模型对象接口
 * @export
 * @interface IChartDataSetGroup
 */
export interface IChartDataSetGroup extends IChartObject {
  /**
   * 应用实体数据集
   *
   * @type {string}
   * 来源  getPSAppDEDataSet
   */
  appDEDataSetId?: string;

  /**
   * 应用实体对象
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;
}
