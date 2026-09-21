import { ISysCounter } from '../../control/counter/isys-counter';

/**
 *
 * 应用计数器模型对象接口
 * @export
 * @interface IAppCounter
 */
export interface IAppCounter extends ISysCounter {
  /**
   * 计算应用实体行为
   *
   * @type {string}
   * 来源  getGetPSAppDEAction
   */
  getAppDEActionId?: string;

  /**
   * 计算应用实体数据集
   *
   * @type {string}
   * 来源  getGetPSAppDEDataSet
   */
  getAppDEDataSetId?: string;

  /**
   * 应用实体对象
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;
}
