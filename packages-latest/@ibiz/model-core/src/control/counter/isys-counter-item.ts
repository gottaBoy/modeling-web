import { IModelObject } from '../../imodel-object';

/**
 *
 * 系统计数器项模型对象接口
 * @export
 * @interface ISysCounterItem
 */
export interface ISysCounterItem extends IModelObject {
  /**
   * 逻辑名称
   * @type {string}
   * 来源  getLogicName
   */
  logicName?: string;
}
