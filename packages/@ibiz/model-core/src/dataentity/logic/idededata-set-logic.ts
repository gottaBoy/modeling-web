import { IDELogicNode } from './idelogic-node';

/**
 *
 * 继承父接口类型值[DEDATASET]
 * @export
 * @interface IDEDEDataSetLogic
 */
export interface IDEDEDataSetLogic extends IDELogicNode {
  /**
   * 应用实体数据集对象
   *
   * @type {string}
   * 来源  getDstPSAppDEDataSet
   */
  dstAppDEDataSetId?: string;

  /**
   * 应用实体对象
   *
   * @type {string}
   * 来源  getDstPSAppDataEntity
   */
  dstAppDataEntityId?: string;

  /**
   * 目标逻辑参数对象
   *
   * @type {string}
   * 来源  getDstPSDELogicParam
   */
  dstDELogicParamId?: string;

  /**
   * 返回值绑定逻辑参数对象
   *
   * @type {string}
   * 来源  getRetPSDELogicParam
   */
  retDELogicParamId?: string;
}
