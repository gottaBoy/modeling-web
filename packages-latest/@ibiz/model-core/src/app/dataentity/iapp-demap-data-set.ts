import { IDEMapDataSet } from '../../dataentity/datamap/idemap-data-set';

/**
 *
 * 应用实体映射数据集模型对象接口
 * @export
 * @interface IAppDEMapDataSet
 */
export interface IAppDEMapDataSet extends IDEMapDataSet {
  /**
   * 目标应用实体数据集
   *
   * @type {string}
   * 来源  getDstPSAppDEDataSet
   */
  dstAppDEDataSetId?: string;

  /**
   * 源应用实体数据集
   *
   * @type {string}
   * 来源  getSrcPSAppDEDataSet
   */
  srcAppDEDataSetId?: string;
}
