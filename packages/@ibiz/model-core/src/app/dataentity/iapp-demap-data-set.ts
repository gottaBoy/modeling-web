import { IDEMapDataSet } from '../../dataentity/datamap/idemap-data-set';

/**
 *
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
