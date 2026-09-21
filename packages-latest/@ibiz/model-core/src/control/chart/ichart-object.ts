import { IModelObject } from '../../imodel-object';

/**
 *
 * 图表部件相关对象模型基础对象接口
 * @export
 * @interface IChartObject
 */
export interface IChartObject extends IModelObject {
  /**
   * 对象索引
   * @type {number}
   * 来源  getIndex
   */
  index?: number;
}
