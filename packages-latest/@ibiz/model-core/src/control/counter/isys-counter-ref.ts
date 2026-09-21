import { IModelObject } from '../../imodel-object';

/**
 *
 * 系统计数器引用模型对象接口
 * @export
 * @interface ISysCounterRef
 */
export interface ISysCounterRef extends IModelObject {
  /**
   * 引用模式
   * @type {IModel}
   * 来源  getRefMode
   */
  refMode?: IModel;

  /**
   * 引用标记
   * @type {string}
   * 来源  getTag
   */
  tag?: string;

  /**
   * 计算器唯一标记
   * @type {string}
   * 来源  getUniqueTag
   */
  uniqueTag?: string;
}
